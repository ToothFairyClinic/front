import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { useMemo } from "react";
import { config } from "./config";
import { applyPriceTokens, hasPriceTokens, priceMapFromCache } from "./price-tokens";

export const APOLLO_STATE_PROP = "__APOLLO_STATE__";

const isServer = typeof window === "undefined";

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = isServer ? null : localStorage.getItem("jwt");
  if (token) {
    operation.setContext({ headers: { Authorization: `Bearer ${token}` } });
  }
  return forward(operation);
});

/**
 * Запити з браузера (поза кешем, отриманим від сервера) теж отримують ціни замість токенів {{price:...}}:
 * прайс береться з кешу, куди його кладе staticProps на кожній сторінці.
 */
const priceTokensLink = (cache: InMemoryCache) =>
  new ApolloLink((operation, forward) =>
    forward(operation).map((result) => {
      if (!result.data || !hasPriceTokens(result.data)) return result;
      try {
        return { ...result, data: applyPriceTokens(result.data, priceMapFromCache(cache.extract())) };
      } catch {
        return result;
      }
    })
  );

const createApolloClient = () => {
  const cache = new InMemoryCache();
  return new ApolloClient({
    ssrMode: isServer,
    // На сервері ціни підставляє staticProps після всіх запитів сторінки (повний прайс у кеші)
    link: ApolloLink.from(
      isServer
        ? [authMiddleware, new HttpLink({ uri: config.hasuraEndpoint })]
        : [authMiddleware, priceTokensLink(cache), new HttpLink({ uri: config.hasuraEndpoint })]
    ),
    cache,
  });
};

let browserClient: ApolloClient<NormalizedCacheObject> | undefined;

/**
 * На сервері - новий клієнт на кожну сторінку; у браузері - один клієнт на всю сесію,
 * у кеш якого підмішуються дані, отримані сервером для поточної сторінки.
 */
export const initializeApollo = (initialState?: NormalizedCacheObject | null) => {
  const client = isServer ? createApolloClient() : browserClient ?? createApolloClient();
  if (initialState) {
    client.cache.restore({ ...client.cache.extract(), ...initialState });
  }
  if (!isServer) browserClient = client;
  return client;
};

export const useApollo = (pageProps: Record<string, unknown>) => {
  const state = pageProps[APOLLO_STATE_PROP] as NormalizedCacheObject | undefined;
  return useMemo(() => initializeApollo(state), [state]);
};

/** Клієнт для браузерного коду поза React (сумісність зі старим імпортом). */
export const apolloClient = isServer ? createApolloClient() : initializeApollo();
