import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';

import { StudentService } from './student.service';
import { RedisCacheService } from 'src/redis/redis.service';
import { CreateStudentInput } from './dto/createStudent.input';
describe('StudentService', () => {
  let studentService: StudentService;
  let prismaService: PrismaService;
  let redisService: RedisCacheService;

  const studentArray = [
    { id: 1, name: 'testStudent1', email: 'testmail1' },
    { id: 2, name: 'Test Cat 2', email: 'Testmail2' },
    { id: 3, name: 'Test Cat 3', email: 'Testmail3' },
    { id: 4, name: 'berkay', email: 'berkay@gmail.com' },
  ];
  const mockPrisma = {
    student: {
      findMany: jest.fn().mockImplementation(() => {
        return studentArray;
      }),
      findFirst: jest.fn().mockImplementation((id) => {
        return studentArray.find((student) => student.id == id);
      }),
      upsert: jest
        .fn()
        .mockImplementation((email, name) => {
          return { id: 4, email: email, name: name };
        })
        .mockResolvedValue(studentArray[3]),
      delete: jest.fn().mockResolvedValue(studentArray[0]),
    },
  };
  const mockRedis = {
    set: jest.fn(),
    del: jest.fn(),
    get: jest.fn().mockImplementation((id) => {
      return mockPrisma.student.findFirst(id);
    }),
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: RedisCacheService, useValue: mockRedis },
      ],
    }).compile();

    studentService = app.get<StudentService>(StudentService);
    prismaService = app.get<PrismaService>(PrismaService);
    redisService = app.get<RedisCacheService>(RedisCacheService);
  });

  describe('getAllStudents', () => {
    it('should return an array', async () => {
      const students = await studentService.getAllStudents({
        limit: 10,
        offset: 0,
      });
      expect(students).toBeInstanceOf(Array);
    });
    it('should return students in db', async () => {
      const students = await studentService.getAllStudents({
        limit: 10,
        offset: 0,
      });

      expect(students).toEqual(await prismaService.student.findMany());
    });
    it('should order by id:asc', async () => {
      await studentService.getAllStudents({
        limit: 10,
        offset: 0,
      });
      expect(prismaService.student.findMany).toHaveBeenLastCalledWith({
        orderBy: { id: 'asc' },
      });
    });
  });

  describe('createStudent', () => {
    it('should return a student which created', async () => {
      const dto: CreateStudentInput = {
        email: 'berkay@gmail.com',
        name: 'berkay',
      };
      const student = await studentService.createStudent(dto);

      expect(student).toEqual(studentArray[3]);
      expect(redisService.set).toBeCalledTimes(1);
    });
    it('should parameters contain dto', async () => {
      const dto: CreateStudentInput = {
        email: 'berkay@gmail.com',
        name: 'berkay',
      };
      const student = await studentService.createStudent(dto);
      expect(mockPrisma.student.upsert).toHaveBeenLastCalledWith({
        create: { ...dto },
        update: { ...dto },
        where: { email: dto.email },
      });
      expect(mockRedis.set).toHaveBeenLastCalledWith(
        { id: student.id, key: 'student' },
        student,
      );
    });
  });
  describe('deleteStudent', () => {
    it('should return a student', async () => {
      const id = 1;
      const student = await studentService.deleteStudentById(id);

      expect(student).toBe(await mockPrisma.student.delete());
    });
    it('should called with parameter which has only id', async () => {
      const id = 1;
      const student = await studentService.deleteStudentById(id);
      expect(prismaService.student.delete).toHaveBeenLastCalledWith({
        where: { id: student.id },
      });
      expect(redisService.del).toHaveBeenLastCalledWith(
        { id: student.id, key: 'student' },
        'absolute',
      );
    });
  });
  describe('getStudentById', () => {
    it('should return a student from redis if exist in redis', async () => {
      const id = 1;
      mockRedis.get.mockResolvedValue(studentArray[0]);
      const student = await studentService.getStudentById(id);
      expect(student).toBe(studentArray[0]);
      expect(mockPrisma.student.findFirst).toBeCalledTimes(0);
      expect(redisService.get).toHaveBeenCalledWith(
        { key: 'student', id: id },
        expect.any(Function),
      );
    });
    it('should return a student from database if not exist in redis', async () => {
      const id = 1;
      mockRedis.get.mockResolvedValue(null);

      mockPrisma.student.findFirst.mockResolvedValue(studentArray[0]);

      await studentService.getStudentById(id);

      expect(mockPrisma.student.findFirst.mock.calls.length).toBeLessThan(
        mockRedis.get.mock.calls.length,
      );
    });
  });
});
