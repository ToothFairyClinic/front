# toothfairy.clinic - фронтенд

Next.js 14 (Pages Router) + Apollo Client + Tailwind. Дані - Hasura (`NEXT_PUBLIC_HASURA_ENDPOINT`,
за замовчуванням `https://hasura.toothfairy.clinic/v1/graphql`).

## Як працює рендеринг

- Кожна сторінка збирається в готовий HTML на сервері (`getStaticProps`): пошукові системи отримують
  повний контент без пререндеру.
- Сторінки оновлюються у фоні раз на 5 хвилин після запиту (ISR, `REVALIDATE` у `src/core/ssg.ts`),
  тому зміни з адмінки з'являються на сайті протягом кількох хвилин без нового деплою.
- Сторінки послуг, лікарів і статей збираються під час білду; нові slug-и генеруються при першому запиті.
- Маршрути - у `pages/[lang]/...`, самі сторінки - у `src/modules/*/pages`.
- 301-редиректи (старі UUID-адреси послуг, старі адреси лікарів, `/uk/*`) і проксі `sitemap.xml` - у `next.config.js`.

## Команди

```bash
yarn dev      # локально на http://localhost:3311
yarn build    # production-збірка
yarn start    # запуск збірки
yarn codegen  # оновити src/core/types.ts зі схеми Hasura
```

## Деплой

Netlify, гілка `main`. Налаштування збірки - у `netlify.toml` (Next.js runtime Netlify підключається автоматично).
