import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
	create(createTaskDto: CreateTaskDto) {
		return createTaskDto.value
	}

	findOne(id: string | number) {
		return {
			id, value: 1
		}
	}

	findAll() {
		return [1, 2, 3, 4, 5]
	}
}
