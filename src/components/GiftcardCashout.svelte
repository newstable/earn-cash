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
        if(!data.options)
            return
        for (var i = 0; i < data.options.length; i++) {
            if (data.options[i].fee > 0) {
                hasFees = true;
            }
        }
    });

    var error = "";
    let selectAmountModal;
    let checkCountry;
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
                info: ""
            })
        });
        const body = await response.json();

        if (body.success) {
            window.location.href = '/myprofile';

        } else {
            error = body.message;
        }
    }
</script>

<div class="buttons">
    {#if data.options}
        {#each data.options as option, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class:active={active === i} class="button" style="background: {data.background}" on:click={() => pick(option, i)}>
                <img class="check" src="/checkIcon.svg" alt="checkmark"/>
                <img src={data.logo} alt="logo" class="logo">
                <span>{(option.value/100).toLocaleString(undefined, { currency: "USD", currencyDisplay: "symbol", style: "currency", minimumFractionDigits: 2 })}</span>
            </div>
        {/each}
    {/if}
</div>

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
            <span class="text-white">
                <img src="/coin.svg" alt="coin"/>
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
                position: relative;
                height: 100%;
                width: 100%;
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