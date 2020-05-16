import { User } from './user';
import { Publication } from './publication';
export class Like{
    likeId:number;
    likeDate: Date;
    userName: string;
    publicationId: number;
    publication: Publication;
}