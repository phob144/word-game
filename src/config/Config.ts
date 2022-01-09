import {
    Event,
    IConfig,
    IEventCommandMap,
    IEventDispatcher,
    IInjector,
    inject,
    injectable,
} from '@robotlegsjs/core';

import { IMediatorMap } from '@robotlegsjs/pixi';
import { IFlowManager } from '@robotlegsjs/pixi-palidor';
import { LoadAssetsCommand } from '../commands/LoadAssetsCommand';
import { WebSocketListenCommand } from '../commands/WebSocketListenCommand';
import { AppEvent } from '../events/AppEvent';
import { MainMediator } from '../mediators/MainMediator';
import { CurrentMessageModel } from '../models/CurrentMessageModel';
import { MainView } from '../views/MainView';

@injectable()
export class Config implements IConfig {
    @inject(IEventDispatcher) private _dispatcher: IEventDispatcher;
    @inject(IFlowManager) private _flowManager: IFlowManager;
    @inject(IMediatorMap) private _mediatorMap: IMediatorMap;
    @inject(IEventCommandMap) private _commandMap: IEventCommandMap;
    @inject(IInjector) private _injector: IInjector;

    public configure(): void {
        this.mapMediators();
        this.mapCommands();
        this.mapModels();
        this.mapPalidor();

        this._dispatcher.dispatchEvent(new Event(AppEvent.LOAD_ASSETS));
    }

    private mapMediators(): void {
        this._mediatorMap.map(MainView).toMediator(MainMediator);
    }

    private mapCommands(): void {
        this._commandMap.map(AppEvent.LOAD_ASSETS).toCommand(LoadAssetsCommand);
        this._commandMap.map(AppEvent.WEBSOCKET_LISTEN).toCommand(WebSocketListenCommand);
    }

    private mapModels(): void {
        this._injector.bind(CurrentMessageModel).toSelf().inSingletonScope();
    }

    private mapPalidor(): void {
        this._flowManager.map(MainView.ID).toView(MainView);
    }
}
