<script>
    import ShopSection from "../../components/ShopSection.svelte";
    import ShopSectionItem from "../../components/ShopSectionItem.svelte";

    export let data;
</script>

<div class="shop">
    <h1>
        <img src="/money-active.svg" alt="Money"/>
        <span>Cashout</span>
    </h1>

    <div>
        <img src="/infoIcon.svg" alt="Info"/>
        Use your earned coins on justearn.gg to withdraw PayPal, Bitcoin, VISA, Amazon & much more!
    </div>

    {#each Object.keys(data) as type}
        <ShopSection name={"Withdraw " + type}>
            {#each data[type] as item}
                <ShopSectionItem url={item.name.toLowerCase()} background={item.shopBackground} imageUrl={item.shopLogo}/>
            {/each}

            {#if type == "cash"}
                <ShopSectionItem url={"robux"} background={"#fff"} imageUrl={"https://logos-world.net/wp-content/uploads/2020/11/Roblox-Logo.png"}/>
            {/if}
        </ShopSection>
    {/each}
</div>

<style lang="scss">
    div.shop {
        padding: 28px 41px;
        font-family: Roboto;

        @media only screen and (max-width: 700px) {
            padding: 28px 10px;
        }

        & > div {
            max-width: 500px;
            background: rgba(70, 25, 25,0.7);
            font-size: 12px;
            color: rgba(255,255,255,0.9);
            padding: 20px;
            border-radius: 5px;
            display: flex;

            & > img {
                margin-right: 20px;
            }
        }
    }

    h1 {
        font-size: 22px;
        font-weight: 700;
        margin-top: 0;
        margin-bottom: 20px;
        display: flex;
        gap: 5px;

        & > img {
            width: 28px;
            height: 28px;
            vertical-align: bottom;
        }

        & > span {
            text-transform: uppercase;
        }
    }
</style>