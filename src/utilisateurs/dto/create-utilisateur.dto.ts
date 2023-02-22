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
  @ApiProperty({
    description: 'Adresse postale',
  })
  adresse: string;
  @ApiProperty({
    enum: RolesEnum,
    enumName: 'RolesEnum',
  })
  role: RolesEnum.jeune;
}
