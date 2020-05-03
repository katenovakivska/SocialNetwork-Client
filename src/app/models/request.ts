import { User } from './user';

export class Request{
   requestId: number;
   receiverId: number;
   status: string;
   sender: User;
}