<script>
    import commissionValues from "../../lib/commissionValues";
    import Tier from "./Tier.svelte";

    export let tier = 0;
</script>

<section>
    <div class="info">
        <iconify-icon icon="material-symbols:info-outline" width="20" height="20"></iconify-icon>
        <div>
            Reach the next Tier to earn a higher commission from your affiliates.
        </div>
    </div>

    <div class="grid">
        {#each commissionValues as commissionValue, i}
            <Tier
                tier={i + 1}
                commission={commissionValue.percentage}
                requirement={commissionValue.earned}
                requirementActive={i <= tier}
                active={tier === i}
            />
        {/each}
    </div>
</section>

<style lang="scss">
    div.info {
        margin: 30px 0 20px 0;
        display: flex;
        gap: 10px;
        align-items: center;
        color: #a8aac9;
    }

    div.grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;

        @media only screen and (max-width: 1199px) {
            grid-template-columns: 1fr; 
        }
    }

    section {
        margin-top: 30px;
        margin-bottom: 100px;
        display: block;
    }
</style>