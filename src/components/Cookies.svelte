<script>
  import cookieStore from "./../stores/cookie.store.js";
  import { fly } from "svelte/transition";

  import "../app.scss";
  import { onMount } from "svelte";
  import { getCookie } from "../lib/cookies.js";

  let closed = false;
  const close = () => (closed = true);

  const accept = () => {
    close();
    cookieStore.set(true);
  };

  const reject = () => {
    close();
    cookieStore.set(true); // Set the cookieStore to true
    window.location.href = "/privacy"; // Redirect to the /privacy page
  };

  onMount(() => {
    const cookies = getCookie("cookies");
    if (cookies === null) return;

    close();
    cookieStore.set(true);
  });
</script>

{#if !closed}
  <div
    class="cookie"
    transition:fly={{
      y: 200,
    }}
  >
    <div class="title">🍪 We use cookies!</div>
    <div class="text">
      Hi, this website uses essential cookies to ensure its proper operation and
      tracking cookies to understand how you interact with it. The latter will
      be set only after consent.
    </div>

    <div class="buttons">
      <button on:click={accept}>Yes, I'm happy!</button>
      <button on:click={reject}>Learn More</button>
    </div>
  </div>
{/if}

<style lang="scss">
  @import "../variables.scss";

  div.cookie {
    position: fixed;
    z-index: 1000000;

    font-size: 16px;
    font-weight: 400;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    color: #d8e5ea;

    display: block;
    opacity: 1;
    transform: scale(1);
    visibility: visible;
    right: auto;
    left: 1.25em;
    bottom: 1.25em;
    transition:
      visibility 0.25s linear,
      opacity 0.25s ease,
      transform 0.25s ease;
    padding: 1.1em 1.8em 1.4em 1.8em;

    background: #4a4845;
    max-width: 24.2em;
    width: 100%;
    box-shadow: 0 0.625em 1.875em rgb(2 2 3 / 28%);
    border-radius: 0.35em;

    @media screen and (max-width: 688px) {
      max-width: 100%;
      margin: 0;
      padding: 1.4em;
      bottom: 1em;
      top: auto;
      left: 1em;
      right: 1em;
      width: auto;
    }

    & > .title {
      margin-bottom: 0.7em;
      font-size: 1.05em;
      font-weight: 600;
    }

    & > .text {
      color: white;
      font-size: 0.9em;
      font-size: 14px;
        font-weight: 500;
      line-height: 1.5em;
    }

    & > .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 1.4em;
      font-size: 14px;
        font-weight: 500;
      gap: 10px;

      @media screen and (max-width: 688px) {
        flex-direction: column;
      }

      & > button {
        color: #d8e5ea;
        background: #201717;
        padding: 1em 1.7em;
        display: inline-block;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        user-select: none;
        text-align: center;
        border-radius: 4px;
        flex: 1;

        transition: background-color 0.25s ease !important;
        font-weight: 600;
        appearance: none;

        border: none;

        &:first-child {
          color: #000;
          background: $active-color;
        }
      }
    }
  }
</style>
