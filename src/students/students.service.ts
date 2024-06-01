import { Injectable } from "@nestjs/common";
import { StudentsRepository } from "./students.repository";
import { v4 as uuidv4 } from "uuid";
import { TStudent } from "./types/student.type";

@Injectable()
export class StudentsService {
  constructor(private studentsRepository: StudentsRepository) {}
  public hello(): string {
    return "Hello, World!";
  }

  public async findMany() {
    const data = await this.studentsRepository.findMany();

    return {
      length: data.length,
      students: data,
    };
  }

  public create(name: string, cpf: string, email: string): string {
    const student = {
      id: uuidv4(),
      name,
      cpf,
      email,
    } as TStudent;
    this.studentsRepository.create(student);
    return student.id;
  }

  public findOne(id: string) {
    console.log("aqui");
    return this.studentsRepository.findOne(id);
  }

  public delete(id: string) {
    return this.studentsRepository.delete(id);
  }
}
