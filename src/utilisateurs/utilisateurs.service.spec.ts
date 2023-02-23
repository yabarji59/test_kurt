import { Test, TestingModule } from '@nestjs/testing';
import { UtilisateursService } from './utilisateurs.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient, utilisateur } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '@nestjs/common';

describe('UtilisateursService', () => {
  let service: UtilisateursService;
  let prisma: PrismaClient;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilisateursService, PrismaService],
    }).compile();

    service = module.get<UtilisateursService>(UtilisateursService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
  afterEach(async () => {
    await prisma.utilisateur.deleteMany();
  });

  describe('createUtilisateur', () => {
    it('should create a new user with hashed password', async () => {
      const createUtilisateurDto: CreateUtilisateurDto = {
        email: 'test@example.com',
        nom: 'John',
        prenom: 'Doe',
        date_naissance: new Date('1990-01-01'),
        mot_de_passe: 'password',
        telephone: '1234567890',
        nationalite: 'France',
        adresse: '123 Main St',
      };

      const createdUser: utilisateur = await service.createUtilisateur(
        createUtilisateurDto,
      );

      expect(createdUser).toHaveProperty('id');
      expect(createdUser.email).toEqual(createUtilisateurDto.email);
      expect(createdUser.nom).toEqual(createUtilisateurDto.nom);
      expect(createdUser.prenom).toEqual(createUtilisateurDto.prenom);
      expect(createdUser.date_naissance).toEqual(
        createUtilisateurDto.date_naissance,
      );
      expect(createdUser.telephone).toEqual(createUtilisateurDto.telephone);
      expect(createdUser.nationalite).toEqual(createUtilisateurDto.nationalite);
      expect(createdUser.adresse).toEqual(createUtilisateurDto.adresse);

      // vérifier que le mot de passe est bien hashé
      const isPasswordMatch = await bcrypt.compare(
        createUtilisateurDto.mot_de_passe,
        createdUser.mot_de_passe,
      );
      expect(isPasswordMatch).toBeTruthy();

      // vérifier que l'UUID est bien généré
      expect(createdUser.uuid).toBeDefined();
      expect(createdUser.uuid).toHaveLength(uuidv4().length);
    });
  });
  describe('findMany', () => {
    it('should return an array of users', async () => {
      // create a new user
      const createUserDto: CreateUtilisateurDto = {
        email: 'test@example.com',
        nom: 'John',
        prenom: 'Doe',
        date_naissance: new Date('1990-01-01'),
        mot_de_passe: 'password',
        telephone: '1234567890',
        nationalite: 'France',
        adresse: '123 Main St',
      };
      const createUserDto2: CreateUtilisateurDto = {
        email: 'test2@example.com',
        nom: 'John',
        prenom: 'Doe',
        date_naissance: new Date('1990-01-01'),
        mot_de_passe: 'password',
        telephone: '1234567890',
        nationalite: 'France',
        adresse: '123 Main St',
      };
      await service.createUtilisateur(createUserDto);
      await service.createUtilisateur(createUserDto2);
    });

    describe('findOne', () => {
      it('should return the user with the specified id', async () => {
        // create a new user
        const createUserDto: CreateUtilisateurDto = {
          email: 'test@example.com',
          nom: 'John',
          prenom: 'Doe',
          date_naissance: new Date('1990-01-01'),
          mot_de_passe: 'password',
          telephone: '1234567890',
          nationalite: 'France',
          adresse: '123 Main St',
        };
        const createdUser = await service.createUtilisateur(createUserDto);

        // call findOne method to get the user
        const foundUser = await service.findOne(+createdUser.id);

        expect(foundUser).toEqual(createdUser);
      });
    });
    describe('deleteUtilisateur', () => {
      it('should delete the user with the specified id', async () => {
        // create a new user
        const createUserDto: CreateUtilisateurDto = {
          email: 'test@example.com',
          nom: 'John',
          prenom: 'Doe',
          date_naissance: new Date('1990-01-01'),
          mot_de_passe: 'password',
          telephone: '1234567890',
          nationalite: 'France',
          adresse: '123 Main St',
        };
        const createdUser = await service.createUtilisateur(createUserDto);

        // delete the user
        const deletedUser = await service.remove(+createdUser.id);

        // check that the deleted user  is undefined
        expect(deletedUser).toBeUndefined();

        // check that the user is no longer in the database
        let foundUser;
        try {
          foundUser = await service.findOne(+createdUser.id + 1);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
        expect(foundUser).toBeUndefined();
      });
    });
  });
});
