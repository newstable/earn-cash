<script>
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { PUBLIC_GEO_URL } from "$env/static/public";
    import validation from '$lib/validation';
    import "../../app.scss";
	import getRef from './../../lib/getRef.js';
	import saveToken from './../../lib/saveToken.js';
    import modalStore from "../../stores/signinupmodal.store";

    export let email;
    export let password;
    export let confirmPassword;
    export let username;

    let emailValidated = 0;
    let usernameValidated = 0;
    let passwordValidated = 0;
    let confirmPasswordValidated = 0;
    let error = null;

    export let checked = false;

    onMount(() => {
        if (password.length >= 6) {
            confirmPassword = password + "";
            validate();
        }
    });

    const doSignUp = async () => {
        error = null;

        validate();
        if (
            emailValidated !== 1 ||
            usernameValidated !== 1 ||
            passwordValidated !== 1 ||
            confirmPasswordValidated !== 1
        ) return;

        fetch(PUBLIC_GEO_URL)
            .then(res=>res.json())
            .then(data=>(
                fetch("/api/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...data,
                        username,
                        email,
                        password,
                        ref: getRef()
                    })
                })
            ))
            .then(res=>res.json())
            .then(data=>{
                if (!data.success) {
                    error = data.userMessage;
                    return;
                }

                get(modalStore).close();
                saveToken(data.token);

                goto("/earn");
            })
    }

    const validate = (e = null) => {
        if (validation.email(email)) {
            emailValidated = 1;
        } else {
            emailValidated = -1;
        }

        if (validation.username(username)) {
            usernameValidated = 1;
        } else {
            usernameValidated = -1;
        }

        if (validation.password(password) && password === confirmPassword) {
            passwordValidated = 1;
        } else {
            passwordValidated = -1;
        }

        if (validation.password(confirmPassword) && password === confirmPassword) {
            confirmPasswordValidated = 1;
        } else {
            confirmPasswordValidated = -1;
        }

        if (e !== null)
            if (e.keyCode === 13) 
                doClick();
    }
</script>

<div class="register">
    <div class="input">
        <input autocomplete="on" placeholder="E-mail address" type="email" class:valid={emailValidated == 1} class:invalid={emailValidated == -1} bind:value={email} on:keyup={validate}>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Enter your E-mail address</label>
    </div>

    <div class="input">
        <input autocomplete="on" placeholder="Username" type="text" class:valid={usernameValidated == 1} class:invalid={usernameValidated == -1} bind:value={username} on:keyup={validate}>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Enter your username</label>
    </div>

    <div class="input">
        <input autocomplete="on" placeholder="Password" type="password" class:valid={passwordValidated == 1} class:invalid={passwordValidated == -1} bind:value={password} on:keyup={validate}>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Password</label>
    </div>

    <div class="input">
        <input autocomplete="on" placeholder="Confirm Password" type="password" class:valid={confirmPasswordValidated == 1} class:invalid={confirmPasswordValidated == -1} bind:value={confirmPassword} on:keyup={validate}>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Confirm Password</label>
    </div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="check" on:click={() => checked = !checked}>
        <span class:checked={checked}>
            By signing up, you are agreeing to our
            <a href="/privacy" target="_blank">Privacy Policy</a>
            and
            <a href="/terms" target="_blank">Terms</a>
        </span>
    </div>

    <div>
        <button on:click={doSignUp}>Sign Up</button>
    </div>

    {#if error !== null}
        <div class="error">
            {error}
        </div>
    {/if}
</div>

<style lang="scss">
    @import "../../variables.scss";

    div.error {
        background: #eb4634;
        margin-top: 1rem;
        padding: 5px 7px;
        border-radius: 5px;
    }

    div.register {
        display: block;

        .check {
            left: 0;
            color: #ffff;
            position: relative;
            top: -10px;
            display: block;
            margin-bottom: 2px;
            font-size: .8rem;
            cursor: pointer;

            & > span {
                font-size: 12px;
                padding-left: 35px;
                line-height: 18px;
                position: relative;
                cursor: pointer;
                display: inline-block;
                height: 25px;
                user-select: none;

                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 18px;
                    height: 18px;
                    z-index: 0;
                    border: 2px solid #ffff;
                    border-radius: 5px;
                    margin-top: 3px;
                    transition: .2s;
                }

                &.checked::before {
                    border-top: 2px solid transparent;
                    border-left: 2px solid transparent;
                    border-right: 2px solid #d44648;
                    border-bottom: 2px solid #d44648;

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
                    text-decoration: underline;
                    color: #d44648;
                }
            }
        }

        .input {
            position: relative;
            margin-top: 1rem;
            margin-bottom: 1rem;
            scale: 90%;
            margin-right: 20px;
            margin-left: -20px;

            input {
                outline: none;
                height: 3rem;
                font-size: 16px;
                margin: 0 0 8px 0;
                box-shadow: none;
                box-sizing: content-box;
                transition: box-shadow .3s, border .3s, -webkit-box-shadow .3s;

                background: $darkest-background-color;
                border: none;
                padding: 0 1rem;
                width: calc(100% - 2rem);
                margin-top: .75rem;
                border-radius: 5px;
                color: black;
                font-weight: bold;

                overflow: visible;
                line-height: 1.15;

                &::placeholder {
                    color: $alt-background-color;
                }

                &:focus+label {
                    color: #ff5a5c;
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
    }

    button {
        margin-right: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 44px;
        min-width: 130px;
        background: #5f141e;
        color: white;
        border-radius: 5px;
        box-shadow: none;
        text-shadow: 0 0 15px #e64c4e;

        text-transform: none;
        text-decoration: none;
        text-align: center;
        letter-spacing: .5px;
        transition: background-color .2s ease-out;
        cursor: pointer;
        font-size: 14px;
        outline: 0;
        line-height: 36px;
        padding: 0 16px;
        vertical-align: middle;
        -webkit-tap-highlight-color: transparent;

        border: none;

        transition: background-color .2s ease-out;
        &:hover {
            background: $alt-background-color;
            box-shadow: 0 3px 3px 0 rgb(0 0 0 / 14%), 0 1px 7px 0 rgb(0 0 0 / 12%), 0 3px 1px -1px rgb(0 0 0 / 20%);
        }
    }
</style>