<script>
    import "../../../app.scss";
    import modalStore from "../../../stores/signinupmodal.store";
</script>

<div class="get-started-section">
    <h2 class="title">How to get started?</h2>
    <p class="description">
        Earning money on Justearn has been made as simple as possible
    </p>

    <div class="start-guide">
        <div class="item">
            <div class="step">01</div>
            <div class="card">
                <div class="title">Choose a task</div>
                <ul>
                    <li>
                        <img src="/stashLogo.png" alt="Stash">
                        <div class="title">Sign up for a bank account</div>
                        <div class="prize">$69,00</div>
                    </li>
                    <li class="active">
                        <img src="/riseKingLogo.png" alt="Stash">
                        <div class="title">Play and reach level 17</div>
                        <div class="prize pointer">$100,00</div>
                    </li>
                    <li>
                        <img src="/ezgifLogo.png" alt="Stash">
                        <div class="title">Sign up & deposit $10</div>
                        <div class="prize">$80,00</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="item">
            <div class="step">02</div>
            <div class="card">
                <div class="title">Complete the task</div>
                <div class="description">Read the description before you start</div>
                <div class="btn">
                    Start
                </div>
            </div>
        </div>
        <div class="item">
            <div class="step">03</div>
            <div class="card">
                <div class="title">Receive coins</div>
                <div class="description">And cash them out!</div>
                <div class="btn cashout">
                    Cash out $1,00 bitcoin
                </div>
                <div class="coins"></div>
            </div>
        </div>
    </div>

    <button on:click={() => $modalStore.open(false)}>Start Earning</button>
</div>

