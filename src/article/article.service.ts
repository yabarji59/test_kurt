import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    return await this.prisma.post.create({
      data: {
        ...createArticleDto,
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id: id },
    });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.post.update({
      where: { id: id },
      data: {
        ...updateArticleDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({
      where: { id: id },
    });
  }
}
