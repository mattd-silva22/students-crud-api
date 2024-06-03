import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { EErrors } from "src/shared/errors/types/Errors.type";
import { StudentsService } from "./students.service";
import { cpfValidator } from "src/utils/cpfValidator.util";
import { Controller, Delete, Get, Post, Put, Req, Res } from "@nestjs/common";
import { emailValidator } from "src/utils/emailValidator.util";
import { uuidValidator } from "src/utils/uuidValidator.utils";
import {
  HttpResponseError,
  HttpResponseSuccess,
} from "src/shared/http/HttpResponse";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { TStudent } from "./types/student.type";
import { TQuery } from "./types/query";

@ApiTags("Students")
@Controller("/students")
export class StudentsController {
  constructor(private studentsService: StudentsService) {}
  @ApiResponse({
    status: 200,
    description: "Returns a student by ID",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
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
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(new HttpResponseError(EErrors.BAD_REQUEST, errors));
    }

    try {
      const data = await this.studentsService.findOne(id);

      if (Object.keys(data).length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({});
      }

      return res
        .status(StatusCodes.OK)
        .json(new HttpResponseSuccess("success", data));
    } catch (err) {
      return res
        .status(err.statusCode)
        .json(new HttpResponseError(err.name, [err.message]));
    }
  }

  @ApiResponse({
    status: 200,
    description: "Retuns all students",
  })
  @ApiResponse({
    status: 500,
    description: "Internal Server Error",
  })
  @Get("/")
  public async findMany(@Req() req: Request, @Res() res: Response) {
    const { name, cpf, email } = req.query;
    const validQueryParams = [];
    const errors = [];

    if (name) {
      validQueryParams.push("name");
    }

    if (cpf) {
      validQueryParams.push("cpf");
    }

    if (email) {
      validQueryParams.push("email");
    }

    validQueryParams.forEach((param, i) => {
      if (param.length > 50) {
        errors.push(`Param ${i}: too long`);
      }
    });

    if (errors.length) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(new HttpResponseError(EErrors.BAD_REQUEST, errors));
    }

    const query = {
      name: name ?? "",
      cpf: cpf ?? "",
      email: email ?? "",
    };

    this.studentsService
      .findMany(query as TQuery)
      .then((data) => {
        res
          .status(StatusCodes.OK)
          .json(new HttpResponseSuccess("success", data));
      })
      .catch((err) => {
        res
          .status(err.statusCode)
          .json(new HttpResponseError(err.name, [err.message]));
      });
  }

  @ApiResponse({
    status: 201,
    description: "Returns the ID of the created student",
  })
  @ApiResponse({
    status: 409,
    description: "A student with the same CPF exists",
  })
  @ApiResponse({
    status: 500,
    description: "Internal Server Error",
  })
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
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(new HttpResponseError(EErrors.BAD_REQUEST, errors));
    }
    try {
      const id = await this.studentsService.create(name, cpf, email);
      return res
        .status(StatusCodes.CREATED)
        .json(new HttpResponseSuccess("success", { id: id }));
    } catch (err) {
      return res
        .status(err.statusCode)
        .json(new HttpResponseError(err.name, [err.message]));
    }
  }

  @ApiResponse({
    status: 202,
    description: "Student updated successfully",
  })
  @ApiResponse({
    status: 409,
    description: "A student with the same CPF exists",
  })
  @ApiResponse({
    status: 500,
    description: "Internal Server Error",
  })
  @Put("/")
  public async update(@Req() req: Request, @Res() res: Response) {
    const { id, name, email } = req.body;
    const errors = [];

    if (!id) {
      errors.push("ID is required");
    }

    if (uuidValidator(id) === false) {
      errors.push("Invalid ID");
    }

    if (!name) {
      errors.push("Name is required");
    }

    if (!email) {
      errors.push("Email is required");
    }

    if (emailValidator(email) === false) {
      errors.push("Invalid email");
    }

    if (errors.length) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(new HttpResponseError(EErrors.BAD_REQUEST, errors));
    }

    const data = {
      name: name,
      email: email,
    };

    try {
      await this.studentsService.update(id, data);
      return res.status(StatusCodes.ACCEPTED).json({});
    } catch (err) {
      return res
        .status(err.statusCode)
        .json(new HttpResponseError(err.name, [err.message]));
    }
  }
  @ApiResponse({
    status: 202,
    description: "Student deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Bad Request or Student not found",
  })
  @ApiResponse({
    status: 500,
    description: "Internal Server Error",
  })
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
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(new HttpResponseError(EErrors.BAD_REQUEST, errors));
    }

    try {
      const data = await this.studentsService.delete(id);

      if (Object.keys(data).length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({});
      }

      return res.status(StatusCodes.ACCEPTED).json({});
    } catch (err) {
      return res
        .status(err.statusCode)
        .json(new HttpResponseError(err.name, [err.message]));
    }
  }
}
