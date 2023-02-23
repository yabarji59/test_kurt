import { Column, PrimaryGeneratedColumn } from 'prisma';
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prenom: string;

  @Column()
  nom: string;

  @Column()
  email: string;

  @Column()
  mot_de_passe: string;

  @Column()
  uuid: string;

  @Column()
  role: string;
}
