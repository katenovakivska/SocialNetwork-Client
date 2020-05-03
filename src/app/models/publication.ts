import { User } from './user';
import { Comment } from './comment';
import { Like } from './like';

export class Publication{
    publicationId: number;
    publicationText: string;
    photo: string;
    publicationDate: Date;
    userName: string;
    comments: Array<Comment>;
    likes: Array<Like>;
}