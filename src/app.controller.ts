import { Get, Controller, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private _appService: AppService) {}
  @Get()
  root(@Res() res: Response) {
    return res.render(this._appService.getViewName(), {
      message: 'Hello world!',
    });
  }
}
