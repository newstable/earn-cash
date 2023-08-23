import { writable } from "svelte/store";

const loggedInStore = writable(false);

export default loggedInStore;