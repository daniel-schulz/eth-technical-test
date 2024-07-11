import {Injectable} from '@nestjs/common';
import {ObjectId} from "mongodb";

import {DatabaseService} from "./database/database.service";

@Injectable()
export class GenericMetricService {
  private collection: any;

  constructor(private databaseService: DatabaseService) {
  }

  async onModuleInit() {
    this.collection = this.databaseService.getCollection('generic-metrics');
  }


  async create(id: string, metric: any) {
    if (await this.findOne(id)) {
      throw new Error(`Metric with id ${id} already exists`);
    }

    return this.collection.insertOne({
      identifier: id,
      ...metric,
    });
  }

  async findOne(id: string) {
    return this.collection.findOne({identifier: id});
  }
}
