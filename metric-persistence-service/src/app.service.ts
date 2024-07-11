import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const mongoUrl = this.configService.get<string>('MONGO_URL');
    return `MongoDB URL is ${mongoUrl}`;
  }
}
