import {Inject, Injectable} from '@nestjs/common';

import {GenericMetricDoc} from "./generic-metric-doc";
import {IGenericMetricRepository, IGenericMetricRepositoryAdapterSymbol} from "../repositories/generic-metric-repository.interface";

@Injectable()
export class GenericMetricService {
  constructor(@Inject(IGenericMetricRepositoryAdapterSymbol) private genericMetricRepository: IGenericMetricRepository<any>) {
  }

  async create(assessmentId: string, userId: string, metric: any): Promise<any> {
    return this.genericMetricRepository.create(assessmentId, userId, metric);
  }

  async findOne(assessmentId: string, userId: string): Promise<GenericMetricDoc | null> {
    return this.genericMetricRepository.find(assessmentId, userId);
  }
}
