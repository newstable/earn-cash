<script>
    const METHODS = {
        limiteds: {
            src: "./paymentMethods/limiteds.png",
            name: "LIMITEDS",
            url: "limiteds",
            width: "54",
        },
        robux: {
            src: "./paymentMethods/coin.png",
            name: "ROBUX",
            url: "robux",
            width: "54",
        },
        bitcoin: {
            src: "./paymentMethods/bitcoin.png",
            name: "BITCOIN",
            url: "bitcoin",
            width: "45",
        },
        ethereum: {
            src: "./paymentMethods/ethereum.png",
            name: "ETHEREUM",
            url: "ethereum",
            width: "45",
        },
        litecoin: {
            src: "./paymentMethods/litecoin.png",
            name: "LITECOIN",
            url: "litecoin",
            width: "45",
        },
        visa: {
            src: "./paymentMethods/visa.png",
            name: "VISA",
            url: "credit card",
            width: "82",
        },
        mastercard: {
            src: "./paymentMethods/mastercard.png",
            name: "MASTERCARD",
            url: "credit card",
            width: "54",
        },
        googlepay: {
            src: "./paymentMethods/googlepay.png",
            name: "GOOGLE PAY",
            url: "credit card",
            width: "76",
        },
        paypal: {
            src: "./paymentMethods/paypal.png",
            name: "PAYPAL",
            url: "credit card",
            width: "33",
        },
    };
    let method = ""; // Current selected method
    let setMethod = (newMethod) => {
        method = newMethod; // Update the selected method
    };
</script>

<div class="deposit-methods">
    <div class="header">
        <p>
            <span class="gold">BLOXCLASH</span> OFFERS VARIOUS DEPOSIT METHODS
        </p>
        <div class="bar"></div>
        <p class="method-name {METHODS[method] ? 'active' : ''}">
            {METHODS[method]?.name || "NONE"}
        </p>
    </div>

    <div class="methods">
        {#each Object.keys(METHODS) as key}
            <img
                on:click={() => setMethod(method !== key ? key : "")}
                class="method {method !== '' && method !== key
                    ? 'unactive'
                    : ''}"
                src={METHODS[key].src}
                width={METHODS[key].width || "54"}
                alt={METHODS[key].name}
                draggable={false}
            />
        {/each}
    </div>
</div>

<style>
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

    .deposit-methods {
        max-width: 980px;
        border-radius: 5px;
        margin: 30px auto;
        overflow: hidden;

        border-bottom: 1px solid #5665ba;
    }

    .gold {
        color: #fca31e;
    }

    .header {
        width: 100%;
        height: 30px;

        font-size: 14px;
        font-family: Geogrotesque Wide;
        font-weight: 700;
        color: white;

        display: flex;
        align-items: center;
        padding: 15px;
        gap: 15px;

        background: linear-gradient(
            90deg,
            rgba(90, 84, 149, 0.65) 0%,
            rgba(90, 84, 149, 0.45) 29.82%,
            rgba(66, 53, 121, 0) 100%
        );
    }

    .bar {
        flex: 1;
        height: 1px;

        background: #5a5499;
    }

    .method-name {
        color: #8d86cd;
    }

    .method-name.active {
        color: var(--gold);
    }

    .methods {
        display: flex;
        align-items: center;
        padding: 15px 0;
        justify-content: space-evenly;

        background: linear-gradient(
                0deg,
                rgba(29, 24, 62, 0.15),
                rgba(29, 24, 62, 0.15)
            ),
            linear-gradient(
                269.89deg,
                rgb(104, 100, 164) -49.01%,
                rgba(90, 84, 149, 0.655) -5.08%,
                rgba(66, 53, 121, 0) 98.28%
            );
    }

    .method {
        cursor: pointer;
        transition: all 0.3s;
    }

    .method.unactive {
        -webkit-filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -o-filter: grayscale(100%);
        filter: grayscale(100%);

        opacity: 0.5;
    }

    .method:hover {
        transform: translateY(-5px);
    }

    .deposit-container {
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        position: relative;
        margin-bottom: 50px;
    }

    .deposit-container:before {
        height: 1px;
        width: 100%;
        position: absolute;
        content: "";
        left: 0;
        background: linear-gradient(
            270deg,
            rgba(90, 84, 153, 0) 0%,
            #5a5499 49.47%,
            rgba(90, 84, 153, 0) 100%
        );
        z-index: -1;
    }

    .deposit {
        width: 130px;
        height: 30px;

        color: white;
        font-size: 14px;
        font-weight: 700;

        outline: unset;
        border: unset;

        cursor: pointer;
    }

    .deposit:disabled {
        border-radius: 3px;
        background: #6760a9;
        box-shadow:
            0px 2px 0px 0px #524d8a,
            0px -2px 0px 0px #7f77c6;

        color: #8d86cd;
    }

    .bevel-gold {
        outline: unset;
        border: unset;

        font-family: "Geogrotesque Wide", sans-serif;
        color: white;
        font-weight: 700;
        cursor: pointer;

        background: #fca31e;
        box-shadow:
            0px -2px 0px #ffbd59,
            0px 2px 0px #ba812c;
        border-radius: 3px;
        transition: background-color 0.3s;
    }

    .bevel-gold:not(:disabled):hover {
        background-color: #e19421;
    }

    .bevel-gold:not(:disabled):active {
        background-color: #e19421;
        box-shadow: unset;
    }

    @media only screen and (max-width: 1000px) {
        .home-container {
            padding-bottom: 90px;
        }

        .banners {
            flex-direction: column;
        }
    }
</style>
