if (process.platform === "win32") {
    require('readline')
        .createInterface({
            input: process.stdin,
            output: process.stdout
        })
        .on('SIGINT', () => process.emit('SIGINT'));
}

process.env.SYNCCLOUD_CONFIGURATION || (process.env.SYNCCLOUD_CONFIGURATION =
    'http://synccloud-config.elasticbeanstalk.com/config/mail.test-letter-parser/master@staging');

require('./_test-letter-parser');
