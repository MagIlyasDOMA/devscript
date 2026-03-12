#!/usr/bin/env node
type ConfigType = 'json' | 'toml';
interface DevScriptConfig {
    type: ConfigType;
    data: any;
}
declare class DevScriptCore {
    private configObj;
    config: any;
    private configFile;
    constructor();
    read_config(): DevScriptConfig;
    commands_list(): string[];
    run(command: string, argv: string[]): void;
}
export { DevScriptCore };
export type { DevScriptConfig };
//# sourceMappingURL=devscript.d.ts.map