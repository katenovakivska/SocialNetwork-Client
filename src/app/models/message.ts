import { User } from './user';
export class Message {
    messageId: number;
    receiverId: number;
    messageText: string;
    messageDate: Date;
    sender: User;
}