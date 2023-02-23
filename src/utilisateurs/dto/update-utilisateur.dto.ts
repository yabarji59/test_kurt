import { PartialType } from '@nestjs/mapped-types';
import { CreateUtilisateurDto } from './create-utilisateur.dto';
import { RolesEnum } from '../../enum/roles.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUtilisateurDto extends PartialType(CreateUtilisateurDto) {
  @ApiProperty()
  nom: string;
  @ApiProperty()
  prenom: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  mot_de_passe: string;
  @ApiProperty()
  telephone: string;
  @ApiProperty()
  nationalite: string;
  @ApiProperty()
  adresse: string;
}
