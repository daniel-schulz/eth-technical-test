import {Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {ApiTags} from "@nestjs/swagger";

@Controller('generic-metrics')
@ApiTags('generic-metrics')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMetricData(): string {
    return this.appService.getHello();
  }

  @Post()
  setMetricData(): string {
    return this.appService.getHello();
  }
}
