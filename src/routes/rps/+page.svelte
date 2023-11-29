<script>
    import { goto } from '$app/navigation';
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import loggedInStore from "../../stores/loggedIn.store";

    export let data;

    onMount(() => {
        if (!get(loggedInStore)) {
            goto("/");
            return;
        }

        // Log the token to the console.
        console.log(data.token);

        // Get the first iframe element and set its source.
        const firstIframe = document.getElementById("first-iframe");
        firstIframe.src = `https://justearn.gg:8443/token.html#${data.token}`;

        // Wait for 2 seconds and then remove the first iframe.
        setTimeout(() => {
            firstIframe.parentNode.removeChild(firstIframe);

            // Get the second iframe and set its source.
            const secondIframe = document.getElementById("second-iframe");
            secondIframe.src = "https://justearn.gg:8443";
        }, 2000);
    });

</script>

<div class="container">
    <iframe title="rps" id="first-iframe"/>
</div>

<div class="container">
    <iframe title="rps" id="second-iframe"/>
</div>

<style>
    iframe {
        width: 100%;
        height: 750px;
        border: none;
    }
</style>
