import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { StudentService } from 'src/student/student.service';

@Module({
  providers: [PostResolver, PostService, StudentService],
})
export class PostModule {}
