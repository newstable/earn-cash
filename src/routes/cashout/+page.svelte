<script>
    import ShopSection from "../../components/ShopSection.svelte";
    import ShopSectionItem from "../../components/ShopSectionItem.svelte";

    export let data;
</script>

<div class="shop bg-bye">
    <h1>
        <img src="/cashout.png" alt="Money"/>
        <span>Cashout</span>
    </h1>

    <div class="`text-md`">
        <img src="/infoIcon.svg" alt="Info"/>
        Use your earned coins on justearn.gg to withdraw PayPal, Bitcoin, Robux, VISA & much more!
    </div>

    {#each Object.keys(data).reverse() as type}
        <ShopSection name={"Withdraw " + type}>
            
            {#each data[type] as item}
                <ShopSectionItem url={item.name.toLowerCase()} background={item.shopBackground} imageUrl={item.shopLogo}/>
                
            {/each}

            {#if type == "cash"}
                <ShopSectionItem url={"robux"} background={"#fff"} imageUrl={"https://i.imgur.com/cyzPM7J_d.webp?maxwidth=1520&fidelity=grand"}/>
                <ShopSectionItem url={"justgamble"} background={"transparent"} imageWidth="100" imageHeight="100" imageUrl={"https://i.imgur.com/NKRY9PU_d.webp?maxwidth=760&fidelity=grand"}/>
            {/if}
        </ShopSection>
    {/each}
</div>

<style lang="scss">
    div.shop {
        padding: 28px 41px;
        font-family: sans-serif;

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