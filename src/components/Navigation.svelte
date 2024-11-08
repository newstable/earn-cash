<script>
    import "../app.scss";
    import NavItem from './NavItem.svelte';
    import NavItemDropdown from "./NavItemDropdown.svelte";
    import Icon from "@iconify/svelte";
    import loggedIn from "./../stores/loggedIn.store.js";
    

    const closeNavigation = () => {
        document.body.classList.remove("nav-open");
    };

</script>

<div class="navigation bg-bye">
    <h1 class="text-gray-100 font-bold ml-4 mt-4 pb-4 text-md">Home</h1>
    <NavItem icon="fluent:money-hand-20-regular" url="/earn">Earn</NavItem>
    <NavItem icon="mdi:cash-register" url="/cashout">Rewards</NavItem>
    <NavItem icon="line-md:text-box-multiple" url="/blog/guides">Guides</NavItem>
    <NavItem icon="svg-spinners:gooey-balls-1" url="https://discord.gg/gBURjPmBVw">Gamble</NavItem>

    <!-- <NavItem icon="iconoir:leaderboard-star" url="/leaderboard">Leaderboard</NavItem>
    <NavItem icon="tabler:medal-2" url="/rewards">Rewards</NavItem> -->
   <!-- <NavItem icon="fluent:people-team-20-filled" url="/affiliates">Affiliates</NavItem>  -->
   <h1 class="text-gray-100 font-bold ml-4 mt-4 pb-4 text-md">Freebies</h1>
    <NavItem icon="bxs:game" url="/statusearn">StatusEarn</NavItem>
    <NavItem  icon="basil:present-solid" width="50" height="50" url="/giveaways">Giveaways</NavItem>
    <NavItem  icon="fa-regular:heart" width="50" height="50" url="/promocodes">Bonus Codes</NavItem>

    
    <h1 class="text-gray-100 font-bold ml-4 mt-4 pb-4 text-md">Categories</h1>
    <NavItemDropdown icon="pepicons-pop:label" url="/offers">Offers</NavItemDropdown>
    <ul class="space-y-2 hidden">
        <li>
            <a href="https://justearn.gg/mergedragons"   class="flex text-[10px] text-white items-center py-3 px-4 rounded hover:bg-black">
                <img src="/coin.svg" alt="coin" class="w-6 h-6 mr-2"> <!-- Adjust the size and path as needed -->
                Merge Dragons [25$]🟡<img src="/infinity1.svg" alt="infinity" class="hidden w-6 h-6 ml-2"/>
            </a>
        </li>
        <li>
            <a href="https://justearn.gg/paramount"   class="flex text-sm text-white items-center py-3 px-4 rounded hover:bg-black">
                <img src="/coin.svg" alt="coin" class="w-6 h-6 mr-2"> <!-- Adjust the size and path as needed -->
                Paramount+ Trial [3$-USA]🟢<img src="/infinity1.svg" alt="infinity" class="hidden w-6 h-6 ml-2"/>
            </a>
        </li>
        <li>
            <a href="https://justearn.gg/blackoutbingo"   class="flex text-sm text-white items-center py-3 px-4 rounded hover:bg-black">
                <img src="/coin.svg" alt="coin" class="w-6 h-6 mr-2"> <!-- Adjust the size and path as needed -->
                Blackout Bingo [110$-USA]🟢<img src="/infinity1.svg" alt="infinity" class="hidden w-6 h-6 ml-2"/>
            </a>
        </li>
        <li>
            <a href="https://discord.com/invite/justearn" target="_blank" class="hidden flex text-white text-sm items-center py-3 px-4 rounded hover:bg-black">
                <img src="/coin.svg" alt="coin" class="w-6 h-6 mr-2">
                RAID [50$]<img src="https://i.imgur.com/23GPQ4k_d.webp?maxwidth=760" alt="bigcoins" class="w-8 h-8 mr-2"/>
            </a>
        </li>
        <li>
            <a href="https://discord.com/invite/justearn" target="_blank" class="hidden flex text-white items-center whitespace-nowrap text-sm py-3 px-4 rounded hover:bg-black">
                <img src="/coin.svg" alt="coin" class="w-6 h-6 mr-2">
                iNetOnline [25$]<img src="https://i.imgur.com/23GPQ4k_d.webp?maxwidth=760" alt="bigcoins" class="w-8 h-8 mr-2"/>
            </a>
        </li>
    </ul>
    {#if $loggedIn}
    <a href="/myprofile" class="w-[100%] mt-[70%] lg:mt-[90%] flex bg-[#4a4845] p-1 h-9 rounded-2xl"><iconify-icon icon="line-md:cog-filled-loop" width="30" height="30"  style="color: white"></iconify-icon><span class="pl-4 pt-[2px]">My Profile</span></a>
    {/if}
    <div class="hidden rate w-[150px] h-[40px] align-middle flex justify-center bg-[#6F1521] rounded-lg  ml-[30px] mt-[80px]"><img class="w-10 px-" src="/coin3.svg" alt="coin"/><span class="text-white font-medium text-md whitespace-nowrap mr-8 pr-43 flex mt-2 ml-2">100 Coins = 1 $</span></div>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="nav-bg" on:click={closeNavigation}></div>

<style lang="scss">
    @import "../variables.scss";

    div.navigation {
        position: fixed;
        width: $nav-width;

        z-index: 11;
        top: $header-height;
        
        bottom: 0;
        padding: 30px;
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