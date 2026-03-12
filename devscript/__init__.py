import argparse, os, json, tomllib, yaml
from dataclasses import dataclass
from typing import Literal

__version__ = '0.1.0'


@dataclass
class DevScriptConfig:
    type: Literal['json', 'toml', 'npmjs', 'yaml']
    data: dict


class DevScriptCore:
    def __init__(self):
        self._config_obj = self.read_config()
        try:
            if self._config_obj.type == 'json':
                self.config = self._config_obj.data
                self._config_file = 'devscript.json'
            elif self._config_obj.type == 'yaml':
                self.config = self._config_obj.data
                self._config_file = 'devscript.yaml'
            elif self._config_obj.type == 'toml':
                self.config = self._config_obj.data['devscript']
                self._config_file = 'pyproject.toml'
            elif self._config_obj.type == 'npmjs':
                self.config = self._config_obj.data['devscript']
                self._config_file = 'package.json'
            else: raise FileNotFoundError('Config not found')
        except KeyError:
            raise FileNotFoundError('Config not found')

    @staticmethod
    def read_config() -> DevScriptConfig:
        if os.path.isfile('devscript.json'):
            with open('devscript.json', encoding='utf-8') as file:
                data = json.load(file)
                if '$schema' in data: del data['$schema']
                return DevScriptConfig('json', data)
        elif os.path.isfile('devscript.yaml'):
            with open('devscript.yaml', encoding='utf-8') as file:
                return DevScriptConfig('yaml', yaml.safe_load(file))
        elif os.path.isfile('pyproject.toml'):
            with open('pyproject.toml', 'rb') as file:
                return DevScriptConfig('toml', tomllib.load(file))
        elif os.path.isfile('package.json'):
            with open('package.json', 'r', encoding='utf-8') as file:
                return DevScriptConfig('npmjs', json.load(file))
        else: raise FileNotFoundError('Config not found')

    def commands_list(self):
        return self.config.keys()

    def run(self, command: str, argv: list[str]):
        if command not in self.commands_list():
            raise ValueError(f'Invalid command: {command}')
        os.system(' '.join([self.config[command]] + argv))


def main():
    core = DevScriptCore()
    parser = argparse.ArgumentParser()
    parser.add_argument('command', type=str, help='script to run', choices=core.commands_list())
    args, argv = parser.parse_known_args()
    core.run(args.command, argv)


if __name__ == '__main__': main()
