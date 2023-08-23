<script>
	import { goto } from '$app/navigation';
    import { onMount } from "svelte";
    import MoneyBag from "../../components/icons/MoneyBag.svelte";
    import StatisticItem from "../../components/StatisticItem.svelte";
    import Wallet from "../../components/icons/Wallet.svelte";
    import People from "../../components/icons/People.svelte";
    import TimeIcon from "../../components/icons/TimeIcon.svelte";
    import { get } from "svelte/store";
    import tokenStore from "../../stores/token.store";
    import loggedInStore from "../../stores/loggedIn.store";
    import Tiers from '../../components/affiliates/Tiers.svelte';
    import Affiliates from '../../components/affiliates/Affiliates.svelte';

    export let data;

    var isEditing = false;
    var code = "urmomishot";
    var editCode = "";
    var url = "";
    var message = "I’m earning money by completing tasks such as testing apps and playing games on URL_HERE. If you sign up through my link you can open a free case and win up to $250.";
    var refUrl = "";
    
    var totalEarnings = 0;
    var earnings30Days = 0;
    var usersReferred = 0;
    
    var username = "Hattorius";
    var picture = "https://eu.ui-avatars.com/api/?background=302f2f&color=ff5a5c&length=1&name=Hattorius";
    var tier = 1;
    var commissionPercentage = 0.05;

    var page = 0;

    onMount(() => {
        if (!get(loggedInStore) || typeof data.username === "undefined") {
            goto("/");
            return;
        }

        if (typeof data.customRef === "undefined" || data.customRef === null || data.customRef === "") {
            code = data.id;
        } else {
            code = data.customRef;
        }

        username = data.username;
        picture = data.picture;
        tier = data.tier;
        commissionPercentage = data.commissionPercentage;

        totalEarnings = data.totalEarnings;
        earnings30Days = data.totalEarned30days;
        usersReferred = data.usersReferred;

        url = window.location.host;
        message = "I’m earning money by completing tasks such as testing apps and playing games on " + window.location.protocol + "//" + window.location.host + "/" + code + ". If you sign up through my link you can open a free case and win up to $250.";
        refUrl = window.location.protocol + "//" + window.location.host + "/" + code;

        document.body.style.backgroundColor = "#171515";
        return () => document.body.style.backgroundColor = "";
    });

    const saveCode = async() => {
        const token = get(tokenStore);

        const response = await fetch("/api/user/ref", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authentication: token
            },
            body: JSON.stringify({
                ref: editCode
            })
        });
        const data = await response.json();

        code = editCode + "";
        editCode = "";
        isEditing = false;

        message = "I’m earning money by completing tasks such as testing apps and playing games on " + window.location.protocol + "//" + window.location.host + "/" + code + ". If you sign up through my link you can open a free case and win up to $250.";
        refUrl = window.location.protocol + "//" + window.location.host + "/" + code;

        if (data.success) {
            Toastify({
                text: data.message,
                duration: 3000,
                gravity: "bottom", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#ff5a5c",
                },
            }).showToast();
        } else {
            Toastify({
                text: data.message,
                duration: 3000,
                gravity: "bottom", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#f06a6b",
                },
            }).showToast();
        }
    }

    const copyCode = () => {
        const input = document.createElement("input");
        document.body.appendChild(input);
        const toCopy = window.location.protocol + "//" + window.location.host + "/" + code;
        input.value = toCopy;

        input.select();
        input.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(input.value);

        input.remove();

        Toastify({
            text: "Copied \"" + toCopy + "\"",
            duration: 3000,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#059fdb",
            },
        }).showToast();
    }
</script>

