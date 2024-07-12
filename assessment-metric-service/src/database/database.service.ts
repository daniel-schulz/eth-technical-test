import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient;
  private db: Db;

  constructor(private configService: ConfigService) {}

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

  getCollection(collectionName: string) {
    if (!this.db) {
      throw new Error(`Database connection is not established`);
    }
    return this.db.collection(collectionName);
  }
}
