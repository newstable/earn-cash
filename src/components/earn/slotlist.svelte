<script>
    import "../../app.scss";
    import Carousel from "svelte-carousel";
    import Wall from "../Wall.svelte";
    import { browser } from '$app/environment';

    export let user;
    let carousel;
    export let errorMessage;
    const walls = [
        {
            imgUrl: "joystick.png",
            wallName: "MM WALL",
            wallUrl: "mmwall",
            logoUrl: "/mmwall.svg",
            hasBonus: false,
            backgroundUrl: "/wall-offertoro-card-bg.png",
        },
        {
            imgUrl: "5stars.png",
            wallName: "Torox",
            wallUrl: "offertoro",
            logoUrl: "/torox.png",
            hasBonus: true,
            backgroundUrl: "/wall-offertoro-card-bg.png",
        },
        {
            imgUrl: "4stars.png",
            wallName: "AdGate",
            wallUrl: "adgate",
            logoUrl: "/AdGatemediaGlow.png",
            hasBonus: true,
            backgroundUrl: "/wall-adgate-card-bg.png",
        },
        {
            imgUrl: "4stars.png",
            wallName: "Notik",
            wallUrl: "notik",
            logoUrl: "/notik.png",
            hasBonus: false,
            backgroundUrl: "/wall-adscend-card-bg.png",
        },
        {
            imgUrl: "4stars.png",
            wallName: "Monlix",
            wallUrl: "monlix",
            logoUrl: "/monlix.svg",
            hasBonus: true,
            backgroundUrl: "/wall-adscend-card-bg.png",
        },
        {
            imgUrl: "3stars.png",
            wallName: "Rev Universe",
            wallUrl: "revu",
            logoUrl: "/revu-logo-white.svg",
            hasBonus: true,
            backgroundUrl: "/wall-revu-card-bg.png",
        },
        {
            imgUrl: "3stars.png",
            wallName: "MM WALL",
            wallUrl: "mmwall",
            logoUrl: "/mmwall.svg",
            hasBonus: false,
            backgroundUrl: "/wall-offertoro-card-bg.png",
        },
        {
            imgUrl: "3stars.png",
            wallName: "AdToWall",
            wallUrl: "adtowall",
            logoUrl:
                "https://i.imgur.com/nAB252F_d.webp?maxwidth=760&fidelity=grand",
            hasBonus: false,
            backgroundUrl: "/survey-inbrain-card-bg.png",
        },
        {
            imgUrl: "3stars.png",
            wallName: "Lootably",
            wallUrl: "lootably",
            logoUrl: "/lootably-logo.png",
            hasBonus: true,
            backgroundUrl: "/wall-lootably-card-bg.png",
        },
        {
            imgUrl: "3stars.png",
            wallName: "Adscend",
            wallUrl: "adscend",
            logoUrl: "/AdscendMediaGlow.webp",
            hasBonus: false,
            backgroundUrl: "/wall-adscend-card-bg.png",
        },
        {
            imgUrl: "2stars.png",
            wallName: "Timewall",
            wallUrl: "timewall",
            logoUrl: "https://i.imgur.com/eNQVAm7.png",
            hasBonus: false,
            backgroundUrl: "/survey-inbrain-card-bg.png",
        },
    ];

    const goToPrevPage = () => {
        if (carousel) {
            carousel.goToPrev();
        }
    };

    // Function to navigate to the next page
    const goToNextPage = () => {
        if (carousel) {
            carousel.goToNext();
        }
    };
</script>

<div class="games">
    <div class="games-button">
        <img src="/joystick.png" height="30" width="30" alt="" />
        <p class="title">
            <span class="white bold">Offer Partners</span>
            ({walls.length})
        </p>

        <div class="line"></div>

        <button class="bevel-purple arrow" on:click={goToPrevPage}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
            >
                <path
                    d="M12 6L2 6M2 6L7.6 .999999M2 6L7.6 11"
                    stroke="white"
                    stroke-width="2"
                />
            </svg>
        </button>

        <button class="bevel-purple arrow" on:click={goToNextPage}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
            >
                <path
                    d="M1e-07,6L10,6M10,6L4,11M10,6L4,1"
                    stroke="white"
                    stroke-width="2"
                />
            </svg>
        </button>
    </div>
    <div class="slots">
        {#if walls.length > 0 && browser}
            <Carousel
                bind:this={carousel}
                particlesToShow={9}
                dots={false}
                arrows={false}
                autoplay
            >
                {#each walls as wall}
                    <div class="slot">
                        <img
                            src="/5stars.png"
                            alt="rating"
                            class="absolute z-10 mt-2"
                        />
                        <Wall
                            {user}
                            {errorMessage}
                            wallName={wall.wallName}
                            wallUrl={wall.wallUrl}
                            logoUrl={wall.logoUrl}
                            hasBonus={wall.hasBonus}
                            backgroundUrl={wall.backgroundUrl}
                        />
                    </div>
                {/each}
            </Carousel>
        {/if}
    </div>
</div>

<style>
    .games {
        width: 100%;
        position: relative;
        margin-top: 30px;
    }

    .games-button {
        outline: unset;
        border: unset;

        width: 100%;
        height: 45px;

        border-radius: 5px;
        background: linear-gradient(
            90deg,
            rgb(104, 100, 164) -49.01%,
            rgba(90, 84, 149, 0.655) -5.08%,
            rgba(66, 53, 121, 0) 98.28%
        );

        padding: 0 15px;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .title {
        color: #ada3ef;
        font-size: 18px;
        font-weight: 600;
        user-select: none;

        display: flex;
        align-items: center;
        gap: 4px;
    }

    .title .bold {
        font-weight: 800;
        font-size: 22px;
    }

    .viewall {
        width: 70px;
        height: 25px;

        display: flex;
        align-items: center;
        gap: 4px;

        cursor: pointer;
        position: relative;

        color: rgba(66, 53, 121, 1);
        font-family:
            Geogrotesque Wide,
            sans-serif;
        font-size: 11px;
        font-weight: 700;
    }

    .line {
        flex: 1;
        height: 1px;

        border-radius: 2525px;
        background: linear-gradient(
            90deg,
            #5a5499 0%,
            rgba(90, 84, 153, 0) 100%
        );
    }

    .slots {
        display: flex;
        gap: 8px;

        padding: 8px;
        margin-top: 15px;

        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0);
        background: rgba(29, 24, 62, 0.15);

        min-height: 195px;
        overflow-x: auto;
    }

    .slots::-webkit-scrollbar {
        display: none;
    }

    .slot {
        min-width: 146px;
        width: 146px;
        border-radius: 6px;

        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;

        transition: background 0.3s;
        position: relative;
    }

    .slot:hover {
        background-size: 105%;
    }

    .bevel-purple {
        font-family: "Geogrotesque Wide", sans-serif;
        color: white;
        font-weight: 700;
        cursor: pointer;

        border-radius: 5px;
        border: 1px solid #866fea;
        background: radial-gradient(
            60% 60% at 50% 50%,
            #937eec 0%,
            #6653b8 100%
        );
        box-shadow:
            0px 4px 4px 0px rgba(0, 0, 0, 0.1),
            0px 0.5px 0px 0px #6b59ba,
            0px -0.5px 0px 0px #a08aff;
    }

    .arrow {
        width: 40px;
        height: 30px;

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        margin-left: auto;
    }
</style>
