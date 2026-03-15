<a id="doc_en"></a>
# DevScript
#### [Документация на русском](#doc_ru)

DevScript is a simple utility for managing custom development scripts. It allows you to define commands in JSON or TOML files and execute them through a single interface. It is available in two implementations: **Python** and **TypeScript**.

## Installation

### Python version
```shell
pip install devscript
```

#### Or install from source:

```shell
git clone https://github.com/MagIlyasDOMA/devscript.git
cd devscript
pip install -e .
```

### TypeScript version
```shell
npm install -D @hren/devscript
# or
yarn add -D @hren/devscript
# or
pnpm add -D @hren/devscript
```

#### Or install from source:

```shell
git clone https://github.com/MagIlyasDOMA/devscript.git
cd devscript
npm install
npm run build
npm link
```

### Configuration formats
#### JSON (`devscript.json`)
```json
{
  "$schema": "https://raw.githubusercontent.com/MagIlyasDOMA/devscript/refs/heads/main/schema.json",
  "build": "python -m build",
  "test": "pytest tests/",
  "lint": "flake8 src/",
  "dev": "python -m app --debug"
}
```

#### YAML (`devscript.yaml`)
```yaml
build: "python -m build"
test: "pytest tests/"
lint: "flake8 src/"
dev: "python -m app --debug"
```

#### TOML (`pyproject.toml`)
```toml
[devscript]
build = "python -m build"
test = "pytest tests/"
lint = "flake8 src/"
dev = "python -m app --debug"
```

#### `package.json`
```json
{
  "devscript": {
    "build": "python -m build",
    "test": "pytest tests/",
    "lint": "flake8 src/",
    "dev": "python -m app --debug"
  }
}
```

### Running commands
#### The package provides four CLI commands:
- `devscript` — full name
- `devscr` — abbreviation
- `devs` — short
- `dvs` — shortest

#### All of them work the same:
```shell
# Show the list of available commands
devscript --help

# Run a command
devscript build
devscr dev
devs test
dvs lint 

# Pass arguments to a command
devscript dev --port 8000 --reload
```
Here is the translation of the text into English, with the markdown formatting preserved:

## Examples
### Example 1: Basic usage
```toml
# pyproject.toml
[devscript]
start = "uvicorn main:app --reload"
migrate = "alembic upgrade head"
shell = "ipython"
```

```shell
devs start      # Starts the uvicorn server
devs migrate    # Applies migrations
devs shell      # Starts IPython
```

### Example 2: Passing arguments
```json
{
  "test": "pytest",
  "cov": "pytest --cov=src"
}
```

```shell
devs test tests/test_api.py -v  # pytest tests/test_api.py -v
devs cov --cov-report=html      # pytest --cov=src --cov-report=html
```

## Development
### Python version
```shell
# Clone the repository
git clone https://github.com/MagIlyasDOMA/devscript.git
cd devscript

# Install in development mode
pip install -e .

# Run tests
devs test

# Run linter
devs lint
```

### TypeScript version
```shell
# Clone the repository
git clone https://github.com/MagIlyasDOMA/devscript.git
cd devscript

# Install dependencies
npm install

# Build the project
npm run build

# Install in development mode
npm link

# Run tests
devs test

# Run linter
devs lint
```

## Project structure
```text
devscript/
├── python/                 # Python implementation
│   ├── devscript/
│   │   ├── __init__.py
│   │   └── py.typed
│   ├── pyproject.toml
│   └── README.md
├── typescript/             # TypeScript implementation
│   ├── devscript.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── schema.json             # JSON Schema for autocompletion
└── LICENSE
```

## JSON Schema
For autocompletion and validation in code editors, use the schema:
```json
{
  "$schema": "https://raw.githubusercontent.com/MagIlyasDOMA/devscript/refs/heads/main/schema.json"
}
```

## API
### Using in code
#### Python
```python
from devscript import DevScriptCore

core = DevScriptCore()
print("Available commands:", core.commands_list())
core.run("build", ["--verbose"])
```

#### Typescript
```typescript
import { DevScriptCore } from 'devscript';
```
```javascript
const core = new DevScriptCore();
console.log("Available commands:", core.commands_list());
core.run("build", ["--verbose"]);
```

## Requirements
### Python version
- Python 3.8 or higher
- No external dependencies (uses the standard library)

### TypeScript version
- Node.js 14 or higher
- Dependencies: argparse, smol-toml

## License
GPL-3.0-only

