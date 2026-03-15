# DevScript

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
