<script>
    import Icon from '@iconify/svelte';

    import validation from '$lib/validation';
    import "../../../app.scss";
    import modalStore from '../../../stores/signinupmodal.store';
    import { get } from 'svelte/store';

    let emailValidated = 0;
    let passwordValidated = 0;
    let checked = false;

    let password;
    let email;

    const doSignUp = () => {
        validate();
        if (emailValidated !== 1 || passwordValidated !== 1 || !checked) return;

        get(modalStore).open(false, email, password, "", checked);
    }

    const validate = () => {
        if (validation.password(password)) {
            passwordValidated = 1;
        } else {
            passwordValidated = -1;
        }

        if (validation.email(email)) {
            emailValidated = 1;
        } else {
            emailValidated = -1;
        }
    }
</script>

<div class="container">
    <div class="title">Sign up for free</div>
    <!-- 
    <div class="description">
        and win up to <span>$250</span> in the free case
    </div>
    -->

    <div class="form">
        <!-- <img src="/rollingCase.png" alt="Free Case"/> -->

        <div class="signup-with">
            <a href="/auth/google">
                <Icon icon="logos:google-icon" width="16" height="16" />
                <span>Sign up with Google</span>
            </a>
            <a href="/auth/steam">
                <Icon icon="logos:steam" width="16" height="16" />
                <span>Sign up with Steam</span>
            </a>
        </div>

        <div class="divider">
            <span>or</span>
        </div>

        <div class="input">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Enter your E-mail address</label>
            <input autocomplete="on" placeholder="E-mail address" type="email" class:valid={emailValidated == 1} class:invalid={emailValidated == -1} bind:value={email} on:keyup={validate}>
        </div>

        <div class="input">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Password</label>
            <input autocomplete="off" placeholder="Password" type="password" class:valid={passwordValidated == 1} class:invalid={passwordValidated == -1} bind:value={password} on:keyup={validate}>
        </div>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="check" on:click={() => checked = !checked}>
            <span class:checked={checked}>
                By signing up, you are agreeing to our
                <a href="/privacy" target="_blank">Privacy Policy</a>
                and
                <a href="/terms" target="_blank">Terms of Service</a>.
            </span>
        </div>

        <button on:click={doSignUp}>Sign Up</button>
    </div>
</div>

