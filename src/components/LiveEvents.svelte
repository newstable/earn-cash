<script>
	import liveOffers from './../stores/liveOffers.store.js';
    import { onMount } from "svelte";
    import "../app.scss";
    import LiveEvent from "./LiveEvent.svelte";

    const getLastOffersDone = async() => {
        const response = await fetch("/api/getLastOffers");
        const data = await response.json();
        
        if (typeof data.offers !== "undefined") {
            liveOffers.set(data.offers);
        }
    }

    onMount(() => {
        getLastOffersDone();
    });
</script>

<div class="feed">
    <div class="inner">
        <div>
            {#each $liveOffers as offer}
                <LiveEvent userid={offer.userid} image={offer.picture} amount={offer.tokens} username={offer.username} wall={offer.wall}/>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    @import "../variables.scss";

    div.feed {
        height: $earn-feed-height;
        background: #521119;
        padding-left: 13px;
        display:flex;
        position: fixed;
        top: $header-height;
        left: 0;
        width: 100%;
        transition: .25s;
        z-index: 10;

        @media only screen and (min-width: 1200px) {
            margin-left: $nav-width;
        }

        div.inner {
            width: 100%;
            overflow-y: hidden;
            overflow-x: auto;

            scrollbar-width: none;
            -ms-overflow-style: none;

            &::-webkit-scrollbar {
                display: none;
            }

            & > div {
                width: max-content;
                display: flex;
                margin-top: 13px;
            }
        }
    }
</style>