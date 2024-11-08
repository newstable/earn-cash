<script>
    import Avatar from "./avatar.svelte";

    export let user;

    let option = () => "all";

    function changeBetChannel(selectedOption) {
        option = () => selectedOption; // Update the current option
    }

    let bets = () => [];
    let gameToImage = {};

    function getCents(bal) {
        if (typeof bal !== "number") {
            return "00";
        }

        bal = Math.abs(bal);
        let cents = Math.floor(Math.round((bal % 1) * 100));
        if (cents < 10) {
            return "0" + cents;
        }
        return cents;
    }
</script>

<div class="bets-container">
    <div class="bets-options">
        {#if user}
            <button
                class="option {option() === 'me' ? 'active' : ''}"
                on:click={() => changeBetChannel("me")}
            >
                MY BETS
            </button>
        {/if}

        <button
            class="option {option() === 'all' ? 'active' : ''}"
            on:click={() => changeBetChannel("all")}
        >
            ALL BETS
        </button>
        <button
            class="option {option() === 'high' ? 'active' : ''}"
            on:click={() => changeBetChannel("high")}
        >
            HIGH BETS
        </button>
        <button
            class="option {option() === 'lucky' ? 'active' : ''}"
            on:click={() => changeBetChannel("lucky")}
        >
            LUCKY WINS
        </button>
    </div>

    <table class="bets-table" cellspacing={0}>
        <thead class="bets-header">
            <tr>
                <th>GAME</th>
                <th>USER</th>
                <th class="large">TIME</th>
                <th class="large">WAGER AMOUNT</th>
                <th class="large">MULTIPLIER</th>
                <th>PAYOUT</th>
            </tr>
        </thead>

        <tbody>
            {#each bets() as bet, index}
                <tr class="bet">
                    <td>
                        <div class="image-data white caps">
                            <img
                                src={gameToImage[bet.game]}
                                alt=""
                                height="17"
                            />
                            {bet.game}
                        </div>
                    </td>

                    <td>
                        <div class="image-data user">
                            <Avatar
                                id={bet?.user?.id}
                                picture={user.picture}
                                height={30}
                            />
                            {bet?.user?.username || "Anonymous"}
                        </div>
                    </td>

                    <td class="large"
                        >{new Date(bet?.createdAt).toLocaleTimeString()}</td
                    >

                    <td class="large">
                        <div class="image-data white">
                            <img src="./front-coin" alt="" height="17" />
                            <p>
                                {Math.floor(bet?.amount || 0)}<span
                                    class="cents"
                                    >.{getCents(bet?.amount || 0)}</span
                                >
                            </p>
                        </div>
                    </td>

                    <td
                        class={"large " +
                            (bet?.payout / bet?.amount > 1 ? "green" : "")}
                    >
                        {(bet?.payout / bet?.amount).toFixed(2)}x
                    </td>

                    <td>
                        <div
                            class={"image-data " +
                                (bet?.payout / bet?.amount > 1
                                    ? "gold"
                                    : "lum")}
                        >
                            <img src="./front-coin" alt="" height="17" />
                            {bet?.payout / bet?.amount > 1 ? "+" : ""}
                            <p>
                                {Math.floor(bet?.payout || 0)}<span
                                    class="cents"
                                    >.{getCents(bet?.payout || 0)}</span
                                >
                            </p>
                        </div>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .bets-container {
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
