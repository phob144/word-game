import { unique } from '../utilities/unique';

export class AppEvent {
    @unique public static readonly LOAD_ASSETS: string;
    @unique public static readonly WEBSOCKET_LISTEN: string;
}
