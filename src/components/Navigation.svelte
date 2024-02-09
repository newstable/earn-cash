<script>
    import "../app.scss";
    import NavItem from './NavItem.svelte';
    import NavItemDropdown from "./NavItemDropdown.svelte";
    

    const closeNavigation = () => {
        document.body.classList.remove("nav-open");
    };

</script>

<div class="navigation">
    <NavItem icon="fluent:money-hand-20-regular" url="/earn">Earn</NavItem>
    <NavItemDropdown icon="pepicons-pop:label" url="/offers">Offers</NavItemDropdown>
    <NavItem icon="mdi:cash-register" url="/cashout">Cashout</NavItem>
    <!-- <NavItem icon="iconoir:leaderboard-star" url="/leaderboard">Leaderboard</NavItem>
    <NavItem icon="tabler:medal-2" url="/rewards">Rewards</NavItem> -->
    <NavItem icon="fluent:people-team-20-filled" url="/affiliates">Affiliates</NavItem>
    <NavItem icon="bxs:game" url="/statusearn">StatusEarn</NavItem>
     <NavItem icon="gridicons:chat"><button on:click={showChatbox}>Live Chat</button></NavItem>
    <h1 class="text-gray-300 ml-4 mt-4 pb-4 font-semibold">Guides</h1>
    <ul class="space-y-2">
        <li>
            <a href="https://discord.com/invite/justearn" target="_blank"  class="flex text-sm text-white items-center py-3 px-4 rounded hover:bg-black">
                <img src="/coin.svg" alt="coin" class="w-6 h-6 mr-2"> <!-- Adjust the size and path as needed -->
                Surveys<img src="/infinity1.svg" alt="infinity" class="w-6 h-6 ml-2"/>
            </a>
        </li>
        <li>
            <a href="https://discord.com/invite/justearn" target="_blank" class="flex text-white text-sm items-center py-3 px-4 rounded hover:bg-black">
                <img src="/coin.svg" alt="coin" class="w-6 h-6 mr-2">
                RAID [50$]<img src="https://i.imgur.com/23GPQ4k_d.webp?maxwidth=760" alt="bigcoins" class="w-8 h-8 mr-2"/>
            </a>
        </li>
        <li>
            <a href="https://discord.com/invite/justearn" target="_blank" class="flex text-white items-center whitespace-nowrap text-sm py-3 px-4 rounded hover:bg-black">
                <img src="/coin.svg" alt="coin" class="w-6 h-6 mr-2">
                iNetOnline [25$]<img src="https://i.imgur.com/23GPQ4k_d.webp?maxwidth=760" alt="bigcoins" class="w-8 h-8 mr-2"/>
            </a>
        </li>
    </ul>
   
    <div class="rate w-[150px] h-[40px] align-middle flex justify-center bg-[#6F1521] rounded-lg  ml-[30px] mt-[175px]"><img class="w-10 px-" src="/coin3.svg" alt="coin"/><span class="text-white font-medium text-md whitespace-nowrap mr-8 pr-43 flex mt-2 ml-2">100 Coins = 1 $</span></div>
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