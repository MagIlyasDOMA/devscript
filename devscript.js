#!/usr/bin/env node
import fs from 'fs';
import { execSync } from 'child_process';
import * as TOML from 'smol-toml';
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
        else {
            this.config = this.configObj.data['devscript'];
            this.configFile = 'pyproject.toml';
        }
    }
    read_config() {
        if (fs.existsSync('devscript.json')) {
            const content = fs.readFileSync('devscript.json', 'utf-8');
            const data = JSON.parse(content);
            if ('$schema' in data)
                delete data['$schema'];
            return { type: 'json', data };
        }
        else if (fs.existsSync('pyproject.toml')) {
            const content = fs.readFileSync('pyproject.toml', 'utf-8');
            const data = TOML.parse(content);
            return { type: 'toml', data };
        }
        else {
            throw new Error('devscript.json or pyproject.toml not found');
        }
    }
    commands_list() {
        return Object.keys(this.config);
    }
    run(command, argv) {
        if (!this.commands_list().includes(command)) {
            throw new Error(`Invalid command: ${command}`);
        }
        const fullCommand = [command, ...argv].join(' ');
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
if (require.main === module) {
    main();
}
export { DevScriptCore };
//# sourceMappingURL=devscript.js.map