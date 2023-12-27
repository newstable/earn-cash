<script>
    import Icon from '@iconify/svelte';

    export let icon;
    export let url;
    export let hoverColor;

    var hovering = false;
</script>

<a href={url} target="_blank" rel="nofollow noreferrer" on:mouseenter={() => hovering = true} on:mouseleave={() => hovering = false} style={hovering ? "background: " + hoverColor : ""}>
    {#if hovering}
        <Icon icon={icon} color="#ffff" width="16" height="16" />
    {:else}
        <Icon icon={icon} color="#ffff" width="16" height="16" />
    {/if}
</a>

<style lang="scss">
    a {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #232121;
        color: #ffff;
    }
</style>