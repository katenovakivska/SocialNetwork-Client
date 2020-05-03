import { User } from './user';
import { Publication } from './publication';

export class Comment{
    commentId: number;
    commentText: string;
    commentDate: Date;
    commenter: User;
    publication: Publication;
}