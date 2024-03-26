import { makeVar } from "@apollo/client";

export const priceListCurrent = makeVar<string | null>(null);
