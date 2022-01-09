import { unique } from '../utilities/unique';

export class WebSocketEvent {
    @unique public static readonly CONNECTED: string;
    @unique public static readonly DISCONNECTED: string;

    @unique public static readonly MESSAGE: string;
}
