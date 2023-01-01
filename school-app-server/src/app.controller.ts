import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/getall')
  getAllStudents() {
    return this.appService.getStudents();
  }

  @Get('/getpost/:id')
  getPostsById(@Param('id') params: string) {
    const id = parseInt(params);
    return this.appService.getPosts(id);
  }
}
