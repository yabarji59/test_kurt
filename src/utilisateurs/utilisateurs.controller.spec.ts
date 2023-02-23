import { Test, TestingModule } from '@nestjs/testing';
import { UtilisateursController } from './utilisateurs.controller';
import { UtilisateursService } from './utilisateurs.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';

describe('UtilisateursController', () => {
  let controller: UtilisateursController;
  let service: UtilisateursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UtilisateursController],
      providers: [
        {
          provide: UtilisateursService,
          useValue: {
            createUtilisateur: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UtilisateursController>(UtilisateursController);
    service = module.get<UtilisateursService>(UtilisateursService);
  });

  describe('create', () => {
    const dto: CreateUtilisateurDto = {
      email: 'test@example.com',
      nom: 'Test',
      prenom: 'User',
      date_naissance: new Date('1990-01-01'),
      mot_de_passe: 'password',
      telephone: '1234567890',
      nationalite: 'France',
      adresse: '1 rue de la Test',
    };

    it('should return the created user', async () => {
      const createdUser = { id: 1, ...dto };
      (service.createUtilisateur as jest.Mock).mockResolvedValue(createdUser);

      expect(await controller.create(dto)).toEqual(createdUser);
      expect(service.createUtilisateur).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: 1, email: 'test1@example.com' },
        { id: 2, email: 'test2@example.com' },
      ];
      (service.findAll as jest.Mock).mockResolvedValue(users);

      expect(await controller.findAll()).toEqual(users);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user with the specified id', async () => {
      const user = { id: 1, email: 'test@example.com' };
      (service.findOne as jest.Mock).mockResolvedValue(user);

      expect(await controller.findOne('1')).toEqual(user);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    const dto: UpdateUtilisateurDto = {
      email: 'test@example.com',
      nom: 'Test',
      prenom: 'User',
      date_naissance: new Date('1990-01-01'),
      mot_de_passe: 'password',
      telephone: '1234567890',
      nationalite: 'France',
      adresse: '1 rue de la Test',
    };

    it('should return the updated user', async () => {
      const updatedUser = { id: 1, ...dto };
      (service.update as jest.Mock).mockResolvedValue(updatedUser);

      expect(await controller.update('1', dto)).toEqual(updatedUser);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });
  describe('remove', () => {
    const dto: CreateUtilisateurDto = {
      email: 'test@example.com',
      nom: 'Test',
      prenom: 'User',
      date_naissance: new Date('1990-01-01'),
      mot_de_passe: 'password',
      telephone: '1234567890',
      nationalite: 'France',
      adresse: '1 rue de la Test',
    };

    it('should delete the  user', async () => {
      const deletedUser = { id: 1, ...dto };
      (service.remove as jest.Mock).mockResolvedValue(deletedUser);
      expect(await controller.remove('1')).toEqual(deletedUser);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
