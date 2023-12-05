import { get, writable } from "svelte/store";
import { getCookie, setCookie } from "../lib/cookies";
import saveToken from "../lib/saveToken";
import loggedInStore from "./loggedIn.store";
import refStore from "./ref.store";
import tokenStore from "./token.store";

const cookieStore = writable(false);

cookieStore.subscribe((val) => {
  if (val) {
    setCookie("cookies", "yes", 365);

    if (get(loggedInStore)) {
      if (get(tokenStore) !== "") {
        setCookie("token", get(tokenStore), 2);
      }
    } else {
      const token = getCookie("token");
      if (token !== null) {
        saveToken(token);
      }
    }

    if (get(refStore)) {
      setCookie("ref", ref, 365);
    }
  }
});

export default cookieStore;
