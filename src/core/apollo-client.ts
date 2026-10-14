import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject, concat } from "@apollo/client";
import { useMemo } from "react";
import { config } from "./config";

export const APOLLO_STATE_PROP = "__APOLLO_STATE__";

const isServer = typeof window === "undefined";

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = isServer ? null : localStorage.getItem("jwt");
  if (token) {
    operation.setContext({ headers: { Authorization: `Bearer ${token}` } });
  }
  return forward(operation);
});

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: isServer,
    link: concat(authMiddleware, new HttpLink({ uri: config.hasuraEndpoint })),
    cache: new InMemoryCache(),
  });

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
