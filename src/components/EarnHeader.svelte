<svelte:options accessors={true} />

<script>
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";

  export let name;

  export var android = true;
  export var computer = true;
  export var apple = true;
  let showDropdown = false;

  let onChange = () => {
    devices = {
      android,
      computer,
      apple,
    };
  };

  export let devices;

  let button;
  let dropdown;

  const onPageClick = (e) => {
    const pointerX = e.pageX;
    const pointerY = e.pageY;

    const rect = button.getBoundingClientRect();
    if (pointerX > rect.x && pointerX < rect.x + rect.width) {
      if (pointerY > rect.y && pointerY < rect.y + rect.height) {
        return;
      }
    }

    const rect2 = dropdown.getBoundingClientRect();
    if (pointerX > rect2.x && pointerX < rect2.x + rect2.width) {
      if (pointerY > rect2.y && pointerY < rect2.y + rect2.height) {
        return;
      }
    }

    showDropdown = false;
  };

  const getValues = () => {
    android, computer, apple;
  };

  onMount(() => {
    document.body.addEventListener("click", onPageClick);

    return () => document.body.removeEventListener("click", onPageClick);
  });
</script>

<div class="header">
  <h1>{name}</h1>
  <div class="filters">
    <div class="filter">
      <span>on</span>
      <span>
        <button
          on:click={() => (showDropdown = !showDropdown)}
          bind:this={button}
        >
          <span class="earn-select-dropdown-toggle-left-content">
            {#if android}
              <Icon icon="uim:android" color="white" width="20" height="20" />
            {/if}
            {#if computer}
              <Icon
                icon="mingcute:computer-line"
                color="white"
                width="20"
                height="20"
              />
            {/if}
            {#if apple}
              <Icon icon="uim:apple" color="white" width="20" height="20" />
            {/if}

            <span>
              <Icon
                icon="material-symbols:arrow-back-ios-new"
                color="#a9a9ca"
                width="12"
                height="12"
                rotate="3"
              />
            </span>
          </span>
        </button>
        <ul
          class="dropdown-menu"
          class:show={showDropdown}
          bind:this={dropdown}
        >
          <li>
            <button
              class="dropdown-item"
              on:click={() => {
                android = !android;
                onChange();
              }}
            >
              <span class="left">
                <span class="icon">
                  <Icon
                    icon="uim:android"
                    color="#a9a9ca"
                    width="20"
                    height="20"
                  />
                </span>
                <span class="text">Android</span>
              </span>
              {#if android}
                <span class="right">
                  <img src="/select-check.svg" alt="check mark" />
                </span>
              {/if}
            </button>
          </li>
          <li>
            <button
              class="dropdown-item"
              on:click={() => {
                computer = !computer;
                onChange();
              }}
            >
              <span class="left">
                <span class="icon">
                  <Icon
                    icon="mingcute:computer-line"
                    color="#a9a9ca"
                    width="20"
                    height="20"
                  />
                </span>
                <span class="text">Desktop</span>
              </span>
              {#if computer}
                <span class="right">
                  <img src="/select-check.svg" alt="check mark" />
                </span>
              {/if}
            </button>
          </li>
          <li>
            <button
              class="dropdown-item"
              on:click={() => {
                apple = !apple;
                onChange();
              }}
            >
              <span class="left">
                <span class="icon">
                  <Icon
                    icon="uim:apple"
                    color="#a9a9ca"
                    width="20"
                    height="20"
                  />
                </span>
                <span class="text">iOS</span>
              </span>
              {#if apple}
                <span class="right">
                  <img src="/select-check.svg" alt="check mark" />
                </span>
              {/if}
            </button>
          </li>
        </ul>
      </span>
    </div>
  </div>
</div>

<style lang="scss">
  @import "../variables.scss";

  .header {
    background: #171515;
    padding: calc($footer-height * 0.7) $footer-height;
    display: flex;
    flex-direction: row;
    align-items: center;

    & > h1 {
      font-weight: 700;
      font-size: 24px;
      margin: 0;
      padding: 0;
    }

    & > div.filters {
      display: flex;
      margin-left: 12px;
      align-items: center;
      justify-content: space-between;
      flex: 1;

      & > div.filter {
        display: flex;
        align-items: center;

        & > span:first-child {
          color: #a9a9ca;
          opacity: 0.6;
          margin-right: 8px;
        }

        & > span:last-child {
          position: relative;

          & > button {
            background: #1f1c1c;
            border-radius: 8px;
            height: 40px;
            display: flex;
            align-items: center;
            padding-left: 14px;
            padding-right: 14px;
            font-weight: 500;
            font-size: 14px;
            line-height: 160%;
            color: #a9a9ca;
            justify-content: space-between;
            border: none;
            cursor: pointer;

            & > .earn-select-dropdown-toggle-left-content {
              display: flex;
              align-items: center;
              flex-direction: row;

              & > span {
                padding-left: 0.6rem;

                display: inline-flex;
                align-items: center;
              }
            }
          }

          & > ul.dropdown-menu {
            box-shadow: 0 0 16px rgb(20 21 35 / 20%);
            border-radius: 6px;
            padding: 7.5px 0;
            min-width: 150px;
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
            background-color: #1f1c1c;
            background-clip: padding-box;
            border: 1px solid transparent;

            &.show {
              position: absolute;
              inset: 0px auto auto 0px;
              margin: 0px;
              transform: translate(0, 42px);
              display: block;

              @media only screen and (max-width: 700px) {
                transform: translate(-125px, 42px);
              }
            }

            & > li {
              list-style-type: none;

              & > button {
                padding: 8px;
                font-size: 14px;
                line-height: 160%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                clear: both;
                color: #212529;
                text-align: inherit;
                text-decoration: none;
                white-space: nowrap;
                background: transparent;
                border: 0;
                cursor: pointer;

                & > span.left {
                  display: flex;
                  align-items: center;

                  & > span.icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 20px;
                    height: 20px;
                  }

                  & > span.text {
                    color: #a9a9ca;
                    font-weight: 500;
                    padding: 0;
                    margin-left: 10px;
                  }
                }

                & > span.right {
                  width: 20px;
                  height: 20px;
                  background: $active-color;
                  border-radius: 6px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-left: 10px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
