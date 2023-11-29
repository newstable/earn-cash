<script>
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";


    export let data;
    let show = false;
    let isLoading = true;

    onMount(() => {
        setTimeout(() => {
            show = true;
        }, 150);
    });

    const closeModal = () => {
        show = false;
        setTimeout(() => {
            goto("/earn");
        }, 350);
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="overlay" class:show={show} on:click={closeModal}/>

<div class="modal" class:show={show}>
    <h5 class="title">
        {data.wallName}

        <button class="close" on:click={closeModal}>
            <Icon icon="humbleicons:times" color="#A9A9CA" width="19" height="19" />
        </button>

        <a href="/wall/{data.nextUrl}">
            <Icon icon="fa:external-link" color="white" width="16" height="16" />
        </a>
    </h5>

    <div class="frameHolder">
        {#if isLoading}
            <div class="progress">
                <div class="in"/>
            </div>
        {/if}

        <iframe src={data.wallUrl} title="{data.wallName} wall" on:load={() => isLoading = false}/>
    </div>
</div>

<style lang="scss">
    div.modal {
        position: fixed;
        left: 0;
        right: 0;
        width: 55%;
        padding: 0;
        margin: auto;
        min-height: 580px;
        max-height: 580px;
        height: 580px;
        background-color: #262323;
        border-radius: 10px;
        overflow-y: hidden;
        will-change: top, opacity;
        z-index: 1003;
        opacity: 0;
        top: 4%;
        transform: scaleX(0.8) scaleY(0.8);
        box-shadow: 0 24px 38px 3px rgb(0 0 0 / 14%), 0 9px 46px 8px rgb(0 0 0 / 12%), 0 11px 15px -7px rgb(0 0 0 / 20%);
        transition: 350ms;

        @media screen and (max-width: 768px) {
            /* Apply styles for screens with a maximum width of 768px (adjust as needed) */
            width: auto; /* Remove the fixed width */
            left: 10px; /* Adjust the positioning as needed */
            right: 10px; /* Adjust the positioning as needed */
        }

        &.show {
            display: block;
            opacity: 1;
            top: 10%;
            transform: scaleX(1) scaleY(1);
        }

        & > div.frameHolder {
            height: 515px;

            & > iframe {
                width: 100%;
                height: 100%;
                border: none;
            }

            & > div.progress {
                margin: 0;
                background: #c5cae9;
                position: relative;
                height: 4px;
                display: block;
                width: 100%;
                border-radius: 2px;
                overflow: hidden;

                & > div.in {
                    background: #303f9f;

                    &::before {
                        content: '';
                        position: absolute;
                        background-color: inherit;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        will-change: left, right;
                        -webkit-animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
                        animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
                    }

                    &::after {
                        content: '';
                        position: absolute;
                        background-color: inherit;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        will-change: left, right;
                        -webkit-animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
                        animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
                        -webkit-animation-delay: 1.15s;
                        animation-delay: 1.15s;
                    }
                }
            }
        }

        & > h5.title {
            margin: 14px;
            font-size: 1.64rem;
            line-height: 110%;
            font-weight: 400;

            & > button {
                border: 1px solid #302f2f;
                width: 40px;
                height: 40px;
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                cursor: pointer;
                z-index: 2;
                top: 8px;
                right: 8px;
                background: transparent;
            }

            & > a {
                margin-left: 10px;
            }
        }
    }

    div.overlay {
        position: fixed;
        top: -25%;
        left: 0;
        bottom: 0;
        right: 0;
        height: 125%;
        width: 100%;
        background: #000;
        z-index: 1002;
        display: block;
        opacity: 0;
        will-change: opacity;
        transition: 350ms;

        &.show {
            opacity: 0.5;
        }
    }

    @-webkit-keyframes indeterminate {
        0% {
            left: -35%;
            right: 100%
        }

        60% {
            left: 100%;
            right: -90%
        }

        100% {
            left: 100%;
            right: -90%
        }
    }

    @keyframes indeterminate {
        0% {
            left: -35%;
            right: 100%
        }

        60% {
            left: 100%;
            right: -90%
        }

        100% {
            left: 100%;
            right: -90%
        }
    }

    @-webkit-keyframes indeterminate-short {
        0% {
            left: -200%;
            right: 100%
        }

        60% {
            left: 107%;
            right: -8%
        }

        100% {
            left: 107%;
            right: -8%
        }
    }

    @keyframes indeterminate-short {
        0% {
            left: -200%;
            right: 100%
        }

        60% {
            left: 107%;
            right: -8%
        }

        100% {
            left: 107%;
            right: -8%
        }
    }
</style>
