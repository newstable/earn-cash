<script>
	import tokenStore from '../stores/token.store';
    import { get } from 'svelte/store';
    import Modal from "./Modal.svelte";
    import WithdrawSeperator from "./WithdrawSeperator.svelte";
    import { onMount } from "svelte";


    export let data = {
        minimum: 100,
        rate: 1,
        short: "coins",
        fee: 0
    };
    
    var coins = 0;
    var error = "";
    var invalidUsername;
    var invalidAmount;
    var isInProgress = false;
    const defaultVal = 1;
    let hasDiscordUsername = false


    const getAccount = async () => {
        const token = get(tokenStore);

        fetch("/api/user/authenticate", {
            headers: {
            authentication: token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
            if (!data.success) {
                loggedIn.set(false);
                tokenStore.set("");
                deleteCookie("token");
                return;
            }
            if (data.user.discord) {
                hasDiscordUsername = data.user.discord
            }
        });
    };

    onMount(() => {
        getAccount()
    });


    const doWithdraw = () => {
        error = "";

        if (!hasDiscordUsername.length) {
            return invalidUsername.open();
        }

        if (typeof coins !== "number" || coins < data.minimum) {
            return invalidAmount.open();
        }
        isInProgress = true;
        const token = get(tokenStore);
        fetch("/api/user/withdraw", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authentication": token
            },
            body: JSON.stringify({
                payoutMethodId: "GAMBLE",
                option: coins,
                info: hasDiscordUsername,
            })
        })
            .then(res=>res.json())
            .then(data=>{
                isInProgress = false;
                if (data.success) {
                    // TODO: redirecet to table with withdrawal requests
                    window.location.href = '/myprofile';
                    alert("Success withdraw action")
                    coins = 0
                } else {
                    error = data.message;
                }
            })
            .catch(e=>{
                isInProgress = false;
                error = "Failed withdraw action"
            })
    }
    const doDiscordAuth = () => {
        error = "";
        window.location.href = '/auth/discord';
    }
</script>

<div class="crypto">
    <div class="section">
        {#if hasDiscordUsername}
            <button class="connected_discord" disabled={isInProgress}>
                {hasDiscordUsername}
            </button>
        {:else}
            <button class="connect_discord" on:click={doDiscordAuth} disabled={isInProgress}>
                Connect Discord
            </button>
        {/if}
    </div>
    <div class="helper">Once you connect your discord account, you may withdraw your coins. Coins will appear on the JustGamble Discord Server and may be used for our in-house gamemodes</div>

    <div class="section">
        <input placeholder="Enter coin amount..." autocomplete="off" type="number" min="0" step="1" bind:value={coins}>
        <div class="exchange">
            <div>{defaultVal.toLocaleString()}</div>
            <div class="info">
                {data.short} rate
            </div>
        </div>
    </div>
    <div class="helper">Minimum: {data.minimum.toLocaleString()} coins.</div>
</div>

<WithdrawSeperator/>

<h4>Instructions:</h4>
<br>
<ol>
    <li>1. <a href="https://discord.gg/r3enqr5AUX" target="_blank" ><span class="hover:text-blue-500"> Join the JustGamble Discord Server.</span></a></li>
    <br>
    <li>2. Withdraw your desired points.</li>
    <br>
    <li>3. Enjoy Gambling on our PvP Game-modes: Rock Paper Scissors, and Coinflip.</li>
    <br>
    <li>Note: Use '/withdraw' on JustGamble to cashout your earnings back onto the JustEarn website. Enjoy!</li>
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
    <button class="withdraw" on:click={doWithdraw} disabled={isInProgress}>
        {isInProgress? 'Withdrawing...': 'Withdraw'}
    </button>
</div>

<p class="error">
    {error}
</p>

<Modal bind:this={invalidUsername} closeButton={false}>
    <div class="modalContent">
        <div class="feedback">
            Please connect your discord!
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

    button.withdraw {
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
        border: 0;
        transition: background .2s;

        @media only screen and (max-width: 700px) {
            margin-top: 30px;
            width: 100%;
        }
    }
    button.withdraw:hover {
        background: rgb(255 130 131 / 70%)
    }
    button.withdraw:active {
        background: rgb(247 66 67 / 70%)
    }
    button.withdraw:disabled {
        background: rgb(255 130 131 / 70%) !important;
        cursor: unset;
    }

    button.connect_discord {
        width: 150px;
        height: 40px;
        font-size: 11px;
        background: #5865F2; /* Discord Blurple */
        box-shadow: 0 4px 5px rgb(0 0 0 / 5%);
        border-radius: 200px;
        color: #fff;
        font-weight: 700;
        text-align: center;
        cursor: pointer;
        text-transform: uppercase;
        border: 0;
        transition: background .2s;

        @media only screen and (max-width: 700px) {
            margin-top: 30px;
            width: 100%;
        }
        }

        button.connect_discord:hover {
        background: #4952BD; /* Slightly darker Blurple */
        }
    button.connected_discord {
        width: 150px;
        height: 40px;
        font-size: 11px;
        background: #3a4088; /* Discord Blurple */
        box-shadow: 0 4px 5px rgb(0 0 0 / 5%);
        border-radius: 200px;
        color: #fff;
        font-weight: 700;
        text-align: center;
        cursor: default;
        text-transform: uppercase;
        border: 0;
        transition: background .2s;

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
          

            border-bottom-color: #48292980 !important;
            color: #f7f7f7;

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
            color: #ffff;
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