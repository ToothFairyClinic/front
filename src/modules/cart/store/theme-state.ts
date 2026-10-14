import { makeVar } from "@apollo/client";

/** Темну тему прибрано: true = світла тема, завжди. */
export const themeState = makeVar(true);
