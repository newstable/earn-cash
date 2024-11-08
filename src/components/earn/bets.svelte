<script>
    import { onMount } from "svelte";
    import Loader from "./loader.svelte";

    export let user;

    let option = () => "recent";
    let bets = [];
    const itemsPerPage = 10;
    let currentPage = 1;
    let totalPages = 0;
    function changeBetChannel(selectedOption) {
        option = () => selectedOption;
        bets = [];
        const itemsPerPage = 10;
        let currentPage = 1;
        let totalPages = 0;

        switch (selectedOption) {
            case "recent":
                getLastOffersDone();
                break;
            case "all":
                getAllOffersDone();
                break;
            case "completed":
                getCompletedWithdrawals();
                break;
            case "pending":
                getPendingWithdrawals();
                break;
            default:
                break;
        }
    }

    const tableHeads = {
        recent: ["User", "time", "wall", "tokens"],
        all: ["User", "time", "wall", "tokens"],
        completed: ["User", "time", "type", "reward"],
        pending: ["User", "time", "type", "reward"],
    };

    const getLastOffersDone = async () => {
        const response = await fetch("/api/getLastInfos/getLastOffers");
        const data = await response.json();

        if (typeof data.offers !== "undefined") {
            bets = data.offers;
        }
    };

    const getAllOffersDone = async () => {
        const response = await fetch(
            `/api/getLastInfos/getAllOffers?page=${currentPage}&limit=${itemsPerPage}`,
        );
        const data = await response.json();

        if (typeof data.offers !== "undefined") {
            bets = data.offers;
            totalPages = data.totalOffers;
        }
    };

    const getCompletedWithdrawals = async () => {
        const response = await fetch(
            `/api/getLastInfos/getCompletedWithdrawals?page=${currentPage}&limit=${itemsPerPage}`,
        );
        const data = await response.json();

        if (typeof data.rewards !== "undefined") {
            bets = data.rewards;
        }
    };

    const getPendingWithdrawals = async () => {
        const response = await fetch(
            `/api/getLastInfos/getPendingWithdrawals?page=${currentPage}&limit=${itemsPerPage}`,
        );
        const data = await response.json();

        if (typeof data.rewards !== "undefined") {
            bets = data.rewards;
        }
    };

    onMount(() => {
        getLastOffersDone();
    });
</script>

<div class="bets-container">
    <div class="bets-options">
        {#if user}
            <button
                class="option {option() === 'recent' ? 'active' : ''}"
                on:click={() => changeBetChannel("recent")}
            >
                RECENTELY
            </button>
        {/if}

        <button
            class="option {option() === 'all' ? 'active' : ''}"
            on:click={() => changeBetChannel("all")}
        >
            ALL
        </button>
        <button
            class="option {option() === 'completed' ? 'active' : ''}"
            on:click={() => changeBetChannel("completed")}
        >
            COMPLETED
        </button>
        <button
            class="option {option() === 'pending' ? 'active' : ''}"
            on:click={() => changeBetChannel("pending")}
        >
            PENDING
        </button>
    </div>

    {#if bets.length > 0}
        <table class="bets-table relative" cellspacing={0}>
            <thead class="bets-header">
                <tr>
                    {#each tableHeads[option()] as table}
                        <th class="uppercase">{table}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each bets as bet, index}
                    <tr class="bet">
                        <td>
                            <div class="image-data user text-nowrap">
                                {#if bet.picture}
                                    <img
                                        class="rounded-full w-6"
                                        src={bet.picture}
                                        alt=""
                                        height="17"
                                    />
                                {:else}
                                    <div
                                        class="w-6 h-6 bg-[#302f2f] rounded-full"
                                    ></div>
                                {/if}
                                {bet.username}
                            </div>
                        </td>

                        <td>
                            <div class="large">
                                {new Date(bet?.date).toLocaleDateString()}
                                {new Date(bet?.date).toLocaleTimeString()}
                            </div>
                        </td>

                        <td class="large">{bet.wall}</td>

                        <td class="large">
                            <div>{bet.tokens}</div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <div class="flex items-center z-20 w-full justify-center mt-8">
            <Loader type={"small"} />
        </div>
    {/if}
</div>

<style>
    .bets-container {
        padding-bottom: 40px;
    }

    .bets-options {
        width: 100%;
        display: flex;
        gap: 10px;
        justify-content: center;
    }

    .option {
        width: 147px;
        height: 37px;
        border-radius: 3px 3px 0 0;
        background: #403674;

        color: #9789cf;
        font-size: 14px;
        font-family: Geogrotesque Wide;
        font-weight: 600;

        outline: unset;
        border: unset;
        position: relative;
        cursor: pointer;

        transition: all 0.3s;
    }

    .option:before {
        width: calc(100% + 2px);
        height: calc(100% + 2px);

        border-radius: 3px 3px 0 0;
        position: absolute;
        content: "";
        z-index: -1;

        top: -1px;
        left: -1px;
        background: linear-gradient(
            to top,
            #4e3d76,
            #2a2352,
            #2a2352,
            #2a2352,
            #4e3d76,
            #e78ef5,
            #e78ef5
        );

        opacity: 0;

        transition: opacity 0.3s;
    }

    .option.active:before {
        opacity: 1;
    }

    .option.active {
        color: #e78ef5;
        text-shadow:
            rgba(231, 142, 245, 0.5) 0px 0px 25px,
            rgba(0, 0, 0, 0.25) 0px 2px 0px;
    }

    .bets-table {
        width: 100%;
        border-radius: 3px;
        overflow: hidden;
    }

    .bets-header {
        width: 100%;
        height: 40px;
        background: #2a2352;

        color: #9789cf;
        font-size: 13px;
        font-family: Geogrotesque Wide;
        font-weight: 700;

        text-align: left;
    }

    .bet {
        background: unset;
        height: 45px;

        color: #ada3ef;
        font-size: 13px;
        font-family: Geogrotesque Wide;
        font-weight: 600;
    }

    .bet:nth-child(2n - 1) {
        background: rgba(160, 115, 255, 0.1);
    }

    .image-data {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .lum {
        mix-blend-mode: luminosity;
        color: #9693c0;
    }

    .caps {
        text-transform: uppercase;
    }

    .user {
        @apply rounded-full w-full h-6;
        gap: 10px;
    }

    td:first-child,
    th:first-child {
        padding: 0 0 0 30px;
    }

    .cents {
        color: #a7a7a7;
    }

    .gold .cents {
        color: #9a6c26;
    }

    @media only screen and (max-width: 850px) {
        .large {
            display: none;
        }
    }
</style>
