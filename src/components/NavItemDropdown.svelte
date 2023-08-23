<script>
    import Icon from '@iconify/svelte';

    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    export let icon = "";
    export let active = false;
    var hovering = false;

    import "../app.scss";
    import NavItemDropdownItem from './NavItemDropdownItem.svelte';
    import { onMount } from 'svelte';

    const mouseEnter = () => {
        hovering = true;
    }

    const mouseLeave = () => {
        hovering = false;
    }

    const hasBeenClick = () => {
        if (!active) {
            active = true;
        } else {
            goto("/offers/");
            active = !active;
        }
    }

    var categories = [];
    var total = 0;
    const getCategories = async() => {
        const response = await fetch("/api/offers/categories");
        const data = await response.json();
        
        if (!data.success) {
            // TODO: handle error if no categories
            return;
        }

        categories = data.categories;
        total = data.total;
    }

    onMount(() => {
        getCategories();
    });
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="item">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <a on:click={hasBeenClick} on:mouseenter={mouseEnter} on:mouseleave={mouseLeave} class={
            (active ? "active " : "") +
            ($page.url.pathname.includes("offers") ? " here" : "")
        }>
        <span class="icon">
            {#if $page.url.pathname.includes("offers")}
                <Icon icon={icon} color="#ff5a5c" width="20" height="20" />
            {:else}
                {#if hovering}
                    <Icon icon={icon} color="#ff6668" width="20" height="20" />
                {:else}
                    {#if active}
                        <Icon icon={icon} color="#ff5a5c" width="20" height="20" />
                    {:else}
                        <Icon icon={icon} color="#a9a9ca" width="20" height="20" />
                    {/if}
                {/if}
            {/if}
        </span>
        <span class="text">
            <slot/>
        </span>
        <span class="toggle_icon">
            {#if active}
                <Icon icon="material-symbols:arrow-back-ios-new" color="#ff5a5c" width="12" height="12" rotate={1}/>
            {:else}
                {#if $page.url.pathname.includes("offers")}
                    <Icon icon="material-symbols:arrow-back-ios-new" color="#ff5a5c" width="12" height="12" rotate={3}/>
                {:else}
                    <Icon icon="material-symbols:arrow-back-ios-new" color="#a9a9ca" width="12" height="12" rotate={3}/>
                {/if}
            {/if}
        </span>
    </a>

    <div class="dropdown" class:active={active}>
        <div class="inner">
            <NavItemDropdownItem name="all" amount={total}/>
            {#each categories as category}
                {#if category.count > 0}
                    <NavItemDropdownItem name={category.name} amount={category.count}/>
                {/if}
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    @import "../variables.scss";

    div.dropdown {
        border-left: 1px solid #322d2d;
        overflow: hidden;
        transition: height 200ms;
        height: 0;
        margin: 0;
        transition: 200ms;
        width: 100%;

        &.active {
            margin: 20px 0 0 9px;
            height: auto;
        }

        & > .inner {
            width: 100%;
            height: 100%;
        }
    }

    div.item {
        padding-bottom: 20px;
    }

    a {
        cursor: pointer;
        padding: 9px;
        font-style: normal;
        font-size: 14px;
        line-height: 160%;
        color: $nav-text-color;
        display: flex;
        align-items: center;
        border-radius: 6px;
        text-decoration: none;

        &:hover {
            color: #ff6668 !important;
        }

        &.active {
            background: #2c2727;
            color: $active-color;
        }

        &.here {
            background: #2c2727;
            color: $active-color;
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

        span.toggle_icon {
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 160%;
        }
    }
</style>
