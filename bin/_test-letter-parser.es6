import Program from '../src/program';

(async () => {
    try {
        const app = await Program.createAsync();
        app.start();
        process.once('SIGINT', () => {
            app.stopAsync();
            setTimeout(() => {
                console.warn('Interruption timed out');
                process.exit(2);
            }, 30000);
        });
        await app.completion;
        process.exit(0);
    }
    catch (exc) {
        console.warn('Fatal error:');
        console.error(exc.stack || exc);
        process.exit(1);
    }
})();
