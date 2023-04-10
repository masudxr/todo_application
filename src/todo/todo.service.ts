import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private _todoRepository: Repository<Todo>,
  ) {}
  async create(createTodoDto: CreateTodoDto) {
    const todo = this._todoRepository.create({
      ...createTodoDto,
    });
    return await this._todoRepository.save(todo);
  }

  async findAll() {
    return await this._todoRepository.find();
  }
  async findOne(id) {
    return await this._todoRepository.findOne(id);
  }
  async findDoneList() {
    const todo = await this._todoRepository.find({
      where: {
        completed: true,
      },
    });
    return todo;
  }
  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this._todoRepository.update(
      { id },
      { ...updateTodoDto },
    );
    return todo;
  }

  async remove(id: number) {
    return await this._todoRepository.delete({ id });
  }
}
