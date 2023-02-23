import { PartialType } from '@nestjs/mapped-types';
import { CreateUtilisateurDto } from './create-utilisateur.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordUtilisateurDto extends PartialType(
  CreateUtilisateurDto,
) {
  @ApiProperty()
  ancien_mot_de_passe: string;
  @ApiProperty()
  nouveau_mot_de_passe: string;
}
