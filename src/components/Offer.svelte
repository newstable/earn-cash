<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import "../pro.css";
  import "../animate.min.css";

  export let offerUrl = "";
  export let offerImage =
    "https://d1mys92jzce605.cloudfront.net/icons/campaign_1f957e048ad97a366479d6ee69af822feae3a37d.png";

  export let android = true;
  export let apple = true;
  export let computer = true;

  // export let dollars = null;
  // export let cents = null;
  export let currencyAward;

  let dollars = Math.floor(currencyAward / 100);
  let cents = parseInt(currencyAward % 100);

  let userRecievingAmount =
    dollars * 70 + (cents !== "00" ? (parseInt(cents) * 70) / 100 : 0);

  // $: console.log(dollars, cents, userRecievingAmount);

  export let type = "NONE"; // GAME / CASINO / SIGN UP / APP / QUIZ / FREE TRIAL / PURCHASE / OTHER / NONE

  if (dollars == null) {
    dollars = 0;
  }

  if (cents == null) {
    cents = 0;
  }

  if (cents <= 9) {
    cents = "0" + cents.toString();
  }

  var color = "#545775";
  switch (type) {
    case "GAME":
      color = "#6c5dd3";
      break;
    case "CASINO":
      color = "#d3b95d";
      break;
    case "SIGN UP":
      color = "#62a87c";
      break;
    case "APP":
      color = "#059fdb";
      break;
    case "QUIZ":
      color = "#5dc4d3";
      break;
    case "FREE TRIAL":
      color = "#c25dd3";
      break;
    case "PURCHASE":
      color = "#d3805d";
  }

  export let title = "";
  export let description = "";

  let isPopupOpen = false;

  // Function to toggle the popup visibility
  function togglePopup() {
    // console.log("Toggle popup function called");
    isPopupOpen = !isPopupOpen;

    // Delayed code execution
    setTimeout(() => {
      const popupOverlay = document.getElementById("popupOverlay");

      if (popupOverlay) {
        // Move the popup overlay to the top of the DOM
        document.body.appendChild(popupOverlay);
      } else {
        // console.error("Popup overlay element not found.");
      }
    }, 0); // Delay for 0.1 seconds (100 milliseconds)
  }

  function closePopup() {
    isPopupOpen = false;
  }

  onMount(() => {
    // Additional setup code or actions when the component mounts can be added here.
  });

  function preventDefault(event) {
    event.preventDefault();
  }
</script>

<head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600&display=swap"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Public Sans:wght@300&display=swap"
  />

  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
</head>

<a
  class="offer"
  href={offerUrl}
  target="_blank"
  rel="noreferrer"
  on:click={preventDefault}
