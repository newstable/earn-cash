<script>
  import { goto } from "$app/navigation";
  import validation from "$lib/validation";
  import { get } from "svelte/store";
  import { PUBLIC_GEO_URL, PUBLIC_NODE_ENV } from "$env/static/public";
  import "../../app.scss";
  import modalStore from "../../stores/signinupmodal.store";
  import saveToken from "./../../lib/saveToken.js";

  let resetPassword = false;
  let emailValidated = 0;
  let passwordValidated = 0;

  let email;
  let password;

  let error = null;

  const doLogin = () => {
    error = null;
    validate();
    if (emailValidated !== 1 || passwordValidated !== 1) return;

    if (PUBLIC_NODE_ENV === "development") {
      // in development we dont have the geo location
      fetch("/api/user/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) {
            error = data.userMessage;
            return;
          }

          get(modalStore).close();
          saveToken(data.token);
          goto("/earn");
        });
    } else {
      fetch(PUBLIC_GEO_URL)
        .then((res) => res.json())
        .then((data) =>
          fetch("/api/user/authenticate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data,
              email,
              password,
            }),
          })
        )
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "data");

          if (!data.success) {
            error = data.userMessage;
            return;
          }

          get(modalStore).close();
          saveToken(data.token);
          goto("/earn");
        });
    }
  };

  const doResetPassword = async () => {
    // TODO: Make it reset password
    if (email) {
      const response = await fetch("/api/user/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      if (response.status === 200) {
        console.log("Success");
        alert(`Sent reset password request to ${email}`);
        resetPassword = false;
      }
    }
  };

  const doClick = () => {
    if (resetPassword) return doResetPassword();
    doLogin();
  };

  const validate = (e = null) => {
    if (validation.email(email)) {
      emailValidated = 1;
    } else {
      emailValidated = -1;
    }

    if (validation.password(password)) {
      passwordValidated = 1;
    } else {
      passwordValidated = -1;
    }

    if (e !== null) if (e.keyCode === 13) doClick();
  };
</script>

<div class="login">
  <div class="input">
    <input
      autocomplete="on"
      placeholder="E-mail address"
      type="email"
      class:valid={emailValidated == 1}
      class:invalid={emailValidated == -1}
      bind:value={email}
      on:keyup={validate}
    />
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>Enter your E-mail address</label>
  </div>

  {#if !resetPassword}
    <div class="input">
      <input
        autocomplete="off"
        placeholder="Password"
        type="password"
        class:valid={passwordValidated == 1}
        class:invalid={passwordValidated == -1}
        bind:value={password}
        on:keyup={validate}
      />
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label>Password</label>
    </div>
  {/if}

  <div class="btns">
    <button on:click={doClick}>
      {#if resetPassword}
        Continue
      {:else}
        Sign In
      {/if}
    </button>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <p on:click={() => (resetPassword = !resetPassword)}>
      {#if resetPassword}
        Cancel
      {:else}
        Reset Password
      {/if}
    </p>
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

  div.login {
    .btns {
      display: flex;
      height: max-content;

      & > button {
        margin-right: 2rem;

        display: flex;
        align-items: center;
        justify-content: center;
        height: 44px;
        min-width: 130px;
        background: $alt-background-color;
        color: #e64c4e;
        border-radius: 5px;
        box-shadow: none;
        text-shadow: 0 0 15px #e64c4e;

        text-transform: none;
        text-decoration: none;
        text-align: center;
        letter-spacing: 0.5px;
        transition: background-color 0.2s ease-out;
        cursor: pointer;
        font-size: 14px;
        outline: 0;
        line-height: 36px;
        padding: 0 16px;
        vertical-align: middle;
        -webkit-tap-highlight-color: transparent;

        border: none;

        transition: background-color 0.2s ease-out;
        &:hover {
          background: $alt-background-color;
          box-shadow:
            0 3px 3px 0 rgb(0 0 0 / 14%),
            0 1px 7px 0 rgb(0 0 0 / 12%),
            0 3px 1px -1px rgb(0 0 0 / 20%);
        }
      }

      & > p {
        transition: all 300ms ease-in-out;
        color: #63658e;
        font-weight: 600;
        cursor: pointer;
        margin: 13px 0;

        &:hover {
          color: #7f80a5;
        }
      }
    }

    .input {
      position: relative;
      margin-top: 1rem;
      margin-bottom: 1rem;

      input {
        outline: none;
        height: 3rem;
        font-size: 16px;
        margin: 0 0 8px 0;
        box-shadow: none;
        box-sizing: content-box;
        transition:
          box-shadow 0.3s,
          border 0.3s,
          -webkit-box-shadow 0.3s;

        background: $darkest-background-color;
        border: none;
        padding: 0 1rem;
        width: calc(100% - 2rem);
        margin-top: 0.75rem;
        border-radius: 5px;
        color: $alt-navbar-color;

        overflow: visible;
        line-height: 1.15;

        &::placeholder {
          color: $alt-background-color;
        }

        &:focus + label {
          color: #ff5a5c;
        }

        &.valid {
          border-bottom: 1px solid #4caf50;
          -webkit-box-shadow: 0 1px 0 0 #4caf50;
          box-shadow: 0 1px 0 0 #4caf50;
        }
        &.invalid {
          border-bottom: 1px solid #f44336;
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
        transition:
          transform 0.2s ease-out,
          color 0.2s ease-out,
          -webkit-transform 0.2s ease-out;
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
          transition:
            0.2s opacity ease-out,
            0.2s color ease-out;

          width: 300px;
          margin-left: 10px;
          height: 1px;
          background: linear-gradient(
            to right,
            $alt-background-color,
            transparent
          );
          left: auto;
          opacity: 1;
        }
      }
    }
  }
</style>
