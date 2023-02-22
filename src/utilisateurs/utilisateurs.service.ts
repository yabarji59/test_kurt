import { Injectable } from '@nestjs/common';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, utilisateur } from '@prisma/client';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';

@Injectable()
export class UtilisateursService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.utilisateurCreateInput): Promise<utilisateur> {
    return this.prisma.utilisateur.create({
      data,
    });
  }
  create(createUtilisateurDto: CreateUtilisateurDto) {
    return this.createUser(createUtilisateurDto);
  }

  findAll() {
    return `This action returns all utilisateurs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} utilisateur`;
  }

  update(id: number, updateUtilisateurDto: UpdateUtilisateurDto) {
    return `This action updates a #${id} utilisateur`;
  }

  remove(id: number) {
    return `This action removes a #${id} utilisateur`;
  }
}
