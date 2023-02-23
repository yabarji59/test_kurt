import { ApiProperty } from '@nestjs/swagger';

export class CreatePageDto {
  @ApiProperty()
  contenu: string;

  @ApiProperty()
  url_img: string;

  @ApiProperty()
  url_video: string;

  @ApiProperty()
  meta_title: string;

  @ApiProperty()
  tags: string;
import { ApiProperty} from "@nestjs/swagger";


export class CreatePageDto {
    @ApiProperty()
    contenu: string;
    image: string;
    linkUrl: string;
}
