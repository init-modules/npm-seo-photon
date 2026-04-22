# @init/seo-photon

SEO page settings kit for the package-first photon.

## Назначение

@init/seo-photon — npm/TypeScript package; Photon integration or runtime layer; SEO integration layer; settings/locale layer. Пакет экспортирует TypeScript/React primitives для frontend-части Init/Rx и не должен смешивать backend-интеграции с клиентским runtime.

- Этот пакет находится в слое Photon. Доменная логика должна оставаться в базовых пакетах, а здесь должны быть только адаптеры, настройки страниц, runtime-провайдеры или UI-kit для конструктора.
- Этот пакет является SEO-слоем. Он должен подключать SEO-возможности к доменному пакету, не перенося доменную модель в SEO-пакет.

## Установка

~~~bash
npm install @init/seo-photon
~~~

Проверьте peer dependencies в host-приложении, особенно версии React, Next.js и соседних <code>@init/*</code> пакетов.

## Экспорты

- <code>.</code>

Основные entry points:
- <code>index.ts</code>

## Состав пакета

- **Root**: <code>index.ts</code>, <code>module.tsx</code>

## Зависимости

Runtime dependencies:
- не обнаружено

Peer dependencies:
- <code>@init/seo ^0.1.0</code>
- <code>@init/photon ^0.1.0</code>
- <code>react ^19.0.0</code>
- <code>react-dom ^19.0.0</code>

## Сборка

- Скрипты сборки в <code>package.json</code> не объявлены; пакет потребляется напрямую из <code>src</code>.

## Разработка

- держите типы публичного API рядом с основными entry points;
- не добавляйте host-specific код в базовые frontend SDK;
- Photon UI-kit и adapter packages должны оставаться над <code>@init/photon</code>, не наоборот;
- перед публикацией выполните <code>npm run build</code>, если пакет собирается в <code>dist</code>.