<div class="container">
    <div class="heading">
        <h1>Affiliates</h1>
        <div>
            <button>
                <iconify-icon icon="mdi:information-outline" width="20" height="20"></iconify-icon>
                How it works
            </button>
        </div>
    </div>
    <div class="profile">
        <div class="card info">
            <div>
                <div>
                    <img src={picture} alt="Profile"/>
                </div>

                <div>
                    <div>
                        <div class="username">
                            {username}
                        </div>
                        <div class="tier-info">
                            <div>
                                <div class="text">
                                    Tier {tier}
                                </div>
                            </div>
                            <div>
                                <MoneyBag/>
                                <span>
                                    {commissionPercentage * 100}% commission
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card statistics">
            <div>
                <img src="/stats.svg" alt="Stats" height="20" width="20"/>
                <span>
                    Statistics
                </span>
            </div>

            <div>
                <StatisticItem title={totalEarnings.toLocaleString(undefined, { maximumSignificantDigits: 2 })} subtitle="Total Earnings" style="grid-area: a">
                    <Wallet/>
                </StatisticItem>

                <StatisticItem title={usersReferred.toLocaleString()} subtitle="Users Referred" style="grid-area: b">
                    <People/>
                </StatisticItem>

                <StatisticItem title={earnings30Days.toLocaleString(undefined, { maximumSignificantDigits: 2 })} subtitle="Earnings last 30 days" style="grid-area: c">
                    <TimeIcon/>
                </StatisticItem>
            </div>
        </div>
    </div>
</div>

