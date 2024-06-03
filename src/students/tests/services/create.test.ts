import { it, describe, expect, jest } from "@jest/globals";
import { find } from "rxjs";
import { FailToCreateError } from "src/students/errors/FailToCreate.error";
import { StudentsRepository } from "src/students/students.repository";
import { StudentsService } from "src/students/students.service";
import { TStudent } from "src/students/types/student.type";

const mockRepository = {
  create: jest.fn(),
  findOneByCPF: jest.fn(),
};

const mockDbStudent = {
  id: "14831b42-2225-46ca-bd42-b36dbe3934d0",
  name: "Beatriz Sara Isabel Martins",
  cpf: "48263924944",
  email: "beatriz.sara.martins@deskprint.com.br",
  created_at: "2024-06-03T16:03:53.014Z",
  updated_at: "2024-06-03T16:03:53.014Z",
};

const mockValidRequest = {
  name: "Beatriz Sara Isabel Martins",
  cpf: "48263924944",
  email: "bia.sara@email.com",
};

describe("#Create Student Service Suite", () => {
  let service: StudentsService;
  beforeEach(() => {
    service = new StudentsService(
      mockRepository as unknown as StudentsRepository,
    );
  });

  it("Should be able to create a student", async () => {
    jest
      .spyOn(mockRepository as any, "findOneByCPF")
      .mockResolvedValueOnce({} as unknown as Promise<TStudent>);

    const { name, email, cpf } = mockValidRequest;

    await expect(service.create(name, cpf, email));

    expect(mockRepository.create).toHaveBeenCalledWith({
      name,
      email,
      cpf,
    });
  });

  it("Should not create a student duplicated CPF", async () => {
    jest
      .spyOn(mockRepository as any, "findOneByCPF")
      .mockResolvedValueOnce(mockDbStudent as unknown as Promise<TStudent>);

    const { name, email, cpf } = mockValidRequest;

    await expect(service.create(name, cpf, email)).rejects.toThrowError(
      FailToCreateError,
    );

    expect(mockRepository.create).not.toHaveBeenCalled();
  });

  it("Should return the created student ID", async () => {
    jest
      .spyOn(mockRepository as any, "findOneByCPF")
      .mockResolvedValueOnce({} as unknown as Promise<TStudent>);
    jest
      .spyOn(mockRepository as any, "create")
      .mockResolvedValueOnce("14831b42-2225-46ca-bd42-b36dbe3934d0");

    const { name, email, cpf } = mockValidRequest;

    await expect(service.create(name, cpf, email)).resolves.toBe(
      "14831b42-2225-46ca-bd42-b36dbe3934d0",
    );
  });
});
