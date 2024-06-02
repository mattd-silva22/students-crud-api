import { Injectable } from "@nestjs/common";
import { StudentsRepository } from "./students.repository";
import { FailToCreateError } from "./errors/FailToCreate.error";
import { EStudentsErrors } from "./errors/types/studentsErrors";
import { NotFoundError } from "./errors/NotFound.error";

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

  public async create(
    name: string,
    cpf: string,
    email: string,
  ): Promise<string> {
    const student = await this.studentsRepository.findOneByCPF(cpf);

    if (Object.keys(student).length < 0) {
      throw new FailToCreateError(EStudentsErrors.STUDENT_EXISTS);
    }

    const data = {
      name: name,
      cpf: cpf,
      email: email,
    };
    const id = await this.studentsRepository.create(data);
    return id;
  }

  public async findOne(id: string) {
    const data = await this.studentsRepository.findOne(id);

    return data;
  }

  public async delete(id: string) {
    const student = await this.studentsRepository.findOne(id);

    if (Object.keys(student).length === 0) {
      return {};
    }

    await this.studentsRepository.delete(id);

    return student.id;
  }
}
