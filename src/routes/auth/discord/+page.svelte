<script>
	import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import tokenStore from "../../../stores/token.store";

    const updateDiscord = (discordInfo) => {
        const token = get(tokenStore);

        fetch("/api/user/update/discord", {
            method: "POST",
            headers: {
                authentication: token,
            },
            body: JSON.stringify(discordInfo),
        })
    }

    export let data;
    
    onMount(() => {
        if (typeof data.success !== "undefined") {
            if ( data.success ) { 
                // goto("/cashout/justgamble");
                if ( data.access_token ) {
                    updateDiscord(data)
                    goto("/cashout/justgamble");
                }
            } else {
                goto("/cashout/justgamble");
            }
        }
    });
</script>
Loading