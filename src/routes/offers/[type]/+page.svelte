<script>
  import { onMount } from "svelte";
  import { derived, get, writable } from "svelte/store";
  import EarnHeader from "../../../components/EarnHeader.svelte";
  import Offer from "../../../components/Offer.svelte";
  import OfferPage from "../../../components/OfferPage.svelte";
  import { createQuery } from "@tanstack/svelte-query";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import LoadingSpinner from "../../../components/common/Loading/LoadingSpinner.svelte";
  import { offerStore } from "$stores/offer.store";

  let devices = {
    android: true,
    apple: true,
    computer: true,
  };

  // export let data;

  let userId = "";
  $: typeName = $page.params.type;

  // $page.subscribe((val) => {
  //   typeName = val.params.type;
  // });

  const offers = derived(offerStore, ($offerStore) => {
    return $offerStore[typeName]?.data || [];
  });

  let filteredOffers = [];
  let loading = false;

  const filterOffers = (devices, offers) => {
    // console.log("ran");
    filteredOffers =
      offers?.filter((offer) => {
        // console.log(offer, "offer");
        if (
          devices.apple &&
          (offer.mobile_app_type === "ios" || offer.mobile_app_type === null)
        ) {
          return true;
        }

        if (
          devices.android &&
          (offer.mobile_app_type === "android" ||
            offer.mobile_app_type === null)
        ) {
          return true;
        }

        if (devices.computer && offer.mobile_app_type === null) {
          return true;
        }

        return false;
        // empty array is assigned to filtered offer because while its loading the data is undefined
      }) || [];
  };

  // console.log(filtered, "filtered");

  // filteredOffers = filtered;
  // };

  // const fetchOffers = async (typename) => {
  //   // set offers as empty array , while loading
  //   loading = true;
  //   offers = [];
  //   filterOffers(devices);

  //   const response = await fetch("/api/offers?categoryName=" + typename);
  //   const responseData = await response.json();

  //   if (!responseData.success) {
  //     // TODO: handle error
  //     return;
  //   }

  //   offers = responseData.offers;
  //   filterOffers(devices);
  //   loading = false;
  // };

  // runs in browser everytime data.typeName changes
  // to fetch offers based on typeName
  // $: if (browser) fetchOffers(data.typeName);

  // $: offers = $offerStore[data.typeName]?.data || [];

  $: filterOffers(devices, $offers);

  /**
   * @param {string[]} str
   * @returns {string[]}
   */
  const capitalizeFirstLetter = (str) => {
    return str.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  };

  let limit = 40;
  let offerPageNode;

  const getOffers = async (page, limit) => {
    const searchCategory = typeName;
    // console.log(searchCategory, "searchCategory");

    // set the data for current category to empty so user see loading screen
    offerStore.set({
      ...$offerStore,
      [searchCategory]: {
        // append to prev offers
        ...$offerStore[searchCategory],
        loading: true,
      },
    });

    const response = await fetch(
      `/api/offers?page=${page}&limit=${limit}&categoryName=${searchCategory}`
    );
    const data = await response.json();

    if (!data.success) {
      // TODO: handle error
      return;
    }

    offerStore.set({
      ...$offerStore,
      [searchCategory]: {
        // append to prev offers
        data: [...$offerStore[searchCategory].data, ...data.offers.docs],
        loading: false,
        apiResponse: data,
      },
    });

    filterOffers(devices);
  };

  onMount(() => {
    // getOffers(page, limit);

    // to listen to scroll and call api afer user starts reaching end
    window.addEventListener("scroll", () => {
      const currentOfferCategory = $offerStore[typeName];

      if (
        offerPageNode?.scrollHeight - window?.scrollY < 500 &&
        currentOfferCategory.apiResponse?.offers?.hasNextPage &&
        currentOfferCategory.loading === false
      ) {
        // paginationPage = paginationPage + 1;
        getOffers(currentOfferCategory.apiResponse?.offers?.nextPage, limit);
        // console.log("hit api now", page);
      }
      // console.log(window?.scrollY, offerPageNode?.scrollHeight);
    });
  });
  // $: console.log($offerStore, data, $offerStore[data.typeName]?.data, "page");

  // $: console.log($offers, "$offers");
  // $: console.log(devices, "devices");
  $: console.log($offerStore, "offerstore");
</script>

<svelte:head>
  <title
    >{capitalizeFirstLetter(typeName.split("-")).join(" ")} - Justearn.com</title
  >
</svelte:head>

<EarnHeader
  name={capitalizeFirstLetter(typeName.split("-")).join(" ")}
  bind:devices
/>
<!-- typeName= {typeName } filteredOffers length = {filteredOffers.length} -->

{#if filteredOffers?.length === 0 && !$offerStore[typeName]?.loading}
  <div class="spinner-container">No Offers Currently</div>
{/if}

<div bind:this={offerPageNode}>
  <OfferPage>
    {#each filteredOffers as offer}
      <Offer
        currencyAward={offer.tokens}
        offerImage={offer.creative}
        title={offer.title}
        description={offer.description}
        type={typeName}
        android={offer.mobile_app_type === "android" ||
          offer.mobile_app_type === null}
        apple={offer.mobile_app_type === "ios" ||
          offer.mobile_app_type === null}
        computer={offer.mobile_app_type === null}
        offerUrl={offer.link.replace("[USERIDHERE]", userId)}
        {offer}
      />
    {/each}
  </OfferPage>
</div>

{#if $offerStore[typeName]?.loading}
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
  }
</style>
