import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from '../../enum/roles.enum';

export class CreateUtilisateurDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  nom: string;
  @ApiProperty()
  prenom: string;
  @ApiProperty()
  date_naissance: Date;
  @ApiProperty()
  mot_de_passe: string;
  @ApiProperty()
  telephone: string;
  @ApiProperty()
  nationalite: string;
  @ApiProperty()
  adresse: string;
  @ApiProperty()
  role: RolesEnum;
}
