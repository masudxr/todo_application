import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Get,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly _todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const todo = await this._todoService.create(createTodoDto);
    return todo;
  }
  @Get()
  async findAll() {
    const todo = await this._todoService.findAll();
    return todo;
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const todo = await this._todoService.findOne({
      where: {
        id: id,
      },
    });
    return todo;
  }
  @Get('done')
  async complete() {
    const todo = await this._todoService.findDoneList();
    return todo;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return await this._todoService.update(+id, updateTodoDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this._todoService.remove(+id);
  }
}
