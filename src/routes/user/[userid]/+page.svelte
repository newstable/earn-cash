<script>
	import date2readable from './../../../services/date2readable.js';

    export var data;

    var page = 1;

    const maxPage = () => Math.ceil(data.activities.length / 5);
    const setPage = newPage => page = newPage;
</script>
<div class="bg-bye">
<div class="profile">
    <div>
        <h1>Profile</h1>

        <div class="info">
            <div>
                <div class="profileLevelAndAvatar">
                    <div class="userProfileAvatar">
                        <img src={data.picture} alt="Avatar"/>
                    </div>
                    <div class="userProfileLevel">
                        <span>
                            {data.level}
                        </span>
                    </div>
                </div>
                <div class="userIdentitySection">
                    <h1>{data.username}</h1>
                    <div class="userCountry">
                        <img src="/flags/{data.country.toLowerCase()}.webp" alt={data.countryFull}/>
                        <span>{data.countryFull}</span>
                    </div>
                </div>
            </div>

            <div>
                <div class="sectionHeading">
                    <img src="/stats.svg" alt="Statistics"/>
                    <span>Statistics</span>
                </div>
                <div class="userStatsCard">
                    <div>
                        <div class="cardItem">
                            <svg class="d-block" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="56" height="56" rx="12" fill="#ff5a5c" fill-opacity="0.2"></rect>
                                <g filter="url(#filter0_d_729_147350)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M38.3224 29.6924C38.7573 29.2364 39 28.6304 39 28.0002C39 27.3699 38.7573 26.7639 38.3224 26.3079L37.8392 25.8004C37.7373 25.6935 37.6638 25.5628 37.6256 25.4201C37.5875 25.2775 37.5858 25.1275 37.6208 24.9841L37.785 24.3053C37.9343 23.6926 37.8417 23.0459 37.5263 22.4998C37.211 21.9537 36.6973 21.5502 36.092 21.3733L35.4219 21.1761C35.2798 21.1349 35.1505 21.0585 35.0458 20.954C34.9411 20.8494 34.8646 20.7202 34.8232 20.5782L34.6268 19.908C34.4503 19.3019 34.0466 18.7874 33.4998 18.472C32.953 18.1565 32.3055 18.0644 31.6925 18.215L31.0137 18.3792C30.8701 18.4145 30.7198 18.4129 30.577 18.3745C30.4342 18.3362 30.3033 18.2624 30.1966 18.16L29.6899 17.6776C29.2338 17.2427 28.6278 17 27.9976 17C27.3674 17 26.7614 17.2427 26.3054 17.6776L25.7979 18.1608C25.6908 18.2623 25.56 18.3354 25.4174 18.3735C25.2749 18.4117 25.1251 18.4136 24.9816 18.3792L24.3075 18.215C23.6946 18.0656 23.0476 18.1582 22.5011 18.4735C21.9546 18.7888 21.5507 19.3026 21.3732 19.908L21.176 20.5782C21.1348 20.7202 21.0584 20.8496 20.9539 20.9543C20.8494 21.0589 20.7201 21.1355 20.5781 21.1768L19.908 21.3733C19.3022 21.5502 18.7881 21.9541 18.4727 22.5007C18.1573 23.0474 18.065 23.6946 18.215 24.3076L18.3792 24.9864C18.4141 25.1301 18.4124 25.2802 18.3741 25.423C18.3358 25.5658 18.2621 25.6966 18.16 25.8035L17.6776 26.3102C17.2426 26.7663 17 27.3723 17 28.0025C17 28.6327 17.2426 29.2387 17.6776 29.6948L18.1608 30.2023C18.2627 30.3091 18.3362 30.4399 18.3744 30.5825C18.4125 30.7252 18.4142 30.8751 18.3792 31.0186L18.215 31.6974C18.0664 32.3097 18.1594 32.9558 18.4746 33.5014C18.7899 34.0469 19.3033 34.4501 19.908 34.627L20.5781 34.8242C20.7202 34.8654 20.8495 34.9418 20.9542 35.0463C21.0588 35.1509 21.1354 35.2801 21.1768 35.4221L21.374 36.0931C21.5504 36.6989 21.9541 37.2133 22.5008 37.5286C23.0474 37.8439 23.6947 37.9359 24.3075 37.7853L24.9863 37.6211C25.13 37.5862 25.2801 37.588 25.4229 37.6263C25.5656 37.6646 25.6965 37.7382 25.8034 37.8403L26.3101 38.3227C26.7662 38.7575 27.3722 39 28.0024 39C28.6325 39 29.2385 38.7575 29.6946 38.3227L30.2021 37.8395C30.3088 37.7374 30.4396 37.6639 30.5823 37.6257C30.7249 37.5875 30.8749 37.586 31.0184 37.6211L31.6972 37.7853C32.3095 37.9337 32.9555 37.8406 33.501 37.5254C34.0465 37.2101 34.4497 36.6969 34.6268 36.0923L34.824 35.4221C34.8652 35.2801 34.9416 35.1507 35.0461 35.0461C35.1506 34.9414 35.2799 34.8648 35.4219 34.8235L36.0928 34.6263C36.6982 34.4491 37.212 34.0453 37.5273 33.4989C37.8425 32.9524 37.9348 32.3055 37.785 31.6927L37.6208 31.0139C37.5859 30.8702 37.5876 30.7201 37.6259 30.5773C37.6642 30.4345 37.7379 30.3037 37.84 30.1968L38.3224 29.6924ZM32.3735 25.9571C32.764 25.5666 32.764 24.9334 32.3735 24.5429C31.9829 24.1524 31.3498 24.1524 30.9593 24.5429L26.1664 29.3358L25.0401 28.2096C24.6496 27.819 24.0164 27.819 23.6259 28.2096C23.2354 28.6001 23.2354 29.2332 23.6259 29.6238L24.7521 30.75C25.5332 31.531 26.7995 31.531 27.5806 30.75L32.3735 25.9571Z" fill="#ff5a5c"></path>
                                </g>
                                <defs>
                                    <filter id="filter0_d_729_147350" x="13" y="17" width="30" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                        <feOffset dy="4"></feOffset>
                                        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                                        <feComposite in2="hardAlpha" operator="out"></feComposite>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_729_147350"></feBlend>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_729_147350" result="shape"></feBlend>
                                    </filter>
                                </defs>
                            </svg>

                            <div class="cardInfo">
                                <div>{data.offersCompleted}</div>
                                <div>Offers Completed</div>
                            </div>
                        </div>

                        <div class="cardItem">
                            <svg class="d-block" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="56" height="56" rx="12" fill="#ff5a5c" fill-opacity="0.2"></rect>
                                <g filter="url(#filter0_d_1473_229975)">
                                    <path d="M27.9998 24.7898C30.0643 24.7898 31.7379 23.046 31.7379 20.8949C31.7379 18.7438 30.0643 17 27.9998 17C25.9353 17 24.2617 18.7438 24.2617 20.8949C24.2617 23.046 25.9353 24.7898 27.9998 24.7898Z" fill="#ff5a5c"></path>
                                    <path d="M35.5614 24.7904C36.8666 24.7904 37.9246 23.688 37.9246 22.3281C37.9246 20.9682 36.8666 19.8658 35.5614 19.8658C34.2563 19.8658 33.1982 20.9682 33.1982 22.3281C33.1982 23.688 34.2563 24.7904 35.5614 24.7904Z" fill="#ff5a5c"></path>
                                    <path d="M20.4374 24.7904C21.7425 24.7904 22.8006 23.688 22.8006 22.3281C22.8006 20.9682 21.7425 19.8658 20.4374 19.8658C19.1322 19.8658 18.0742 20.9682 18.0742 22.3281C18.0742 23.688 19.1322 24.7904 20.4374 24.7904Z" fill="#ff5a5c"></path>
                                    <path d="M22.7657 27.0004C21.8355 26.2063 20.993 26.3114 19.9174 26.3114C18.3088 26.3114 17 27.667 17 29.3328V34.222C17 34.9455 17.5667 35.5338 18.2637 35.5338C21.2724 35.5338 20.91 35.5905 20.91 35.3986C20.91 31.9341 20.5161 29.3934 22.7657 27.0004Z" fill="#ff5a5c"></path>
                                    <path d="M29.0217 26.3299C27.143 26.1666 25.51 26.3317 24.1016 27.5431C21.7445 29.5102 22.1981 32.1589 22.1981 35.3991C22.1981 36.2564 22.8675 36.967 23.7028 36.967C32.7723 36.967 33.1333 37.2718 33.6711 36.0308C33.8475 35.6112 33.7992 35.7445 33.7992 31.7299C33.7992 28.5412 31.1493 26.3299 29.0217 26.3299Z" fill="#ff5a5c"></path>
                                    <path d="M36.0826 26.3113C35.0012 26.3113 34.1634 26.2072 33.2344 27.0003C35.4671 29.3755 35.0901 31.7428 35.0901 35.3984C35.0901 35.5916 34.7892 35.5336 37.6913 35.5336C38.4132 35.5336 39.0001 34.9243 39.0001 34.1754V29.3327C39.0001 27.6669 37.6913 26.3113 36.0826 26.3113Z" fill="#ff5a5c"></path>
                                </g>
                                <defs>
                                    <filter id="filter0_d_729_147350" x="13" y="17" width="30" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                        <feOffset dy="4"></feOffset>
                                        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                                        <feComposite in2="hardAlpha" operator="out"></feComposite>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_729_147350"></feBlend>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_729_147350" result="shape"></feBlend>
                                    </filter>
                                </defs>
                            </svg>

                            <div class="cardInfo">
                                <div>{data.usersReferred}</div>
                                <div>Users Referred</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="cardItem">
                            <svg class="d-block" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="56" height="56" rx="12" fill="#ff5a5c" fill-opacity="0.2"></rect>
                                <g filter="url(#filter0_d_1473_229975)">
                                    <path d="M39 33V35C39 36.1032 38.1184 37 37.0357 37H20.1429C18.4096 37 17 35.5648 17 33.8C17 33.8 17 20.212 17 20.2C17 18.4352 18.4096 17 20.1429 17H34.6786C35.3299 17 35.8571 17.5376 35.8571 18.2C35.8571 18.8624 35.3299 19.4 34.6786 19.4H20.1429C19.7099 19.4 19.3571 19.7584 19.3571 20.2C19.3571 20.6416 19.7099 21 20.1429 21H37.0357C38.1184 21 39 21.8968 39 23V25H35.0714C32.9052 25 31.1429 26.7944 31.1429 29C31.1429 31.2056 32.9052 33 35.0714 33H39Z" fill="#ff5a5c"></path>
                                </g>
                                <defs>
                                    <filter id="filter0_d_729_147350" x="13" y="17" width="30" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                        <feOffset dy="4"></feOffset>
                                        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                                        <feComposite in2="hardAlpha" operator="out"></feComposite>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_729_147350"></feBlend>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_729_147350" result="shape"></feBlend>
                                    </filter>
                                </defs>
                            </svg>

                            <div class="cardInfo">
                                <div>
                                    <img src="/coin.svg" alt="Currency" />
                                    {Math.ceil(data.totalEarnings)}
                                </div>
                                <div>Total Earnings</div>
                            </div>
                        </div>

                        <div class="cardItem">
                            <svg class="d-block" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="56" height="56" rx="12" fill="#ff5a5c" fill-opacity="0.2"></rect>
                                <g filter="url(#filter0_d_1473_229975)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M39 28C39 34.0751 34.0751 39 28 39C21.9249 39 17 34.0751 17 28C17 21.9249 21.9249 17 28 17C34.0751 17 39 21.9249 39 28ZM29 22.5C29 21.9477 28.5523 21.5 28 21.5C27.4477 21.5 27 21.9477 27 22.5V29.1C27 29.4788 27.214 29.825 27.5528 29.9944L31.9528 32.1944C32.4468 32.4414 33.0474 32.2412 33.2944 31.7472C33.5414 31.2532 33.3412 30.6526 32.8472 30.4056L29 28.482V22.5Z" fill="#ff5a5c"></path>
                                </g>
                                <defs>
                                    <filter id="filter0_d_729_147350" x="13" y="17" width="30" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                        <feOffset dy="4"></feOffset>
                                        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                                        <feComposite in2="hardAlpha" operator="out"></feComposite>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_729_147350"></feBlend>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_729_147350" result="shape"></feBlend>
                                    </filter>
                                </defs>
                            </svg>

                            <div class="cardInfo">
                                <div>
                                    <img src="/coin.svg" alt="Currency"/>
                                    {Math.ceil(data.totalEarnings30Days)}
                                </div>
                                <div>Earnings last 30 days</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="activity">
            <div class="sectionHeading">
                <img src="/activity.svg" alt="Activity"/>
                <span>Activity</span>
            </div>

            <table class="profileTable">
                <thead>
                    <tr>
                        <td>
                            Offer
                        </td>
                        <td>
                            Time
                        </td>
                        <td>
                            Reward
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {#each data.activities.slice((page - 1) * 5, (page * 5)) as activity}
                        <tr>
                            <td>
                                {activity.name}
                            </td>
                            <td>
                                {date2readable(activity.time)}
                            </td>
                            <td>
                                <img src="/coin.svg" class="scale-150 mt-4" alt="Currency"/>
                                <span>{activity.reward}</span>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <div class="profilePagination">
                <div>
                    <ul class="pagination unselectable">
                        <li class:disabled={page == 1}>
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <a on:click={() => page !== 1 && setPage(page - 1)}>
                                <iconify-icon icon="ic:baseline-chevron-left" style="line-height: 33px; font-size: 1.5rem;"></iconify-icon>
                            </a>
                        </li>
                        <li class:active={page == 1}>
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <a on:click={() => page == 1 ? setPage(1) : setPage(page - 1)}>
                                {#if page == 1}
                                    1
                                {:else if maxPage() == page && maxPage() - 2 >= 1}
                                    {maxPage() - 2}
                                {:else}
                                    {page - 1}
                                {/if}
                            </a>
                        </li>
                        <li class:disabled={page == 1 && page + 1 > maxPage()} class:active={page != 1 && page != maxPage()}>
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <a on:click={() => page == 1 ? setPage(2) : setPage(page)}>
                                {#if page == 1}
                                    2
                                {:else if maxPage() == page}
                                    {maxPage() - 1}
                                {:else}
                                    {page}
                                {/if}
                            </a>
                        </li>
                        <li class:disabled={page + 1 > maxPage()} class:active={page == maxPage() && page != 1}>
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <a on:click={() => (page + 1 <= maxPage()) && (page == 1 ? setPage(3) : setPage(page + 1))}>
                                {#if page == 1}
                                    3
                                {:else if maxPage() == page}
                                    {maxPage()}
                                {:else}
                                    {page + 1}
                                {/if}
                            </a>
                        </li>
                        <li class:disabled={page + 1 > maxPage()}>
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <a on:click={() => page != maxPage() ? setPage(page + 1) : setPage(maxPage())}>
                                <iconify-icon icon="ic:baseline-chevron-right" style="line-height: 33px; font-size: 1.5rem;"></iconify-icon>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

<style lang="scss">
     div.userProfileAvatar {
        z-index: 5 !important;
     }
     div.userProfileLevel {
        z-index: 6 !important;
            
        }

    @media only screen and (max-width: 1199px) {
        div.info {
            flex-direction: column;
            padding-bottom: 20px;

            & > div {
                width: 100% !important;
            }
        }
    }

    @media only screen and (max-width: 560px) {
        div.userProfileAvatar {
            width: 90px !important;
            height: 90px !important;
           

            img {
                width: 80px !important;
                height: 80px !important;
            }
        }

        div.userProfileLevel {
            margin: -12px 0 0 26px !important;
            
        }

        div.userStatsCard {
            display: grid !important;
            gap: 0 !important;
        }

        div.profile {
            max-width: 98% !important;
            padding: 0 .75rem !important;
        }
    }

    .unselectable {
        user-select: none;
    }

    ul:not(.browser-default) {
        padding-left: 0;
        list-style-type: none;
    }

    div.profilePagination {
        padding-top: 20px;
        display: flex;
        justify-content: center;

        ul {
            display: flex;
            gap: 5px;

            li {
                opacity: 1;
                background: #302f2f;
                box-shadow: 0 2px 0 rgba(47,48,67,0.4);
                width: 32px;
                height: 32px;
                text-align: center;
                color: #a9a9ca;
                border-radius: 6px;

                &.disabled {
                    opacity: .6;
                    border-radius: 6px;

                    a {
                        opacity: .4;
                        cursor: default;
                    }
                }

                &.active {
                    background: #ff5a5c;

                    a {
                        color: #000;
                    }
                }

                list-style-type: none;

                display: inline-block;
                vertical-align: top;

                a {
                    font-family: "Poppins";
                    font-style: normal;
                    font-weight: 500;
                    font-size: 12px;
                    color: #a9a9ca;
                    line-height: 33px;
                    display: flex;
                    justify-content: center;
                    padding: 0 10px;
                    width: 100%;
                    height: 100%;
                    align-items: center;
                    text-decoration: none;
                    cursor: pointer;
                }
            }
        }
    }

    tbody td {
        font-weight: 600;
        font-size: 14px;

        &:nth-child(1) {
            text-align: left;
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #fff;
        }

        &:nth-child(2) {
            text-align: center;
            color: #ccd;
        }

        &:nth-child(3) {
            text-align: right;
            color: #ccd;

            img {
                width: 16px;
                height: 14px;
            }

            span {
                font-weight: 700;
                font-size: 12px;
            }
        }
    }

    thead td {
        font-weight: 500;
        font-size: 14px;
        color: #fff;
        opacity: 1;

        &:nth-child(1) {
            text-align: left;
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 40%;
        }

        &:nth-child(2) {
            text-align: center;
        }

        &:nth-child(3) {
            text-align: right;
        }
    }

    tr {
        border-bottom: 1px solid rgba(255,255,255,0.16);
        line-height: 40px;
        border-radius: 6px;

        &:nth-child(odd) {
            background:inherit;
        }
    }

    table {
        width: 100%;
        display: table;
        border-collapse: collapse;
        border-spacing: 0;
    }

    table, td {
        border: none;
    }

    div.activity {
        padding-top: 40px;
    }

    div.userStatsCard {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 40px;

        div.cardItem {
            display: flex;
            gap: 20px;
            margin-bottom: 15px;

            .d-block {
                display: block;
            }

            .cardInfo {
                display: grid;

                div {
                    &:first-child {
                        font-weight: 700;
                        font-size: 24px;
                        letter-spacing: .01em;
                        color: #fff;

                        img {
                            width: 16px;
                            height: 14px;
                        }
                    }
                    &:last-child {
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 160%;
                        color: #ccd;
                        white-space: nowrap;
                    }
                }
            }
        }
    }

    div.sectionHeading {
        display: flex;
        gap: 10px;
        padding-bottom: 21px;

        span {
            font-weight: 700;
            font-size: 16px;
            letter-spacing: .01em;
            color: #fff;
        }
    }

    div.userIdentitySection {
        width: auto !important;
        padding-left: 25px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        & > div.userCountry {
            display: flex;
            gap: 7px;
            justify-self: center;

            img {
                width: 32px;
                height: 32px;
                margin-top: -5px;
                border-radius: 50%;
            }

            span {
                font-weight: 500;
                font-size: 14px;
                color: #ccd;
            }
        }
    }

    div.profileLevelAndAvatar {
        display: grid;
        padding-left: 35px;

        & > div.userProfileLevel {
            margin: -16px 0 0 45px;
            background-color: #9d9d9d;
            width: 41px;
            height: 20px;
            display: inline-block;
            border-radius: 4px;
            overflow: visible;
            text-align: center;
            line-height: 20px;

            span {
                font-family: "Poppins";
                font-style: normal;
                font-weight: 500;
                font-size: 12px;
                color: #fff;
            }
        }

        & > div.userProfileAvatar {
            display: flex;
            width: 128px;
            height: 128px;
            background-size: cover;
            border-radius: 50%;
            border: 2px solid #71718c;
            justify-content: center;
            align-items: center;
            border: 2px solid #ff5a5c;

            img {
                float: left;
                box-sizing: border-box;
                width: 118px;
                height: 118px;
                border-radius: 50%;
            }
        }
    }

    div.info {
        margin-top: 30px;
        display: flex;
        gap: 40px;

        & > div {
            width: 50%;
            flex: none;
            min-height: 230px;
            background: #5f141e;
            border-radius: 6px;

            &:first-child {
                display: flex;
                align-items: center;
            }

            &:last-child {
                width: 50%;
                flex: none;
                min-height: 230px;
                background: #5f141e;
                border-radius: 6px;
                padding: 25px;
            }
        }
    }

    div.profile {
        padding: 40px 0 0 0;
        display: flex;
        justify-content: center;
        margin-bottom: 0 !important;
        padding-bottom: 20px !important;
        max-width: 1100px;
        margin: 0 auto;

        & > div {
            width: 100%;
            margin-left: auto;
        }
    }

    h1 {
        font-weight: 700;
        font-size: 24px;
        line-height: 150%;
        letter-spacing: .01em;
        color: #fff;
    }
</style>