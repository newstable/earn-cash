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
          }),
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
          }),
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
      200,
    );
  };

  const logout = () => {
    tokenStore.set("");
    deleteCookie("token");
    loggedIn.set(false);
  };

  // $: console.log(modal, "modal");
</script>

<div class="headerHolder">
  <header class="bg-[#2d2755]">
    <div
      class="hidden logo sm:flex content-center w-[65px] md:w-[350px] h-[100%]"
    >
      <a href="/earn" class="flex flex-row">
        <img src="/coin.svg" alt="Logo" class="w-[100%] h-[48px] mt-3 ml-4" />
        <img
          src="/logo1.png"
          alt="Logo"
          class="w-[80%] h-[60%] scale-90 -ml-0 mt-4 hidden md:block"
        />
      </a>
    </div>

    <div class="account justify-between px-0 sm:px-4 md:px-0">
      <div class="items-center justify-center gap-3 hidden md:flex">
        <img src="./home.png" alt="home" />
        <div>
          <button
            class="bg-[#413976] rounded-[4px] shadow-sm h-[43px] w-[120px]"
          >
            <svg
              class="cube"
              width="19"
              height="22"
              viewBox="0 0 19 22"
              fill="#B09BEC"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 6.7481V10.7158L3.62116 12.8067V8.6235L0.013838 6.5412C0.00470492 6.60928 0 6.67839 0 6.7481Z"
              />
              <path
                d="M4.80713 13.4916L8.43192 15.5845V11.4006L4.80713 9.30817V13.4916Z"
              />
              <path
                d="M9.02488 6.18939L5.40063 8.28126L9.02488 10.3734L12.6491 8.28126L9.02488 6.18939Z"
              />
              <path
                d="M9.61792 15.5845L13.2427 13.4916V9.30817L9.61792 11.4006V15.5845Z"
              />
              <path
                d="M18.036 6.5412L14.4287 8.6235V12.8067L18.0499 10.7158V6.7481C18.0499 6.67839 18.0452 6.60928 18.036 6.5412Z"
              />
              <path
                d="M17.2701 5.39649C16.4397 4.91667 15.1589 4.17685 13.8357 3.41272L10.2114 5.50462L13.8356 7.59649L17.4443 5.5134C17.3893 5.47086 17.3312 5.43168 17.2701 5.39649Z"
              />
              <path
                d="M12.6493 2.72784C11.5729 2.1064 10.5499 1.51596 9.80559 1.0867C9.56485 0.947928 9.29485 0.87854 9.02485 0.87854C8.75481 0.87854 8.48477 0.947928 8.24391 1.08678C7.516 1.50742 6.49013 2.09968 5.40112 2.72828L9.02481 4.81987L12.6493 2.72784Z"
              />
              <path
                d="M4.21534 3.41302C2.91307 4.16474 1.64005 4.89962 0.780915 5.39608C0.719593 5.43143 0.661355 5.47073 0.606201 5.51343L4.21478 7.59648L7.83899 5.50461L4.21534 3.41302Z"
              />
              <path
                d="M0 15.3681C0 15.9246 0.298939 16.4424 0.780105 16.7198L0.780698 16.7202C1.50846 17.1407 2.53322 17.7323 3.62116 18.3603V14.1763L0 12.0854V15.3681Z"
              />
              <path
                d="M4.80713 19.045C6.11047 19.7973 7.38482 20.533 8.24464 21.0298C8.30536 21.0648 8.36795 21.0953 8.43192 21.1215V16.9542L4.80713 14.8611V19.045Z"
              />
              <path
                d="M9.61792 21.1214C9.68209 21.0952 9.74487 21.0646 9.80576 21.0295C10.6859 20.5219 11.9557 19.7889 13.2427 19.0458V14.8611L9.61792 16.9542V21.1214Z"
              />
              <path
                d="M14.4287 18.3609C15.5338 17.7227 16.5641 17.1276 17.2692 16.7201C17.751 16.4424 18.0499 15.9245 18.0499 15.3681V12.0853L14.4288 14.1762V18.3609H14.4287Z"
              />
            </svg>

            GAMES

            <svg
              class="arrow"
              width="7"
              height="5"
              viewBox="0 0 7 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.50001 0.994671C3.62547 0.994671 3.7509 1.04269 3.84655 1.13852L6.8564 4.15579C7.04787 4.34773 7.04787 4.65892 6.8564 4.85078C6.66501 5.04263 6.5 4.99467 6.16316 4.99467L3.50001 4.99467L1 4.99467C0.5 4.99467 0.335042 5.04254 0.14367 4.85068C-0.0478893 4.65883 -0.0478893 4.34764 0.14367 4.1557L3.15347 1.13843C3.24916 1.04258 3.3746 0.994671 3.50001 0.994671Z"
                fill="#9489DB"
              />
            </svg>
          </button>
        </div>
      </div>
      {#if !$loggedIn}
        <div class="w-full justify-end flex gap-2">
          <button on:click={() => modal.open()}>
            <Icon icon="mdi:user" color="white" width="17" height="17" />
            Sign In
          </button>

          <button class="alt" on:click={() => modal.open(false)}>
            <Icon icon="mdi:key-variant" color="white" width="17" height="17" />
            Sign Up
          </button>
        </div>
      {:else}
        <div class="hidden sm:block md:hidden"></div>
        <div
          class="account-item relative w-[182px] md:w-[202px] h-[43px] flex justify-center items-center"
          style="margin: 0;"
        >
          <img
            src="./wallet.png"
            alt="wallet"
            class="absolute top-0 left-0 w-full h-full"
          />
          <a href="/cashout" class="flex gap-2 relative z-10">
            <span
              style="color: white; text-decoration: none;"
              class="cursor-pointer"
            >
              {(+balance).toFixed(2)}
            </span>
          </a>
        </div>
        <div class="cursor-pointer hidden md:flex">
          <img src="./sponsers.png" alt="sponsers" />
        </div>
        <div class="flex items-center">
          <button
            class="account-item alert-btn site-notifications__bell"
            style="padding:0"
          >
            <img src="./bell.png" alt="bell" />
          </button>
          <div class="account-item dropdown">
            <button on:click={openMenu}>
              <span class="user-menu-avatar">
                <img src={picture} alt="Avatar" />
              </span>
              <!-- <span class="user-menu-username">{username}</span> -->
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
        </div>
      {/if}
    </div>
  </header>
  <div class="bar" />
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
    background: #413976;
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
    background-color: #413976;
    background-clip: padding-box;
    border: 1px solid transparent;

    &.show {
      position: absolute;
      inset: 0px auto auto 0px;
      margin: 0px;
      transform: translate(-161px, 42px);
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
    margin-left: 10px;

    &.dropdown {
      position: relative;

      & > button {
        height: 43px;
        box-shadow: 0px -1px #655ca0;
        background: #413976;
        border-radius: 6px;
        padding: 6px;
        display: flex;
        align-items: center;
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
      background: #4a4845;
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

  .alert-btn {
    @apply w-[43px] h-[43px];
    background: linear-gradient(
      90deg,
      rgba(100, 77, 73, 1) 0%,
      rgba(89, 65, 55, 1) 100%
    ) !important;
  }

  header {
    height: $header-height;
    width: 100%;
    box-shadow: 0px 3px 4px rgba(123, 120, 182, 0.1);

    display: flex;
    align-items: center;
    flex-direction: row;
    position: fixed;
    top: 0;
    left: 0;
    transition: 0.25s;
    z-index: 11;

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
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;

      button {
        border: 0;
        margin: 0;
        box-shadow: 0px -1px #655ca0;
        background: #413976;
        padding: 0 20px;
        text-align: left;
        border-radius: 4px;
        height: 43px;
        white-space: nowrap;
        color: #fff !important;

        font-weight: 600;
        font-size: 14px;

        display: inline-flex;
        align-items: center;
        gap: 6px;

        &.alt {
          background: #171515;
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

  .bar {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, #7435fa 0%, #435de8 163.22%);
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
