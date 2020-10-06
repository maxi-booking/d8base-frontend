import {Expose} from 'class-transformer';

// tslint:disable:variable-name
export class Message {
    @Expose() public id: number;
    @Expose() public sender: number;
    @Expose() public recipient: number;
    @Expose() public parent: number;
    @Expose() public subject: string;
    @Expose() public body: string;
    @Expose() public is_read: boolean;
    @Expose() public read_datetime: string;
    @Expose() public created: string;
    @Expose() public test_string: string;
}
