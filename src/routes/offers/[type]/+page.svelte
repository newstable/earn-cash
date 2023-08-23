<script>
    import { onMount } from "svelte";
	import { get } from "svelte/store";
    import EarnHeader from "../../../components/EarnHeader.svelte";
    import Offer from "../../../components/Offer.svelte";
    import OfferPage from "../../../components/OfferPage.svelte";
	

    var heading;
    export let data;
    var userId = "";
    var offers = [];
    var filteredOffers = [];

    const filterOffers = () => filteredOffers = offers.filter(offer => {
        if (heading.apple && (offer.mobile_app_type === "ios" || offer.mobile_app_type === null)) {
            return true;
        }

        if (heading.android && (offer.mobile_app_type === "android" || offer.mobile_app_type === null)) {
            return true;
        }

        if (heading.computer && (offer.mobile_app_type === null)) {
            return true;
        }

        return false;
    });

    onMount(async () => {
        const response = await fetch("/api/offers?categoryName=" + data.typeName);
        const responseData = await response.json();

        if (!responseData.success) {
            // TODO: handle error
            return;
        }

        offers = responseData.offers;
        filterOffers();
    });
</script>

<svelte:head>
    <title>{data.typeName} - Justearn.com</title>
</svelte:head>

<EarnHeader name={data.typeName} bind:this={heading}/>

<OfferPage>
    {#each filteredOffers as offer}
        <Offer
            dollars={Math.floor(offer.tokens / 100)}
            cents={parseInt(offer.tokens % 100)}
            offerImage={offer.creative}
            title={offer.title}
            description={offer.description}
            type="OTHER"
            android={(offer.mobile_app_type === "android" || offer.mobile_app_type === null)}
            apple={(offer.mobile_app_type === "ios" || offer.mobile_app_type === null)}
            computer={(offer.mobile_app_type === null)}
            offerUrl={offer.link.replace("[USERIDHERE]", userId)}
        />
    {/each}
</OfferPage>

