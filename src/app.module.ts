import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';
import { PrismaService } from './prisma/prisma.service';
import { PagesModule } from './pages/pages.module';

@Module({
  imports: [UtilisateursModule, PagesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
