<script>
    import tokenStore from './../stores/token.store.js';
    import { get } from 'svelte/store';
    import { onMount } from "svelte";
    import getCountryName from "../services/iso2country";
    import Modal from "./Modal.svelte";
    import WithdrawSeperator from "./WithdrawSeperator.svelte";

    export let data;

    var hasFees = false;
    var selected;
    var active = -1;
    const zeroVal = 0;
    const pick = (option, i) => {
        active = i;
        selected = option;
    }

    onMount(() => {
        for (var i = 0; i < data.options.length; i++) {
            if (data.options[i].fee > 0) {
                hasFees = true;
            }
        }
    });

    var error = "";
    let selectAmountModal;
    let checkCountry;
    let email = "";
    const doWithdraw = () => {
        if (active === -1) {
            selectAmountModal.open();
            return;
        }

        checkCountry.open();
    }

    const finishWithdraw = async() => {
        const token = get(tokenStore);
        const response = await fetch("/api/user/withdraw", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authentication": token
            },
            body: JSON.stringify({
                payoutMethodId: data._id,
                option: active,
                info: email
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

<div class="buttons">
    {#each data.options as option, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class:active={active === i} class="button" style="background: {data.background}" on:click={() => pick(option, i)}>
            <img class="check" src="/checkIcon.svg" alt="checkmark"/>
            <img src={data.logo} alt="logo" class="logo">
            <span>{(option.value/100).toLocaleString(undefined, { currency: "USD", currencyDisplay: "symbol", style: "currency", minimumFractionDigits: 2 })}</span>
        </div>
    {/each}
</div>

<div class="section">
    <input placeholder="Enter your email..." autocomplete="off" bind:value={email}>
    <div class="placeholder"/>
</div>
<div class="helper">The Email for delivery.</div>

<WithdrawSeperator/>

<div class="checkout">
    <div class="table">
        {#if hasFees}
            <div class="row">
                <span>Fee</span>
                <span class="fat">
                    {#if active != -1}
                        {(selected.fee / 100).toLocaleString(undefined, { currency: "USD", currencyDisplay: "symbol", style: "currency", minimumFractionDigits: 2 })}
                    {:else}
                        {zeroVal.toLocaleString(undefined, { currency: "USD", currencyDisplay: "symbol", style: "currency" })}
                    {/if}
                </span>
            </div>
        {/if}
        <div class="row highlight">
            <span>
                <img src="/coinLogo.svg" alt="coin"/>
                Coin Price
            </span>
            <span class="fat">
                {#if active != -1}
                    {selected.price.toLocaleString()}
                {:else}
                    {zeroVal.toLocaleString()}
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

<Modal bind:this={selectAmountModal} closeButton={false}>
    <div class="modalContent">
        <div class="feedback">
            Please select an amount.
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="close" on:click={() => selectAmountModal.close()}>Close</div>
    </div>
</Modal>

<Modal bind:this={checkCountry} closeButton={false}>
    <div class="modalContent">
        <div class="feedback">
            {#if data.country}
                {#if data.country !== "WW"}
                    This card is only available in {getCountryName(data.country)}!
                {/if}
            {/if}
            Confirm?
        </div>

        <div class="extra">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="close fail" on:click={() => {
                checkCountry.close();
                }}>Cancel</div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="close" on:click={() => {
                finishWithdraw();
                checkCountry.close();
                }}>Confirm</div>
        </div>
    </div>
</Modal>

<style lang="scss">
    div.section {
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
    }

    div.helper {
        color: #eb4244;
        font-size: 11px;
        font-weight: 500;
        margin-bottom: 10px;
        margin-top: -5px;
    }

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

        div.extra {
            display: flex;
            justify-content: center;
            gap: 1rem;
        }

        div.close {
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
            display: inline-block;

            &.fail {
                color: #eb4034;
                background: rgba(66, 135, 245, 0.05);
            }
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

                    & > span {
                        & > img {
                            width: 14px;
                            height: 14px;
                            margin-right: 5px;
                            position: relative;
                            top: 1px;
                        }
                    }
                }

                & > .fat {
                    font-weight: 700;
                }
            }
        }
    }

    div.buttons {
        display: flex;
        margin-top: 47px;
        margin-bottom: 36px;
        justify-content: space-between;
        flex-wrap: wrap;
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;

        @media only screen and (max-width: 700px) {
            margin-top: 27px;
        }

        & > div.button {
            position: relative;
            cursor: pointer;
            width: 24%;
            height: 125px;
            margin-top: 12px;
            border-radius: 5px;
            overflow: hidden;

            &.active {
                box-shadow: 0 0 10px 5px #ff5a5c;

                & > img.check {
                    display: block;
                }
            }

            @media only screen and (max-width: 700px) {
                width: 49%;
            }

            & > img.check {
                position: absolute;
                top: 15px;
                left: 15px;
                display: none;
            }

            & > img.logo {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                max-width: -webkit-fill-available;
            }

            & > span {
                position: absolute;
                top: 15px;
                right: 15px;
                font-weight: 700;
                font-size: 15px;
                color: #fff;
            }
        }
    }
</style>