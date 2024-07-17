import {Injectable, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {IGenericMetricRepository} from "./generic-metric-repository.interface";
import {Db, MongoClient} from "mongodb";
import {ConfigService} from "@nestjs/config";
import {GenericMetricDoc} from "../generic-metric/generic-metric-doc";

@Injectable()
export class GenericMetricRepositoryMongodbAdapter implements IGenericMetricRepository<any>, OnModuleInit, OnModuleDestroy {
  private client: MongoClient;
  private db: Db;

  constructor(private configService: ConfigService) {
  }

  async onModuleInit() {
    const uri = this.configService.get<string>('MONGO_URL') || '';
    this.client = new MongoClient(uri);

    try {
      await this.client.connect()
        .then(() => {
          this.db = this.client.db();
          console.log('Connected to MongoDB');
        })
        .catch((error) => {
          console.error('Failed to connect to MongoDB', error);
          throw error;
        });
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async create(assessmentId: string, userId: string, metric: any): Promise<any> {
    if (await this.find(assessmentId, userId)) {
      throw new Error(`Metric with assessmentId ${assessmentId} and userId ${userId} already exists`);
    }

    return this.collection.insertOne({
      assessmentId,
      userId,
      metric,
    } as GenericMetricDoc);
  }

  async find(assessmentId: string, userId: string): Promise<any> {
    return this.collection.findOne({assessmentId: assessmentId, userId: userId});
  }

  private get collection() {
    if (!this.db) {
      throw new Error(`Database connection is not established`);
    }
    return this.db.collection('generic-metrics');
  }
}
