import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, utilisateur } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { v4 as uuidv4 } from 'uuid';
import { pick } from 'lodash';
@Injectable()
export class UtilisateursService {
  constructor(private prisma: PrismaService) {}

  async createUtilisateur(createUtilisateurDto: CreateUtilisateurDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(
      createUtilisateurDto.mot_de_passe,
      salt,
    );
    return this.prisma.utilisateur.create({
      data: {
        ...createUtilisateurDto,
        mot_de_passe: hashedPassword,
        uuid: uuidv4(),
      },
    });
  }
  async findOne(id: number): Promise<utilisateur> {
    const user = await this.prisma.utilisateur.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  findAll() {
    return this.prisma.utilisateur.findMany();
  }

  async update(
    id: number,
    updateUtilisateurDto: UpdateUtilisateurDto,
  ): Promise<utilisateur> {
    const user = await this.prisma.utilisateur.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const allowedFields = [
      'nom',
      'prenom',
      'email',
      'telephone',
      'adresse',
      'nationalite',
    ];
    const userData = pick(updateUtilisateurDto, allowedFields);

    return this.prisma.utilisateur.update({
      where: {
        id,
      },
      data: {
        ...userData,
      },
    });
  }

  async remove(id: number) {
    const user = await this.prisma.utilisateur.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.prisma.utilisateur.delete({ where: { id } });
  }
}