<style lang="scss">
    div.get-started-section {
        text-align: center;
        margin-bottom: 60px;

        & > h2 {
            font-weight: 600;
            font-size: 30px;
            color: #fff;
            margin-bottom: 14px;
            line-height: 129.5%;
            letter-spacing: -0.03em;
        }

        & > .description {
            font-size: 15px;
            color: #65678d;
            margin-bottom: 63px;
            line-height: 129.5%;
            letter-spacing: -0.03em;
            margin-top: 0;
        }

        & > button {
            width: 157px;
            height: 50px;
            background: #ff5a5c;
            border-radius: 4px;
            font-weight: 600;
            font-size: 15px;
            color: #232121;
            display: inline-block;
            line-height: 50px;
            
            border: 0;
            margin: 0;
            padding: 0;
            overflow: hidden;
            cursor: pointer;
        }

        & > .start-guide {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 30px;
            margin-bottom: 44px;

            & > .item {
                position: relative;
                width: calc(33.3333333333% - 20px);
                min-width: 290px;
                height: 175px;
                padding: 15px;
                text-align: center;

                &:first-child {
                    text-align: left;
                }
                &:last-child {
                    text-align: right;
                }

                @media only screen and (max-width: 700px) {
                    width: 100%;
                    height: 175px;
                }

                &::before {
                    content: "";
                    position: absolute;
                    z-index: 1;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background: #505278;
                    opacity: .15;
                    border-radius: 10px;
                }

                & > .step {
                    position: absolute;
                    top: -26px;
                    left: 15%;
                    background: -webkit-linear-gradient(180deg,#ff5a5c 16.94%,rgba(255,90,92,0) 66.13%);
                    background: linear-gradient(180deg,#ff5a5c 16.94%,rgba(255,90,92,0) 66.13%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-size: 48px;
                    font-weight: 600;
                }

                & > .card {
                    position: relative;
                    z-index: 3;
                    width: 100%;
                    height: 100%;
                    background: rgba(40,41,66,0.5);
                    border-radius: 10px;
                    overflow: hidden;
                    padding: 14px 21px;
                    -webkit-box-shadow: 0 0 8px #222121;
                    box-shadow: 0 0 8px #222121;

                    & > .title {
                        font-weight: 600;
                        font-size: 18px;
                        color: #ff5a5c;
                        margin-bottom: 6px;
                        line-height: 129.5%;
                        letter-spacing: -0.03em;
                    }

                    & > .description {
                        margin-bottom: 23px;
                        font-weight: 500;
                        font-size: 12px;
                        color: #fff;
                        line-height: 129.5%;
                        letter-spacing: -0.03em;    
                    }

                    & > .btn {
                        position: relative;
                        width: 101px;
                        height: 34px;
                        background: #222121;
                        box-shadow: inset 0 1px 0 #4a4f75;
                        border-radius: 5px;
                        text-align: center;
                        font-weight: 600;
                        font-size: 12px;
                        display: inline-block;
                        line-height: 34px;
                        padding: 0 10px;
                        text-transform: uppercase;

                        &::after {
                            content: "";
                            position: absolute;
                            right: -10px;
                            bottom: -30px;
                            width: 50px;
                            height: 60px;
                            background: url(/hand.png);
                            background-size: contain;
                            background-repeat: no-repeat;
                            transform: rotate(322deg);
                        }

                        &.cashout {
                            width: max-content;
                            max-width: 200px;
                            text-transform: none;

                            &::after {
                                left: 60%;
                                transform: rotate(339deg);
                                right: unset;
                            }
                        }
                    }

                    & > .coins {
                        position: absolute;
                        z-index: -1;
                        top: 10px;
                        left: 10px;
                        width: 54%;
                        height: 100%;
                        background: url(/coins.png);
                        background-size: contain;
                        background-repeat: no-repeat;
                    }

                    &::before {
                        content: "";
                        position: absolute;
                        z-index: -1;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        filter: blur(5px);
                        background: url(/guideBg1.png);
                        border-radius: 10px;
                        background-size: cover;
                        background-repeat: no-repeat;
                        border-radius: 10px;
                    }

                    & > ul {
                        position: relative;
                        margin-left: 15px;
                        background: #24253a;
                        border-radius: 5px;
                        margin: 0;
                        padding-left: 0;
                        list-style-type: none;

                        &::after {
                            content: "";
                            position: absolute;
                            top: 0;
                            left: 0;
                            height: 100%;
                            width: 100%;
                            background: rgba(40,41,65,0.5);
                            border-radius: 5px 5px 0 0;
                        }

                        & > li {
                            list-style-type: disc;
                            font-weight: 500;
                            font-size: 10px;
                            letter-spacing: -0.03em;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            gap: 10px;
                            padding: 5px;

                            &.active {
                                position: relative;
                                left: -12.5px;
                                z-index: 1;
                                width: calc(100% + 25px);
                                background: #292a42;
                                box-sizing: border-box;
                                border: 0.2px solid rgba(255,90,92,0.2);
                                box-shadow: 0 0 19px 1px rgb(255 90 92 / 30%);
                                border-radius: 5px;

                                & > .title {
                                    font-size: 12px;
                                    color: #fff;
                                }

                                & > .prize {
                                    color: #ff5a5c;
                                    font-size: 12px;
                                    position: relative;

                                    &::after {
                                        content: "";
                                        position: absolute;
                                        left: -20px;
                                        bottom: -30px;
                                        width: 50px;
                                        height: 60px;
                                        background: url(/hand.png);
                                        background-size: contain;
                                        background-repeat: no-repeat;
                                    }
                                }
                            }

                            img {
                                width: 26px;
                                height: 26px;
                                border-radius: 4px;
                                background-color: #6aad21;
                                border-style: none;
                            }

                            .title {
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                width: calc(100% - 100px);
                                text-align: center;
                                color: rgba(255,255,255,0.35);
                            }

                            .prize {
                                background: #222121;
                                box-shadow: inset 0 0.8px 0 #4a4f75;
                                border-radius: 4px;
                                padding: 4px 8px;
                            }
                        }
                    }
                }

                &:nth-child(2) > .card::before {
                    background-image: url(/guideBg2.png);
                }

                &:nth-child(3) > .card::before {
                    background-image: url(/guideBg3.png);
                    filter: none;
                }
            }
        }
    }
</style>