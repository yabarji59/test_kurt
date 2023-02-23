import { ApiProperty} from "@nestjs/swagger";


export class CreatePageDto {
    uuid: string;
    content: string;
    image: string;
    linkUrl: string;

}
