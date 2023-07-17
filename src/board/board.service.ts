import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { NotFoundException } from 'src/app.exception';

@Injectable()
export class BoardService {
  private board: Array<Board> = [];
  private id = 0;

  create(createBoardDto: CreateBoardDto) {
    this.board.push({
      id: ++this.id,
      ...createBoardDto,
      createdAt: new Date(),
    });
  }

  findAll() {
    return this.board;
  }

  findOne(id: number) {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i].id === id) {
        return this.board[i];
      }
    }
    throw new NotFoundException(`Board not found with ID:${id}`);
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i].id === id) {
        this.board[i][Object.keys(updateBoardDto)[0]] =
          Object.values(updateBoardDto)[0];
      }
    }
    return this.board[id - 1].title;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