## Author
#### Mag Ilyas DOMA (MagIlyasDOMA)
- GitHub: [@MagIlyasDOMA](https://github.com/MagIlyasDOMA)
- Project: [devscript](https://github.com/MagIlyasDOMA/devscript)

## Contribution
1. Fork the repository
2. Create a branch for the feature (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Frequently Asked Questions
##### Q: Can I use both versions at the same time?
A: Yes, they do not conflict as they use different commands for installation (pip vs npm).

##### Q: Are other configuration formats supported?
A: Currently, JSON, YAML, pyproject.toml, and package.json are supported.

##### Q: How do I add a new command?
A: Just add a new entry in the configuration file with the command name and the corresponding shell command.

##### Q: Does it work on Windows?
A: Yes, both versions have been tested on Windows.


---

<a id="doc_ru"></a>
# DevScript
#### [Documentation in English](#doc_en)

DevScript — это простая утилита для управления пользовательскими скриптами разработки. Она позволяет определять команды в JSON или TOML файлах и запускать их через единый интерфейс. Доступна в двух реализациях: **Python** и **TypeScript**.

## Установка

### Python версия
```shell
pip install devscript
```

#### Или установка из исходного кода:

```shell
git clone https://github.com/MagIlyasDOMA/devscript.git
cd devscript
pip install -e .
```

### TypeScript версия
```shell
npm install -D @hren/devscript
# или
yarn add -D @hren/devscript
# или
pnpm add -D @hren/devscript
```

#### Или установка из исходного кода:

```shell
git clone https://github.com/MagIlyasDOMA/devscript.git
cd devscript
npm install
npm run build
npm link
```

### Форматы конфигурации
#### JSON (`devscript.json`)
```json
{
  "$schema": "https://raw.githubusercontent.com/MagIlyasDOMA/devscript/refs/heads/main/schema.json",
  "build": "python -m build",
  "test": "pytest tests/",
  "lint": "flake8 src/",
  "dev": "python -m app --debug"
}
```

#### YAML (`devscript.yaml`)
```yaml
build: "python -m build"
test: "pytest tests/"
lint: "flake8 src/"
dev: "python -m app --debug"
```

#### TOML (`pyproject.toml`)
```toml
[devscript]
build = "python -m build"
test = "pytest tests/"
lint = "flake8 src/"
dev = "python -m app --debug"
```

#### `package.json`
```json
{
  "devscript": {
    "build": "python -m build",
    "test": "pytest tests/",
    "lint": "flake8 src/",
    "dev": "python -m app --debug"
  }
}
```

### Запуск команд
#### Пакет предоставляет четыре CLI-команды:
- `devscript` — полное имя
- `devscr` — сокращение
- `devs` — короткое
- `dvs` — самое короткое

#### Все они работают одинаково:
```shell
# Показать список доступных команд
devscript --help

# Запустить команду
devscript build
devscr dev
devs test
dvs lint 

# Передать аргументы команде
devscript dev --port 8000 --reload
```

## Примеры
### Пример 1: Базовое использование
```toml
# pyproject.toml
[devscript]
start = "uvicorn main:app --reload"
migrate = "alembic upgrade head"
shell = "ipython"
```

```shell
devs start      # Запускает uvicorn сервер
devs migrate    # Применяет миграции
devs shell      # Запускает IPython
```

### Пример 2: Передача аргументов
```json
{
  "test": "pytest",
  "cov": "pytest --cov=src"
}
```

```shell
devs test tests/test_api.py -v  # pytest tests/test_api.py -v
devs cov --cov-report=html      # pytest --cov=src --cov-report=html
```

## Разработка
### Python версия
```shell
# Клонировать репозиторий
git clone https://github.com/MagIlyasDOMA/devscript.git
cd devscript

# Установить в режиме разработки
pip install -e .

# Запустить тесты
devs test

# Запустить линтер
devs lint
```

### TypeScript версия
```shell
# Клонировать репозиторий
git clone https://github.com/MagIlyasDOMA/devscript.git
cd devscript

# Установить зависимости
npm install

# Собрать проект
npm run build

# Установить в режиме разработки
npm link

# Запустить тесты
devs test

# Запустить линтер
devs lint
```

## Структура проекта
```text
devscript/
├── python/                 # Python реализация
│   ├── devscript/
│   │   ├── __init__.py
│   │   └── py.typed
│   ├── pyproject.toml
│   └── README.md
├── typescript/             # TypeScript реализация
│   ├── devscript.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── schema.json             # JSON Schema для автодополнения
└── LICENSE
```

## JSON Schema
Для автодополнения и валидации в редакторах кода используйте схему:
```json
{
  "$schema": "https://raw.githubusercontent.com/MagIlyasDOMA/devscript/refs/heads/main/schema.json"
}
```

## API
### Использование в коде
#### Python
```python
from devscript import DevScriptCore

core = DevScriptCore()
print("Доступные команды:", core.commands_list())
core.run("build", ["--verbose"])
```

#### Typescript
```typescript
import { DevScriptCore } from 'devscript';

const core = new DevScriptCore();
console.log("Доступные команды:", core.commands_list());
core.run("build", ["--verbose"]);
```

## Требования
### Python версия
- Python 3.8 или выше
- Нет внешних зависимостей (использует стандартную библиотеку)

### TypeScript версия
- Node.js 14 или выше
- Зависимости: argparse, smol-toml

## Лицензия
GPL-3.0-only

## Автор
#### Маг Ильяс DOMA (MagIlyasDOMA)
- GitHub: [@MagIlyasDOMA](https://github.com/MagIlyasDOMA)
- Проект: [devscript](https://github.com/MagIlyasDOMA/devscript)

## Вклад в разработку
1. Форкните репозиторий
2. Создайте ветку для фичи (`git checkout -b feature/amazing-feature`)
3. Закоммитьте изменения (`git commit -m 'Add some amazing feature'`)
4. Запушьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## Часто задаваемые вопросы
##### Q: Могу ли я использовать обе версии одновременно?
A: Да, они не конфликтуют, так как используют разные команды для установки (pip vs npm).

##### Q: Поддерживаются ли другие форматы конфигурации?
A: В данный момент поддерживаются JSON, YAML, pyproject.toml и package.json

##### Q: Как добавить новую команду?
A: Просто добавьте новую запись в конфигурационный файл с именем команды и соответствующей shell-командой.

##### Q: Работает ли на Windows?
A: Да, обе версии протестированы на Windows.
