import { get, writable } from "svelte/store";
import { setCookie } from "../lib/cookies";
import cookieStore from "./cookie.store";
import loggedInStore from "./loggedIn.store";

const tokenStore = writable("");

tokenStore.subscribe((token) => {
  // console.log("subscribing", token);

  // console.log("current cookie store", get(cookieStore));
  if (token !== "" && typeof cookieStore !== "undefined") {
    // console.log("currently cookie store is", get(cookieStore));
    // console.log("token is", token);

    // console.log("if condiation", get(cookieStore));
    if (get(cookieStore)) {
      // console.log("setting cookie for token", get(cookieStore));
      setCookie("token", token, 2);
    }

    loggedInStore.set(true);
  }
});

export default tokenStore;
