import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  create(createPageDto: CreatePageDto) {
    return 'This action adds a new page';
  }

  findAll() {
    return `This action returns all pages`;
  }

<<<<<<< HEAD
  findOne(id: number) {
    return `This action returns a #${id} page`;
  }

  update(id: number, updatePageDto: UpdatePageDto) {
    return `This action updates a #${id} page`;
=======
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
>>>>>>> c3e9ee3 (feat: add update and remove method in pages.service)
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
