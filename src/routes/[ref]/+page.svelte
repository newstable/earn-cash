<script>
	import { goto } from '$app/navigation';
    import { get } from 'svelte/store';
	import refStore from './../../stores/ref.store.js';
    import { onMount } from 'svelte';
    import cookieStore from '../../stores/cookie.store.js';
    import { setCookie } from '../../lib/cookies.js';

    export let data;

    onMount(() => {
        const ref = data.ref;

        refStore.set(ref);
        localStorage.setItem("ref", ref);

        if (get(cookieStore)) {
            setCookie("ref", ref, 365);
        }

        goto("/");
    });
</script>