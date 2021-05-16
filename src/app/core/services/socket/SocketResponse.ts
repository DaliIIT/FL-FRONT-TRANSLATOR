export class SocketResponse {
    type: string;
    message: {
        event: string;
        value: any;
    };
}