<style lang="scss">
    @import "../../../variables.scss";

    div.divider {
        position: relative;
        font-size: 10px;
        font-weight: 500;
        letter-spacing: -0.03em;
        margin-bottom: 23px;
        line-height: 129.5%;

        &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 2px;
            left: 0;
            top: 6.5px;
            background: linear-gradient(90deg,rgba(88,93,131,0) 0,rgba(88,93,131,0.5) 46.05%,rgba(88,93,131,0) 46.06%,rgba(88,93,131,0) 53.62%,rgba(88,93,131,0.5) 53.63%,rgba(88,93,131,0) 100%);
        }
    }

    div.container {
        position: relative;
        top: -18px;
        right: 0;
        max-width: 390px;
        max-height: 520px;
        background: $alt-background-color;
        box-shadow: 0 4px 5px rgb(0 0 0 / 10%);
        border-radius: 5px;
        padding: 26px 25px 20px 25px;
        text-align: center;
        font-size: 0;
        min-width: 370px;

        @media only screen and (min-width: 701px) and (max-width: 1199px) {
            display: none;
        }

        @media only screen and (max-width: 700px) {
            display: block;
            position: relative;
            top: 0;
            left: 0;
            background: unset;
            padding: 0;
            width: 100%;
            max-width: none;
            min-width: 290px;
            margin-bottom: 46px;
        }

        & .signup-with {
            display: flex;
            justify-content: center;
            margin-bottom: 17px;
            gap: 12px;
            margin-top: 15px; /* temp solution for space */

            & > a {
                width: calc(50% - 6px);
                height: 37px;
                background: $darker-background-color;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                color: #fff;
                text-decoration: none;

                & > span {
                    font-weight: 500;
                    font-size: 10px;
                }
            }
        }

        & > .title {
            font-weight: 600;
            font-size: 24px;
            letter-spacing: -.03em;
            margin-bottom: 5px;
            line-height: 129.5%;
        }

        & > .description {
            font-weight: 500;
            font-size: 10px;
            letter-spacing: -.03em;
            margin-bottom: 10px;
            line-height: 129.5%;

            & > span {
                color: $active-color;
            }
        }

        & > .form > img {
            margin-bottom: 15px;
            width: 100%;
            border-style: none;
        }

        .input {
            position: relative;
            margin-top: 1rem;
            margin-bottom: 1rem;

            input {
                outline: none;
                height: 37px;
                font-size: 12px;
                margin: 0 0 8px 0;
                box-shadow: none;
                box-sizing: content-box;
                transition: box-shadow .3s, border .3s, -webkit-box-shadow .3s;

                background: #4f4d4d;
                border: none;
                padding: 0 1rem;
                width: calc(100% - 2rem);
                margin-top: .75rem;
                border-radius: 5px;
                color: $alt-navbar-color;

                overflow: visible;
                line-height: 1.15;

                margin-bottom: 11px;

                &::placeholder {
                    color: $alt-background-color;
                }

                &.valid {
                    border-bottom: 1px solid #4CAF50;
                    -webkit-box-shadow: 0 1px 0 0 #4caf50;
                    box-shadow: 0 1px 0 0 #4caf50;
                }
                &.invalid {
                    border-bottom: 1px solid #F44336;
                    -webkit-box-shadow: 0 1px 0 0 #f44336;
                    box-shadow: 0 1px 0 0 #f44336;
                }
            }

            label {
                left: 0;
                transform: translateY(-14px) scale(0.8);
                transform-origin: 0 0;

                position: absolute;
                top: 0;
                font-size: 1rem;
                cursor: text;
                transition: transform .2s ease-out, color .2s ease-out, -webkit-transform .2s ease-out;
                text-align: initial;

                display: flex;
                align-items: center;
                color: #fff;
                width: max-content;

                &::after {
                    display: block;
                    content: "";
                    position: relative;
                    top: 100%;
                    transition: .2s opacity ease-out, .2s color ease-out;

                    width: 300px;
                    margin-left: 10px;
                    height: 1px;
                    background: linear-gradient(to right,$alt-background-color,transparent);
                    left: auto;
                    opacity: 1;
                }
            }
        }

        .check {
            left: 0;
            color: #9e9e9e;
            position: relative;
            top: -10px;
            display: block;
            margin-bottom: 2px;
            font-size: .8rem;
            cursor: pointer;

            & > span {
                font-size: 11px;
                padding-left: 35px;
                line-height: 16px;
                position: relative;
                cursor: pointer;
                display: inline-block;
                height: 25px;
                user-select: none;

                font-weight: 500;
                text-align: left;

                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 18px;
                    height: 18px;
                    z-index: 0;
                    border: 1.5px solid #7b7b97;
                    border-radius: 2px;
                    margin-top: 3px;
                    transition: .2s;
                }

                &.checked::before {
                    border-top: 2px solid transparent;
                    border-left: 2px solid transparent;
                    border-right: 2px solid #26a69a;
                    border-bottom: 2px solid #26a69a;

                    top: -4px;
                    left: -5px;
                    width: 12px;
                    height: 22px;

                    transform: rotate(40deg);
                    backface-visibility: hidden;
                    transform-origin: 100% 100%;

                    border-radius: 1px;
                }

                & > a {
                    cursor: pointer;
                    text-decoration: none;
                    color: #db0003;
                }
            }
        }

        & > .form > button {
            width: 130px;
            height: 37px;
            background: #db0003;
            box-shadow: 0 1.25478px 2.50957px rgb(0 0 0 / 20%), inset 0 1.25478px 0 #ff0003;
            border-radius: 5px;
            font-weight: 600;
            font-size: 15px;
            color: $background-color;
            border: none;
            cursor: pointer;
        }

        & > .form {
            @media only screen and (max-width: 700px) {
                padding: 15px 15px 38px 25px;
                background: $alt-background-color;
                box-shadow: 0 3.32308px 4.15385px rgb(0 0 0 / 10%);
                border-radius: 4px;
            }
        }
    }
</style>