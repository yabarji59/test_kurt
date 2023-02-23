import { ApiProperty} from "@nestjs/swagger";


export class CreatePageDto {
    @ApiProperty()
    contenu: string;
    image: string;
    linkUrl: string;
}
