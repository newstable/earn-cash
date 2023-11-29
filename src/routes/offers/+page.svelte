<script>
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import EarnHeader from "../../components/EarnHeader.svelte";
  import Offer from "../../components/Offer.svelte";
  import OfferPage from "../../components/OfferPage.svelte";
  import tokenStore from "../../stores/token.store";
  import LoadingSpinner from "$components/common/Loading/LoadingSpinner.svelte";

  let devices = {
    android: true,
    apple: true,
    computer: true,
  };
  let userId = "";

  let offers = [];
  let filteredOffers = [];
  let apiResponse;

  // let offerLists = [];
  let page = 1;
  let limit = 40;

  let loading = false;

  let offerPageNode;

  const getOffers = async (page, limit) => {
    loading = true;
    const response = await fetch(`/api/offers?page=${page}&limit=${limit}`);
    const data = await response.json();

    apiResponse = data;

    if (!data.success) {
      // TODO: handle error
      return;
    }

    offers = [...offers, ...data.offers.docs];
    filterOffers(devices);
    // console.log(offerPageNode?.scrollHeight);
    loading = false;
  };

  const filterOffers = (devices) =>
    (filteredOffers = offers.filter((offer) => {
      if (
        devices.apple &&
        (offer.mobile_app_type === "ios" || offer.mobile_app_type === null)
      ) {
        return true;
      }

      if (
        devices.android &&
        (offer.mobile_app_type === "android" || offer.mobile_app_type === null)
      ) {
        return true;
      }

      if (devices.computer && offer.mobile_app_type === null) {
        return true;
      }

      return false;
    }));

  onMount(() => {
    const token = get(tokenStore);
    if (token !== "") {
      const rawData = JSON.parse(atob(token.split(".")[1]));
      userId = rawData["uid"];
    }

    getOffers(page, limit);

    // to listen to scroll and call api afer user starts reaching end
    window.addEventListener("scroll", () => {
      if (
        offerPageNode?.scrollHeight - window?.scrollY < 500 &&
        apiResponse?.offers?.hasNextPage &&
        loading === false
      ) {
        page = page + 1;
        getOffers(page, limit);
        // console.log("hit api now", page);
      }
      // console.log(window?.scrollY, offerPageNode?.scrollHeight);
    });
  });

  $: filterOffers(devices);

  // $: offerLists = [
  //   ...offerLists,
  //   ...filteredOffers.slice(size * page, size * (page + 1) - 1),
  // ];

  // $: console.log(offers, filteredOffers, "page");
  // $: console.log(offerPageNode?.scrollHeight);
</script>

<svelte:head>
  <title>Offers - Justearn.com</title>
</svelte:head>

<EarnHeader name="Offers" onChange={filterOffers} bind:devices />

<div style="" bind:this={offerPageNode}>
  <OfferPage>
    {#each filteredOffers as offer}
      <Offer
        currencyAward={offer.tokens}
        offerImage={offer.creative}
        title={offer.title}
        description={offer.description}
        type={offer.category_name_readable}
        android={offer.mobile_app_type === "android" ||
          offer.mobile_app_type === null}
        apple={offer.mobile_app_type === "ios" ||
          offer.mobile_app_type === null}
        computer={offer.mobile_app_type === null}
        offerUrl={offer.link.replace("[USERIDHERE]", userId)}
      />
    {/each}
  </OfferPage>
</div>

{#if loading}
  <div class="spinner-container">
    <LoadingSpinner />
  </div>
{/if}

<style lang="scss">
  .spinner-container {
    display: grid;
    place-items: center;
    height: 100px;
    width: 100%;
    background: #171515;

    // background: red;
  }
</style>
