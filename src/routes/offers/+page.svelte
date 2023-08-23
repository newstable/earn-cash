<script>
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import EarnHeader from "../../components/EarnHeader.svelte";
    import Offer from "../../components/Offer.svelte";
    import OfferPage from "../../components/OfferPage.svelte";
    import tokenStore from "../../stores/token.store";

    var header;
    var userId = "";

    var offers = [];
    var filteredOffers = [];
    const getOffers = async() => {
        const response = await fetch("/api/offers");
        const data = await response.json();

        if (!data.success) {
            // TODO: handle error
            return;
        }

        offers = data.offers;
        filterOffers();
    }

    const filterOffers = () => filteredOffers = offers.filter(offer => {
        if (header.apple && (offer.mobile_app_type === "ios" || offer.mobile_app_type === null)) {
            return true;
        }

        if (header.android && (offer.mobile_app_type === "android" || offer.mobile_app_type === null)) {
            return true;
        }

        if (header.computer && (offer.mobile_app_type === null)) {
            return true;
        }

        return false;
    });

    onMount(() => {
        const token = get(tokenStore);
        if (token !== "") {
            const rawData = JSON.parse(atob(token.split(".")[1]));
            userId = rawData["uid"];
        }

        getOffers();
    });
</script>

<svelte:head>
    <title>Offers - Justearn.com</title>
</svelte:head>

<EarnHeader name="Offers" onChange={filterOffers} bind:this={header}/>


<OfferPage>
    {#each filteredOffers as offer}
        <Offer dollars={Math.floor(offer.tokens / 100)} cents={parseInt(offer.tokens % 100)} offerImage={offer.creative} title={offer.title} description={offer.description} type="OTHER"
            android={(offer.mobile_app_type === "android" || offer.mobile_app_type === null)}
            apple={(offer.mobile_app_type === "ios" || offer.mobile_app_type === null)}
            computer={(offer.mobile_app_type === null)} offerUrl={offer.link.replace("[USERIDHERE]", userId)}/>
    {/each}
</OfferPage>