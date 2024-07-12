import {Injectable} from '@nestjs/common';

import {DatabaseService} from "../database/database.service";
import {GenericAssessmentDoc} from "./generic-assessment";

@Injectable()
export class GenericMetricService {
  private collection: any;

  constructor(private databaseService: DatabaseService) {
  }

  async onModuleInit() {
    this.collection = this.databaseService.getCollection('generic-metrics');
  }

  async create(assessmentId: string, userId: string, metric: any): Promise<any> {
    if (await this.findOne(assessmentId, userId)) {
      throw new Error(`Metric with assessmentId ${assessmentId} and userId ${userId} already exists`);
    }

    return this.collection.insertOne({
      assessmentId,
      userId,
      metric,
    } as GenericAssessmentDoc);
  }

  async findOne(assessmentId: string, userId: string): Promise<GenericAssessmentDoc | null> {
    return this.collection.findOne({assessmentId: assessmentId, userId: userId});
  }
}
