<script>
	import { SplideTrack, SplideSlide } from '@splidejs/svelte-splide';
    import "../../app.scss";
    import OfferCategory from "../../components/OfferCategory.svelte";
    import Offer from '../../components/Offer.svelte';
    import Wall from '../../components/Wall.svelte';
    import EarnHeader from '../../components/EarnHeader.svelte';
	import loggedIn from '../../stores/loggedIn.store.js';

    export let data = {
        userid: ''
    };
    var revuOffers = [];

    loggedIn.subscribe(async val => {
        if (val) {
            fetch('/api/offers/featured')
                .then(res=>res.json())
                .then(data=>{
                    if (!data.success)
                        return
                    revuOffers = data.revuOffers
                })
        }
    });
</script>

<svelte:head>
    <title>Earn - Justearn.com</title>
</svelte:head>

<EarnHeader name="Earn"/>
{#if $loggedIn}
<OfferCategory iconUrl="/flame-green.svg" title="Featured Offers">
    <a slot="right" href="/offers">View All</a>
    
    <SplideTrack slot="items">
        {#each revuOffers as offer}
            <SplideSlide class="carousel-item">
                <Offer
                    dollars={Math.floor(offer.currency_award / 100)}
                    cents={parseInt(offer.currency_award % 100)}
                    offerUrl={offer.offer_url}
                    offerImage={offer.image_url}
                    title={offer.name}
                    description={offer.description}
                />
            </SplideSlide>
        {/each}
    </SplideTrack>
</OfferCategory>
{/if}
<OfferCategory iconUrl="/offer-wall-green.svg" title="Offer Partners">
    <SplideTrack slot="items">

        <SplideSlide class="carousel-item">
            <Wall hasBonus={true}/>
        </SplideSlide>

        <SplideSlide class="carousel-item">
            <Wall wallName="Lootably" wallUrl="lootably" logoUrl="/lootably-logo.png" backgroundUrl="/wall-lootably-card-bg.png"/>
        </SplideSlide>

        <SplideSlide class="carousel-item">
            <Wall wallName="OfferToro" wallUrl="offertoro" logoUrl="/offertoroLogo.webp" backgroundUrl="/wall-offertoro-card-bg.png"/>
        </SplideSlide>

        <SplideSlide class="carousel-item">
            <Wall wallName="AdGem" wallUrl="adgem" logoUrl="/AdGemGlow.webp" backgroundUrl="/wall-adgem-card-bg.png"/>
        </SplideSlide>

        <SplideSlide class="carousel-item">
            <Wall wallName="Revenue Universe" wallUrl="revu" logoUrl="/revu-logo-white.svg" backgroundUrl="/wall-revu-card-bg.png"/>
        </SplideSlide>

        <SplideSlide class="carousel-item">
            <Wall wallName="AdGate" wallUrl="adgate" logoUrl="/AdGatemediaGlow.png" backgroundUrl="/wall-adgate-card-bg.png"/>
        </SplideSlide>

        <SplideSlide class="carousel-item">
            <Wall wallName="Adscend" wallUrl="adscend" logoUrl="/AdscendMediaGlow.webp" backgroundUrl="/wall-adscend-card-bg.png"/>
        </SplideSlide>

        <SplideSlide class="carousel-item">
            <Wall wallName="Monlix" wallUrl="monlix" logoUrl="/monlix.png" backgroundUrl="/wall-adscend-card-bg.png"/>
        </SplideSlide>
		
        <SplideSlide class="carousel-item">
            <Wall wallName="Notik" wallUrl="notik" logoUrl="/logo_main.png" backgroundUrl="/wall-adscend-card-bg.png"/>
        </SplideSlide>
		
    </SplideTrack>
</OfferCategory>

<OfferCategory iconUrl="/offer-wall-green.svg" title="Survey Partners">
    <SplideTrack slot="items">

        <SplideSlide class="carousel-item">
            <Wall wallName="CPX Research" wallUrl="cpxresearch" logoUrl="/logo-cpx-reserach-white.svg" backgroundUrl="/survey-cpxresearch-card-bg.png"/>
        </SplideSlide>

        <SplideSlide class="carousel-item">
            <Wall wallName="BitLabs" wallUrl="bitlabs" logoUrl="/BitLabsWhiteLogo.png" backgroundUrl="/survey-bitlabs-card-bg.png"/>
        </SplideSlide>

        <SplideSlide class="carousel-item">
            <Wall wallName="Inbrain" wallUrl="inbrain" logoUrl="/inbrain-logo-white-colored.svg" backgroundUrl="/survey-inbrain-card-bg.png"/>
        </SplideSlide>

    </SplideTrack>
</OfferCategory>

<slot/>

<style>
    a {
        font-weight: 500;
        font-size: 14px;
        line-height: 160%;
        text-align: right;
        color: #a9a9ca;
        text-decoration: none;
        cursor: pointer;
    }
</style>