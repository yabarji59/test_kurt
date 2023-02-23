import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { PrismaService } from '../prisma/prisma.service';
import { utilisateur } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { v4 as uuidv4 } from 'uuid';
import { pick } from 'lodash';
import { UpdatePasswordUtilisateurDto } from './dto/update-password-utilisateur.dto';

// Constantes
const allowedFields = [
  'nom',
  'prenom',
  'email',
  'telephone',
  'adresse',
  'nationalite',
];
const USER_NOT_FOUND_ERROR = (id: number) => `User with ID ${id} not found`;

// Interfaces
type Utilisateur = utilisateur;

// Enums
enum SaltLength {
  Default = 10,
}

@Injectable()
export class UtilisateursService {
  constructor(private readonly prisma: PrismaService) {}

  // Créer un utilisateur
  async createUtilisateur(
    createUtilisateurDto: CreateUtilisateurDto,
  ): Promise<Utilisateur> {
    const salt = await bcrypt.genSalt(SaltLength.Default);
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

  // Trouver un utilisateur par ID
  async findOne(id: number): Promise<Utilisateur> {
    const user = await this.prisma.utilisateur.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR(id));
    }
    return user;
  }

  // Trouver tous les utilisateurs
  async findAll(): Promise<Utilisateur[]> {
    return this.prisma.utilisateur.findMany();
  }

  // Mettre à jour un utilisateur
  async update(
    id: number,
    updateUtilisateurDto: UpdateUtilisateurDto,
  ): Promise<Utilisateur> {
    const user = await this.prisma.utilisateur.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR(id));
    }

    const userData = pick(updateUtilisateurDto, allowedFields);

    return this.prisma.utilisateur.update({
      where: { id },
      data: { ...userData },
    });
  }

  // Supprimer un utilisateur
  async remove(id: number): Promise<void> {
    const user = await this.prisma.utilisateur.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.prisma.utilisateur.delete({ where: { id } });
  }

  //changer le mot de passe d'un utilisateur et verifier que l'ancien mot de passe est correct
  async updatePassword(
    id: number,
    updatePasswordUtilisateurDto: UpdatePasswordUtilisateurDto,
  ): Promise<Utilisateur> {
    const user = await this.prisma.utilisateur.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR(id));
    }
    const isPasswordMatch = await bcrypt.compare(
      updatePasswordUtilisateurDto.ancien_mot_de_passe,
      user.mot_de_passe,
    );
    if (!isPasswordMatch) {
      throw new NotFoundException('Old password is incorrect');
    }
    const salt = await bcrypt.genSalt(SaltLength.Default);
    const hashedPassword = await bcrypt.hash(
      updatePasswordUtilisateurDto.nouveau_mot_de_passe,
      salt,
    );
    return this.prisma.utilisateur.update({
      where: { id },
      data: { mot_de_passe: hashedPassword },
    });
  }
}
