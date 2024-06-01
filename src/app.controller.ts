import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpResponse } from './shared/http/HttpResponse';

@Controller()
export class AppController {
  constructor() {}

  @Get('/')
  health(@Req() req: Request, @Res() res: Response): any {
    const response = new HttpResponse('Service is Up and Running!');
    return res.status(StatusCodes.OK).json(response);
  }
}
