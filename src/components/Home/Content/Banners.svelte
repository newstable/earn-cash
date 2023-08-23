<script>
    import "../../../app.scss";
    import modalStore from "../../../stores/signinupmodal.store";
</script>

<div class="banners">
    <div class="banner">
        <div class="heading">Yesterday users cashed out</div>
        <div class="amount">$2,625</div>
    </div>

    <div class="banner">
        <div class="title">
            Sign up now and start <br />
            earning money!
        </div>

        <button on:click={() => $modalStore.open(false)}>Start Earning</button>
    </div>
</div>

<style lang="scss">
    div.banners {
        font-size: 0;
        width: 60%;
        max-width: 1150.8px;
        margin: 0 auto;
        padding-bottom: 60px;
        display: flex;
        align-items: center;

        @media only screen and (max-width: 700px) {
            margin-left: 0;
            padding: 0 15px 0 15px;
            width: 100%;
            flex-direction: column;
        }

        & > .banner {
            font-size: 12px;
            text-align: center;
            padding-top: 5vw;
            display: inline-block;
            width: 60%;
            height: 21vw;
            max-height: 356px;
            background: #171515;
            border-radius: 10px;
            vertical-align: middle;
            position: relative;
            overflow: visible;

            @media only screen and (max-width: 700px) {
                display: block;
                width: 100%;
                min-height: 207px;
                height: auto;
                padding: 28px 30px 40px 30px;

                &:last-child {
                    padding-top: 61px;
                }
            }

            &:first-child {
                width: 40%;
                border: 2px solid #ff5a5c;
                box-shadow: 0 4px 25px rgb(0 0 0 / 10%);
                background: url(/fallingCoins.png);
                background-size: cover;
                background-repeat: no-repeat;

                @media only screen and (max-width: 700px) {
                    width: 100% !important;
                }
            }

            & > .heading {
                font-weight: 600;
                font-size: 1.05vw;
                line-height: 129.5%;
                letter-spacing: -0.03em;

                @media only screen and (max-width: 700px) {
                    font-size: 20px;
                }
            }

            & > .amount {
                font-weight: 600;
                font-size: 5vw;
                background: linear-gradient(270deg,#f9ebb9 0,#ffbc11 100%);
                background: -webkit-linear-gradient(270deg,#f9ebb9 0,#ffbc11 100%);
                text-shadow: 0 5px 9px rgb(255 221 103 / 6%);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;

                &::after {
                    content: "";
                    position: absolute;
                    background: url(/bigCoins.png);
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position-y: bottom;
                    width: 40%;
                    height: 100%;
                    left: -8%;
                    bottom: -2vw;
                }

                @media only screen and (max-width: 700px) {
                    font-size: 48px;

                    &::after {
                        width: 130px;
                        left: calc(50% - 65px);
                        height: 100%;
                        z-index: 1;
                        bottom: -35px;
                        background-position-y: bottom;
                    }
                }
            }

            & > .title {
                font-weight: 600;
                font-size: 2vw;
                margin-bottom: 2vw;
                line-height: 2.04vw;
                letter-spacing: -0.03em;

                @media only screen and (max-width: 700px) {
                    font-size: 18px;
                    line-height: 129.5%;
                    margin-bottom: 38px;
                }
            }
        }
    }

    button {
        width: 49%;
        background: #ff5a5c;
        border-radius: 4px;
        font-size: 15px;
        height: 50px;
        font-weight: 600;
        color: #232121;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border: none;
        cursor: pointer;
    }
</style>