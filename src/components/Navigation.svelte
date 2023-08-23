<script>
    import "../app.scss";
    import NavItem from './NavItem.svelte';
    import NavItemDropdown from "./NavItemDropdown.svelte";

    const closeNavigation = () => {
        document.body.classList.remove("nav-open");
    }
</script>

<div class="navigation">
    <NavItem icon="fluent:money-hand-20-regular" url="/earn">Earn</NavItem>
    <NavItemDropdown icon="pepicons-pop:label" url="/offers">Offers</NavItemDropdown>
    <NavItem icon="mdi:cash-register" url="/cashout">Cashout</NavItem>
    <!-- <NavItem icon="iconoir:leaderboard-star" url="/leaderboard">Leaderboard</NavItem>
    <NavItem icon="tabler:medal-2" url="/rewards">Rewards</NavItem> -->
    <NavItem icon="fluent:people-team-20-filled" url="/affiliates">Affiliates</NavItem>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="nav-bg" on:click={closeNavigation}></div>

<style lang="scss">
    @import "../variables.scss";

    div.navigation {
        position: fixed;
        width: $nav-width;
        background: $navbar-background-color;
        z-index: 11;
        top: $header-height;
        bottom: 0;
        padding: 9px;
        overflow-y: auto;
        transition: .25s;

        @media only screen and (max-width: 1199px) {
            left: -300px;
        }
    }

    div.nav-bg {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        display: none;
        background: rgba(22,22,33,0.9);
        transition: .25s;
        width: 100%;
    }
</style>