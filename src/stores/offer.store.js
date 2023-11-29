import { writable } from "svelte/store";

export const offerStore = writable({
  "sign-up": {
    data: [],
    loading: true,
    apiResponse: {},
  },
  game: {
    data: [],
    loading: true,
    apiResponse: {},
  },
  app: {
    data: [],
    loading: true,
    apiResponse: {},
  },
  deposit: {
    data: [],
    loading: true,
    apiResponse: {},
  },
  crypto: {
    data: [],
    loading: true,
    apiResponse: {},
  },
  purchase: {
    data: [],
    loading: true,
    apiResponse: {},
  },
  "free-trial": {
    data: [],
    loading: true,
    apiResponse: {},
  },
  quiz: {
    data: [],
    loading: true,
    apiResponse: {},
  },
  casino: {
    data: [],
    loading: true,
    apiResponse: {},
  },
  other: {
    data: [],
    loading: true,
    apiResponse: {},
  },
});
