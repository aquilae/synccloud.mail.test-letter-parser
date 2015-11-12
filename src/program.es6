import path from 'path';
import {AmqpClient, Log, ProgramBase, trace} from '@synccloud/mail.common';

export default class Program extends ProgramBase {
    static async createAsync() {
        const app = new Program();
        await app._setupAsync();
        return app;
    }

    //noinspection JSUnusedGlobalSymbols
    constructor() {
        super({
            healthCheck: true,
            amqp: {queue: true, prefetch: true}
        }, path.join(__dirname, '..'));
    }


    @trace
    async _mainAsync() {
        await this._listenAsync(this._handleAsync.bind(this));
    }

    @trace
    async _handleAsync(message) {
        this.cancellation.assert();
        console.log('HEADERS:');
        console.log(message.properties.headers);
        console.log('MESSAGE:');
        console.log(JSON.parse(message.content));
        process.exit(0);
    }
}
