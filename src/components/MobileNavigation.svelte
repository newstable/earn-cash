<script>
    import Icon from '@iconify/svelte';

    import { page } from '$app/stores';

    import "../app.scss";

    const toggleNavigation = () => {
        document.body.classList.toggle("nav-open");
    }
</script>

<div class="mobile-nav">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="item menu" on:click={toggleNavigation}>
        <Icon icon="mdi:hamburger-menu" width="40" height="40" color="#ffff" />
    </div>

    <a href="/cashout" class={"item" + ($page.url.pathname == "/cashout" ? " active" : "")}>
        <Icon icon="mdi:cash-register" width="36" height="36" color="#ffff" />
        <span>Cashout</span>
    </a>

    <a href="/earn" class={"item highlighted" + ($page.url.pathname == "/earn" ? " active" : "")}>
        {#if $page.url.pathname != "/earn"}
            <Icon icon="fluent:money-hand-20-regular" width="36" height="36" color="#ffff" />
        {:else}
            <Icon icon="fluent:money-hand-20-regular" width="36" height="36" color="#ffffff" />
        {/if}
        <span>Earn</span>
    </a>

    <a href="/affiliates" class={"item" + ($page.url.pathname == "/affiliates" ? " active" : "")}>
        <Icon icon="tabler:medal-2" width="36" height="36" color="#ffff" />
        <span>Refer</span>
    </a>

    <a href="/chat" class={"item" + ($page.url.pathname == "/rewards" ? " active" : "")}>
        <Icon icon="mdi:message-group" width="36" height="36" color="#ffff" />
        <span>Chat</span>
    </a>
</div>

<style lang="scss">
    @import "../variables.scss";

    div.mobile-nav {
        position: fixed;
        z-index: 4;
        left: 0;
        bottom: 0;
        display: none;
        align-items: center;
        flex-direction: row;
        background: #6a1622;
        width: 100%;
        justify-content: space-between;
        padding: 0 60px;
        overflow-y: visible;
        min-height: 74px;

        @media only screen and (max-width: 1199px) {
            display: flex;
            padding: 0 20px;
        }

        .item {
            display: inline-flex;
            flex-direction: column;
            height: 74px;
            padding-top: 15px;
            position: relative;
            top: 0;
            
            transition: .3s;
            flex: 1;
            cursor: pointer;
            align-items: center;
            text-decoration: none;

            & > span {
                font-weight: 500;
                font-size: 12px;
                line-height: 165%;
                text-align: center;
                color: white;
                border-bottom: 2px solid transparent;
            }
        }

        .item.highlighted {
            top: -10px;
            max-height: 67px;
            max-width: 73px;
            padding-top:12px;
            background: #901d2e;
            border-radius: 6px;
        }

        .item.active {
            border-bottom: 2px solid white;
            background: linear-gradient(180deg,rgba(231, 153, 154, 0) 0,rgba(255,90,92,0.2) 100%);
        }

        .item.active.highlighted {
            background: linear-gradient(180deg,#ff5a5c 0,#b5191b 100%);
            box-shadow: 0 1px 14px rgb(255 90 92 / 29%);
            border-bottom: 0;
            
            & > span {
                color: #fff;
            }
        }

        div.menu {
            display: flex;
            height: 100%;
            padding: 0;
            align-items: center;
            justify-content: center;

        }
    }
</style>