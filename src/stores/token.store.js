import {get, writable } from "svelte/store";
import { setCookie } from "../lib/cookies";
import cookieStore from "./cookie.store";
import loggedInStore from "./loggedIn.store";

const tokenStore = writable("");

tokenStore.subscribe(token => {
    if (token !== "") {
        if (get(cookieStore)) {
            setCookie("token", token, 2);
        }

        loggedInStore.set(true);
    }
})

export default tokenStore;