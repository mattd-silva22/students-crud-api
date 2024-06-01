import { Injectable } from "@nestjs/common";
import { PostgresConnector } from "src/shared/database/postgres/postgressConnector.db";

@Injectable()
export class StudentsRepository {
  private students: any[];
  constructor(private db: PostgresConnector) {
    const students = [];
  }

  async findMany(): Promise<any[]> {
    return await this.db.query("SELECT * FROM students");
  }

  findOne(id: string) {
    console.log("aqui 22");
    const result = this.students.find((student) => student.id === id);
    console.log(result);
    return result;
  }

  create(student: any) {
    this.students.push(student);
  }

  delete(id: string) {
    const index = this.students.findIndex((student) => student.id === id);
    this.students.splice(index, 1);
    return true;
  }
}
