import {get } from "svelte/store";
import refStore from "../stores/ref.store";
import { getCookie } from "./cookies";

const getRef = () => {
    if (get(refStore)) {
        return get(refStore);
    }

    if (localStorage.getItem("ref")) {
        return localStorage.getItem("ref");
    }

    if (getCookie("ref")) {
        return getCookie("ref");
    }

    return null;
}

export default getRef;