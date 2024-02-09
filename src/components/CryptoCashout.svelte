<script>
  import { onMount } from "svelte";
  import tokenStore from "./../stores/token.store.js";
  import { get } from "svelte/store";
  import Modal from "./Modal.svelte";
  import WithdrawSeperator from "./WithdrawSeperator.svelte";

  export let data;
  let successMessage = "";
  var address;
  var usdAmount;
  var cryptoRate = 0; // Initialize cryptocurrency rate with 0
  var error = "";
  var invalidAmount;
  var invalidAddress;
  var cryptoName = ""; // Initialize cryptocurrency name with an empty string
  var coins = 0; // Declare the 'coins' variable

  const validateEthereumAddress = (address) => {
    // Ethereum address regex
    const ethRegex = /^0x[0-9a-fA-F]{40}$/;
    return ethRegex.test(address);
  };

  const validateBitcoinAddress = (address) => {
    // Bitcoin address regex (mainnet)
    const btcRegex = /^(1|3)[0-9a-zA-Z]{25,34}$/;
    // Bitcoin Bech32 address regex (mainnet)
    const btcBech32Regex = /^bc1[0-9a-zA-Z]{25,39}$/;
    // Bitcoin address regex (testnet)
    const btcTestnetRegex = /^(m|n|2)[0-9a-zA-Z]{25,34}$/;
    // Bitcoin Bech32 address regex (testnet)
    const btcBech32TestnetRegex = /^tb1[0-9a-zA-Z]{25,39}$/;
    return (
      btcRegex.test(address) ||
      btcBech32Regex.test(address) ||
      btcTestnetRegex.test(address) ||
      btcBech32TestnetRegex.test(address)
    );
  };

  const validateLitecoinAddress = (address) => {
    // Litecoin address regex (mainnet)
    const ltcRegex = /^[LM3][0-9a-zA-Z]{26,33}$/;
    // Litecoin address regex (testnet)
    const ltcTestnetRegex = /^[Q2][0-9a-zA-Z]{26,33}$/;
    return ltcRegex.test(address) || ltcTestnetRegex.test(address);
  };

  const fetchCryptoRate = async () => {
    try {
      // Fetch the cryptocurrency rate based on the selected cryptocurrency name
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${data.name.toLowerCase()}&vs_currencies=usd`
      );
      const responseData = await response.json();
      cryptoRate = responseData[data.name.toLowerCase()].usd;
    } catch (error) {
      console.error("Error fetching cryptocurrency rate:", error);
      cryptoRate = 0;
    }
  };

  const calculateCryptoAmount = () => {
    if (usdAmount && cryptoRate > 0) {
      coins = usdAmount / cryptoRate;
    }
  };

  onMount(fetchCryptoRate);

  const doWithdraw = async () => {
    error = "";
    cryptoName = data.name.toLowerCase();

    if (cryptoName === "bitcoin" && !validateBitcoinAddress(address)) {
      return invalidAddress.open();
    }

    if (cryptoName === "ethereum" && !validateEthereumAddress(address)) {
      return invalidAddress.open();
    }

    if (cryptoName === "litecoin" && !validateLitecoinAddress(address)) {
      return invalidAddress.open();
    }

    if (usdAmount < data.minimum / 100) {
      return invalidAmount.open();
    }

    const token = get(tokenStore);
    const response = await fetch("/api/user/withdraw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authentication: token,
      },
      body: JSON.stringify({
        payoutMethodId: data._id,
        // old one sending crypto coins amount
        // option: coins, // Send the calculated coins directly
        option: usdAmount,
        exchangeRate: cryptoRate, // Send the exchange rate
        info: address,
      }),
    });
    const body = await response.json();

    if (body.success) {
      successMessage = "Withdrawal sent for review successfully";
      // Set a delay of 3000 milliseconds (3 seconds) before redirection
      setTimeout(function () {
        window.location.href = "/myprofile";
      }, 3000);
    } else {
      error = body.message;
    }
  };
</script>

<div class="crypto">
  <div class="section">
    <input
      placeholder="Enter your address..."
      autocomplete="off"
      bind:value={address}
    />
    <div class="placeholder" />
  </div>
  <div class="helper">The Address for your wallet.</div>

  <div class="section">
    <input
      placeholder="Enter USD amount..."
      autocomplete="off"
      type="number"
      min="0"
      step="1"
      bind:value={usdAmount}
      on:change={calculateCryptoAmount}
    />
    <div class="exchange">
      <div>
        {cryptoRate.toLocaleString(undefined, {
          currency: "USD",
          currencyDisplay: "symbol",
          style: "currency",
        })}
      </div>
      <div class="info">
        {cryptoName} rate
      </div>
    </div>
  </div>
  <div class="helper">Coin Price: {usdAmount * 100}</div>
</div>

<WithdrawSeperator />

<div class="checkout">
  <div class="table">
    {#if data.fee !== 0}
      <div class="row">
        <span>Fee</span>
        <span class="fat">
          {(data.fee / 100).toLocaleString(undefined, {
            currency: "USD",
            currencyDisplay: "symbol",
            style: "currency",
          })}
        </span>
      </div>
    {/if}
    <div class="row highlight">
      <span> You receive </span>
      <span class="fat">
        {#if typeof coins === "undefined"}
          0
        {:else}
          {(usdAmount / cryptoRate).toLocaleString(undefined, {
            maximumFractionDigits: 8,
          })}
          {cryptoName}
        {/if}
      </span>
    </div>
  </div>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="withdraw" on:click={doWithdraw}>withdraw</div>
  <p class="success">{successMessage}</p>
</div>

<p class="error">
  {error}
</p>

<!-- Rest of the code remains unchanged -->

<Modal bind:this={invalidAddress} closeButton={false}>
  <div class="modalContent">
    <div class="feedback">Please enter a valid address!</div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="close" on:click={() => invalidAddress.close()}>Close</div>
  </div>
</Modal>

<Modal bind:this={invalidAmount} closeButton={false}>
  <div class="modalContent">
    <div class="feedback">Please enter a valid amount!</div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="close" on:click={() => invalidAmount.close()}>Close</div>
  </div>
</Modal>

<style lang="scss">
  p.error {
    text-align: right;
  }

  div.modalContent {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 32px !important;
    font-size: 15px;
    padding-top: 32px;

    & > div.feedback {
      color: #fff;
      text-align: center;
      font-size: 15px;
    }

    & > div.close {
      cursor: pointer;
      width: 163px;
      height: 41px;
      line-height: 41px;
      background: rgba(255, 102, 104, 0.05);
      mix-blend-mode: normal;
      border-radius: 3px;
      color: #ff6668;
      text-align: center;
      margin: 0 auto;
      font-size: 13px;
    }
  }

  div.withdraw {
    width: 298px;
    height: 60px;
    line-height: 60px;
    font-size: 13px;
    background: rgba(255, 102, 104, 0.7);
    box-shadow: 0 4px 5px rgb(0 0 0 / 5%);
    border-radius: 200px;
    color: #fff;
    font-weight: 700;
    text-align: center;
    cursor: pointer;
    text-transform: uppercase;

    @media only screen and (max-width: 700px) {
      margin-top: 30px;
      width: 100%;
    }
  }

  div.checkout {
    margin-top: 26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #6b6d96;
    font-size: 13px;

    @media only screen and (max-width: 700px) {
      flex-direction: column;
    }

    div.table {
      width: 230px;

      @media only screen and (max-width: 700px) {
        width: 100%;
      }

      & > div.row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;

        &.highlight {
          background: rgba(66, 68, 113, 0.7);
          box-shadow: 0 4px 5px rgb(0 0 0 / 5%);
          border-radius: 5px;
          color: #ff6668;
        }

        & > .fat {
          font-weight: 700;
        }
      }
    }
  }

  div.crypto {
    background: #5f141e;
    box-shadow: 0 4px 8px rgb(0 0 0 / 5%);
    border-radius: 5px;
    padding: 6px 16px;

    & > div.section {
      display: flex;
      margin: 23px 0;

      @media only screen and (max-width: 700px) {
        display: block;
      }

      & > input {
        overflow: visible;
        line-height: 1.5;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;

        border-bottom-color: #48292980 !important;
        color: #ededed;

        margin: 0 0 !important;
        background-color: #321e1eb3 !important;
        box-shadow: 0 4px 5px rgb(0 0 0 / 5%) !important;
        border-radius: 5px !important;
        padding-left: 20px !important;
        box-sizing: border-box !important;

        flex: 1;
        margin-right: 17px !important;
      }

      & > .placeholder {
        width: 192px;
      }

      & > div.exchange {
        display: flex;
        justify-content: space-between;
        background: rgba(52, 53, 83, 0.7);
        padding: 16px;
        width: 192px;
        font-size: 10px;
        font-weight: 700;
        border-radius: 5px;

        @media only screen and (max-width: 700px) {
          margin-top: 15px;
        }

        & > div.info {
          text-transform: uppercase;

          &::before {
            content: "";
            display: inline-block;
            width: 4px;
            height: 4px;
            border-radius: 100%;
            background: #f7931a;
            box-shadow: 0 0 25px #ff6668;
            position: relative;
            right: 5px;
            top: -1px;
          }
        }
      }
    }

    & > div.helper {
      color: #f8f8f8;
      font-size: 11px;
      font-weight: 500;
      margin-bottom: 10px;
      margin-top: -5px;
    }
  }
</style>
