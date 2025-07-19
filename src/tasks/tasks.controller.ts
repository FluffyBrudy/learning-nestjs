import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
	constructor(private readonly taskService: TasksService){}

	@Get()
	findAll() {
		return  {
			data: this.taskService.findAll()
		}
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return {
			data: this.taskService.findOne(id)
		}
	}

	@Post()
	create(@Body() createTaskDto: CreateTaskDto) {
		return {
			data: {
				value: this.taskService.create(createTaskDto)
			}
		}
	}
}
