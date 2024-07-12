import { Module } from '@nestjs/common';
import {ConfigModule } from "@nestjs/config";

import { GenericMetricController } from './generic-metric/generic-metric.controller';
import { GenericMetricService } from './generic-metric/generic-metric.service';
import {DatabaseModule} from "./database/database.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
  ],
  controllers: [GenericMetricController],
  providers: [GenericMetricService],
})
export class AppModule {}
