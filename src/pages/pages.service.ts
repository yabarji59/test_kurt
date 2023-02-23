import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, page } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) {}

  async createPage(data: Prisma.pageCreateInput): Promise<page> {
    return this.prisma.page.create({
      data,
    });
  }
  create(createPageDto: CreatePageDto) {
    return this.createPage(createPageDto);
  }
  async findAll(): Promise<page[]> {
    return this.prisma.page.findMany();
  }

  async findOne(id: number): Promise<page> {
    const page = await this.prisma.page.findUnique({
      where: { id },
    });
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    return page;
  }

  async update(id: number, updatePageDto: UpdatePageDto): Promise<page> {
    const page = await this.prisma.page.findUnique({
      where: { id },
    });
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    const updatePage = await this.prisma.page.update({
      where: { id },
      data: updatePageDto,
    });
    return updatePage;
  }

  async remove(id: number): Promise<page> {
    const page = await this.prisma.page.findUnique({
      where: { id },
    });
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    const deletedPage = await this.prisma.page.delete({ where: { id } });
    return deletedPage;
  }
}
