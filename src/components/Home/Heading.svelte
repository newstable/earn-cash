<script>
    import Icon from '@iconify/svelte';

    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import "../../app.scss";
    import modalStore from "../../stores/signinupmodal.store";
    import loggedIn from '../../stores/loggedIn.store.js';
    import SignUpForm from './Heading/SignUpForm.svelte';

    let modal;
    export let count;
    export let highest;

    onMount(() => {
        modalStore.subscribe((_m) => modal = _m);
        modal = get(modalStore);
    });
</script>



<div class="heading" class:loggedin={$loggedIn}>
    {#if $loggedIn}
        <img src="/all.svg" alt="Ipads" class="ipad"/>
        <img src="/macbook.png" alt="Macbook" class="macbook"/>
    {/if}
    <div class="about">
        <div class="about">
            <div class="title">Get paid for</div>

            <div class="options">
                <div>playing games</div>
                <div>testing websites</div>
                <div>taking surveys</div>
                <div>opening a bank account</div>
                <div>much more</div>
            </div>

            <div class="earn-up-to">
                Earn up to
                <span>{(highest/100).toLocaleString(undefined, { style: "currency", currency: "USD", minimumFractionDigits: 2 })}</span>
                per offer
            </div>

            <div class="available-offer">
                {count} Offers available
            </div>

            {#if !$loggedIn}
                <div class="offers-in-mobile-block"/>

                <div class="cashout-label">
                    Yesterday users cashed out
                </div>

                <div class="cashout-info">
                    <span>$3,645</span>
                </div>

                <div>
                    <button class="sign-up-now" on:click={() => modal.open(false)}>Sign up now</button>
                </div>
            {/if}
        </div>

        {#if !$loggedIn}
            <div class="review-info">
  <a class="container" href="https://www.trustpilot.com/review/justearn.gg">
    <img class="badge" src="./shape.svg" alt="Trustpilot Certified Badge">
    <p>Trustpilot Certified</p>
  </a>
  </div>


            <div class="earn-or-signup-btn-block">
                <button on:click={() => modal.open(false)}>Sign up now</button>
            </div>

            <div class="statistics">
                <div class="item">
                    <div class="heading">
                        <Icon icon="mdi:stopwatch-check-outline" color="#ff5a5c" width="18" height="18" />
                        <div>0h 17m 16s</div>
                    </div>
                    <div class="description">
                        Average time until user makes first cashout
                    </div>
                </div>
                <div class="item">
                    <div class="heading">
                        <Icon icon="wpf:coins" color="#ff5a5c" width="18" height="18" />
                        <div>$ 6.62</div>
                    </div>
                    <div class="description">
                        Average money earned by users yesterday
                    </div>
                </div>
            </div>

            <div class="providers">
                <div class="provider bitcoin">
                    <img src="/providers/bitcoinShopLogo.svg" alt="Bitcoin Logo">
                </div>
                <div class="provider ethereum">
                    <img src="/providers/ethereumShopLogo.svg" alt="Ethereum Logo">
                </div>
                <div class="provider litecoin">
                    <img src="/providers/litecoinShopLogo.svg" alt="Litecoin Logo">
                </div>
                <div class="provider paypal">
                    <img src="/providers/paypalShopLogo.svg" alt="PayPal Logo">
                </div>
                <div class="provider amazon">
                    <img src="/providers/amazonShopLogo.svg" alt="Amazon Logo">
                </div>
                <div class="provider steam">
                    <img src="/providers/steamShopLogo.svg" alt="Steam Logo">
                </div>
                <div class="provider apple">
                    <img src="/providers/appleShopLogo.svg" alt="Apple Logo">
                </div>
                <div class="provider google">
                    <img src="/providers/googleplayShopLogo.svg" alt="Google Play Logo">
                </div>
            </div>

        {:else}

            <div class="earn-btn-block">
                <a href="/earn">Start Earning</a>
            </div>

        {/if}
    </div>

    {#if !$loggedIn}
        <SignUpForm/>
    {/if}
</div>

<style lang="scss">
    @import "../../variables.scss";

    img.ipad {
        position: absolute;
        top: -40px;
        left: -10px;
        width: 26%;
        max-width: 500px;
    }
    img.macbook {
        position: absolute;
        top: -23px;
        right: -10px;
        width: 29%;
        max-width: 560px;
    }

    .heading.loggedin {
        max-width: 100%;
        width: 100%;

        @media only screen and (min-width: 1200px) {
            padding-top: 74px;
            display: block;
        }

        & > .about {
            width: 100%;

            & > .about {
                text-align: center;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;

                & > .title {
                    text-align: center;
                }

                & > .options {
                    text-align: center;
                    width: 100%;
                    max-width: 400px;

                    & > div {
                        text-align: center;
                    }
                }
            }
        }
    }

    button.sign-up-now {
        position: relative;
        display: inline-block;
        width: 22%;
        height: 63px;
        background: #ff5a5c;
        border-radius: 4px;
        font-size: 18px;
        font-weight: 600;
        color: #232121;
        line-height: 63px;
        min-width: 160px;
        max-width: 254px;
        z-index: 2;
        cursor: pointer;
        border: none;

        @media only screen and (max-width: 700px) {
            display: none;
        }

        @media only screen and (min-width: 1200px) {
            display: none;
        }
    }

    div.providers {
        flex-wrap: wrap;
        gap: 4px;
        flex-direction: row;
        display: flex;
        max-width: 340px;

        @media only screen and (max-width: 700px) {
            max-width: 100%;
        }

        @media only screen and (min-width: 701px) and (max-width: 1199px) {
            max-width: 100%;
        }

        & > .provider {
            position: relative;
            width: calc(25% - 3px);
            height: 39px;
            border-radius: 2px;
            display: inline-flex;
            min-width: 69px;

            &.bitcoin {
                background: linear-gradient(180deg,#f9aa4b -0.02%,#f7931a 99.99%);
                box-shadow: 0 10px 15px rgb(0 0 0 / 15%);
                & > img {
                    height: 25px;
                }
            }
            &.ethereum {
                background: linear-gradient(185.23deg,#b1b1ff -3.47%,#778dff 70.67%);
                box-shadow: 0 10px 15px rgb(0 0 0 / 15%);
                & > img {
                    height: 25px;
                }
            }
            &.litecoin {
                background: linear-gradient(180deg,#a1a4c9 0,#7e809a 70%);
                box-shadow: 0 10px 15px rgb(0 0 0 / 15%);
                & > img {
                    height: 22px;
                }
            }
            &.paypal {
                background: linear-gradient(342.04deg,#263b80 -75.71%,#25bcff 135.9%);
                & > img {
                    width: 40px;
                }
            }
            &.amazon {
                background: #11171e;
                box-shadow: 0 10px 15px rgb(0 0 0 / 15%);
                & > img {
                    width: 36px;
                }
            }
            &.steam {
                background: linear-gradient(336.89deg,#131739 -26.71%,#4b4d8f 107.56%);
                box-shadow: 0 10px 15px rgb(0 0 0 / 15%);
                & > img {
                    height: 100%;
                    width: 55px;
                }
            }
            &.apple {
                background: linear-gradient(112.11deg,#ff5b53 -9.59%,#9850fa 54.58%,#2cc9f8 117.99%);
                box-shadow: 0 10px 15px rgb(0 0 0 / 15%);
                & > img {
                    height: 17px;
                }
            }
            &.google {
                background: #fff;
                box-shadow: 0 10px 15px rgb(0 0 0 / 15%);
                & > img {
                    width: 50px;
                }
            }

            & > img {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                border-style: none;
            }
        }
    }

    div.statistics {
        display: none;
        gap: 10px;
        background: unset;
        margin: 0 0 30px 0;

        @media only screen and (max-width: 700px) {
            display: flex;
        }

        text-align: center;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        position: relative;

        & > .item {
            background: $background-color;
            border-radius: 10px;
            width: calc(50% - 5px);
            height: 76px;
            padding: 15px;
            display: inline-block;
            position: relative;

            & > .heading {
                font-weight: 600;
                font-size: 14px;
                color: $active-color;

                display: flex;
                align-items: center;
                justify-content: center;
                gap: 3px;

                padding-bottom: 3px;

                & > div {
                    display: flex;
                    align-items: center;
                    height: 100%;
                    line-height: 1.2;
                }
            }

            & > .description {
                font-size: .8vw;
                color: #595b80;
                width: auto;
                display: inline-block;
                letter-spacing: -0.03em;
                line-height: 129.5%;
                vertical-align: text-top;
                font-size: calc(8px + 0.67vw);
            }
        }
    }

    div.earn-btn-block {
        text-align: center;
        margin-bottom: 30px;

        & > a {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22%;
            height: 63px;
            background: $active-color;
            border-radius: 4px;
            font-size: 18px;
            font-weight: 600;
            color: $background-color;
            z-index: 2;
            border: none;
            cursor: pointer;
            text-decoration: none;
        }
    }

    div.earn-or-signup-btn-block {
        display: none;
        text-align: center;
        margin-bottom: 30px;

        @media only screen and (max-width: 700px) {
            display: block;
        }

        & > button {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 208px;
            height: 52px;
            background: $active-color;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 600;
            color: $background-color;
            z-index: 2;
            border: none;
        }
    }

    div.review-info {
        margin-bottom: 27px;
        position: relative;
    }

    div.cashout-info {
        position: relative;
        width: 22.74vw;
        height: 8vw;
        min-width: 193px;
        min-height: 80px;
        max-width: 321px;
        max-height: 133px;
        margin-bottom: 50px;
        background: #2f3049;
        box-shadow: 0 2px 15px rgb(14 12 27 / 25%);
        border-radius: 10px;
        display: inline-flex;
        justify-content: center;
        align-items: center;

        @media only screen and (max-width: 700px) {
            display: none;
        }
        @media only screen and (min-width: 1200px) {
            display: none;
        }

        &::before {
            content: "";
            background: url(/withdrawnBg.png);
            background-size: cover;
            background-position-y: center;
            border-radius: 10px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 100%;

            @media only screen and (max-width: 700px) {
                display: none;
            }
            @media only screen and (min-width: 1200px) {
                display: none;
            }
        }

        & > span {
            display: inline-block;
            font-weight: 600;
            font-size: calc(24px + 2vw);
            background: linear-gradient(270deg,#f9ebb9 0,#ffbc11 100%);
            background: -webkit-linear-gradient(270deg,#f9ebb9 0,#ffbc11 100%);
            text-shadow: 0 5px 9px rgb(255 221 103 / 6%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }

    div.cashout-label {
        position: relative;
        font-weight: 600;
        font-size: 14px;
        letter-spacing: -0.03em;
        text-align: center;
        color: #9494a6;
        margin-bottom: 13px;
        z-index: 2;

        @media only screen and (max-width: 700px) {
            display: none;
        }
        @media only screen and (min-width: 1200px) {
            display: none;
        }
    }

    div.offers-in-mobile-block {
        position: relative;
        display: none;
        width: 252px;
        height: 287px;
        background-image: url(/phoneInHand.png);
        z-index: 2;

        @media only screen and (max-width: 700px) {
            margin: 0 auto;
        }
    }

    div.available-offer {
        position: relative;
        font-weight: 500;
        font-size: 14px;
        text-align: center;
        letter-spacing: -0.03em;
        color: #fff;
        display: inline-block;
        margin-bottom: 24px;
        padding-left: 13px;

        @media only screen and (min-width: 701px) {
            font-size: 22px;
        }


        &::before {
            content: "";
            position: absolute;
            top: calc(50% - 2.5px);
            left: 0;
            width: 5px;
            height: 5px;
            background: $active-color;
            border-radius: 50%;
            opacity: 1;
            animation: blinker 1s linear infinite;

            @keyframes blinker {
                50% {
                    opacity: .5;
                }
            }
        }
    }

    div.earn-up-to {
        font-weight: 500;
        font-size: 14px;
        text-align: center;
        letter-spacing: -0.03em;
        color: #fff;
        margin-bottom: 3px;

        @media only screen and (min-width: 701px) {
            font-size: 22px;
        }

        @media only screen and (min-width: 1200px) {
            margin-left: 0;
            margin-right: 0;
            text-align: left;
        }

        & > span {
            color: $active-color;
        }
    }

    div.heading {
        width: 60%;
        max-width: 1150.8px;
        margin: 0 auto;

        display: flex;
        justify-content: space-between;
        position: relative;
        gap: 10px;

        @media only screen and (max-width: 700px) {
            display: block;
            padding: 0 15px;
            width: 100%;
        }

        @media only screen and (min-width: 701px) and (max-width: 1199px) {
            width: 80%;
        }

        & > .about {
            padding-bottom: 44px;
            overflow: visible;

            @media only screen and (min-width: 701px) and (max-width: 1199px) {
                width: 100%;
            }

            @media only screen and (min-width: 1200px) and (max-width: 1399px) {
                width: 315px;
                flex-shrink: 0;
            }

            & > .about {
                position: relative;
                margin-bottom: 36px;
                text-align: center;

                @media only screen and (min-width: 1200px) {
                    text-align: left;
                }

                & > .title {
                    font-weight: 600;
                    font-size: 27px;
                    text-align: center;
                    color: $active-color;
                    margin-bottom: 2px;

                    @media only screen and (min-width: 701px) {
                        font-size: 44px;
                    }

                    @media only screen and (min-width: 1200px) {
                        margin-left: 0;
                        margin-right: 0;
                        text-align: left;
                    }
                }

                & > .options {
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
                                left: 100%
                            }

                            2.5%,20% {
                                left: 0
                            }

                            22.5%,100% {
                                left: -100%
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

                &::before {
                    content: "";
                    position: absolute;
                    background-image: url(/hugeFallingCoins.png);
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                    z-index: 2;

                    @media only screen and (min-width: 1200px) {
                        display: none;
                    }
                }
            }
        }
    }
	
    .container {
      display: flex;
      align-items: center;
	  text-decoration: none; /* Remove default link underline */
	  color: #fff;
	  border-radius: 10px; /* Add curved edges */
    }
	  .container:hover {
    background-color: #5d5555; /* Add a subtle hover effect */
    }
    .badge {
      width: 50px;
      height: auto;
      margin-right: 10px;
    }
	        @media (max-width: 768px) {
            .container {
                justify-content: center;
            }
        }
</style>