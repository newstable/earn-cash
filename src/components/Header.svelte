<script>
  import { get } from "svelte/store";
  import { browser } from "$app/environment";
  import { PUBLIC_GEO_URL } from "$env/static/public";
  import loggedIn from "./../stores/loggedIn.store.js";
  import Icon from "@iconify/svelte";

  import "../app.scss";
  import tokenStore from "../stores/token.store.js";
  import { deleteCookie } from "../lib/cookies.js";
  import { onMount } from "svelte";
  import { PUBLIC_NODE_ENV } from "$env/static/public";

  export let modal;

  var showAccountMenu = false;

  let username = "";
  let balance = 0;
  let picture = "";
  let id = "";

  const getAccount = async () => {
    const token = get(tokenStore);

    if (PUBLIC_NODE_ENV === "development") {
      fetch("/api/user/authenticate", {
        headers: {
          authentication: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) {
            loggedIn.set(false);
            tokenStore.set("");
            deleteCookie("token");
            return;
          }

          username = data.user.username;
          balance = data.user.balance;
          picture = data.user.picture;
          id = data.user.id;
        });
    } else {
      fetch(PUBLIC_GEO_URL)
        .then((res) => res.json())
        .then((data) =>
          fetch("/api/user/authenticate", {
            headers: {
              authentication: token,
              ...data,
            },
          })
        )
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) {
            loggedIn.set(false);
            tokenStore.set("");
            deleteCookie("token");
            return;
          }

          username = data.user.username;
          balance = data.user.balance;
          picture = data.user.picture;
          id = data.user.id;
        });
    }
  };

  loggedIn.subscribe(async (val) => {
    if (val && browser) {
      getAccount();
    }
  });

  const onClickSomewhere = (e) => {
    showAccountMenu = false;
    document.body.removeEventListener("click", onClickSomewhere);
  };

  onMount(() => {
    let intervalId;
    if (process.env.NODE_ENV !== "development") {
      fetch(PUBLIC_GEO_URL)
        .then((res) => res.json())
        .then((data) =>
          fetch("/api/setGeoInfo", {
            method: "POST",
            headers: data,
          })
        );
      intervalId = setInterval(() => {
        if (get(loggedIn)) {
          getAccount();
        }
      }, 25000);
    }

    return () => {
      clearInterval(intervalId);
      document.body.removeEventListener("click", onClickSomewhere);
    };
  });

  const openMenu = () => {
    showAccountMenu = true;

    setTimeout(
      () => document.body.addEventListener("click", onClickSomewhere),
      200
    );
  };

  const logout = () => {
    tokenStore.set("");
    deleteCookie("token");
    loggedIn.set(false);
  };
</script>

