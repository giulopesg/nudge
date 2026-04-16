@AGENTS.md

### i18n — Zero Hardcoded Text
Every user-visible string must use `t('namespace.key')` via react-i18next. Translation files live in `src/locales/pt-BR/` with one JSON per feature namespace. Initial language is pt-BR.

### 400-Line File Limit
Any file exceeding 400 lines must be split into multiple files, each with a single responsibility.
