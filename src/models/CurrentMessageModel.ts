import { IEventDispatcher, inject, injectable } from '@robotlegsjs/core';
import { unique } from '../utilities/unique';

@injectable()
export class CurrentMessageModel {
    @inject(IEventDispatcher) private _eventDispatcher: IEventDispatcher;

    @unique public static readonly MESSAGE_CHANGED: string;

    private _message: string;

    public get message(): string {
        return this._message;
    }

    public set message(value: string) {
        this._message = value;

        this._eventDispatcher.dispatchEvent(
            new CustomEvent(CurrentMessageModel.MESSAGE_CHANGED, { detail: this._message })
        );
    }
}
