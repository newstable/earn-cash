<script>
    import { goto } from '$app/navigation';
    import { get } from 'svelte/store';
    import refStore from './../../stores/ref.store.js';
    import { onMount } from 'svelte';
    import cookieStore from '../../stores/cookie.store.js';
    import { setCookie } from '../../lib/cookies.js';

    export let data;

    onMount(() => {
        const dataString = JSON.stringify(data);
        refStore.set(dataString);
        localStorage.setItem("ref", dataString);
        if (get(cookieStore)) {
            setCookie("ref", dataString, 365);
        }
        goto("/");
    });
</script>