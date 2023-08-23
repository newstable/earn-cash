<script>
    import Icon from '@iconify/svelte';

    import "../app.scss";
    import ChatView from './ChatView.svelte';


    var chatActive = false;
    const toggleChat = () => {
        document.body.classList.toggle("chatActive");
        chatActive = !chatActive;
    }
</script>

<div class="chat">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="toggle" on:click={toggleChat}>
        {#if !chatActive}
            <Icon icon="material-symbols:arrow-back-ios-new" color="#ff7070" width="12" height="12" />
        {:else}
            <Icon icon="material-symbols:arrow-back-ios-new" color="#ff7070" width="12" height="12" rotate={2}/>
        {/if}
    </div>

    <ChatView/>
</div>

<style lang="scss">
    @import "../variables.scss";

    div.chat {
        width: 0;
        height: 100%;
        background-color: $chat-background-color;
        position: fixed;
        top: 0;
        right: 0;
        transition: width .25s;
        z-index: 4;
        display: block;

        -webkit-box-shadow: 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%), 0 2px 4px -1px rgb(0 0 0 / 30%);
        box-shadow: 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%), 0 2px 4px -1px rgb(0 0 0 / 30%);

        @media only screen and (max-width: 1199px) {
            display: none;
        }

        div.toggle {
            cursor: pointer;
            text-align: center;
            position: absolute;
            height: 30px;
            width: 30px;
            left: -30px;
            top: calc($header-height + $earn-feed-height + 10px);
            background: $alt-chat-background-color;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>