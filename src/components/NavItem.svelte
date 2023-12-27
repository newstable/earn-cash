<script>
    import Icon from '@iconify/svelte';

    import { page } from '$app/stores';

    export let icon = "";
    export let url = "";
    export let active = false;
    var hovering = false;

    import "../app.scss";

    const mouseEnter = () => {
        hovering = true;
    }

    const mouseLeave = () => {
        hovering = false;
    };
    

</script>

<div class="item">
    <a href={url} on:mouseenter={mouseEnter} on:mouseleave={mouseLeave} class={
            (active ? "active " : "") +
            ($page.url.pathname == url ? " here" : "")
        }>
        <span class="icon">
            {#if $page.url.pathname == url}
                <Icon icon={icon} color="#ffff" width="20" height="20" />
            {:else}
                {#if hovering}
                    <Icon icon={icon} color="#ffff" width="20" height="20" />
                {:else}
                    {#if active}
                        <Icon icon={icon} color="#ff5a5c" width="20" height="20" />
                    {:else}
                        <Icon icon={icon} color="#ffff" width="20" height="20" />
                    {/if}
                {/if}
            {/if}
        </span>
        <span class="text">
            <slot/>
        </span>
        
    </a>
</div>

<style lang="scss">
    @import "../variables.scss";

    div.item {
        padding-bottom: 20px;
    }

    a {
        cursor: pointer;
        padding: 9px;
        font-style: normal;
        font-size: 12px;
        line-height: 160%;
        color: #ffff;
        display: flex;
        font-weight: 400;
        font-size: medium;
        align-items: center;
        border-radius: 6px;
        text-decoration: none;

        &:hover {
            color: #ffff !important;
        }

        &.active {
            background: #2c2727;
            color: #ffff;
        }

        &.here {
            background: #0E0C1D;
            color: #ffff;
        }

        span.icon {
            width: 20px;
            height: 20px;
            margin-right: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        span.text {
            flex: 1;
            display: flex;
            align-items: center;
        }
    }
</style>
