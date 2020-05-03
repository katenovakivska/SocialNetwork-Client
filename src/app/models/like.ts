import { User } from './user';
import { Publication } from './publication';
export class Like{
    likeId:number;
    likeDate: Date;
    liker: User;
    publication: Publication;
}