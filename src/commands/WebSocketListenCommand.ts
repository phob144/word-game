const socketio = require('socket.io');

import { injectable } from '@robotlegsjs/core';

import { inject } from '@robotlegsjs/core';
import { Socket } from 'socket.io';
import { WebSocketEvent } from '../events/WebSocketEvent';
import { CurrentMessageModel } from '../models/CurrentMessageModel';

@injectable()
export class WebSocketListenCommand {
    @inject(CurrentMessageModel) private _currentMessageModel: CurrentMessageModel;

    private _webSocket: Socket;

    public execute(): void {
        const port = 10144;
        this._webSocket = socketio(`ws://localhost:${port}`);
        this._webSocket.on(WebSocketEvent.MESSAGE, (message: string) => {
            this._currentMessageModel.message = message;
        });
    }
}
