<script>
  import cookieStore from "./../stores/cookie.store.js";
  import { onMount } from "svelte";
  onMount(() => {
    cookieStore.set(true);
  });
</script>