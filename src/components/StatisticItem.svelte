<script>
    export let style = "";
    export let title = "";
    export let subtitle = "";
</script>

<div class="statistic-item" style={style}>
    <div>
        <div>
            <slot/>
        </div>
    </div>

    <div>
        <div>{title}</div>
        <div>{subtitle}</div>
    </div>
</div>

<style lang="scss">
    .statistic-item {
        display: flex;
        gap: 10px;

        & > div:first-child {
            flex: none;
        }

        & {
            flex: 1;

            & > div {
                font-size: 24px;
                font-weight: bold;
                display: flex;
                flex-wrap: wrap;
                flex-direction: column;

                & > div:first-child {
                    font-size: 24px;
                    font-weight: bold;
                    align-items: center;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                & > div:last-child {
                    font-size: 14px;
                    color: #ccd;
                    font-weight: 400;
                }
            }
        }
    }
</style>