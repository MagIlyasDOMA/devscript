#!/usr/bin/env node

import fs from 'fs';
import { execSync } from 'child_process';
import TOML from 'smol-toml';
import YAML from 'yaml'
import { ArgumentParser } from "argparse";

type ConfigType = 'json' | 'toml' | 'npmjs' | 'yaml';

const __version__ = '0.1.0'

interface DevScriptConfig {
    type: ConfigType;
    data: any;
}

class DevScriptCore {
    protected configObj: DevScriptConfig;
    public config: any;
    // @ts-ignore
    protected configFile: string;

    constructor() {
        this.configObj = this.read_config();

        if (this.configObj.type === 'json') {
            this.config = this.configObj.data;
            this.configFile = 'devscript.json';
        } else if (this.configObj.type === 'yaml') {
            this.config = this.configObj.data
            this.configFile = 'devscript.yaml';
        } else if (this.configObj.type === 'toml') {
            if (this.configObj.data.devscript) this.error()
            this.config = this.configObj.data['devscript'];
            this.configFile = 'pyproject.toml';
        } else if (this.configObj.type === 'npmjs') {
            if (this.configObj.data.devscript) this.error()
            this.config = this.configObj.data['devscript'];
            this.configFile = 'package.json';
        } else this.error()
    }

    private error() {
        throw new Error('Config not found')
    }

    public read_config(): DevScriptConfig {
        if (fs.existsSync('devscript.json')) {
            const content = fs.readFileSync('devscript.json', 'utf-8');
            const data = JSON.parse(content);
            if ('$schema' in data) delete data['$schema'];
            return { type: 'json', data };
        } else if (fs.existsSync('devscript.yaml')) {
            const content = fs.readFileSync('devscript.yaml', 'utf-8')
            const data = YAML.parse(content)
            return { type: 'yaml', data }
        } else if (fs.existsSync('pyproject.toml')) {
            const content = fs.readFileSync('pyproject.toml', 'utf-8');
            const data = TOML.parse(content);
            return { type: 'toml', data };
        } else if (fs.existsSync('package.json')) {
            const content = fs.readFileSync('package.json', 'utf-8');
            const data = JSON.parse(content);
            return { type: 'npmjs', data };
        } else throw new Error('Config not found');
    }

    public commands_list(): string[] {
        return Object.keys(this.config);
    }

    public run(command: string, argv: string[]): void {
        if (!this.commands_list().includes(command)) {
            throw new Error(`Invalid command: ${command}`);
        }

        const fullCommand = [this.config[command], ...argv].join(' ');
        execSync(fullCommand, { stdio: 'inherit' });
    }
}

function main(): void {
    const core = new DevScriptCore();
    const parser = new ArgumentParser();
    parser.add_argument('command', {type: 'str', help: 'script to run', choices: core.commands_list()})

    const [args, argv] = parser.parse_known_args();
    core.run(args.command, argv)
}

main();

export {DevScriptCore};
export type {DevScriptConfig};
