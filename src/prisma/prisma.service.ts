// src/prisma/prisma.service.ts

import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  // connexion à la db ou db_test en fonction de l'environnement
  constructor() {
    super({
      // Utiliser la configuration de la base de données de test si NODE_ENV=test
      datasources: {
        db: {
          url:
            process.env.NODE_ENV === 'test'
              ? process.env.DATABASE_TEST_URL
              : process.env.DATABASE_URL,
        },
      },
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