>
  <div>
    <div class="container">
      <div class="container">
        <img src={offerImage} alt="Offer" />
        <div class="devices">
          <div class="big">
            {#if android}
              <Icon icon="uim:android" color="white" width="20" height="20" />
            {/if}
            {#if computer}
              <Icon
                icon="mingcute:computer-line"
                color="white"
                width="20"
                height="20"
              />
            {/if}
            {#if apple}
              <Icon icon="uim:apple" color="white" width="20" height="20" />
            {/if}
          </div>
          <div class="small">
            {#if android}
              <Icon icon="uim:android" color="white" width="14" height="14" />
            {/if}
            {#if computer}
              <Icon
                icon="mingcute:computer-line"
                color="white"
                width="14"
                height="14"
              />
            {/if}
            {#if apple}
              <Icon icon="uim:apple" color="white" width="14" height="14" />
            {/if}
          </div>
        </div>

        <div class="earn-box-cover-action-overlay" />

        <div
          role="button"
          tabindex="0"
          class="earn-box-cover-action"
          on:click={togglePopup}
          on:keydown={togglePopup}
        >
          <div class="earn-box-play-button">
            <img src="/play-offer.svg" alt="Play icon" />
          </div>
          <p class="earn-box-cover-action-text">Start offer</p>
        </div>
      </div>

      <div class="text">
        <div class="heading">
          {title}
        </div>
        <div class="sub">
          {description}
        </div>
      </div>

      <div class="footer">
        <div class="amount">
          <div class="amount">
            ${(userRecievingAmount / 100).toFixed(2)}
            <!-- ${dollars}{#if cents !== "00"}.{/if} -->
            <!-- {dollars * 70 + (cents !== "00" ? (parseInt(cents) * 70) / 100 : 0)} -->
          </div>
          <!-- {#if cents !== "00"}
            <div class="decimals">{cents}</div>
          {/if} -->
        </div>
        {#if type !== "NONE"}
          <div class="category" style="background: {color}">
            {type}
          </div>
        {/if}
      </div>
    </div>
  </div>
</a>

{#if isPopupOpen}
  <div
    class="popup-overlay animate__animated animate__fadeIn"
    id="popupOverlay"
    style="display: {isPopupOpen ? 'block' : 'none'}"
  >
    <div class="popup-content">
      <div class="frame-parent">
        <section class="frame-child">
          <div class="steps-parent">
            <div class="steps">Steps:</div>
            <div class="complete-a-survey"><b>1:</b>Click On Start Offer</div>
            <div class="complete-a-survey1">
              <b>2:</b>Guidance will be provided
            </div>
            <div class="complete-a-survey2">
              <b>3:</b>Earn Points by Completing it
            </div>
          </div>

          <div class="description-parent">
            <div class="deskscription">Description</div>
            <div class="play-diamond-treasure-container">
              <p class="play-diamond-treasure">
                {description}
              </p>
            </div>
          </div>

          <div class="rectangle-parent">
            <div class="frame-item"></div>
            <div class="frame-inner"></div>
            <div class="line-div"></div>
            <div class="game-parent">
              <div class="game">{type}</div>
              <div class="categoryboxers">
                <p class="play-diamond-treasure">Category</p>
              </div>
            </div>
            <div class="ayetstudios-parent">
              <div class="ayetstudios">AyetStudios</div>
              <div class="provider">
                <p class="play-diamond-treasure">Provider</p>
              </div>
            </div>
            <div class="not-started-parent">
              <div class="ayetstudios">Not started</div>
              <div class="status">Status</div>
            </div>
          </div>

          <section class="frame-group">
            <div class="faucetify-coin-small-1-parent">
              <img class="faucetify-coin-small-1-icon" alt="" src="/coin.png" />
              <div class="div">
                {userRecievingAmount}
              </div>
            </div>
            <img class="rectangle-icon" alt="" src={offerImage} />
            <img class="lootably-1-icon" alt="" src="/lootably.png" />
            <h1 class="theoremreach" id="hh1s">{title}</h1>
            <div class="ellipse-parent">
              <div class="ellipse-div"></div>
              <div
                class="x close-popup-button"
                id="closePopup"
                on:click={closePopup}
              >
                &#215;
              </div>
            </div>
          </section>
        </section>

        <div class="start-offer-container">
          <a href={offerUrl} class="start-offer-button" target="_blank"
            >Start Offer</a
          >
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  a.offer {
    text-decoration: none;
    min-width: 0;

    & > div {
      min-width: 20px;
      min-height: 50px;
      background: #222121;
      border-radius: 5px;
      position: relative;
      width: 100%;

      & > div.container {
        background: #222121;
        position: relative;
        height: 100%;
        transition: all 0.3s ease-in-out;
        padding: 12px;
        border-radius: 5px;

        &:hover {
          background: #322d2d;

          & > div.container {
            div.earn-box-cover-action-overlay {
              opacity: 1;
            }
            div.earn-box-cover-action {
              opacity: 1;
            }
          }
        }

        & > div.container {
          aspect-ratio: 1;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2e2e42;
          position: relative;
          overflow: hidden;
          border-radius: 6px;

          & > div.earn-box-cover-action-overlay {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(20px);
          }

          & > div.earn-box-cover-action {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            flex-direction: column;
            align-items: center;
            justify-content: center;

            & > div.earn-box-play-button {
              width: 40px;
              height: 40px;
              background: rgba(255, 90, 92, 0.2);
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 10px;
              border-radius: 50%;

              & > img {
                height: 15px;
                width: 12px;
                vertical-align: bottom;
              }
            }

            & > p.earn-box-cover-action-text {
              margin: 0;
              color: white;
              font-size: 12px;
              font-weight: 500;
            }
          }

          & > img {
            display: flex;
            object-fit: cover;
            aspect-ratio: 1;
            width: 100%;
            vertical-align: bottom;
          }

          & > .devices {
            display: flex;
            align-items: center;
            position: absolute;
            top: 4px;
            right: 4px;
            gap: 4px;
            background: rgba(30, 30, 46, 0.6);
            border-radius: 14px;
            height: 28px;
            padding: 6px 14px;

            @media only screen and (max-width: 700px) {
              .big {
                display: none;
              }
              .small {
                display: inherit;
              }
            }

            @media only screen and (min-width: 700px) {
              .big {
                display: inherit;
              }
              .small {
                display: none;
              }
            }
          }
        }

        div.text {
          inset: 0;
          color: #fff;
          margin-top: 12px;
          flex: 1;

          & > div.heading {
            font-size: 14px;
            font-weight: 500;
            flex: 1;
            font-style: normal;
            color: #a9a9ca;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          & > div.sub {
            font-size: 11px;
            height: 16px;
            overflow: hidden;
            font-style: normal;
            color: #a9a9ca;
            opacity: 0.6;
            margin-top: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        div.footer {
          display: flex;
          justify-content: space-between;
          margin-top: 12px;
          align-items: center;

          &:hover > div.amount {
            width: 0;
            overflow: hidden;
          }

          & > div.amount {
            position: relative;
            z-index: 0;
            white-space: nowrap;
            flex: none;
            display: flex;
            align-items: end;
            color: #fff;
            font-weight: 600;

            & > div.amount {
              position: relative;
              font-size: 15px;
              line-height: 16px;
            }

            & > div.decimals {
              font-size: 10px;
              line-height: 12px;
            }
          }

          & > div.category {
            margin-left: 4px;
            border-radius: 8px;
            padding: 2px 6px;
            font-size: 10px;
            font-weight: 700;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: white;
            text-transform: uppercase;
          }
        }
      }
    }
  }
</style>
