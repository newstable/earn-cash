<script>
    import Icon from '@iconify/svelte';

    import "../app.scss";
    import Gift from './icons/Gift.svelte';
    import Alternate from './SignInUpModal/Alternate.svelte';
    import SignIn from './SignInUpModal/SignIn.svelte';
    import SignUp from './SignInUpModal/SignUp.svelte';

    let show = false;
    let login = true;
    let scale = 0;

    let email = "";
    let password = "";
    let username = "";
    let isChecked = false;

    export const close = () => {
        if (!show) return;

        scale = 0;
        setTimeout(() => {
            show = false;
        }, 300);
    }

    export const open = (_login = true, _email = "", _password = "", _username = "", checked = false) => {
        if (show) return;

        login = _login;
        email = _email;
        password = _password;
        username = _username;
        isChecked = checked;

        show = true;
        setTimeout(() => {
            scale = 1;
        }, 10);
    }

    const toggleView = () => login = !login;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal-bg" style={show ? "" : "display: none;"} on:click={close}/>
<div class="modal" style="transform: scaleX({scale}) scaleY({scale}); {show ? "" : "display: none;"}">
    <div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="cross" on:click={close}>
            <Icon icon="humbleicons:times" color="#fb4646" width="19" height="19" />
        </div>

        <div class="container">
            <div class="left">
                <div class="welcome">Welcome</div>

                <div class="title">
                    <Gift/>
                    
                    <div class="inner">
                        <h1>Sign Up Bonus</h1>
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 5.5L2.5 4.5H8L10.5 5.5L8 6H2.5L0 5.5Z" fill="#888FC2"></path>
                            <path d="M2 5.5L5.5 0L8.5 5.5L5.5 10.5L2 5.5Z" fill="#888FC2"></path>
                        </svg>
                    </div>
                </div>

                <div class="content">
                    <div class="option">
                        <span>1</span>
                        Create an account
                    </div>

                    <div class="option">
                        <span>2</span>
                        Start earning from offers and accumulate points!
                    </div>

                    <div class="winnings">
                        <div class="title">Use your coins to cash out, or play our Rock, Paper, Scissors gamemode.</div>

                        <div class="container">
                            <div class="block">
                                <div class="item" style="background-image: url(/rewards/goldLayer.svg)">
                                    <div class="icon" style="background-image: url(/rewards/coinsWin1.png)"></div>
                                    <div class="amount">$250,00</div>
                                </div>
                                <div class="item" style="background-image: url(/rewards/greenLayer.svg)">
                                    <div class="icon" style="background-image: url(/rewards/coinsWin2.png)"></div>
                                    <div class="amount">$2,50</div>
                                </div>
                                <div class="item">
                                    <div class="icon" style="background-image: url(/rewards/coinsWin3.png)"></div>
                                    <div class="amount">$0,25</div>
                                </div>
                                <div class="item">
                                    <div class="icon" style="background-image: url(/rewards/coinsWin4.png)"></div>
                                    <div class="amount">$0,05</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="right">
                <div>
                    <div class="toggle">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <a class:active={login} on:click={toggleView}>Sign In</a>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <a class:active={!login} on:click={toggleView}>Sign Up</a>
                    </div>

                    {#if login}
                        <SignIn/>
                    {:else}
                        <SignUp email={email} password={password} username={username} checked={isChecked}/>
                    {/if}

                    <Alternate/>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    @import "../variables.scss";

    div.modal {
        z-index: 1003;
        display: block;
        opacity: 1;
        top: 10%;
        transform: scaleX(1) scaleY(1);
        transition: .3s;

        overflow-x: hidden;
        max-height: 100vh;
        width: 100%;
        max-width: 720px;
        background: #262323;
        border-radius: 10px;
        
        position: fixed;
        left: 0;
        right: 0;
        padding: 0;
        margin: auto;
        overflow-y: auto;
        will-change: top, opacity;

        color: #fff;

        @media only screen and (max-width: 700px) {
            top: 0;
            bottom: 0;
            width: 100vw;
        }

        & > div {
            padding-bottom: 0;
            overflow: hidden;
            padding: 24px;

            div.cross {
                position: absolute;
                top: 0;
                right: 0;
                transform: translate(-15px, 10px);
                cursor: pointer;
            }

            & > div.container {
                max-width: 720px;
                display: flex;
                width: 100%;
                justify-content: space-between;

                & > .right {
                    display: block;
                    width: 60%;
                    height: 100%;

                    & > div {
                        display: block;
                        width: 100%;
                        height: 100%;

                        & > div.toggle {
                            display: flex;
                            width: 100%;
                            margin-bottom: 3rem;

                            & > a {
                                transition: 400ms all ease-in-out;
                                position: relative;
                                cursor: pointer;
                                color: #444564;
                                font-size: 1.25rem;
                                font-weight: 400;
                                text-decoration: none;

                                &:first-child {
                                    margin: 0 1rem;
                                }

                                &.active {
                                    color: #fff;


                                    &::after {
                                        content: "";
                                        position: absolute;
                                        width: 100%;
                                        height: 2px;
                                        background: #d44648;
                                        left: 0;
                                        bottom: -.5rem;
                                    }
                                }
                            }
                        }
                    }

                    @media only screen and (max-width: 700px) {
                        width: 100%;
                    }
                }

                & > .left {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    width: 35%;
                    height: auto;

                    div.welcome {
                        color: #fff;
                        font-size: 1.5rem;
                        padding-bottom: .25rem;
                    }

                    & > div.title {
                        position: relative;
                        top: 0;
                        margin-top: 60px;
                        margin-bottom: 21px;

                        left: calc(50% - 110px);
                        height: 30px;
                        width: 220px;
                        background: #585d83;

                        &::before {
                            content: "";
                            position: absolute;
                            top: 0;
                            border: 15px solid;
                            border-left-width: 5px;
                            border-right-width: 5px;
                            border-color: #585d83 #585d83 transparent transparent;
                            left: -10px;
                        }

                        &::after {
                            content: "";
                            position: absolute;
                            top: 0;
                            right: -10px;
                            border: 15px solid;
                            border-left-width: 5px;
                            border-right-width: 5px;
                            border-color: #585d83 transparent transparent #585d83;
                        }

                        div.inner {
                            h1 {
                                font-size: 22px;
                                text-align: center;
                                line-height: 30px;
                                color: $active-color;
                                margin: 0;
                                font-weight: 700;
                            }

                            & > svg {
                                top: -5px;
                                position: absolute;
                            }
                        }
                    }

                    div.content {
                        font-weight: 500;
                        text-align: center;
                        font-size: 10px;

                        & > .option:first-child {
                            margin-bottom: 9px;
                        }

                        & > .option {
                            margin-bottom: 23px;

                            span {
                                width: 18px;
                                height: 18px;
                                background: rgba(255,90,92,0.25);
                                color: $active-color;
                                border-radius: 50%;
                                text-align: center;
                                display: inline-block;
                                line-height: 18px;
                                margin-right: 9px;
                            }
                        }

                        .winnings {
                            div.title {
                                color: #8e94c1;
                                margin: 20px 0;
                                line-height: 15px;
                            }

                            .container {
                                overflow: auto;
                                div.block {
                                    flex-wrap: wrap;
                                    padding-top: 30px;
                                    margin-bottom: 0;

                                    display: flex;
                                    gap: 11px;

                                    & > .item {
                                        min-width: 100px;
                                        max-width: 120px;
                                        height: 54px;
                                        padding-top: 27px;

                                        position: relative;
                                        display: inline-block;
                                        background: #383855;
                                        box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
                                        border-radius: 4px;
                                        flex: auto;
                                        width: 18%;
                                        text-align: center;

                                        &:nth-child(1)::before, &:nth-child(2)::before {
                                            content: "";
                                            position: absolute;
                                            top: 0;
                                            left: 0;
                                            height: 100%;
                                            width: 100%;
                                            background: linear-gradient(360deg,#4a4f75 -61.96%,#f0c220 -18.07%,#4a4f75 93.09%);
                                            opacity: .2;
                                            border-radius: 4px;
                                        }

                                        &:nth-child(2)::before {
                                            background: linear-gradient(360deg,#4a4f75 -61.96%,#ff5a5c -18.07%,#4a4f75 93.09%);
                                        }

                                        &::after {
                                            content: "";
                                            position: absolute;
                                            width: 99%;
                                            height: 2px;
                                            left: .5%;
                                            bottom: 1px;
                                            background: linear-gradient(270deg,#4a4f75 0,#585d83 48.19%,#4a4f75 100%);
                                            border-radius: 0 0 4px 4px;
                                            opacity: .8;
                                        }

                                        &:nth-child(1)::after {
                                            background: linear-gradient(270deg,#4a4f75 0,#f0c220 48.19%,#4a4f75 100%);
                                        }

                                        &:nth-child(2)::after {
                                            background: linear-gradient(360deg,#4a4f75 -61.96%,#ff5a5c -18.07%,#4a4f75 93.09%);
                                        }

                                        & > .icon {
                                            bottom: 33px;
                                            left: 25%;
                                            width: 50%;
                                            
                                            position: absolute;
                                            height: 77px;
                                            background-repeat: no-repeat;
                                            background-position: center;
                                            background-position-y: bottom;
                                            background-size: contain;
                                        }

                                        & > .amount {
                                            font-size: 12px;
                                            position: relative;
                                            font-weight: 700;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    @media only screen and (max-width: 700px) {
                        display: none;
                    }
                }
            }
        }
    }

    div.modal-bg {
        z-index: 1002;
        display: block;
        opacity: .5;

        position: fixed;
        top: -25%;
        left: 0;
        bottom: 0;
        right: 0;
        height: 125%;
        width: 100%;
        background: #000;
        will-change: opacity;
    }
</style>