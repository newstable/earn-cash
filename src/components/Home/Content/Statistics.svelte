<script>
    import Icon from '@iconify/svelte';

    import "../../../app.scss";

    export let totalEarned = 0;
</script>

<div class="statistics">
    <div class="item">
        <div class="heading">
            <Icon icon="mdi:stopwatch-check-outline" color="#ff5a5c" width="24" height="24" />
            <div>0h 17m 16s</div>
        </div>
        <div class="description">
            Average time until user makes first cashout
        </div>
    </div>
    <div class="item">
        <div class="heading">
            <Icon icon="wpf:coins" color="#ff5a5c" width="24" height="24" />
            <div>$ 6.62</div>
        </div>
        <div class="description">
            Average money earned by users yesterday
        </div>
    </div>
    <div class="item">
        <div class="heading">
            <Icon icon="tabler:cash" color="#ff5a5c" width="24" height="24" />
            <div>$ {(totalEarned / 100).toLocaleString(undefined, { type: 'currency', currency: "USD", minimumFractionDigits: 2 })}</div>
        </div>
        <div class="description">
            Total USD earned on Justearn
        </div>
    </div>
</div>

<style lang="scss">
    @import "../../../variables.scss";

    div.statistics {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 60px;
        margin-bottom: 65px;
        background: $background-color;
        border-radius: 10px;
        position: relative;

        @media only screen and (max-width: 700px) {
            display: none;
        }

        &::before {
            content: "";
            position: absolute;
            top: -4%;
            left: 3%;
            height: 108%;
            width: 94%;
            background: $background-color;
            opacity: .58;
            border-radius: 10px;
            z-index: -1;
        }

        & > .item {
            display: inline-block;
            width: 33%;
            height: 6.21vw;
            padding-top: 1.2vw;
            position: relative;

            & > .heading {
                font-weight: 600;
                font-size: 1.2vw;
                color: $active-color;

                display: flex;
                align-items: center;
                justify-content: center;
                gap: 3px;

                padding-bottom: 3px;

                & > div {
                    display: flex;
                    align-items: center;
                    height: 100%;
                    line-height: 1.2;
                }
            }

            & > .description {
                font-size: .8vw;
                color: #595b80;
                width: auto;
                display: inline-block;
                letter-spacing: -0.03em;
                line-height: 129.5%;
                vertical-align: text-top;
                width: 63%;
            }

            &::after {
                content: "";
                    position: absolute;
                    top: 25%;
                    right: 0;
                    height: 50%;
                    width: 1px;
                    opacity: .25;
                    background: #595b80;
            }

            &:last-child::after {
                display: none;
            }
        }
    }
</style>