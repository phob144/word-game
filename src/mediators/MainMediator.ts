import { inject, injectable } from '@robotlegsjs/core';
import { Mediator } from '@robotlegsjs/pixi';
import { CurrentMessageModel } from '../models/CurrentMessageModel';
import { MainView } from '../views/MainView';

@injectable()
export class MainMediator extends Mediator<MainView> {
    @inject(CurrentMessageModel) private _currentMessageModel: CurrentMessageModel;

    public initialize(): void {
        this.addContextListener(CurrentMessageModel.MESSAGE_CHANGED, this.onMessageChanged, this);

        this.view.initialize();
    }

    public destroy(): void {
        this.view.destroy();
    }

    private onMessageChanged() {
        this.view.updateMessage(this._currentMessageModel.message);
    }
}
