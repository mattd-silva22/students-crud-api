import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { EErrors } from "src/shared/errors/types/Errors.type";
import { HttpResponse } from "src/shared/http/HttpResponse";
import { StudentsService } from "./students.service";
import { cpfValidator } from "src/utils/cpfValidator.util";
import { Controller, Delete, Get, Patch, Post, Req, Res } from "@nestjs/common";
import { EStudentsErrors } from "./errors/studentsErrors";

@Controller("/students")
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get("/:id")
  public findOne(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;
    console.log(id);

    if (!id) {
      const response = new HttpResponse(EErrors.BAD_REQUEST, null, [
        "ID is required",
      ]);
      return res.status(StatusCodes.BAD_REQUEST).json(response.error());
    }

    const data = this.studentsService.findOne(id);

    if (!data) {
      const response = new HttpResponse(EStudentsErrors.NOT_FOUND, null);
      return res.status(StatusCodes.NOT_FOUND).json(response.error());
    }

    const response = new HttpResponse(null, data);
    return res.status(StatusCodes.OK).json(response.success());
  }

  @Get("/")
  public async findMany(@Req() req: Request, @Res() res: Response) {
    const { name, cpf, email, id } = req.query;
    this.studentsService.findMany().then((data) => {
      const response = new HttpResponse(null, data);
      res.status(StatusCodes.OK).json(response.success());
    });
  }

  @Post("/")
  public create(@Req() req: Request, @Res() res: Response) {
    const { name, cpf, email } = req.body;
    const errors = [];
    console.log(req.body);
    if (!name) {
      errors.push("Name is required");
    }

    if (!cpf) {
      errors.push("CPF is required");
    }

    if (!email) {
      errors.push("Email is required");
    }

    if (cpfValidator(cpf) === false) {
      errors.push("Invalid CPF");
    }

    if (email && !email.includes("@")) {
      errors.push("Invalid email");
    }

    if (errors.length) {
      const response = new HttpResponse(EErrors.BAD_REQUEST, null, errors);
      return res.status(StatusCodes.BAD_REQUEST).json(response.error());
    }

    const userId = this.studentsService.create(name, cpf, email);
    const response = new HttpResponse(null, [
      {
        id: userId,
      },
    ]);
    return res.status(StatusCodes.CREATED).json(response.success());
  }

  @Patch("/:id")
  public update(@Req() req: Request, @Res() res: Response) {}

  @Delete("/:id")
  public delete(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;
    if (!id) {
      const response = new HttpResponse(EErrors.BAD_REQUEST, null, [
        "ID is required",
      ]);
      return res.status(StatusCodes.BAD_REQUEST).json(response.error());
    }

    const data = this.studentsService.delete(id);

    if (!data) {
      const response = new HttpResponse(EStudentsErrors.NOT_FOUND, null);
      return res.status(StatusCodes.NOT_FOUND).json(response.error());
    }

    const response = new HttpResponse(null, id);
    return res.status(StatusCodes.OK).json(response.success());
  }
}
