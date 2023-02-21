import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  titre: string;

  @IsNotEmpty()
  @IsDate()
  date_creation: Date;

  @IsNotEmpty()
  @IsDate()
  date_suppression: Date;

  @IsNotEmpty()
  @IsString()
  url_img: string;

  @IsNotEmpty()
  @IsString()
  img_description: string;

  @IsNotEmpty()
  @IsString()
  img_titre: string;

  @IsNotEmpty()
  @IsString()
  sous_titre: string;

  @IsNotEmpty()
  @IsString()
  contenu: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  meta_title: string;

  @IsNotEmpty()
  @IsString()
  categories: string;

  @IsNotEmpty()
  @IsString()
  url_video: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  tags: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