<div class="headerHolder">
  <header>
    <div class="logo">
      <a href="/">
        <img src="/logoicon.png" alt="Favicon" />
        <span>
          <img src="/logoicontext.png" alt="Logo" />
        </span>
      </a>
    </div>

    <div class="widgets"></div>

    <div class="account">
      <div class="discord-button">
        <a href="https://discord.gg/justearn" target="_blank">
          <img src="/discord.webp" alt="Discord" />
          Join
        </a>
      </div>
      {#if !$loggedIn}
        <button on:click={() => modal.open()}>
          <Icon icon="mdi:user" color="white" width="17" height="17" />
          Sign In
        </button>

        <button class="alt" on:click={() => modal.open(false)}>
          <Icon icon="mdi:key-variant" color="white" width="17" height="17" />
          Sign Up
        </button>
      {:else}
        <div class="account-item">
          <a href="/cashout">
            <span>
              <img src="/favicon.png" alt="Favicon" width="18" />
            </span>
            <span style="color: white; text-decoration: none; cursor: default;">
              {(+balance).toFixed(2)}
            </span>
          </a>
        </div>
        <div class="account-item dropdown">
          <button on:click={openMenu}>
            <span class="user-menu-avatar">
              <img src={picture} alt="Avatar" />
            </span>
            <span class="user-menu-username">{username}</span>
            <span class="user-menu-toggle-arrow">
              <Icon
                icon="material-symbols:arrow-back-ios-new"
                color="#a9a9ca"
                width="12"
                height="12"
                rotate={3}
              />
            </span>
          </button>
          <ul class="dropdown-menu" class:show={showAccountMenu}>
            <li class="user-menu-item">
              <a href="/myprofile">
                <span>
                  <Icon
                    icon="mdi:user-outline"
                    color="#a9a9ca"
                    width="26"
                    height="26"
                  />
                </span>
                Profile
              </a>
            </li>
            <li class="user-menu-item">
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-missing-attribute -->
              <a on:click={() => logout()} style="cursor: pointer;">
                <span>
                  <Icon
                    icon="material-symbols:logout"
                    color="#a9a9ca"
                    width="26"
                    height="26"
                  />
                </span>
                Log out
              </a>
            </li>
          </ul>
        </div>
        <div class="account-item site-notifications__bell">
          <Icon icon="mdi:bell" color="#7d7d9e" width="24" height="24" />
        </div>
      {/if}
    </div>
  </header>
</div>

<style lang="scss">
  @import "../variables.scss";

  .site-notifications__bell {
    position: relative;
    cursor: pointer;
    min-width: 30px;
    min-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ul.dropdown-menu {
    background: rgba(33, 33, 33, 0.98);
    box-shadow: 0 0 16px rgb(20 21 35 / 20%);
    border-radius: 6px;
    padding: 20px 16px;
    min-width: 224px;
    margin-top: 8px !important;

    list-style-type: none;

    position: absolute;
    z-index: 1000;
    display: none;
    margin: 0;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    text-align: left;
    list-style: none;
    background-color: rgba(33, 33, 33, 0.98);
    background-clip: padding-box;
    border: 1px solid transparent;

    &.show {
      position: absolute;
      inset: 0px auto auto 0px;
      margin: 0px;
      transform: translate(-35px, 42px);
      display: block;

      @media only screen and (max-width: 700px) {
        transform: translate(-125px, 42px);
      }
    }

    & > li.user-menu-item {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 160%;
      color: #a9a9ca;

      &:not(:last-child):not(.user-menu-item-no-margin) {
        margin-bottom: 10px;
      }

      & > a {
        display: flex;
        align-items: center;
        padding: 10px 4px;

        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 160%;
        color: #a9a9ca;

        text-decoration: none;

        & > span {
          margin-right: 13px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

  .account-item {
    margin-left: 20px;

    &.dropdown {
      position: relative;

      & > button {
        height: 40px;
        background: #302f2f;
        border-radius: 6px;
        padding: 6px 16px 6px 6px;
        display: flex;
        align-items: center;
        box-shadow: none;
        text-decoration: none;
        color: #fff;
        text-align: center;
        letter-spacing: 0.5px;
        border: none;
        line-height: 36px;

        & > .user-menu-avatar,
        & > .user-menu-avatar > img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          margin-right: 8px;
        }

        & > .user-menu-username {
          margin-right: 12px;
          font-weight: 500;
          font-size: 14px;
          line-height: 160%;
          color: #a9a9ca;
          max-width: 100px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          text-align: center;
          letter-spacing: 0.5px;
          font-family: "Poppins", sans-serif;

          @media only screen and (max-width: 700px) {
            display: none;
          }
        }

        & > .user-menu-toggle-arrow {
          display: flex;
          align-items: center;
          color: #a9a9ca;
        }
      }
    }

    &:first-child > a {
      display: flex;
      align-items: center;
      background: #171515;
      border-radius: 6px;
      font-size: 14px;
      line-height: 160%;
      color: #fff;
      font-weight: 500;
      padding: 9px 16px;
      cursor: pointer;
      text-decoration: none;

      & > span:first-child {
        margin-right: 11px;
      }

      & > span:last-child {
        line-height: initial;
      }
    }
  }

  header {
    height: $header-height;
    background: $header-background-color;
    width: 100%;

    display: flex;
    align-items: center;
    flex-direction: row;
    position: fixed;
    top: 0;
    left: 0;
    transition: 0.25s;
    z-index: 11;

    div.logo {
      width: $nav-width;
      display: flex;
      align-items: center;
      height: 100%;

      a {
        position: relative;
        z-index: 11;
        margin-left: 18px;
        font-size: 2px;

        display: flex;
        flex-direction: row;
        align-items: center;

        & > img {
          margin-right: 14px;
          height: 48px;
        }

        span {
          img {
            @media only screen and (max-width: 700px) {
              display: none;
            }
            height: 24px;
          }
        }
      }
    }

    div.widgets {
      margin-left: 20px;
      display: flex;
      align-items: center;
      flex: 1;

      @media only screen and (max-width: 1200px) {
        display: none;
      }
    }

    div.account {
      margin-right: 18px;
      margin-left: auto;

      display: inline-flex;
      flex-direction: row;
      align-items: center;
      position: relative;

      button {
        border: 0;
        margin: 0;

        background: $alt-background-color;
        padding: 0 20px;
        text-align: left;
        border-radius: 4px;
        height: 50px;
        white-space: nowrap;
        color: #fff !important;

        margin-left: 20px;

        font-weight: 600;
        font-size: 14px;

        display: inline-flex;
        align-items: center;
        gap: 0;

        &.alt {
          background: $active-color;
        }

        @media only screen and (max-width: 700px) {
          padding: 0 10px 0 10px;
          height: 39px;
          line-height: 39px;
          font-size: 12px;
        }

        cursor: pointer;
      }
    }
  }

  .discord-button {
    margin-left: 20px;

    a {
      background: #4649c1;
      color: white;
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      padding: 6px 12px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 14px;
      transition: background-color 0.3s;

      img {
        margin-right: 6px;
        width: 39px; /* Adjust the height as needed */
      }

      &:hover {
        background: darkblue;
      }
    }
  }
</style>
