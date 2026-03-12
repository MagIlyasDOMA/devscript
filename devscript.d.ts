#!/usr/bin/env node
type ConfigType = 'json' | 'toml' | 'npmjs' | 'yaml';
interface DevScriptConfig {
    type: ConfigType;
    data: any;
}
declare class DevScriptCore {
    protected configObj: DevScriptConfig;
    config: any;
    protected configFile: string;
    constructor();
    private error;
    read_config(): DevScriptConfig;
    commands_list(): string[];
    run(command: string, argv: string[]): void;
}
export { DevScriptCore };
export type { DevScriptConfig };
//# sourceMappingURL=devscript.d.ts.map