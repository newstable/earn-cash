<script>
    import "../../../app.scss";
</script>

<div class="why">
    <h2>Why is Justearn the #1 site to make money?</h2>
    <p>A list with all the advantages and features that made us become the #1</p>

    <div class="benefits">
        <div class="top">
            <div class="item">
                <img src="/moneyBag.png" alt="Checkouts "/>
                <div>Cashouts starting at $5</div>
            </div>
            <div class="item">
                <img src="/timers.png" alt="Checkouts "/>
                <div>Earn $1.00 every 5-10 minutes by completing offers on Justearn</div>
            </div>
        </div>

        <div class="regular">
            <div class="benefits">
                <div class="item">
                    <img src="/paypal.png" alt="PayPal"/>
                    <div>Instant cashouts</div>
                </div>
                <div class="item">
                    <img src="/dollarInHand.png" alt="Payouts"/>
                    <div>Highest payouts</div>
                </div>
            </div>
            <div class="benefits">
                <div class="item">
                    <img src="/check.png" alt="Verified tasks"/>
                    <div>Verified task</div>
                </div>
                <div class="item">
                    <img src="/support.png" alt="24/7 Support"/>
                    <div>Active Community Support</div>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    div.why {
        text-align: center;
        padding-bottom: 60px;

        & > div.benefits {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 30px;

            @media only screen and (max-width: 1850px) {
                flex-wrap: wrap;
                justify-content: center;
            }

            @media only screen and (max-width: 700px) {
                gap: 10px;
                flex-direction: column;
            }

            & > div.regular {
                display: flex;
                gap: 30px;
                flex-direction: column;
                width: calc(50% - 15px);
                min-width: 540px;

                @media only screen and (max-width: 700px) {
                    width: 100%;
                    min-width: unset;
                    gap: 10px;
                }

                & > .benefits {
                    display: flex;
                    gap: 30px;
                    flex-wrap: nowrap;

                    @media only screen and (max-width: 700px) {
                        gap: 10px;
                    }

                    & > .item {
                        height: 123px;
                        padding-top: 36px;

                        min-width: 255px;
                        background: #2e2727;
                        border-radius: 5px;
                        flex-grow: 1;
                        flex-shrink: 1;
                        flex-basis: 255px;

                        @media only screen and (max-width: 700px) {
                            width: calc(50% - 5px);
                            min-width: 50px;
                            gap: 10px;
                        }

                        & > img {
                            max-height: 26px;
                            margin-bottom: 10px;
                        }
                    }
                }
            }

            & > div.top {
                display: inline-flex;
                gap: 30px;
                width: calc(50% - 15px);
                min-width: 540px;

                @media only screen and (max-width: 700px) {
                    flex-direction: column;
                    width: 100%;
                    min-width: unset;
                    gap: 10px;
                }

                & > .item {
                    height: 276px;
                    padding: 16px 19px 22px 19px;

                    min-width: 255px;
                    background: #2e2727;
                    border-radius: 5px;
                    flex-grow: 1;
                    flex-shrink: 1;
                    flex-basis: 255px;

                    & > img {
                        max-height: 163px;
                        margin-bottom: 15px;
                    }

                    & > div {
                        font-size: 13px;
                        letter-spacing: -0.03em;
                    }
                }
            }
        }

        & > h2 {
            font-weight: 600;
            font-size: 30px;
            color: #fff;
            margin-bottom: 14px;
            line-height: 129.5%;
            letter-spacing: -0.03em;
        }

        & > p {
            font-weight: normal;
            font-size: 15px;
            color: #65678d;
            margin-bottom: 39px;
            line-height: 129.5%;
            letter-spacing: -0.03em;
        }
    }
</style>