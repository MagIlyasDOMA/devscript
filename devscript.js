#!/usr/bin/env node
import fs from 'fs';
import { execSync } from 'child_process';
import TOML from 'smol-toml';
import YAML from 'yaml';
import { ArgumentParser } from "argparse";
class DevScriptCore {
    constructor() {
        Object.defineProperty(this, "configObj", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "configFile", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.configObj = this.read_config();
        if (this.configObj.type === 'json') {
            this.config = this.configObj.data;
            this.configFile = 'devscript.json';
        }
        else if (this.configObj.type === 'yaml') {
            this.config = this.configObj.data;
            this.configFile = 'devscript.yaml';
        }
        else if (this.configObj.type === 'toml') {
            if (this.configObj.data.devscript)
                this.error();
            this.config = this.configObj.data['devscript'];
            this.configFile = 'pyproject.toml';
        }
        else if (this.configObj.type === 'npmjs') {
            if (this.configObj.data.devscript)
                this.error();
            this.config = this.configObj.data['devscript'];
            this.configFile = 'package.json';
        }
        else
            this.error();
    }
    error() {
        throw new Error('Config not found');
    }
    read_config() {
        if (fs.existsSync('devscript.json')) {
            const content = fs.readFileSync('devscript.json', 'utf-8');
            const data = JSON.parse(content);
            if ('$schema' in data)
                delete data['$schema'];
            return { type: 'json', data };
        }
        else if (fs.existsSync('devscript.yaml')) {
            const content = fs.readFileSync('devscript.yaml', 'utf-8');
            const data = YAML.parse(content);
            return { type: 'yaml', data };
        }
        else if (fs.existsSync('pyproject.toml')) {
            const content = fs.readFileSync('pyproject.toml', 'utf-8');
            const data = TOML.parse(content);
            return { type: 'toml', data };
        }
        else if (fs.existsSync('package.json')) {
            const content = fs.readFileSync('package.json', 'utf-8');
            const data = JSON.parse(content);
            return { type: 'npmjs', data };
        }
        else
            throw new Error('Config not found');
    }
    commands_list() {
        return Object.keys(this.config);
    }
    run(command, argv) {
        if (!this.commands_list().includes(command)) {
            throw new Error(`Invalid command: ${command}`);
        }
        const fullCommand = [this.config[command], ...argv].join(' ');
        execSync(fullCommand, { stdio: 'inherit' });
    }
}
function main() {
    const core = new DevScriptCore();
    const parser = new ArgumentParser();
    parser.add_argument('command', { type: 'str', help: 'script to run', choices: core.commands_list() });
    const [args, argv] = parser.parse_known_args();
    core.run(args.command, argv);
}
main();
export { DevScriptCore };
//# sourceMappingURL=devscript.js.map