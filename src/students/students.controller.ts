import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { EErrors } from "src/shared/errors/types/Errors.type";
import { HttpResponse } from "src/shared/http/HttpResponse";
import { StudentsService } from "./students.service";
import { cpfValidator } from "src/utils/cpfValidator.util";
import { Controller, Delete, Get, Patch, Post, Req, Res } from "@nestjs/common";
import { EStudentsErrors } from "./errors/types/studentsErrors";
import { emailValidator } from "src/utils/emailValidator.util";
import { uuidValidator } from "src/utils/uuidValidator.utils";

@Controller("/students")
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get("/:id")
  public async findOne(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;
    const errors = [];
    if (!id) {
      errors.push("ID is required");
    }

    if (uuidValidator(id) === false) {
      errors.push("Invalid ID");
    }

    if (errors.length) {
      const response = new HttpResponse(EErrors.BAD_REQUEST, null, errors);
      return res.status(StatusCodes.BAD_REQUEST).json(response.error());
    }

    try {
      const data = await this.studentsService.findOne(id);

      if (Object.keys(data).length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({});
      }

      const response = new HttpResponse(null, data);
      return res.status(StatusCodes.OK).json(response.success());
    } catch (err) {
      const response = new HttpResponse(err.name, null, err.message);
      return res.status(err.statusCode).json(response.error());
    }
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
  public async create(@Req() req: Request, @Res() res: Response) {
    const { name, cpf, email } = req.body;
    const errors = [];
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

    if (emailValidator(email) === false) {
      errors.push("Invalid email");
    }

    if (errors.length) {
      const response = new HttpResponse(EErrors.BAD_REQUEST, null, errors);
      return res.status(StatusCodes.BAD_REQUEST).json(response.error());
    }
    try {
      const id = await this.studentsService.create(name, cpf, email);
      const response = new HttpResponse(null, [
        {
          id: id,
        },
      ]);
      return res.status(StatusCodes.CREATED).json(response.success());
    } catch (err) {
      const response = new HttpResponse(EErrors.BAD_REQUEST, null, err.message);
      return res.status(err.statusCode).json(response.error());
    }
  }

  @Patch("/:id")
  public update(@Req() req: Request, @Res() res: Response) {}

  @Delete("/:id")
  public async delete(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;
    const errors = [];
    if (!id) {
      errors.push("ID is required");
    }

    if (uuidValidator(id) === false) {
      errors.push("Invalid ID");
    }

    if (errors.length) {
      const response = new HttpResponse(EErrors.BAD_REQUEST, null, errors);
      return res.status(StatusCodes.BAD_REQUEST).json(response.error());
    }

    try {
      const data = await this.studentsService.delete(id);

      if (Object.keys(data).length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({});
      }

      return res.status(StatusCodes.ACCEPTED).json({});
    } catch (err) {
      const response = new HttpResponse(err.name, null, err.message);
      return res.status(err.statusCode).json(response.error());
    }
  }
}
