<script>
    import Gameinfo from "./gameinfo.svelte";
    import Gametag from "./gametag.svelte";

    let page = 0;

    const setPage = (newPage) => {
        page = newPage;
    };

    const gamemodes = [
        {
            tag: "hot",
            icon: "/assets/icons/battles.svg",
            title: "CASE BATTLES",
            type: "PVP",
            image: "./games/battles.png",
            link: "/battles",
        },
        // {
        //     tag: 'new',
        //     icon: '/assets/icons/slot.svg',
        //     title: 'SLOTS',
        //     type: 'PROVIDER',
        //     image: './games/slots.png',
        //     link: '/slots',
        // },
        {
            tag: "new",
            icon: "/assets/icons/mines.svg",
            title: "MINES",
            type: "HOUSE",
            image: "./games/mines.png",
            link: "/mines",
        },
        // {
        //     icon: '/assets/icons/roulette.svg',
        //     title: 'ROULETTE',
        //     type: 'HOUSE',
        //     image: './games/roulette.png',
        //     link: '/roulette',
        // },
        {
            icon: "/assets/icons/coinflip.svg",
            title: "COINFLIP",
            type: "PVP",
            image: "./games/coinflip.png",
            link: "/coinflip",
        },
        {
            icon: "/assets/icons/cases.svg",
            title: "CASES",
            type: "PVP",
            image: "./games/cases.png",
            link: "/cases",
        },
        {
            icon: "/assets/icons/jackpot.svg",
            title: "JACKPOT",
            type: "PVP",
            image: "./games/jackpot.png",
            link: "/jackpot",
        },
    ];
</script>

<div class="games">
    <div class="games-header">
        <img src="/fire.png" alt="fire" width="30" />

        <p>
            <span class="house-text">Featured</span>
            <span class="games-text">Offers</span>
        </p>

        <div class="line" />

        <button
            class="bevel-purple arrow"
            onClick={() => setPage(Math.max(page - 1, 0))}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
            >
                <path
                    d="M12 6L2 6M2 6L7.6 0.999999M2 6L7.6 11"
                    stroke="white"
                    stroke-width="2"
                />
            </svg>
        </button>

        <button
            class="bevel-purple arrow"
            onClick={() =>
                setPage(Math.min(page + 1, Math.floor(gamemodes.length / 6)))}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
            >
                <path
                    d="M1.58933e-07 6L10 6M10 6L4.4 11M10 6L4.4 0.999999"
                    stroke="white"
                    stroke-width="2"
                />
            </svg>
        </button>
    </div>
    <div class="dropdown-games">
        {#each gamemodes as game}
            <div class="gamemode">
                <div class="info">
                    {#if game.tag}
                        <Gametag tag={game.tag} />
                    {/if}
                    <img src={game.icon} alt="" height="16" />
                    <p>{game.title}</p>
                    <Gameinfo type={game.type} />
                </div>
                <a href={game.link} class="gamemode-link" />
                <div
                    class="gamemode-image"
                    style="background-image: url({game?.image})"
                ></div>
            </div>
        {/each}
    </div>
</div>

<!-- <OfferCategory iconUrl="/fire.png" title="Featured Offers">
    <a slot="right" href="/offers">View All</a>

    <SplideTrack slot="items">
        {#each revuOffers as offer}
            <SplideSlide class="carousel-item">
                <Offer
                    offerUrl={offer.offer_url}
                    offerImage={offer.image_url}
                    title={offer.name}
                    description={offer.description}
                    currencyAward={offer.currency_award}
                />
            </SplideSlide>
        {/each}
    </SplideTrack>
</OfferCategory> -->

<style>
    .games {
        position: relative;
        z-index: 1;
        width: 100%;
        margin-top: 30px;
    }

    .games-header {
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

    .games-header p {
        color: #ada3ef;
        font-size: 22px;
        font-weight: 800;
        user-select: none;
    }

    .cube,
    .house-text,
    .games-text {
        transition: all 0.3s;
    }

    .games-text {
        color: #ada3ef;
    }

    .games .cube {
        fill: #fca31e;
    }

    .games .house-text {
        color: white;
    }

    .games .games-text {
        color: #fca31e;
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

    .dropdown-games {
        display: none;
    }

    .dropdown-games {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 15px 20px;

        margin-top: 30px;
    }

    .gamemode {
        width: 100%;
        aspect-ratio: 373/200;
        border-radius: 6px;
        overflow: hidden;

        display: flex;
        flex-direction: column;

        position: relative;
    }

    .info {
        height: 35px;
        width: 100%;

        color: #fff;
        font-size: 16px;
        font-weight: 800;

        border-radius: 3px 3px 0 0;
        background: #423579;
        border: 1px solid transparent;
        background-clip: padding-box;

        display: flex;
        align-items: center;
        padding: 0 10px;
        gap: 10px;

        position: relative;
    }

    .info:before {
        top: -1px;
        left: -1px;
        content: "";
        height: calc(100% + 2px);
        width: calc(100% + 2px);
        position: absolute;
        background: linear-gradient(to top, #382d68, #6b54cc);
        z-index: -1;
        border-radius: 3px 3px 0 0;
    }

    .gamemode-image {
        width: 100%;
        flex: 1;

        background-size: 100% 100%;
        background-position: center;
        transition: background 0.3s;
    }

    .gamemode:hover .gamemode-image {
        background-size: 105% 105%;
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
    .gamemode-link {
        width: 100%;
        height: 100%;
        text-decoration: none;

        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
    }
</style>
