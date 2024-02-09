<script>
  import Icon from "@iconify/svelte";
  import tokenStore from "../../stores/token.store";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import "../../app.scss";
  import modalStore from "../../stores/signinupmodal.store";
  import loggedIn from "../../stores/loggedIn.store.js";
  import SignUpForm from "./Heading/SignUpForm.svelte";

  let modal;
  export let count;
  export let highest;

  onMount(() => {
    modalStore.subscribe((_m) => (modal = _m));
    modal = get(modalStore);
  });
  function scrollToSection() {
    const section = document.querySelector("#hidaniel");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
  let isSidebarOpen = false;

  const toggleSidebar = () => {
    isSidebarOpen = !isSidebarOpen;
  };

  const openSignUpModal = () => {
    modal.open(false); // false for sign-up
    isSidebarOpen = false; // Close the sidebar when opening the modal
  };
</script>

{#if $loggedIn === true}
  {(window.location.href = "/earn")}
{/if}
<div class="relative inset-x-0 bottom-16 z-50 cover bg-black">
  <!-- Header -->
  <header class="absolute inset-x-0 top-0 z-50 bg-[#6a1622]">
    <nav
      class="flex items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <a href="/" class="-m-1.5 p-1.5">
          <span class="sr-only">JustEarn</span>
          <img class="h-20 w-auto" src="/coin.svg" alt="logo" />
        </a>
      </div>
      <div class="flex lg:hidden">
        <button
          on:click={toggleSidebar}
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <a href="/freerobux" class="text-md font-semibold leading-6 text-white"
          >Free Robux</a
        >
        <button
          on:click={scrollToSection}
          class="text-md font-semibold leading-6 text-white">Intro</button
        >
        <a href="/faq" class="text-md font-semibold leading-6 text-white"
          >Frequently Asked</a
        >
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <button
          on:click={() => modal.open(true)}
          class="text-2xl font-extrabold leading-6 text-white"
          >Login <span aria-hidden="true">&rarr;</span></button
        >
      </div>
    </nav>
    <!-- Mobile menu, show/hide based on menu open state. -->
    <div
      class="lg:hidden"
      role="dialog"
      aria-modal="true"
      class:hidden={!isSidebarOpen}
    >
      <!-- Background backdrop, show/hide based on slide-over state. -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="fixed inset-0 z-50" on:click={toggleSidebar}></div>
      <div
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#901d2e] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <a href="/" class="-m-1.5 p-1.5">
            <span class="sr-only">JustEarn</span>
            <img class="h-8 w-auto" src="coin.svg" alt="" />
          </a>
          <button
            on:click={openSignUpModal}
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span class="sr-only">Close menu</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <button
                on:click={scrollToSection}
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-[#0E0C1D]"
                >Intro</button
              >
              <a
                href="/freerobux"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-[#0E0C1D]"
                >Free Robux</a
              >
              <a
                href="/faq"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-[#0E0C1D]"
                >Frequently Asked</a
              >
            </div>
            <div class="py-6">
              <button
                on:click={() => modal.open(true)}
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-[#0E0C1D]"
                >Login</button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <main class="bg-hi">
    <!-- Hero section -->
    <div class="relative isolate pt-14">
      <svg
        class="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg
          x="50%"
          y="-1"
          class="overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="backgroundImage"
              patternUnits="userSpaceOnUse"
              width="300"
              height="200"
            >
              <image
                href="/treasurechest.png"
                x="0"
                y="0"
                width="200"
                height="200"
              />
            </pattern>
          </defs>

          <!-- Background rectangles -->
          <rect x="-100.5" y="0" width="201" height="201" fill="#E5E7EB" />
          <!-- gray-200 equivalent -->
          <rect x="699.5" y="0" width="201" height="201" fill="#E5E7EB" />
          <rect x="499.5" y="400" width="201" height="201" fill="#E5E7EB" />
          <rect x="-300.5" y="600" width="201" height="201" fill="#E5E7EB" />

          <!-- Pattern-filled paths -->
          <path
            d="M-100.5 0h201v201h-201Z"
            stroke-width="0"
            fill="url(#backgroundImage)"
          />
          <path
            d="M699.5 0h201v201h-201Z"
            stroke-width="0"
            fill="url(#backgroundImage)"
          />
          <path
            d="M499.5 400h201v201h-201Z"
            stroke-width="0"
            fill="url(#backgroundImage)"
          />
          <path
            d="M-300.5 600h201v201h-201Z"
            stroke-width="0"
            fill="url(#backgroundImage)"
          />
        </svg>

        <rect
          width="100%"
          height="100%"
          stroke-width="0"
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        />
      </svg>
      <div
        class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40"
      >
        <div class="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <div class="flex">
            <div
              class="bg-white relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
            >
              <span class="font-semibold text-gray-900">We’re hiring</span>
              <span class="h-4 w-px bg-gray-900/10" aria-hidden="true"></span>
              <a href="/hiring" class="flex items-center gap-x-1">
                <span class="absolute inset-0" aria-hidden="true"></span>
                See open positions
                <svg
                  class="-mr-2 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <h1
            class="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-100 sm:text-6xl"
          >
            Get Paid
            <div class="options">
              <div>🎮playing games</div>
              <div>📝taking surveys</div>
              <div>🎲playing casino games</div>
              <div class="flex items-center justify-center align-middle">
                with status-earn
              </div>
              <div>...and much more</div>
            </div>
          </h1>

          <p
            class="mt-6 pb-2 text-lg font- leading-8 text-white flex align-middle justify-center"
          >
            Dive into a world of easy, exciting tasks like fun games, surveys,
            and awesome videos. Perfect for teens and adults, JustEarn is your
            go-to spot for earning cool stuff online.
            <br /> <br /> It's simple, it's fun, it's JustEarn!
          </p>
          <div class="providers">
            <div class="provider bitcoin">
              <img src="/providers/bitcoinShopLogo.svg" alt="Bitcoin Logo" />
            </div>
            <div class="provider ethereum">
              <img src="/providers/ethereumShopLogo.svg" alt="Ethereum Logo" />
            </div>
            <div class="provider litecoin">
              <img src="/providers/litecoinShopLogo.svg" alt="Litecoin Logo" />
            </div>
            <div class="provider paypal">
              <img src="/providers/paypalShopLogo.svg" alt="PayPal Logo" />
            </div>
            <div class="provider amazon">
              <img src="/providers/amazonShopLogo.svg" alt="Amazon Logo" />
            </div>
            <div class="provider steam">
              <img src="/providers/steamShopLogo.svg" alt="Steam Logo" />
            </div>
            <div class="provider apple">
              <img src="/providers/appleShopLogo.svg" alt="Apple Logo" />
            </div>
            <div class="provider google">
              <img src="/robuxtext.png" alt="robux" />
            </div>
          </div>
          <div class="mt-10 flex items-center gap-x-6">
            <button
              on:click={() => modal.open(false)}
              class="rounded-md scale-125 ml-3 bg-gray-900 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-white hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >Sign Up!</button
            >
            <button
              on:click={scrollToSection}
              class="text-sm font-semibold leading-6 text-white"
              >Learn more <span aria-hidden="true">→</span></button
            >
          </div>
        </div>
        <div
          class="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow overflow-hidden"
        >
          <svg
            viewBox="0 0 366 729"
            role="img"
            class="mx-auto w-[22.875rem] max-w-full drop-shadow-xl"
          >
            <title>App screenshot</title>
            <defs>
              <clipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
                <rect width="316" height="684" rx="36" x="25" y="25" />
              </clipPath>
            </defs>
            <path
              fill="#4B5563"
              d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
            />
            <path
              fill="#343E4E"
              d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
            />
            <image
              href="wall1.png"
              width="316"
              height="684"
              class="scale-100 w-auto h-full"
              clip-path="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)"
            ></image>
            <!-- <foreignObject
              width="316"
              height="684"
              transform="translate(24 24)"
              clip-path="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)"
            >
              <img src="wall1.png" class="scale-100 h-full w-auto" alt="" />
            </foreignObject> -->
          </svg>
        </div>
      </div>
    </div>

    <!-- Logo cloud -->
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5"
      >
        <img
          class="col-span-2 max-h-12 w-full scale-100 object-contain lg:col-span-1"
          src="adgate1.png"
          alt="adgate"
          width="158"
          height="48"
        />
        <img
          class="col-span-2 max-h-12 w-full object-contain lg:col-span-1 scale-100"
          src="inbrain-logo-white-colored.svg"
          alt="lootably"
          width="200"
          height="48"
        />
        <img
          class="col-span-2 max-h-12 w-full scale-125 object-contain lg:col-span-1"
          src="adsc.png"
          alt="adscend"
          width="158"
          height="48"
        />
        <img
          class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1 scale-90"
          src="revusvg.svg"
          alt="SavvyCal"
          width="100"
          height="6"
        />
        <img
          class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
          src="torox1.png"
          alt="bitlabs"
          width="158"
          height="48"
        />
      </div>
    </div>

    <!-- Feature section -->
    <div class="mx-auto mt-32 max-w-7xl sm:mt-56 sm:px-6 lg:px-8" id="hidaniel">
      <div
        class="relative isolate overflow-hidden bg-[#0E0C1D] px-6 py-20 sm:rounded-3xl sm:px-10 sm:py-24 lg:py-24 xl:px-24"
      >
        <div
          class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-0"
        >
          <div class="lg:row-start-2 lg:max-w-md">
            <h2
              class="text-2xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Quick and fun earnings in minutes?<br /><span
                class="text-[#FF5A5C]">Here's how</span
              >
            </h2>
            <p class="mt-6 text-md leading-8 text-gray-300">
              <span class="text-4xl font-bold text-[#FF5A5C]">1. </span><span
                class="font-bold">Explore the earn page</span
              >
              for prime offers: App Trials, Surveys, Product Ads from renowned brands.<br
              /><br /><span class="text-4xl font-bold text-[#FF5A5C]">2. </span>
              Many offers are straightforward and have paid thousands. Most can be
              <span class="font-bold">completed in 5-10 minutes.</span><br /><br
              /><span class="text-4xl font-bold text-[#FF5A5C]">3. </span>
              Earn coins per task: 100 coins equal $1. Cash out to get
              <span class="font-bold">Your Free Money!</span>
            </p>
          </div>
          <img
            src="earn.png"
            alt="Product screenshot"
            class="relative -z-20 min-w-full max-w-xl rounded-xl shadow-xl ring-1 ring-white/10 lg:row-span-4 lg:w-[64rem] lg:max-w-none"
            width="2432"
            height="1442"
          />
          <div
            class="max-w-xl lg:row-start-3 lg:mt-10 lg:max-w-md lg:border-t lg:border-white/10 lg:pt-10"
          >
            <dl
              class="max-w-xl space-y-8 text-base leading-7 text-gray-300 lg:max-w-none"
            >
              <div class="relative">
                <dd class="inline text-md whitespace-nowrap">
                  Signup to unlock other cool earning features we have to offer
                  👀<br /><br />- 150,000+ Members<br />- 170,000$+ Paid Out<br
                  />- 30,000+ Offers Completed
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div
          class="pointer-events-none absolute left-12 top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-3xl lg:bottom-[-12rem] lg:top-auto lg:translate-y-0 lg:transform-gpu"
          aria-hidden="true"
        >
          <div
            class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-25"
            style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          ></div>
        </div>
      </div>
    </div>

    <!-- Feature section -->
    <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <p
          class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Best ways to earn
        </p>
        <a
          href="https://discord.gg/justearn"
          target="_blank"
          class="font-semibold text-[#7289DA] hover:underline"
        >
          <span class="block mt-6 text-lg leading-8">
            Still confused? Join our vibrant community and let's guide you to
            making some extra cash with a smile :)
          </span>
        </a>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl
          class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3"
        >
          <div class="flex flex-col bg-white/5 p-8 pb-0 rounded-xl">
            <dt
              class="flex items-center justify-center gap-x-3 text-2xl font-semibold leading-7 text-white"
            >
              <img src="turbo.svg" alt="turbo" class="h-4 flex-none" />
              Play Games
            </dt>
            <dd
              class="mt-4 flex flex-auto justify-between flex-col text-base leading-7 text-gray-300"
            >
              <div>
                <p class="text-center">
                  Get paid to play by gaming companies seeking more players.
                  Start gaming now!
                </p>
                <p class="mt-6 text-center">
                  <button
                    on:click={() => modal.open(false)}
                    class="text-2xl font-extrabold leading-6 text-red-400"
                    >$0.5 - $120 <span aria-hidden="true">→</span></button
                  >
                </p>
              </div>
              <div class="mt-12 relative animating-images">
                <img
                  src="/img/landing/icon-1.png"
                  alt=""
                  class="absolute w-1/6 left-4 up-and-down"
                />
                <img
                  src="/img/landing/icon-2.png"
                  alt=""
                  class="absolute w-1/5 left-1/4 top-1/4 up-and-down"
                  style="animation-duration: 6s; animation-delay: 1s"
                />
                <img
                  src="/img/landing/character-1.png"
                  alt=""
                  class="absolute w-1/3 bottom-[20%] right-0 up-and-down"
                  style="animation-duration: 8s"
                />
                <img
                  src="/img/landing/screen-1.png"
                  alt=""
                  class="w-2/3 mx-auto"
                />
              </div>
            </dd>
          </div>
          <div class="flex flex-col bg-white/5 p-8 pb-0 rounded-xl">
            <dt
              class="flex items-center justify-center gap-x-3 text-2xl font-semibold leading-7 text-white"
            >
              <img src="turbo.svg" alt="turbo" class="h-4 flex-none" />
              Complete Offers
            </dt>
            <dd
              class="mt-4 flex justify-between flex-auto flex-col text-base leading-7 text-gray-300"
            >
              <div>
                <p class="text-center">
                  Earn by trying new apps from different companies. Get paid for
                  app usage!
                </p>
                <p class="mt-6 text-center">
                  <button
                    on:click={() => modal.open(false)}
                    class="text-2xl font-extrabold leading-6 text-red-400"
                    >$1.00 - $75 <span aria-hidden="true">→</span></button
                  >
                </p>
              </div>
              <div class="mt-12 relative animating-images">
                <img
                  src="/img/landing/icon-3.png"
                  alt=""
                  class="absolute w-1/6 left-4 up-and-down"
                />
                <img
                  src="/img/landing/icon-4.png"
                  alt=""
                  class="absolute w-1/6 bottom-[20%] right-6 up-and-down"
                  style="animation-duration: 6s; animation-delay: 0.5s"
                />
                <img
                  src="/img/landing/screen-2.png"
                  alt=""
                  class="w-2/3 mx-auto"
                />
              </div>
            </dd>
          </div>
          <!-- <div class="flex flex-col">
            <dt
              class="flex items-center gap-x-3 text-2xl font-semibold leading-7 text-white"
            >
              <img src="turbo.svg" alt="turbo" class="h-10 w-12 flex-none" />
              Complete Offers
            </dt>
            <dd
              class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-100"
            >
              <p class="flex-auto">
                Earn by trying new apps from different companies. Get paid for
                app usage!
              </p>
              <p class="mt-6">
                <button
                  on:click={() => modal.open(false)}
                  class="text-2xl font-extrabold leading-6 text-red-800"
                  >$1.00 - $75 <span aria-hidden="true">→</span></button
                >
              </p>
            </dd>
          </div> -->
          <div class="flex flex-col bg-white/5 p-8 pb-0 rounded-xl">
            <dt
              class="flex items-center justify-center gap-x-3 text-2xl font-semibold leading-7 text-white"
            >
              <img src="turbo.svg" alt="turbo" class="h-4 flex-none" />
              Fill Surveys
            </dt>
            <dd
              class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300"
            >
              <p class="text-center">
                Companies need your opinion to create better products and
                services. That’s why they pay for your feedback.
              </p>
              <p class="mt-6 text-center">
                <button
                  on:click={() => modal.open(false)}
                  class="text-2xl font-extrabold leading-6 text-red-400"
                  >$1.00 <span aria-hidden="true">→</span></button
                >
              </p>
              <div class="mt-12 relative animating-images">
                <img
                  src="/img/landing/icon-5.png"
                  alt=""
                  class="absolute w-[13%] left-4 up-and-down"
                />
                <img
                  src="/img/landing/icon-6.png"
                  alt=""
                  class="absolute w-[13%] bottom-[20%] right-6 up-and-down"
                  style="animation-duration: 6s; animation-delay: 0.5s"
                />
                <img
                  src="/img/landing/screen-3.png"
                  alt=""
                  class="w-full mx-auto"
                />
              </div>
            </dd>
          </div>
          <!-- <div class="flex flex-col">
            <dt
              class="flex items-center gap-x-3 text-2xl font-semibold leading-7 text-white"
            >
              <img src="turbo.svg" alt="turbo" class="h-10 w-12 flex-none" />
              Fill Surveys
            </dt>
            <dd
              class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-100"
            >
              <p class="flex-auto">
                Companies need your opinion to create better products and
                services. That’s why they pay for your feedback.
              </p>
              <p class="mt-6">
                <button
                  on:click={() => modal.open(false)}
                  class="text-2xl font-extrabold leading-6 text-red-800"
                  >$1.00 <span aria-hidden="true">→</span></button
                >
              </p>
            </dd>
          </div> -->
        </dl>
      </div>
    </div>

    <!-- Newsletter section -->
    <div class="mx-auto mt-32 max-w-7xl sm:mt-56 sm:px-6 lg:px-8">
      <div
        class="relative isolate overflow-hidden bg-[#172321] px-6 py-10 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-10"
      >
        <!-- TrustBox widget - Micro Review Count -->
        <div class="flex justify-center">
          <img
            src="trustpilot.svg"
            alt="Trustpilot logo"
            class="justify-center scale-155"
            style="opacity: 1; transform: none; filter: invert(0);"
          />
        </div>
        <!-- End TrustBox widget -->
        <p
          class="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-100"
        >
          Excellent reviews on Trustpilot from our customer<br />Hundreds of
          satisfied clients
        </p>
        <!-- Centered Notify Me Button -->
        <div class="flex justify-center pt-4">
          <a
            href="https://www.trustpilot.com/review/justearn.gg"
            class="inline-block rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            target="_blank">Visit Trustpilot</a
          >
        </div>
        <!-- SVG and other elements -->
        <svg
          viewBox="0 0 1024 1024"
          class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
          aria-hidden="true"
        >
          <!-- SVG Content -->
        </svg>
      </div>
    </div>

    <!-- Testimonials section -->
    <div class="relative isolate mt-32 sm:mt-56 sm:pt-32">
      <svg
        class="absolute inset-0 -z-10 hidden h-full w-full stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] sm:block"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="55d3d46d-692e-45f2-becd-d8bdc9344f45"
            width="200"
            height="200"
            x="50%"
            y="0"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="0" class="overflow-visible fill-gray-50">
          <path
            d="M-200.5 0h201v201h-201Z M599.5 0h201v201h-201Z M399.5 400h201v201h-201Z M-400.5 600h201v201h-201Z"
            stroke-width="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          stroke-width="0"
          fill="url(#55d3d46d-692e-45f2-becd-d8bdc9344f45)"
        />
      </svg>
      <div class="relative">
        <div
          class="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
          aria-hidden="true"
        >
          <div
            class="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#5F141E] to-[#0E0C1D]"
            style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          ></div>
        </div>
        <div
          class="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-8 opacity-25 blur-3xl xl:justify-end"
          aria-hidden="true"
        >
          <div
            class="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#5F141E] to-[#0E0C1D] xl:ml-0 xl:mr-[calc(50%-12rem)]"
            style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          ></div>
        </div>
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-xl sm:text-center">
            <h2
              class="text-3xl sm:-ml-52 sm:text-6xl font-bold leading-8 tracking-tight text-red-600"
            >
              Testimonials
            </h2>
            <p
              class="text-lg mt-2 font-semibold tracking-tight sm:text-4xl text-white"
            >
              We have put a smile on thousands
            </p>
          </div>
          <div
            class="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4"
          >
            <figure
              class="col-span-2 hidden sm:block sm:rounded-2xl sm:bg-white sm:shadow-lg sm:ring-1 sm:ring-gray-900/5 xl:col-start-2 xl:row-end-1"
            >
              <blockquote
                class="p-6 text-lg font-semibold leading-8 tracking-tight text-gray-900"
              >
                <p>
                  “JustEarn revolutionized the world of earning websites with a
                  burst of excitement and innovation! Our platform blends
                  earning opportunities with pure fun, offering a variety of
                  rewards and thrilling, community-driven events. ”
                </p>
              </blockquote>
              <figcaption
                class="flex items-center gap-x-4 border-t border-gray-900/10 px-6 py-4"
              >
                <img
                  class="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src="hidaniel.webp"
                  alt=""
                />
                <div class="flex-auto">
                  <div class="font-semibold">Co-Founder</div>
                  <div class="text-gray-600">@hidaniel</div>
                </div>
                <img
                  class="h-10 w-auto flex-none scale-150"
                  src="download.png"
                  alt=""
                />
              </figcaption>
            </figure>
            <div class="space-y-8 xl:contents xl:space-y-0">
              <div class="space-y-8 xl:row-span-2">
                <figure
                  class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                >
                  <blockquote class="text-gray-900">
                    <p>
                      “I co-founded JustEarn as nothing puts a smile on my face
                      more than seeing others earn quick cash.<br /><br />It's
                      simple, it's fun, it's JustEarn”
                    </p>
                  </blockquote>
                  <figcaption class="mt-6 flex items-center gap-x-4">
                    <img
                      class="h-12 w-12 rounded-full bg-gray-50"
                      src="ighost.webp"
                      alt=""
                    />
                    <div>
                      <div class="font-semibold">Co-Founder</div>
                      <div class="text-gray-600">@ighostfull</div>
                    </div>
                  </figcaption>
                </figure>

                <!-- More testimonials... -->
              </div>
              <div class="space-y-8 xl:row-start-1">
                <figure
                  class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                >
                  <blockquote class="text-gray-900">
                    <p>
                      “I initially joined as a user, making 200$ a month as a
                      college student by completing a couple of surveys per day!<br
                      /><br />Literally anyone can do this”
                    </p>
                  </blockquote>
                  <figcaption class="mt-6 flex items-center gap-x-4">
                    <img
                      class="h-10 w-10 rounded-full bg-gray-50"
                      src="coolcat.gif"
                      alt=""
                    />
                    <div>
                      <div class="font-semibold">Justearn Admin</div>
                      <div class="text-gray-600">@itscoolcat</div>
                    </div>
                  </figcaption>
                </figure>

                <!-- More testimonials... -->
              </div>
            </div>
            <div class="space-y-8 xl:contents xl:space-y-0">
              <div class="space-y-8 xl:row-start-1">
                <figure
                  class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                >
                  <blockquote class="text-gray-900">
                    <p>
                      “JustEarn has been a real lifesaver, especially during
                      those times when I found myself strapped for cash. I
                      joined the server as a joke 2 years ago and have been
                      earning since!”
                    </p>
                  </blockquote>
                  <figcaption class="mt-6 flex items-center gap-x-4">
                    <img
                      class="h-12 w-12 rounded-full bg-gray-50"
                      src="insanity.jpg"
                      alt=""
                    />
                    <div>
                      <div class="font-semibold">Justearn User</div>
                      <div class="text-gray-600">@Insanity#8384</div>
                    </div>
                  </figcaption>
                </figure>

                <!-- More testimonials... -->
              </div>
              <div class="space-y-8 xl:row-span-2">
                <figure
                  class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                >
                  <blockquote class="text-gray-900">
                    <p>
                      “Justearn let me make extra money despite being from
                      Philipines. I could choose tasks I liked, and it was
                      flexible with my schedule. It helped me earn some extra
                      cash and try out different things.”
                    </p>
                  </blockquote>
                  <figcaption class="mt-6 flex items-center gap-x-4">
                    <img
                      class="h-10 w-10 rounded-full bg-gray-50"
                      src="johnny.webp"
                      alt=""
                    />
                    <div>
                      <div class="font-semibold">Elite Earner</div>
                      <div class="text-gray-600">@johnnydots</div>
                    </div>
                  </figcaption>
                </figure>

                <!-- More testimonials... -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<style lang="scss">
  .text-gradient {
    background: linear-gradient(to right, black, red);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .options {
    position: relative;
    margin: 0 auto 19px auto;
    height: 41px;
    overflow: hidden;

    @media only screen and (min-width: 701px) {
      height: 66px;
      z-index: 4;
    }

    @media only screen and (min-width: 1400px) {
      width: 500px;
    }

    @media only screen and (min-width: 1600px) {
      width: 530px;
    }

    @media only screen and (min-width: 1200px) {
      margin-left: 0;
      margin-right: 0;
      text-align: left;
    }

    @media only screen and (max-width: 1399px) {
      max-width: 400px;
    }

    & > div {
      position: absolute;
      top: 0;
      left: 100%;
      display: inline-block;
      width: 100%;
      height: 100%;
      font-weight: 400;
      font-size: 27px;
      text-align: center;
      color: #fff;

      @media only screen and (min-width: 701px) {
        font-size: 30px;
      }

      @media only screen and (min-width: 1400px) {
        font-size: 40px;
      }

      @media only screen and (min-width: 1200px) {
        margin-left: 0;
        margin-right: 0;
        text-align: left;
      }

      animation: text-swipe;
      animation-duration: 10s;
      animation-iteration-count: infinite;
      animation-timing-function: ease;

      @keyframes text-swipe {
        0% {
          left: 100%;
        }

        2.5%,
        20% {
          left: 0;
        }

        22.5%,
        100% {
          left: -100%;
        }
      }

      &:nth-child(2) {
        animation-delay: 2s;
      }
      &:nth-child(3) {
        animation-delay: 4s;
      }
      &:nth-child(4) {
        animation-delay: 6s;
      }
      &:nth-child(5) {
        animation-delay: 8s;
      }
    }
  }

  div.providers {
    flex-wrap: wrap;
    gap: 4px;
    flex-direction: row;
    display: flex;
    max-width: 340px;

    & > .provider {
      position: relative;
      width: calc(25% - 3px);
      height: 45px;
      border-radius: 2px;
      display: inline-flex;
      min-width: 75px;

      &.bitcoin {
        background: linear-gradient(180deg, #f9aa4b -0.02%, #f7931a 99.99%);
        box-shadow: 0 10px 15px rgb(0 0 0 / 15%);
        & > img {
          height: 35px;
        }
      }
      &.ethereum {
        background: linear-gradient(185.23deg, #b1b1ff -3.47%, #778dff 70.67%);
        box-shadow: 0 10px 15px rgb(0 0 0 / 15%);
        & > img {
          height: 35px;
        }
      }
      &.litecoin {
        background: linear-gradient(180deg, #a1a4c9 0, #7e809a 70%);
        box-shadow: 0 10px 15px rgb(0 0 0 / 15%);
        & > img {
          height: 32px;
        }
      }
      &.paypal {
        background: linear-gradient(342.04deg, #263b80 -75.71%, #25bcff 135.9%);
        & > img {
          width: 55px;
        }
      }
      &.amazon {
        background: #11171e;
        box-shadow: 0 10px 15px rgb(0 0 0 / 15%);
        & > img {
          width: 56px;
        }
      }
      &.steam {
        background: linear-gradient(
          336.89deg,
          #131739 -26.71%,
          #4b4d8f 107.56%
        );
        box-shadow: 0 10px 15px rgb(0 0 0 / 15%);
        & > img {
          height: 100%;
          width: 85px;
        }
      }
      &.apple {
        background: linear-gradient(
          112.11deg,
          #ff5b53 -9.59%,
          #9850fa 54.58%,
          #2cc9f8 117.99%
        );
        box-shadow: 0 10px 15px rgb(0 0 0 / 15%);
        & > img {
          height: 27px;
        }
      }
      &.google {
        background: #fff;
        box-shadow: 0 10px 15px rgb(0 0 0 / 15%);
        & > img {
          width: 80px;
        }
      }

      & > img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-style: none;
      }
    }
  }

  .up-and-down {
    animation: upAndDown 5s ease-in-out 0s infinite;
  }

  @keyframes upAndDown {
    // transform: translate
    // 0% {
    //   transform: translateY(0px);
    // }

    50% {
      transform: translateY(25%);
    }
  }
</style>
