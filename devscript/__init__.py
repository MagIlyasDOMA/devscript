import argparse, os, json, tomllib
from dataclasses import dataclass
from typing import Literal


@dataclass
class DevScriptConfig:
    type: Literal['json', 'toml']
    data: dict


def read_config() -> DevScriptConfig:
    if os.path.isfile('devscript.json'):
        with open('devscript.json', encoding='utf-8') as file:
            data = json.load(file)
            if '$schema' in data: del data['$schema']
            return DevScriptConfig('json', data)
    elif os.path.isfile('pyproject.toml'):
        with open('pyproject.toml', encoding='utf-8') as file:
            return DevScriptConfig('toml', tomllib.load(file)) # type: ignore
    else: raise FileNotFoundError('devscript.json or pyproject.toml not found')


class DevScriptCore:
    def __init__(self):
        self._config_obj = read_config()
        if self._config_obj.type == 'json':
            self.config = self._config_obj.data
            self._config_file = 'devscript.json'
        else:
            self.config = self._config_obj.data['devscript']
            self._config_file = 'pyproject.toml'

    def commands_list(self):
        return self.config.keys()

    def run(self, command: str, argv: list[str]):
        if command not in self.commands_list():
            raise ValueError(f'Invalid command: {command}')
        os.system(' '.join([command] + argv))


def main():
    core = DevScriptCore()
    parser = argparse.ArgumentParser()
    parser.add_argument('command', type=str, help='script to run', choices=core.commands_list())
    args, argv = parser.parse_known_args()
    core.run(args.command, argv)


if __name__ == '__main__': main()
