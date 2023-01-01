import { createUnionType } from '@nestjs/graphql';
import { EmailErrorType } from '../model/emailError.model';
import { StudentModel } from '../model/student.model';

export const StudentErrorUnion = createUnionType({
  name: 'StudentError',
  description:
    'When everything is ok returns a student otherwise return an error.',
  types: () => [StudentModel, EmailErrorType] as const,

  resolveType(value) {
    console.log(value);
    if (value.email) {
      return StudentModel;
    }
    if (value.message) {
      return EmailErrorType;
    }
    return null;
  },
});
