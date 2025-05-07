const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { exec } = require('child_process');

class Webhook {
    constructor(secret) {
        this.secret = secret;
        this.app = express();
        this.directoryPath = null;
        this.command = null;

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    directory(path) {
        this.directoryPath = path;
        return this;
    }

    exec(command) {
        this.command = command;
        return this;
    }

    verifySignature(req) {
        const signature = `sha256=${crypto
            .createHmac('sha256', this.secret)
            .update(JSON.stringify(req.body))
            .digest('hex')}`;

        const githubSignature = req.headers['x-hub-signature-256'];
        return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(githubSignature));
    }

    handleRequest(req, res) {
        if (!this.verifySignature(req)) {
            return res.status(403).send('Forbidden: Invalid signature');
        }

        if (!this.directoryPath || !this.command) {
            return res.status(500).send('Configuration Error: Directory or Command not set');
        }

        exec(`cd ${this.directoryPath} && ${this.command}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${stderr}`);
                return res.status(500).send(`Deployment Failed: ${stderr}`);
            }
            console.log(`Success: ${stdout}`);
            res.status(200).send('Deployment Successful');
        });
    }

    listen(port, host='0.0.0.0') {
        this.app.post('/webhook', (req, res) => this.handleRequest(req, res));
        this.app.listen(port, host, () => {
            console.log(`Webhook running on http://${host}:${port}`);
        });
    }
}

module.exports = Webhook;