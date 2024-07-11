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
          throw error; // Rethrow to stop application startup if connection fails
        });
      this.db = this.client.db();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      throw error; // Rethrow to stop application startup if connection fails
    }
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  getCollection(collectionName: string) {
    if (!this.db) {
      const uri = this.configService.get<string>('MONGO_URL') || '';
      throw new Error(`Database connection is not established to: ${uri}`);
    }
    return this.db.collection(collectionName);
  }
}
