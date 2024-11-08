<script>
  import { onMount } from "svelte";
  import { PUBLIC_WS_URL, PUBLIC_NODE_ENV } from "$env/static/public";
  import "../app.scss";
  import Chat from "../components/Chat.svelte";
  import Cookies from "../components/Cookies.svelte";
  import Footer from "../components/Footer.svelte";
  import Header from "../components/Header.svelte";
  import LiveEvents from "../components/LiveEvents.svelte";
  import MobileNavigation from "../components/MobileNavigation.svelte";
  import Navigation from "../components/Navigation.svelte";
  import SignInUpModal from "../components/SignInUpModal.svelte";
  import { page } from "$app/stores";

  import onlineStore from "./../stores/online.store.js";
  import wsStore from "./../stores/ws.store.js";
  import modalStore from "../stores/signinupmodal.store";
  import { get } from "svelte/store";
  import tokenStore from "../stores/token.store.js";
  import loggedInStore from "../stores/loggedIn.store.js";
  import liveOffers from "../stores/liveOffers.store";

  import { browser } from "$app/environment";

  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  });

  let modal;
  let loadedModal = null;

  onMount(() => {
    loadedModal = modal;
    modalStore.set(modal);

    if (get(wsStore) === false && !get(page).route.id?.startsWith("/admin")) {
      const makeConnection = () => {
        var typeListeners = {};

        const websocket = new WebSocket(PUBLIC_WS_URL);

        websocket.onopen = () => {
          if (get(loggedInStore)) {
            websocket.send(
              JSON.stringify({
                type: "authenticate",
                token: get(tokenStore),
              })
            );
          } else {
            tokenStore.subscribe((token) => {
              if (token !== "") {
                websocket.send(
                  JSON.stringify({
                    type: "authenticate",
                    token: get(tokenStore),
                  })
                );
              }
            });
          }
        };

        websocket.onmessage = (e) => {
          const data = JSON.parse(e.data.toString());
          // console.log(data);

          if (data.type === "ping") {
            websocket.send(
              JSON.stringify({
                type: "pong",
              })
            );
          }

          if (data.type === "online") {
            onlineStore.set(data.online);
          }

          if (data.type === "newOfferDone") {
            liveOffers.update((prev) => {
              for (var i = 0; i < data.newOfferDone.length; i++) {
                prev.unshift(data.newOfferDone[i]);
              }
              return prev;
            });
          }

          if (typeof typeListeners[data.type] !== "undefined") {
            typeListeners[data.type].forEach((cb) => cb(data));
          }
        };

        websocket.onclose = (e) => {
          console.log(
            "Socket is closed. Reconnect will be attempted in 1 second.",
            e.reason
          );
          setTimeout(function () {
            makeConnection();
          }, 1000);
        };

        websocket.onerror = (err) => {
          console.error(
            "Socket encountered error: ",
            err.message,
            "Closing socket"
          );
          websocket.close();
        };

        wsStore.set({
          server: websocket,
          on: (type, cb) => {
            if (typeof typeListeners[type] === "undefined") {
              typeListeners[type] = [cb];
            } else {
              typeListeners[type].push(cb);
            }
          },
          send: async (msg) => {
            if (typeof msg !== "string") {
              msg = JSON.stringify(msg);
            }
            try {
              websocket.send(msg);
            } catch (e) {
              await new Promise((resolve) => setTimeout(resolve, 500));
            }
          },
        });
      };
      makeConnection();
    }
  });
</script>

<QueryClientProvider client={queryClient}>
  {#if !$page.route.id?.startsWith("/wall/") && !$page.route.id?.startsWith("/admin")}
    <SignInUpModal bind:this={modal} />
    <Header modal={loadedModal} />
    {#if $page.route.id === "/"}
      <!-- This block will only render the Footer for the homepage ("/") -->
      <slot />
      <Footer />
      <!-- <Header modal={loadedModal} /> -->
      <Cookies />
      <!-- <SignInUpModal bind:this={modal} /> -->
    {:else}
      <!-- This block renders for all other pages except "/wall/" and "/admin" prefixes -->
      <!-- <Header modal={loadedModal} /> -->
      <!-- <LiveEvents /> -->
      <Chat />
      <Navigation />
      <MobileNavigation />
      <!-- <SignInUpModal bind:this={modal} /> -->
      <Cookies />

      <div class="site">
        <slot />

        <!-- {$page.route.id} -->
        {#if !$page.route.id?.startsWith("/chat") && !$page.route.id?.startsWith("/admin")}
          <Footer />
        {/if}
      </div>
    {/if}
  {:else}
    <!-- This slot renders for pages starting with "/wall/" and "/admin" -->
    <slot />
  {/if}
</QueryClientProvider>

<style lang="scss">
  @import "../variables.scss";

  div.site {
    transition: 0.25s;
    padding-top: calc($header-height);
    min-height: 100%;

    @media only screen and (min-width: 1200px) {
      margin-left: $nav-width;
    }

    @media only screen and (max-width: 1199px) {
      margin-bottom: 74px;
    }
  }
</style>
