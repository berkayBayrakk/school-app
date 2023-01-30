import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { PubsubService } from 'src/pubSub/pubsub.service';

@Module({
  providers: [StudentResolver, StudentService, PubsubService],
})
export class StudentModule {}
