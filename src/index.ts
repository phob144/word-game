// tslint:disable-next-line:no-reference
/// <reference path="../node_modules/@robotlegsjs/pixi/definitions/pixi.d.ts" />
import 'reflect-metadata';

import { Context, MVCSBundle } from '@robotlegsjs/core';
import { ContextView, PixiBundle } from '@robotlegsjs/pixi';
import { PalidorPixiExtension } from '@robotlegsjs/pixi-palidor';
import { Container, autoDetectRenderer, Renderer } from 'pixi.js';

import { Config } from './config/Config';

class Main {
    private _stage: Container;
    private _renderer: Renderer;
    private _context: Context;

    constructor() {
        this._renderer = autoDetectRenderer({
            width: window.innerWidth,
            height: window.innerHeight,
        });

        this._renderer.view.id = 'game';

        this._stage = new Container();

        this._context = new Context();
        this._context
            .install(MVCSBundle, PixiBundle)
            .install(PalidorPixiExtension)
            .configure(new ContextView(this._stage))
            .configure(Config)
            .initialize();

        document.body.appendChild(this._renderer.view);

        window.onresize = () => {
            // this._renderer.view.style.width = window.innerWidth + 'px';
            // this._renderer.view.style.height = window.innerHeight + 'px';

            this._renderer.resize(window.innerWidth, window.innerHeight);
        };
    }

    public render(): void {
        this._renderer.render(this._stage);
        window.requestAnimationFrame(this.render);
    }
}

const main = new Main();
main.render();
