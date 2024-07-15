import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";

import {GenericMetricController} from './generic-metric/generic-metric.controller';
import {GenericMetricService} from './generic-metric/generic-metric.service';
import {IGenericMetricRepositoryAdapterSymbol} from "./repositories/generic-metric-repository.interface";
import {GenericMetricRepositoryMongodbAdapter} from "./repositories/generic-metric-repository-mongodb.adapter";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [GenericMetricController],
  providers: [
    GenericMetricService,
    {
      provide: IGenericMetricRepositoryAdapterSymbol,
      useClass: GenericMetricRepositoryMongodbAdapter,
    },
  ],
})
export class AppModule {
}
