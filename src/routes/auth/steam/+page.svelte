<script>
	import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import saveToken from '../../../lib/saveToken';
    import modalStore from '../../../stores/signinupmodal.store';


    export let data;
    
    onMount(() => {
        if (typeof data.token !== "undefined") {
            try {
                get(modalStore).close();
            } catch(e) {}
            saveToken(data.token);
            goto("/earn");
        }
    });
</script>
Loading