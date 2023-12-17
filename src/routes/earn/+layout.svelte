<script>
  //TODO: move this code to page.svelte
  import { SplideTrack, SplideSlide } from "@splidejs/svelte-splide";
  import "../../app.scss";
  import OfferCategory from "../../components/OfferCategory.svelte";
  import Offer from "../../components/Offer.svelte";
  import Wall from "../../components/Wall.svelte";
  import EarnHeader from "../../components/EarnHeader.svelte";
  import loggedIn from "../../stores/loggedIn.store.js";
  import { onMount, onDestroy } from "svelte";

  export let data = {
    userid: "",
  };
  var revuOffers = [];

  let user = {};
  let pollingInterval; // Variable to store the polling interval
  let errorMessage = "";

  onMount(() => {
    loggedIn.subscribe(async (val) => {
      if (val) {
        fetch("/api/offers/featured")
          .then((res) => res.json())
          .then((data) => {
            if (!data.success) return;
            revuOffers = data.revuOffers;
          });
      }
    });
  });

  // * currently moved from Wall.svelte to here as component was fetching multiple times
  // Function to fetch user details from the API and update the user and error message
  function fetchUserDetails() {
    fetch("/api/user/details")
      .then((response) => response.json())
      .then((data) => {
        // Check if the response contains an error
        if (data.error === "Authentication failed") {
          errorMessage = "Please Login To Continue";
          user = {}; // Clear user data when authentication fails
        } else {
          user = data;
          errorMessage = null; // Clear the error message if authentication is successful
        }
      });
  }

  // Initial fetch of user details on component mount
  onMount(() => {
    fetchUserDetails();

    // Start polling for user details every 10 seconds
    pollingInterval = setInterval(fetchUserDetails, 10000);
  });

  // Clear the polling interval when the component is destroyed
  onDestroy(() => {
    clearInterval(pollingInterval);
  });

  // $: console.log({ revuOffers });
</script>

<svelte:head>
  <title>Earn - Justearn.com</title>
</svelte:head>
<EarnHeader name="Earn" />
{#if $loggedIn}
  <!-- {#if true} -->
  <OfferCategory iconUrl="/flame-green.svg" title="Featured Offers">
    <a slot="right" href="/offers">View All</a>

    <SplideTrack slot="items">
      {#each revuOffers as offer}
        <SplideSlide class="carousel-item">
          <Offer
            offerUrl={offer.offer_url}
            offerImage={offer.image_url}
            title={offer.name}
            description={offer.description}
            currencyAward={offer.currency_award}
          />
        </SplideSlide>
      {/each}
    </SplideTrack>
  </OfferCategory>
{/if}
<OfferCategory iconUrl="/offer-wall-green.svg" title="Offer Partners">
  <SplideTrack slot="items">
    <SplideSlide class="carousel-item">
      <Wall
        {user}
        {errorMessage}
        wallName="AdGate"
        wallUrl="adgate"
        logoUrl="/AdGatemediaGlow.png"
        backgroundUrl="/wall-adgate-card-bg.png"
      />
    </SplideSlide>

    <SplideSlide class="carousel-item">
      <Wall
        {user}
        {errorMessage}
        wallName="Lootably"
        wallUrl="lootably"
        logoUrl="/lootably-logo.png"
        backgroundUrl="/wall-lootably-card-bg.png"
      />
    </SplideSlide>

    <SplideSlide class="carousel-item">
      <Wall
        {user}
        {errorMessage}
        wallName="Notik"
        wallUrl="notik"
        logoUrl="https://i.imgur.com/mrhsc2a.png"
        backgroundUrl="/wall-adscend-card-bg.png"
      />
    </SplideSlide>

    <SplideSlide class="carousel-item">
      <Wall
        {user}
        {errorMessage}
        wallName="Monlix"
        wallUrl="monlix"
        logoUrl="/monlix.png"
        backgroundUrl="/wall-adscend-card-bg.png"
      />
    </SplideSlide>

    <SplideSlide class="carousel-item">
      <Wall
        {user}
        {errorMessage}
        wallName="OfferToro"
        wallUrl="offertoro"
        logoUrl="/offertoroLogo.webp"
        backgroundUrl="/wall-offertoro-card-bg.png"
      />
    </SplideSlide>

    <SplideSlide class="carousel-item">
      <Wall
        {user}
        {errorMessage}
        wallName="Revenue Universe"
        wallUrl="revu"
        logoUrl="/revu-logo-white.svg"
        backgroundUrl="/wall-revu-card-bg.png"
      />
    </SplideSlide>

    <SplideSlide class="carousel-item">
      <Wall
        {user}
        {errorMessage}
        wallName="Adscend"
        wallUrl="adscend"
        logoUrl="/AdscendMediaGlow.webp"
        backgroundUrl="/wall-adscend-card-bg.png"
      />
    </SplideSlide>

    <SplideSlide class="carousel-item">
      <Wall
        {user}
        {errorMessage}
        wallName="MM WALL"
        wallUrl="mmwall"
        logoUrl="https://i.imgur.com/9MLoezH.png"
        backgroundUrl="/wall-offertoro-card-bg.png"
      />
    </SplideSlide>

    <SplideSlide class="carousel-item">
      <Wall
        {user}
        {errorMessage}
        wallName="Timewall"
        wallUrl="timewall"
        logoUrl="https://i.imgur.com/eNQVAm7.png"
        backgroundUrl="/survey-inbrain-card-bg.png"
      />
    </SplideSlide>
  </SplideTrack>
</OfferCategory>

<OfferCategory iconUrl="/offer-wall-green.svg" title="Survey Partners">
  <SplideTrack slot="items">
    <SplideSlide class="carousel-item">
      <Wall
        {user}
        {errorMessage}
        wallName="CPX Research"
        wallUrl="cpxresearch"
        logoUrl="/logo-cpx-reserach-white.svg"
        backgroundUrl="/survey-cpxresearch-card-bg.png"
      />
    </SplideSlide>

    <SplideSlide class="carousel-item">
      <Wall
        {user}
        {errorMessage}
        wallName="BitLabs"
        wallUrl="bitlabs"
        logoUrl="/BitLabsWhiteLogo.png"
        backgroundUrl="/survey-bitlabs-card-bg.png"
      />
    </SplideSlide>

    <SplideSlide class="carousel-item">
      <Wall
        {user}
        {errorMessage}
        wallName="Inbrain"
        wallUrl="inbrain"
        logoUrl="/inbrain-logo-white-colored.svg"
        backgroundUrl="/survey-inbrain-card-bg.png"
      />
    </SplideSlide>
  </SplideTrack>
</OfferCategory>

<slot />

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
