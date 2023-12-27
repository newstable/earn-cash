<script>
    import RobuxCashout from '../../../components/RobuxCashout.svelte';

    export let data;
</script>

<div class="page bg-bye">
    <a href="/cashout">
        <img src="/arrowLeftV2.svg" alt="Arrow back"/>
        <span>Back to shop</span>
        <img src="/shopPageIcon.svg" alt="Home"/>
    </a>
    
    <div class="container">
        <div class="top">
            <div class="left">
                <img src="/robux10.png" alt="Roblox logo" style="height: 80px"/>
            </div>
            <div class="right">
                <div class="info">
                    <img src="/infoIcon.svg" alt="info"/>
                    <span>It can take up to a week before you receive your ROBUX in your balance!</span>
                </div>
            </div>
        </div>

        <RobuxCashout data={{
            minimum: data.minimum,
            rate: 1,
            short: "ROBUX",
            fee: 0
        }}/>
    </div>
</div>

<style lang="scss">
    div.page {
        padding: 40px;

        @media only screen and (min-width: 1400px) {
            display: flex;
            align-items: flex-start;
        }

        @media only screen and (max-width: 700px) {
            padding: 36px 5px;
        }

        & > a {
            padding: 20px 19px;
            background: rgba(72,41,41,0.5);
            color: #9696d1;
            font-size: 11px;
            font-weight: 500;
            display: flex;
            align-items: center;
            border-radius: 3px;
            width: 174px;
            text-decoration: none;

            & > img:first-child {
                height: 15px;
                margin-right: 11px;
                position: relative;
                top: -1px;
            }

            & > img:last-child {
                    width: 18px;
                    height: 18px;
                    margin-left: 12px;
            }

            & > span {
                display: inline-block;
                position: relative;
                top: 1px;
                text-transform: uppercase;
                color: #9696d1;
                font-size: 10px;
                font-weight: 500;
            }
        }

        & > div.container {
            background: rgba(199, 180, 180, 0.1);
            padding: 36px;
            margin: 0 auto;
            flex: 1;
            border-radius: 5px;
            margin-top: 20px;

            @media only screen and (min-width: 1400px) {
                margin-top: 0;
                max-width: 1021px;
            }

            @media only screen and (max-width: 700px) {
                padding: 36px 5px;
            }

            & > div.top {
                display: flex;
                justify-content: space-between;
                align-items: center;

                & > div.left {
                    display: flex;
                }

                & > div.right {
                    flex: 1;
                    display: flex;
                    justify-content: flex-end;

                    & > div.info {
                        display: flex;
                        max-height: fit-content;
                        height: auto;
                        padding: 5px 18px;
                        margin-bottom: 10px;
                        border-radius: 5px;
                        background: rgba(50,30,30,0.7);
                        color: rgba(255, 102, 104,0.8);
                        font-size: 11px;
                        align-items: center;
                        box-shadow: 0 4px 5px rgb(0 0 0 / 5%);

                        & > img {
                            width: 13px;
                            height: 13px;
                            margin-right: 10px;
                        }

                        & > span {
                            color: rgba(255, 102, 104,0.8);
                            font-size: 11px;
                        }
                    }
                }
            }
        }
    }
</style>