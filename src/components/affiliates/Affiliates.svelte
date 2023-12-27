<script>
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import tokenStore from "../../stores/token.store";
    import Pagination from "../Pagination.svelte";

    var affiliates = [];
    var page = 1;
    var totalPages = 0;

    onMount(() => {
        loadResults();
    });

    const loadResults = async() => {
        const token = get(tokenStore);

        const response = await fetch("/api/user/affiliates?page=" + page.toString(), {
            headers: {
                authentication: token
            }
        });
        const data = await response.json();
        console.log(data);

        if (data.success) {
            totalPages = data.totalPages;
            affiliates = data.data;
        } else {
            // TODO: error handling
        }
    }

    const pageChangeHandler = newPage => {
        page = newPage;
        loadResults();
    }
</script>

<section>
    <div class="info">
        <iconify-icon icon="material-symbols:info-outline" width="20" height="20"></iconify-icon>
        <div>
            People that used your referral code to sign up are listed here. You earn a cut every time they complete an offer.
        </div>
    </div>

    <div class="affiliates">
        <div>Referral</div>
        <div class="thisshallbehidden">Completed offers</div>
        <div>Earned</div>
        <div>Your cut</div>
    </div>

    {#if totalPages === 0}
        <p class="empty">No referrals yet</p>
    {/if}
    
    <div class="items">
        {#each affiliates as aff}
            <div class="item">
                <div>{aff.username}</div>
                <div class="thisshallbehidden">{aff.paidSurveyCount.toLocaleString()}</div>
                <div>
                    <img src="/coin.svg" alt="logo"/>
                    {aff.points.toLocaleString()}
                </div>
                <div>
                    <img src="/coin.svg" alt="logo"/>
                    {typeof aff.earnedForRef !== "undefined" ? aff.earnedForRef.toLocaleString() : 0}
                </div>
            </div>
        {/each}
    </div>

    <Pagination totalPages={totalPages} pageHandler={pageChangeHandler}/>
</section>

<style lang="scss">
    @media only screen and (max-width: 1199px) {
        .thisshallbehidden {
            display: none;
        }

        div.affiliates {
            grid-template-columns: 160px 1fr 1fr !important;
        }
    }

    img {
        width: 16px;
    }

    div.items {
        border-top: 1px solid #404043;
        padding-top: 6px;
    }

    p.empty {
        border-top: 1px solid #404043;
        margin-top: 0;
        padding-top: 14px;
        text-align: center;
        color: #ccd;
    }

    div.affiliates, div.item {
        height: 50px;
        min-height: 50px;
        border-top: 0;
        grid-template-columns: 1.5fr 1.25fr .75fr .75fr;
        display: grid;
        padding: 15px 0;
        align-items: center;
        gap: 10px;
        text-transform: capitalize;
    }

    div.info {
        margin: 30px 0 20px 0;
        display: flex;
        gap: 10px;
        align-items: center;
        color: #a8aac9;
    }

    section {
        margin-top: 30px;
        margin-bottom: 100px;
        display: block;
    }
</style>