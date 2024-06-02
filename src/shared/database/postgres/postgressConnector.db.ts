import { Injectable } from "@nestjs/common";
import { DatabaseError, Pool } from "pg";

@Injectable()
export class PostgresConnector {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.POSTGRESS_USER,
      host: process.env.POSTGRESS_HOST,
      database: process.env.POSTGRESS_DB,
      password: process.env.POSTGRESS_PASSWORD,
      port: parseInt(process.env.POSTGRESS_PORT) ?? 5432,
    });
  }

  public async query(text: string, params?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
      const res = await client.query(text, params);
      return res.rows;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      client.release();
    }
  }

  public async getClient() {
    return await this.pool.connect();
  }
}
