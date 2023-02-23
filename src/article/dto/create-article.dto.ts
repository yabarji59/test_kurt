import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsNumber()
  // id: number;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  titre: string;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsDate()
  date_creation: Date;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsDate()
  date_suppression: Date;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  url_img: string;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  img_description: string;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  img_titre: string;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  sous_titre: string;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  contenu: string;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  description: string;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  meta_title: string;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  categories: string;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  url_video: string;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  slug: string;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  tags: string;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  status: string;
}
