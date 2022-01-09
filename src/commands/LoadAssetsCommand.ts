import * as PIXI from 'pixi.js';

import { IEventDispatcher, inject, injectable, Event } from '@robotlegsjs/core';
import { MainView } from '../views/MainView';
import { unique } from '../utilities/unique';
import { AppEvent } from '../events/AppEvent';

@injectable()
export class LoadAssetsCommand {
    @inject(IEventDispatcher) private _dispatcher: IEventDispatcher;

    public execute(): void {
        // load assets
        const loader = PIXI.Loader.shared;

        loader.load(() => {
            console.log('load assets finished');

            // load the view
            this._dispatcher.dispatchEvent(new Event(MainView.ID));
            // begin listening
            this._dispatcher.dispatchEvent(new Event(AppEvent.WEBSOCKET_LISTEN));
        });
    }
}
