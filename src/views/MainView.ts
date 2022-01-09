import { Container, Graphics, Text } from 'pixi.js';
import { unique } from '../utilities/unique';

export class MainView extends Container {
    @unique
    public static readonly ID: string;

    private _background: Graphics;
    private _message: Text;

    public initialize(): void {
        this._background = new Graphics();
        this._background.beginFill(0x00ffff);
        this._background.drawRect(0, 0, window.innerWidth / 2, window.innerHeight / 2);
        this._background.endFill();
        this.addChild(this._background);

        this._message = new Text('Hello World!');
        this._message.x = window.innerWidth / 4;
        this._message.y = window.innerHeight / 4;
        this.addChild(this._message);
    }

    public destroy(): void {}

    public updateMessage(message: string): void {
        this._message.text = message;
    }
}
