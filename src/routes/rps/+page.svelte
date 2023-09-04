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
        // const iframe = document.createElement("iframe");
        const iframe = document.getElementById("rps-game");
        iframe.onload = () => {
            iframe.contentWindow.postMessage({ rps_token: data.token }, '*');
        };
        // iframe.src = "https://rps.justearn.gg/token.html#<?=$token?>";
        iframe.src="https://justearn.gg:2083"
        // iframe.src="https://localhost:2083"
    });

</script>

<div class="container">
    <iframe title="rps" id="rps-game"/>
</div>
<style>
    iframe {
        width: 100%;
        height: 750px;
        border: none;
    }
</style>