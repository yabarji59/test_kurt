import { Test, TestingModule } from '@nestjs/testing';
import { UtilisateursService } from './utilisateurs.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UtilisateursService', () => {
  let service: UtilisateursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilisateursService, PrismaService],
    }).compile();

    service = module.get<UtilisateursService>(UtilisateursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