<div class="container linkies">
    <section class="referral">
        <div>
            <div class="title">Your referral link</div>
            <div class="ref">
                <span class="url">
                    {url}/
                    <div class="code" class:active={isEditing}>
                        <span>
                            {#if !isEditing}
                                {code}&nbsp;&nbsp;
                            {:else}
                                &nbsp;&nbsp;
                            {/if}
                        </span>
                        <input type="text" class:hide={!isEditing} bind:value={editCode} on:keyup={e => e.keyCode === 13 && saveCode()}>
                    </div>
                </span>
                <div class="buttons">
                    <button class="gren edit-ref" class:hide={!isEditing} on:click={() => saveCode()}>
                        <div class="spekcial">
                            <iconify-icon icon="mdi:tick" style="color: black;" width="20" height="20"></iconify-icon>
                        </div>
                    </button>
                    <button class="edit-ref" class:hide={!isEditing} on:click={() => {isEditing = false; editCode = ""}}>
                        <div class="spekcial">
                            <iconify-icon icon="radix-icons:cross-2" width="20" height="20"></iconify-icon>
                        </div>
                    </button>
                    <button on:click={() => isEditing = true} class:hide={isEditing} class="edit">
                        <iconify-icon icon="ci:edit-pencil-line-01" width="20" height="20"></iconify-icon>
                    </button>
                    <button on:click={() => copyCode()} class="copy">
                        <div>
                            <iconify-icon icon="ph:copy-light" width="20" height="20"></iconify-icon>
                            Copy link
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <div>
            <div class="title">Share your referral link</div>
            <div class="social-links">
                <a target="_blank" href="mailto:someone@example.com?subject={message}">
                    <button>
                        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                        <img src="/email.png" alt="Email" on:mouseenter={e => e.target.src="/email-hover.png"} on:mouseout={e => e.target.src="/email.png"}/>
                    </button>
                </a>

                <a target="_blank" href="https://wa.me/?text={message}">
                    <button>
                        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                        <img src="/whatsapp.png" alt="Whatsapp" on:mouseenter={e => e.target.src="/whatsapp-hover.png"} on:mouseout={e => e.target.src="/whatsapp.png"}/>
                    </button>
                </a>

                <a target="_blank" href="https://twitter.com/intent/tweet?text={message}">
                    <button>
                        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                        <img src="/twitter.png" alt="Twitter" on:mouseenter={e => e.target.src="/twitter-hover.png"} on:mouseout={e => e.target.src="/twitter.png"}/>
                    </button>
                </a>

                <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u={refUrl}">
                    <button>
                        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                        <img src="/facebook.png" alt="Facebook" on:mouseenter={e => e.target.src="/facebook-hover.png"} on:mouseout={e => e.target.src="/facebook.png"}/>
                    </button>
                </a>

                <a target="_blank" href="https://t.me/share/url?url={refUrl}&text={message}">
                    <button>
                        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                        <img src="/telegram.png" alt="Telegram" on:mouseenter={e => e.target.src="/telegram-hover.png"} on:mouseout={e => e.target.src="/telegram.png"}/>
                    </button>
                </a>
            </div>
        </div>
    </section>
</div>

<div class="container t">
    <div class="infos">
        <div class="navigations">
            <button class:active={page === 0} on:click={() => page = 0}>
                Tiers
            </button>

            <button class:active={page === 1} on:click={() => page = 1}>
                Affiliates
            </button>
        </div>
    </div>

    {#if page === 0}
        <Tiers tier={tier - 1}/>
    {:else if page === 1}
        <Affiliates/>
    {/if}
</div>

<style lang="scss">
    div.infos {
        display: flex;
        flex-wrap: wrap;

        gap: 20px;
        justify-content: space-between;
        align-items: center;

        & > div.navigations {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 20px;
            overflow-y: hidden;
            overflow-x: auto;

            & > button {
                white-space: nowrap;
                padding: 10px 20px;
                background-color: #20212e;
                border-radius: 8px;
                color: #a8aac9;

                border: 0;
                margin: 0;

                width: auto;
                overflow: visible;
                background: transparent;

                line-height: normal;
                cursor: pointer;

                &.active {
                    background-color: #302828;
                    color: #ff5a5c;
                    text-shadow: 0.5px 0 0 #ff5a5c;
                }
            }
        }
    }

    div.social-links {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;

        & > a {
            text-decoration: none;

            & > button {
                border: 1px solid #393e56;
                background-color: #2f3045;
                border-radius: 99px;
                width: 42px;
                height: 42px;

                margin: 0;
                padding: 0;

                overflow: visible;
                background: transparent;
                color: inherit;
                font: inherit;
                line-height: normal;

                cursor: pointer;

                & > img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    .spekcial {
        display: flex;
        flex-wrap: wrap;
    }

    .hide {
        display: none;
    }

    section.referral {
        background-color: #222121;
        border-radius: 15px;
        padding: 30px 35px;
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
        justify-content: space-between;

        @media only screen and (max-width: 1199px) {
            display: grid;
            grid-template-columns: 1fr;
            padding: 20px;
        }

        input {
            padding: 0 15px;
            color: #ccd;
            margin-right: 10px;
            inset: 0;
            top: -50%;

            border: 1px solid #393e56 !important;
            background-color: #2f3045;
            border-radius: 10px;
            height: 42px;
            font-family: "Poppins";

            font-size: 100%;
            line-height: 1.15;
            margin: 0;

            font-size: 14px;
            width: 190px;
            box-sizing: border-box;
            left: 5px;

            margin-right: 10px;
        }

        & > div {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            gap: 10px;

            & > div.title {
                color: #e15a5a;
                font-weight: bold;
            }

            & > div.ref {
                align-items: center;
                display: flex;
                flex-wrap: wrap;

                @media only screen and (max-width: 1199px) {
                    display: grid;
                }

                & > span.url {
                    align-items: center;
                    display: flex;
                    flex-wrap: wrap;
                }

                & > div.buttons {
                    align-items: center;
                    flex: none;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;

                    @media only screen and (max-width: 1199px) {
                        display: grid;
                        grid-template-columns: 50px auto;
                    }

                    & > button {
                        border-radius: 10px;
                        border: 1px solid #393e56;
                        background-color: #2f3045;
                        height: 42px;
                        padding: 7px 15px;
                        font-weight: 500;
                        color: white;
                        cursor: pointer;

                        &:hover, &:active {
                            background-color: #42435a;
                        }

                        & > div {
                            margin: auto;
                            align-items: center;
                            display: flex;
                            flex-wrap: wrap;
                            gap: 10px;
                        }

                        &.gren {
                            background-color: #ff5a5c;
                            text-transform: none;
                            color: #000;
                            font-weight: 600;

                            &:hover, &:active {
                                background-color: #01ff97;
                            }

                            @media only screen and (max-width: 1199px) {
                                width: 42px;
                            }
                        }

                        &.edit-ref {
                            padding: 0 10px;
                            height: 42px;
                            border-radius: 10px;

                            @media only screen and (max-width: 1199px) {
                                width: 42px;
                            }
                        }

                        &.edit {
                            @media only screen and (max-width: 1199px) {
                                &.hide {
                                    display: block;
                                }
                            }
                        }

                        &.copy {
                            @media only screen and (max-width: 1199px) {
                                width: 100%;
                                display: flex;
                            }
                        }
                    }
                }
            }
        }
    }

    div.statistics {
        & > div:last-child {
            grid-template-areas: "a b" "c d";
            grid-template-columns: 1fr 1fr;
            white-space: nowrap;

            display: grid;
            grid-template-rows: min-content;
            gap: 15px;
            height: 100%;
            padding-top: 20px;
        }

        & > div:first-child {
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;

            span {
                font-size: 16px;
                font-weight: bold;
            }
        }
    }

    div.container {
        font-size: 14px;
        font-family: "Poppins";
        max-width: 1100px;
        margin: 0 auto;

        @media only screen and (max-width: 1399px) {
            padding: 0 20px;
        }

        .profile {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;

            @media only screen and (max-width: 1199px) {
                display: flex;
                flex-direction: column;
            }

            & > .card {
                background-color: #222121;
                border-radius: 15px;
                padding: 30px 35px;

                @media only screen and (max-width: 1199px) {
                    padding: 20px;

                    &.statistics > div:last-child {
                        grid-template-areas: "a" "b" "c";
                    }
                }

                &.info {
                    display: flex;
                    position: relative;

                    & > div {
                        gap: 20px;
                        flex-wrap: nowrap;
                        width: 100%;
                        align-items: center;
                        display: flex;

                        & > div:first-child {
                            flex: none;
                            
                            & > img {
                                border-radius: 999px;
                                width: 9vw;
                                height: 9vw;
                                max-width: 142px;
                                max-height: 142px;
                                display: block;
                            }
                        }

                        & > div:last-child {
                            flex: 1;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            flex-wrap: wrap;
                            gap: 10px;
                            justify-content: center;

                            div.username {
                                font-size: 24px;
                                font-weight: 600;
                                max-width: 300px;

                                margin-bottom: 10px;
                            }

                            div.tier-info {
                                gap: 25px;
                                align-items: center;
                                display: flex;
                                flex-wrap: wrap;

                                & > div {
                                    align-items: center;
                                    display: flex;
                                    flex-wrap: wrap;
                                    gap: 10px;

                                    div.text {
                                        font-weight: 500;
                                    }
                                }

                                & > div:last-child {
                                    fill: #ff5a5c;
                                }
                            }
                        }
                    }
                }
            }
        }

        .heading {
            display: grid;
            grid-template-areas: "a b";
            margin: 40px 0 20px 0;
            justify-content: space-between;

            h1 {
                grid-area: a;
                font-size: 24px;
                font-weight: bold;
            }

            & > div {
                align-items: center;
                display: flex;
                flex-wrap: wrap;
                gap: 20px;

                button {
                    background-color: #1d2030;
                    border-radius: 10px;
                    padding: 8px 16px;
                    height: 42px;
                    font-weight: 500;
                    border: 1px solid #292a40;
                    fill: #ccd;

                    align-items: center;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    cursor: pointer;
                    color: #fff;

                    &:hover {
                        background-color: #42435a;
                    }
                }
            }
        }

        &.t {
            padding-top: 40px;
        }
    }
</style>