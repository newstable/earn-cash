<script>
    export let user;
</script>

<div class="rewards-banner">
    <img src="/man-1.png" class="mascot" alt="man-1" width="118" height="149" />
    <div class="welcome">
        <div class="p-4 flex items-center justify-center flex-col">
            <p>Welcome Back, <span class="gold">{user.username}</span></p>
            <div class="level-progression">
                <div class="level">
                    <img src="./green-percent.png" height="10" alt="" />
                </div>
                <div class="level-container">
                    <div
                        class="xp-bar"
                        style={{
                            width: `${50}%`,
                        }}
                    />
                </div>
                <div class="level">
                    <img src="./parent-percent.png" height="10" alt="" />
                </div>
            </div>
        </div>
    </div>
    <div class="rewards">
        <img src="./red-box.png" alt="" />

        <p><span class="gold">{3}</span> REWARDS</p>

        <button
            class="claim"
        >
            <span>{user ? "CLAIM" : "LOGIN"}</span>
        </button>
    </div>
</div>

<style>
    .rewards-banner {
        flex: 1;
        min-height: 165px;
        max-width: 100%;
        width: 100%;

        border-radius: 8px;
        background: linear-gradient(
            to left,
            rgba(91, 48, 212, 1),
            rgba(0, 0, 0, 0)
        );

        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 40px;
        padding: 16px 32px;

        position: relative;
    }

    .rewards-banner:before {
        position: absolute;
        content: "";

        width: calc(100% - 2px);
        height: calc(100% - 2px);

        border-radius: 8px;
        top: 1px;
        left: 1px;
        z-index: 0;

        background: linear-gradient(
                to left,
                rgba(0, 0, 0, 0.1),
                rgba(0, 0, 0, 0.1)
            ),
            linear-gradient(to left, #2d2954, #2c2558);
    }

    .rewards-banner > * {
        z-index: 1;
        position: relative;
    }

    .mascot {
        position: absolute !important;
        z-index: 2 !important;
        left: 0;
        bottom: 0;
    }

    .welcome {
        height: 112px;
        width: 100%;

        border-radius: 8px;
        background: linear-gradient(
                to left,
                rgba(71, 12, 195, 0.49) 0%,
                rgba(0, 0, 0, 0) 100%
            ),
            rgba(37, 33, 73, 1);
        border: 1px solid #6046aa;

        padding: 16px 16px 16px 70px;

        color: white;
        font-family:
            Geogrotesque Wide,
            sans-serif;
        font-size: 21px;
        font-weight: 600;

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 12px;
    }

    .level-progression {
        display: flex;
        align-items: center;
        gap: 6px;
        width: 100%;
    }

    .level-container {
        width: 100%;
        height: 8px;
        border-radius: 2525px;
        background: rgba(0, 0, 0, 0.6);
    }

    .xp-bar {
        height: 100%;
        background: #6963a6;
        border-radius: 2525px;
    }

    .rewards {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        color: #fff;
        font-family:
            Geogrotesque Wide,
            sans-serif;
        font-size: 18px;
        font-weight: 700;
    }

    .rewards img {
        margin-top: -20px;
        filter: drop-shadow(0 15px 1rem rgba(252, 163, 30, 0.3));
    }

    .gold {
        color: #fca31e;
    }

    .claim {
        border-radius: 3px;
        border: 1px solid #b17818;
        background: linear-gradient(
                0deg,
                rgba(255, 190, 24, 0.25) 0%,
                rgba(255, 190, 24, 0.25) 100%
            ),
            linear-gradient(253deg, #1a0e33 -27.53%, #423c7a 175.86%);

        width: 100px;
        height: 30px;

        cursor: pointer;
    }

    .claim span {
        background: linear-gradient(53deg, #f90 54.58%, #f9ac39 69.11%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        font-family: "Geogrotesque Wide", sans-serif;
        font-size: 16px;
        font-weight: 700;
    }

    @media only screen and (max-width: 500px) {
        .welcome,
        .mascot {
            display: none;
        }

        .rewards-banner {
            justify-content: center;
        }
    }
</style>
