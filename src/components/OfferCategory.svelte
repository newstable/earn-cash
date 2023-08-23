<script>
    import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';

    import "../app.scss";
    import '@splidejs/svelte-splide/css';
    import Icon from '@iconify/svelte';

    export let iconUrl = "";
    export let title = "";
</script>

<div class="category">
    <div class="header">
        <div class="icon">
            <img src={iconUrl} alt="category icon"/>
        </div>
        <div class="title">{title}</div>
        <div class="right">
            <slot name="right"/>
        </div>
    </div>

    <div class="container">
        <Splide hasTrack={false} autowidth={true} options={{
            perPage: 15,
            gap: 10,
            pagination: false,
            breakpoints: {

                2475: {
                    perPage: 14
                },
                2310: {
                    perPage: 13
                },
                2145: {
                    perPage: 12
                },
                1980: {
                    perPage: 11
                },
                1815: {
                    perPage: 10
                },
                1650: {
                    perPage: 9
                },
                1485: {
                    perPage: 8
                },
                1320: {
                    perPage: 7
                },
                1155: {
                    perPage: 6
                },
                990: {
                    perPage: 5
                },
                825: {
                    perPage: 4
                },
                600: {
                    perPage: 3
                }
            }
        }}>
            <slot name="items"/>

            <div class="splide__arrows">
                <button class="splide__arrow splide__arrow--prev">
                    <Icon icon="material-symbols:arrow-back-ios-new" color="#a9a9ca" width="12" height="12" rotate={2}/>
                </button>
                <button class="splide__arrow splide__arrow--next">
                    <Icon icon="material-symbols:arrow-back-ios-new" color="#a9a9ca" width="12" height="12" rotate={2}/>
                </button>
            </div>
        </Splide>
    </div>
</div>

<style lang="scss">
    @import "../variables.scss";

    .splide__arrow {
        border-radius: 6px;
        height: 32px;
        width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        top: -50px;
        background: #242537;
        box-shadow: 0 2px 0 rgb(36 37 55 / 40%);
        transform: none;
        border: 0;

        &.splide__arrow--prev {
            right: 40px;
            left: initial;
        }

        &.splide__arrow--next {
            right: 0;
        }

        &:disabled {
            opacity: .3;
        }
    }

    div.container {
        margin-top: 20px;
    }

    div.header {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;

        & > .icon {
            margin-right: 12px;
            display: flex;
            align-items: center;

            & > img {
                width: 15px;
            }
        }

        & > .title {
            color: #fff;
            flex: 1;
            font-style: normal;
            font-weight: 700;
            font-size: 20px;
        }

        & > .right {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-right: 90px;
        }
    }

    div.category {
        position: relative;
        background: #232121;
        padding: calc($earn-page-padding * 0.7) $earn-page-padding 30px $earn-page-padding;
        min-height: 185px;
    }
</style>