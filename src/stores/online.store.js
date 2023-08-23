import { writable } from "svelte/store";

const onlineStore = writable(0);

export default onlineStore;