<script>
	import tokenStore from './../stores/token.store.js';
    import { get } from 'svelte/store';
    import Modal from "./Modal.svelte";
    import WithdrawSeperator from "./WithdrawSeperator.svelte";


    export let data = {
        minimum: 100,
        rate: 1,
        short: "ROBUX",
        fee: 0
    };
    
    var username = "";
    var coins = 0;
    var error = "";
    var invalidUsername;
    var invalidAmount;
    const defaultVal = 1;
    const doWithdraw = async () => {
        error = "";

        if (username.length < 2) {
            return invalidUsername.open();
        }

        if (typeof coins !== "number" || coins < data.minimum) {
            return invalidAmount.open();
        }

        const token = get(tokenStore);
        const response = await fetch("/api/user/withdraw", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authentication": token
            },
            body: JSON.stringify({
                payoutMethodId: "ROBUX",
                option: coins,
                info: username
            })
        });
        const body = await response.json();

        if (body.success) {
            // TODO: redirecet to table with withdrawal requests
        } else {
            error = body.message;
        }
    }
</script>

<div class="crypto">
    <div class="section">
        <input placeholder="Enter your ROBLOX username" autocomplete="off" bind:value={username}>
        <div class="placeholder"/>
    </div>
    <div class="helper">The username of your ROBLOX account.</div>

    <div class="section">
        <input placeholder="Enter coin amount..." autocomplete="off" type="number" min="0" step="1" bind:value={coins}>
        <div class="exchange">
            <div>{defaultVal.toLocaleString()}</div>
            <div class="info">
                {data.short} rate
            </div>
        </div>
    </div>
    <div class="helper">Minimum: {data.minimum.toLocaleString()} coins ({data.minimum.toLocaleString()} ROBUX).</div>
</div>

<WithdrawSeperator/>

<h4>Instructions:</h4>
<ol>
    <li>Login to roblox <a href="https://www.roblox.com/" target="_blank">here</a>.</li>
    <li>Go to your game's access tab <a href="https://create.roblox.com/dashboard/creations" target="_blank">here</a>.</li>
    <li>Pick one of your experiences</li>
    <li>Click Access and scroll down till you see private servers. Change them to paid and make the price {Math.round(coins/7*10)} ROBUX.</li>
</ol>

<div class="checkout">
    <div class="table">
        {#if data.fee !== 0}
            <div class="row">
                <span>Fee</span>
                <span class="fat">
                    {(data.fee / 100).toLocaleString(undefined, { currency: "USD", currencyDisplay: "symbol", style: "currency" })}
                </span>
            </div>
        {/if}
        <div class="row highlight">
            <span>
                You receive ({data.short})
            </span>
            <span class="fat">
                {#if typeof coins === "undefined"}
                    0
                {:else}
                    {((coins - data.fee)/data.rate).toLocaleString(undefined, { maximumFractionDigits: 8 })}
                {/if}
            </span>
        </div>
    </div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="withdraw" on:click={doWithdraw}>
        withdraw
    </div>
</div>

<p class="error">
    {error}
</p>

<Modal bind:this={invalidUsername} closeButton={false}>
    <div class="modalContent">
        <div class="feedback">
            Please enter a valid username!
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="close" on:click={() => invalidUsername.close()}>Close</div>
    </div>
</Modal>

<Modal bind:this={invalidAmount} closeButton={false}>
    <div class="modalContent">
        <div class="feedback">
            Please enter a valid amount!
        </div>
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
            background: rgba(255, 102, 104,0.05);
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
        background: rgba(255, 102, 104,0.7);
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
                    background: rgba(66,68,113,0.7);
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
        background: #24253d;
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
            font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;

            border-bottom-color: #48292980 !important;
            color: #787ead;

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
                background: rgba(52,53,83,0.7);
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
            color: #eb4244;
            font-size: 11px;
            font-weight: 500;
            margin-bottom: 10px;
            margin-top: -5px;
        }
    }

    a {
        color: #fff;
        font-weight: 500;
        text-decoration: none;
    }
</style>