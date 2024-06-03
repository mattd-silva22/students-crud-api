import { Controller, Get, Req, Res } from "@nestjs/common";
import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  HttpResponseError,
  HttpResponseSuccess,
} from "src/shared/http/HttpResponse";

@Controller()
@ApiTags("health")
export class AppController {
  constructor() {}

  @ApiResponse({
    status: 200,
    description: "Successful response",
    type: HttpResponseSuccess,
  })
  @ApiResponse({
    status: 500,
    description: "Something went wrong",
    type: HttpResponseError,
  })
  @Get("/")
  health(@Req() req: Request, @Res() res: Response): any {
    return res
      .status(StatusCodes.OK)
      .json(new HttpResponseSuccess("API is up"));
  }
}
