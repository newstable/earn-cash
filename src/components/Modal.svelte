<script>
    import Icon from "@iconify/svelte";

    let show = false;
    let scale = 0;
    export let closeButton = true;

    export const close = () => {
        if (!show) return;

        scale = 0;
        setTimeout(() => {
            show = false;
        }, 300);
    }

    export const open = () => {
        if (show) return;

        show = true;
        setTimeout(() => {
            scale = 1;
        }, 10);
    }
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal-bg" style={show ? "" : "display: none;"} on:click={close}/>
<div class="modal" style="transform: scaleX({scale}) scaleY({scale}); {show ? "" : "display: none;"}">
    <div>
        {#if closeButton}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="cross" on:click={close}>
                <Icon icon="humbleicons:times" color="#fb4646" width="19" height="19" />
            </div>
        {/if}

        <div class="container">
            <slot/>
        </div>
    </div>
</div>

<style lang="scss">
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
            width: 100vw;
            border-radius: 0px;
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
                width: 100%;
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