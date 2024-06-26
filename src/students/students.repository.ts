import { Injectable } from "@nestjs/common";
import { PostgresConnector } from "src/shared/database/postgres/postgressConnector.db";
import { TStudent } from "./types/student.type";
import { DatabaseFail } from "src/shared/database/DatabaseFail.error";

@Injectable()
export class StudentsRepository {
  public students: any[];
  constructor(private db: PostgresConnector) {}

  public async findMany(params: {
    name: string;
    cpf: string;
    email: string;
  }): Promise<any[]> {
    try {
      const { cpf, email, name } = params;
      let query = "SELECT * FROM students WHERE true";

      const values = [];

      if (name) {
        query += " AND UPPER(name) LIKE UPPER($1)";
        values.push(`%${name}%`);
      }

      if (cpf) {
        query += " AND cpf LIKE $2";
        values.push(`${cpf}`);
      }

      if (email) {
        query += " AND UPPER(email) LIKE UPPER($3)";
        values.push(`%${email}%`);
      }
      return await this.db.query(query, values);
    } catch (error) {
      throw new DatabaseFail(error.name, error.message, error.details);
    }
  }

  public async findOne(id: string) {
    try {
      const query = "SELECT * FROM students WHERE id = $1";
      const result = await this.db.query(query, [id]);
      if (result.length === 0) {
        return {};
      }
      return result[0];
    } catch (error) {
      throw new DatabaseFail(error.name, error.message, error.details);
    }
  }

  public async findOneByCPF(cpf: string) {
    try {
      const query = "SELECT * FROM students WHERE cpf = $1";
      const result = await this.db.query(query, [cpf]);
      if (result.length === 0) {
        return {};
      }
      return result[0];
    } catch (error) {
      throw new DatabaseFail(error.name, error.message, error.details);
    }
  }

  public async create(data: TStudent): Promise<string> {
    try {
      const { name, cpf, email } = data;
      const query =
        "INSERT INTO students (name, cpf, email) VALUES ($1, $2, $3) RETURNING id;";
      const result = await this.db.query(query, [name, cpf, email]);
      console.log(result);
      return result[0].id;
    } catch (err) {
      throw new DatabaseFail(err.message, err.details, err.name);
    }
  }

  public async delete(id: string) {
    try {
      return await this.db.query("DELETE FROM students WHERE id = $1", [id]);
    } catch (error) {
      throw new DatabaseFail(error.name, error.message, error.details);
    }
  }

  public async update(id: string, data: any) {
    try {
      const query = "UPDATE students SET name = $1, email = $2 WHERE id = $3";
      return await this.db.query(query, [data.name, data.email, id]);
    } catch (error) {
      console.log(error);
      throw new DatabaseFail(error.name, error.message, error.details);
    }
  }
}
