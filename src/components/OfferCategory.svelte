<script>
    import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
    import OfferCategory from "./OfferCategory.svelte";
    import Offer from './Offer.svelte';
    import "../app.scss";
    import '@splidejs/svelte-splide/css';
    import Icon from '@iconify/svelte';

    export let iconUrl = "";
    export let title = "";
	import '../pro.css';
	
	
	  let isPopupOpen = false;

  // Function to toggle the popup visibility
function togglePopup() {
  console.log('Toggle popup function called');
  isPopupOpen = !isPopupOpen;
}

  function closePopup() {
    isPopupOpen = false;
  }
  
  
</script>

{#if isPopupOpen}
   <div class="popup-overlay" id="popupOverlay" style="display: {isPopupOpen ? 'block' : 'none'}">
    <div class="popup-content">
      <div class="frame-parent">
        <section class="frame-child">
          <div class="steps-parent">
            <div class="steps">Steps:</div>
            <div class="complete-a-survey"><b>1:</b>Click On Start Offer</div>
            <div class="complete-a-survey1"><b>2:</b>Guidance will be provided</div>
            <div class="complete-a-survey2"><b>3:</b>Earn Points by Completing it</div>
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
              <img class="faucetify-coin-small-1-icon" alt="" src="/coin.png"/>
              <div class="div">{dollars}</div>
            </div>
            <img class="rectangle-icon" alt="" src="{offerImage}" />
            <img class="lootably-1-icon" alt="" src="/lootably.png" />
            <h1 class="theoremreach" id="hh1s">{title}</h1>
            <div class="ellipse-parent">
              <div class="ellipse-div"></div>
              <div class="x close-popup-button" id="closePopup" on:click={closePopup}>&#215;</div>
            </div>
          </section>
        </section>

        <div class="start-offer-container">
          <a href="{offerUrl}" class="start-offer-button">Start Offer</a>
        </div>
      </div>
    </div>
  </div>
{/if}

<div class="category">
    <div class="header">
        <div class="icon">
            <img src={iconUrl} alt="category icon"/>
        </div>
        <div class="title">{title}</div>
        <div class="right">
            <slot name="right"/>
        </div>
    </div>

    <div class="container">
        <Splide hasTrack={false} autowidth={true} options={{
            perPage: 15,
            gap: 10,
            pagination: false,
            breakpoints: {

                2475: {
                    perPage: 14
                },
                2310: {
                    perPage: 13
                },
                2145: {
                    perPage: 12
                },
                1980: {
                    perPage: 11
                },
                1815: {
                    perPage: 10
                },
                1650: {
                    perPage: 9
                },
                1485: {
                    perPage: 8
                },
                1320: {
                    perPage: 7
                },
                1155: {
                    perPage: 6
                },
                990: {
                    perPage: 5
                },
                825: {
                    perPage: 4
                },
                600: {
                    perPage: 3
                }
            }
        }}>
            <slot name="items"/>

            <div class="splide__arrows">
                <button class="splide__arrow splide__arrow--prev">
                    <Icon icon="material-symbols:arrow-back-ios-new" color="#a9a9ca" width="12" height="12" rotate={2}/>
                </button>
                <button class="splide__arrow splide__arrow--next">
                    <Icon icon="material-symbols:arrow-back-ios-new" color="#a9a9ca" width="12" height="12" rotate={2}/>
                </button>
            </div>
        </Splide>
    </div>
</div>

<style lang="scss">
    @import "../variables.scss";

    .splide__arrow {
        border-radius: 6px;
        height: 32px;
        width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        top: -50px;
        background: #242537;
        box-shadow: 0 2px 0 rgb(36 37 55 / 40%);
        transform: none;
        border: 0;

        &.splide__arrow--prev {
            right: 40px;
            left: initial;
        }

        &.splide__arrow--next {
            right: 0;
        }

        &:disabled {
            opacity: .3;
        }
    }

    div.container {
        margin-top: 20px;
    }

    div.header {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;

        & > .icon {
            margin-right: 12px;
            display: flex;
            align-items: center;

            & > img {
                width: 15px;
            }
        }

        & > .title {
            color: #fff;
            flex: 1;
            font-style: normal;
            font-weight: 700;
            font-size: 20px;
        }

        & > .right {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-right: 90px;
        }
    }

    div.category {
        position: relative;
        background: #232121;
        padding: calc($earn-page-padding * 0.7) $earn-page-padding 30px $earn-page-padding;
        min-height: 185px;
    }
</style>