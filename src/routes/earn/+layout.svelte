<script>
  //TODO: move this code to page.svelte
  import { SplideTrack, SplideSlide } from "@splidejs/svelte-splide";
  import "../../app.scss";
  import OfferCategory from "../../components/OfferCategory.svelte";
  import Offer from "../../components/Offer.svelte";
  import Wall from "../../components/Wall.svelte";
  import loggedIn from "../../stores/loggedIn.store.js";
  import { onMount, onDestroy } from "svelte";
  import { deleteCookie } from "../../lib/cookies";
  import Icon from "@iconify/svelte";
  import Rewardsbanner from "../../components/earn/rewardsbanner.svelte";
  import Rainbanner from "../../components/earn/rainbanner.svelte";
  import Feature from "../../components/earn/feature.svelte";
  import Depositmethod from "../../components/earn/depositmethod.svelte";
  import Bets from "../../components/earn/bets.svelte";
  import Slotlist from "../../components/earn/slotlist.svelte";

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
          deleteCookie("token");
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
  <title>Earn - justearn.gg</title>
</svelte:head>
<div class="bg-bye px-[2%] xl:px-[4%] 2xl:px-[8%] relative">
  <img
    src="./earn-bg.png"
    alt="earn-bg"
    class="absolute top-0 left-1/2 transform -translate-x-1/2"
  />
  <!-- <div
    class="border-l-4 border-black mx-max bg-gradient-to-r from-blue-900 via-slate-900 to-red-900 rounded-b-2xl p-4 w-3/4 ml-6"
  >
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <svg
          class="h-5 w-5 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="ml-3 flex items-center">
        <iconify-icon icon="fxemoji:star" width="24" height="24"></iconify-icon>
        <p class="text-lg font-bold text-white">
          Struggling to complete Offers? 🏆 -
          <a
            href="/blog/guides"
            class="font-medium text-orange-600 hover:text-white"
          >
            Check out our weekly released Game Guides!
          </a>
        </p>
      </div>
    </div>
  </div> -->

  <div
    class="flex flex-col 2xl:flex-row items-center justify-center gap-5 py-8"
  >
    <Rewardsbanner {user} />
    <Rainbanner />
  </div>

  {#if $loggedIn}
    <Feature />
  {/if}
  <Slotlist />
  
  <OfferCategory iconUrl="/joystick.png" title="Offer Partners">
    <SplideTrack slot="items">
      <SplideSlide class="carousel-item">
        <img src="/5stars.png" alt="rating" class="absolute z-50 mt-2" />
        <Wall
          {user}
          {errorMessage}
          wallName="MM WALL"
          wallUrl="mmwall"
          logoUrl="/mmwall.svg"
          backgroundUrl="/wall-offertoro-card-bg.png"
        />
      </SplideSlide>

      <SplideSlide class="carousel-item">
        <img src="/5stars.png" alt="rating" class="absolute z-50 mt-2" />
        <Wall
          {user}
          {errorMessage}
          wallName="Torox "
          hasBonus="true"
          wallUrl="offertoro"
          logoUrl="/torox.png"
          backgroundUrl="/wall-offertoro-card-bg.png"
        />
      </SplideSlide>

      <SplideSlide class="carousel-item">
        <img src="/4stars.png" alt="rating" class="absolute z-50 mt-2" />
        <Wall
          {user}
          {errorMessage}
          wallName="AdGate"
          wallUrl="adgate"
          hasBonus="true"
          logoUrl="/AdGatemediaGlow.png"
          backgroundUrl="/wall-adgate-card-bg.png"
        />
      </SplideSlide>

      <SplideSlide class="carousel-item">
        <img src="/4stars.png" alt="rating" class="absolute z-50 mt-2" />
        <Wall
          {user}
          {errorMessage}
          wallName="Notik"
          wallUrl="notik"
          logoUrl="/notik.png"
          backgroundUrl="/wall-adscend-card-bg.png"
        />
      </SplideSlide>

      <SplideSlide class="carousel-item">
        <img src="/4stars.png" alt="rating" class="absolute z-50 mt-2" />
        <Wall
          {user}
          {errorMessage}
          wallName="Monlix"
          hasBonus="true"
          wallUrl="monlix"
          logoUrl="/monlix.svg"
          backgroundUrl="/wall-adscend-card-bg.png"
        />
      </SplideSlide>

      <SplideSlide class="carousel-item">
        <img src="/3stars.png" alt="rating" class="absolute z-50 mt-2" />
        <Wall
          {user}
          {errorMessage}
          wallName="Rev Universe"
          hasBonus="true"
          wallUrl="revu"
          logoUrl="/revu-logo-white.svg"
          backgroundUrl="/wall-revu-card-bg.png"
        />
      </SplideSlide>

      <SplideSlide class="carousel-item">
        <img src="/3stars.png" alt="rating" class="absolute z-50 mt-2" />
        <Wall
          {user}
          {errorMessage}
          wallName="MM WALL"
          wallUrl="mmwall"
          logoUrl="/mmwall.svg"
          backgroundUrl="/wall-offertoro-card-bg.png"
        />
      </SplideSlide>

      <SplideSlide class="carousel-item">
        <img src="/3stars.png" alt="rating" class="absolute z-50 mt-2" />

        <Wall
          {user}
          {errorMessage}
          wallName="AdToWall"
          wallUrl="adtowall"
          logoUrl="https://i.imgur.com/nAB252F_d.webp?maxwidth=760&fidelity=grand"
          backgroundUrl="/survey-inbrain-card-bg.png"
        />
      </SplideSlide>

      <SplideSlide class="carousel-item">
        <img src="/3stars.png" alt="rating" class="absolute z-50 mt-2" />
        <Wall
          {user}
          {errorMessage}
          wallName="Lootably"
          hasBonus="true"
          wallUrl="lootably"
          logoUrl="/lootably-logo.png"
          backgroundUrl="/wall-lootably-card-bg.png"
        />
      </SplideSlide>

      <SplideSlide class="carousel-item">
        <img src="/3stars.png" alt="rating" class="absolute z-50 mt-2" />
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
        <img src="/2stars.png" alt="rating" class="absolute z-50 mt-2" />

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

  <!-- <OfferCategory iconUrl="/survey.png" title="Survey Partners">
    <SplideTrack slot="items">
      <SplideSlide class="carousel-item ">
        <img src="/5stars.png" alt="rating" class="absolute z-50 mt-2" />
        <Wall
          {user}
          {errorMessage}
          wallName="CPX Research"
          hasBonus="true"
          wallUrl="cpxresearch"
          logoUrl="/logo-cpx-reserach-white.svg"
          backgroundUrl="/survey-cpxresearch-card-bg.png"
        />
      </SplideSlide>

      <SplideSlide class="carousel-item">
        <img src="/5stars.png" alt="rating" class="absolute z-50 mt-2" />
        <Wall
          {user}
          {errorMessage}
          wallName="Inbrain"
          hasBonus="true"
          wallUrl="inbrain"
          logoUrl="/inbrain-logo-white-colored.svg"
          backgroundUrl="/survey-inbrain-card-bg.png"
        />
      </SplideSlide>

      <SplideSlide class="carousel-item cat +l;ayou">
        <img src="/3stars.png" alt="rating" class="absolute z-50 mt-2" />
        <Wall
          {user}
          {errorMessage}
          wallName="BitLabs"
          wallUrl="bitlabs"
          logoUrl="/BitLabsWhiteLogo.png"
          backgroundUrl="/survey-bitlabs-card-bg.png"
        />
      </SplideSlide>
    </SplideTrack>
  </OfferCategory> -->

  <div class="deposit-methods-bar" />

  <Depositmethod />

  <Bets {user} />

  <slot />
</div>

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

  .deposit-methods-bar {
    margin: 50px auto 0 auto;
    max-width: 650px;
    height: 1px;
    background: linear-gradient(
      270deg,
      rgba(90, 84, 153, 0) 0%,
      #5a5499 49.47%,
      rgba(90, 84, 153, 0) 100%
    );
  }
</style>
