import { writable } from "svelte/store";

const wsStore = writable(false);

export default wsStore;