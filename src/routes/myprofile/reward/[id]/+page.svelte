<script>
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import date2readable from "../../../../services/date2readable.js";


    export let data;
    let show = false;

    onMount(() => {
        setTimeout(() => {
            show = true;
        }, 150);

        console.log(data);

        if (typeof data.reward === "undefined") {
            closeModal();
        }
    });

    const closeModal = () => {
        show = false;
        setTimeout(() => {
            goto("/myprofile");
        }, 350);
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="overlay" class:show={show} on:click={closeModal}/>

{#if typeof data.reward !== "undefined"}
    <div class="modal" class:show={show}>
        <h5 class="title">
            {data.reward.reward}

            <button class="close" on:click={closeModal}>
                <Icon icon="humbleicons:times" color="#A9A9CA" width="19" height="19" />
            </button>
        </h5>

        <div class="holder">
            <table>
                <tbody>
                    <tr>
                        <td>Price</td>
                        <td>
                            <img src="/coin.svg" alt="Currency" width="16"/>
                            {data.reward.price}
                        </td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td>{date2readable(data.reward.date)}</td>
                    </tr>
                    {#if typeof data.reward.info !== "undefined"}
                        <tr>
                            <td>Payout info</td>
                            <td>{date2readable(data.reward.info)}</td>
                        </tr>
                    {/if}
                    <tr>
                        <td>Is being held</td>
                        <td>{data.reward.hold === 1 ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td>Is revoked</td>
                        <td>{data.reward.revoked === 1 ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td>Paid</td>
                        <td>{typeof data.reward.sentDate !== "undefined" ? date2readable(data.reward.sentDate) : "No"}</td>
                    </tr>
                    {#if typeof data.reward.cardNumber !== "undefined"}
                        <tr>
                            <td>Card number</td>
                            <td>{data.reward.cardNumber}</td>
                        </tr>
                    {/if}
                    {#if typeof data.reward.expMonth !== "undefined"}
                        <tr>
                            <td>Expiry month</td>
                            <td>{data.reward.expMonth}</td>
                        </tr>
                    {/if}
                    {#if typeof data.reward.expYear !== "undefined"}
                        <tr>
                            <td>Expiry year</td>
                            <td>{data.reward.expYear}</td>
                        </tr>
                    {/if}
                    {#if typeof data.reward.csv !== "undefined"}
                        <tr>
                            <td>CSV</td>
                            <td>{data.reward.csv}</td>
                        </tr>
                    {/if}
                    {#if typeof data.reward.code !== "undefined"}
                        <tr>
                            <td>Code</td>
                            <td>{data.reward.code}</td>
                        </tr>
                    {/if}
                    {#if typeof data.reward.pin !== "undefined"}
                        <tr>
                            <td>Pin</td>
                            <td>{data.reward.pin}</td>
                        </tr>
                    {/if}
                </tbody>
            </table>
        </div>
    </div>
{/if}

<style lang="scss">
    table {
        table-layout: auto;
        width: 100%;    
    }

    tr {
        & > td:first-child {
            font-weight: 500;
            padding-right: 2rem;
            border-right: 1px solid rgba(255, 255, 255, 0.16);
            text-align: right;
        }

        & > td:last-child {
            padding-left: 2rem;
        }
    }

    div.holder {
        min-height: 515px;
        padding: 1rem;
    }

    div.modal {
        position: fixed;
        left: 0;
        right: 0;
        padding: 0;
        width: 30%;
        margin: auto;
        min-height: 580px;
        max-height: 580px;
        height: 580px;

        background-color: #262323;
        border-radius: 10px;
        overflow-y: hidden;
        will-change: top, opacity;

        z-index: 1003;
        opacity: 0;
        top: 4%;
        transform: scaleX(0.8) scaleY(0.8);

        box-shadow: 0 24px 38px 3px rgb(0 0 0 / 14%), 0 9px 46px 8px rgb(0 0 0 / 12%), 0 11px 15px -7px rgb(0 0 0 / 20%);

        transition: 350ms;

        &.show {
            display: block;
            opacity: 1;
            top: 10%;
            transform: scaleX(1) scaleY(1);
        }

        & > h5.title {
            margin: 14px;
            font-size: 1.64rem;
            line-height: 110%;
            font-weight: 400;

            & > button {
                border: 1px solid #302f2f;
                width: 40px;
                height: 40px;
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;

                cursor: pointer;
                z-index: 2;
                top: 8px;
                right: 8px;
                background: transparent;
            }
        }
    }

    div.overlay {
        position: fixed;
        top: -25%;
        left: 0;
        bottom: 0;
        right: 0;
        height: 125%;
        width: 100%;
        background: #000;

        z-index: 1002;
        display: block;
        opacity: 0;

        will-change: opacity;
        transition: 350ms;
        

        &.show {
            opacity: 0.5;
        }
    }
</style>