<script>
	import wsStore from './../stores/ws.store.js';
	import chatTypes from './../lib/chatTypes.js';
	import onlineStore from './../stores/online.store.js';
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";

    import ChatMessage from "./ChatMessage.svelte";
    import loggedInStore from '../stores/loggedIn.store.js';
    import { get } from 'svelte/store';

    let chatBody;
    var message;
    var showDropdown = false;
    var currentChatI = 0;
    var messages = [];

    onMount(() => {
        chatBody.scrollTop = chatBody.scrollHeight;

        return wsStore.subscribe(socket => {
            if (socket) {
                socket.on("msg", data => {
                    messages.push(data.msg);
                    messages = messages;
                    scrollDown();
                });

                socket.on("notallowed", data => {
                    notAllowed(data.msg);
                });

                socket.on("chatHistory", data => {
                    messages = data.data;
                    scrollDown();
                });

                joinChat(0);
            }
        });
    });

    const keyEvent = e => {
        if (e.keyCode == 13 && !e.shiftKey) {
            sendMessage(message);
            message = "";
        }
    }

    const notAllowed = reason => {
        Toastify({
            text: reason,
            duration: 3000,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#059fdb",
            },
        }).showToast();
        
        joinChat(0);
    }

    const joinChat = async chatI => {
        const ws = get(wsStore);
        try {
            ws.server.send(JSON.stringify({
                type: "joinChat",
                i: chatI
            }));
        } catch(e) {
            await new Promise(resolve => setTimeout(resolve, 500));
            joinChat(chatI);
        }
    }

    const sendMessage = async msg => {
        if (msg === null || msg === "" || msg.trim() === "") return;

        const ws = get(wsStore);
        ws.send({
            type: "sendChat",
            msg
        });
    }

    const scrollDown = () => {
        chatBody.scrollTop = chatBody.scrollHeight;
        return "";
    }
</script>


<div class="chatView">
    <div class="tabs">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="dropdown" on:click={() => showDropdown = !showDropdown}>
            <span class="name">
                General
            </span>
            <iconify-icon icon="material-symbols:chevron-right" width="24" height="24" rotate="90deg"></iconify-icon>
                
            <div class="menu" class:show={showDropdown}>
                <div class="items">
                    {#each chatTypes as chatType, i}
                        <li class="option" class:active={i == currentChatI} on:click={() => joinChat(i)}>
                            <div class="name">{chatType.name}</div>
                        </li>
                    {/each}
                </div>
            </div>
        </div>
    </div>

    <div class="chatBody" bind:this={chatBody}>
        {#each messages as message}
            <ChatMessage image={message.picture} level={message.level} username={message.username} message={message.message} epochTime={message.time} userid={message.userid}/>
            {scrollDown()}
        {/each}
    </div>

    <div class="bottom">
        <div class="inputField">
            {#if !$loggedInStore}
                <div class="chatUnlockContent">
                    <span>
                        <Icon icon="mdi:prohibited" color="#ff6668" width="20" height="20" />
                        Sign in to unlock the chat
                    </span>
                </div>
            {:else}
                <textarea placeholder="Say Something!" on:keyup={keyEvent} bind:value={message}></textarea>
            {/if}
        </div>

        <div class="bottomOnline">
            <span class="chatOnlineOuter">
                <span class="chatOnlineInner"></span>
            </span>

             Online
            <span class="online">{$onlineStore +62}</span>
        </div>
    </div>
</div>

<style lang="scss">
    @import "../variables.scss";

    div.tabs {
        height: 66px;
        background-color: #262424;
        padding: 0 13px;
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > div.dropdown {
            background-color: #ff5a5c;
            color: white;

            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            text-align: center;
            font-weight: 600;
            font-size: 10px;
            height: 40px;
            border-radius: 3px;
            cursor: pointer;

            position: relative;

            & > span.name {
                font-size: 10px;
                font-style: normal;
                line-height: 27px;
                padding: 0 0 0 3px;
                text-align: center;
                font-weight: 600;
            }

            & > div.menu {
                & > .items {
                    display: inline-block;
                    min-width: 160px;
                    max-width: 210px;
                    width: max-content;
                    background: #302b2b;
                    max-height: 310px;
                    height: auto;
                    overflow-y: auto;

                    & > li.option {
                        display: flex;
                        align-items: center;
                        padding: 10px;

                        &.active {
                            opacity: .9;
                        }

                        &.active, &:hover {
                            background: #404769;
                            border-radius: 5px;
                            cursor: pointer;
                        }

                        & > div.name {
                            color: #9397dc;
                            font-weight: normal;
                            font-size: 12px;
                            height: 25px;
                            font-style: normal;
                            line-height: 27px;
                            padding: 0 0 0 3px;
                        }
                    }
                }

                &.show {
                    position: absolute;
                    inset: 0px auto auto 0px;
                    margin: 0px;
                    transform: translate(48px, 52px);
                    display: block;
                    background: #302b2b;
                    border-radius: 3px;
                }

                --bs-dropdown-zindex: 1000;
                --bs-dropdown-min-width: 10rem;
                --bs-dropdown-padding-x: 0;
                --bs-dropdown-padding-y: .5rem;
                --bs-dropdown-spacer: .125rem;
                --bs-dropdown-font-size: 1rem;
                --bs-dropdown-color: rgba(255,255,255,0.7);
                --bs-dropdown-bg: #101020;
                --bs-dropdown-border-color: var(--bs-border-color-translucent);
                --bs-dropdown-border-radius: .375rem;
                --bs-dropdown-border-width: 1px;
                --bs-dropdown-inner-border-radius: calc(0.375rem - 1px);
                --bs-dropdown-divider-bg: var(--bs-border-color-translucent);
                --bs-dropdown-divider-margin-y: .5rem;
                --bs-dropdown-box-shadow: 0 .5rem 1rem rgba(0,0,0,0.15);
                --bs-dropdown-link-color: #212529;
                --bs-dropdown-link-hover-color: #1e2125;
                --bs-dropdown-link-hover-bg: #e9ecef;
                --bs-dropdown-link-active-color: #fff;
                --bs-dropdown-link-active-bg: #0d6efd;
                --bs-dropdown-link-disabled-color: #adb5bd;
                --bs-dropdown-item-padding-x: 1rem;
                --bs-dropdown-item-padding-y: .25rem;
                --bs-dropdown-header-color: #6c757d;
                --bs-dropdown-header-padding-x: 1rem;
                --bs-dropdown-header-padding-y: .5rem;
                position: absolute;
                z-index: var(--bs-dropdown-zindex);
                display: none;
                min-width: var(--bs-dropdown-min-width);
                padding: var(--bs-dropdown-padding-y) var(--bs-dropdown-padding-x);
                margin: 0;
                font-size: var(--bs-dropdown-font-size);
                color: var(--bs-dropdown-color);
                text-align: left;
                list-style: none;
                border: var(--bs-dropdown-border-width) solid var(--bs-dropdown-border-color);
            }
        }
    }

    div.chatView {
        display: inline;
        font-family: "Poppins",sans-serif;

        div.chatBody {
            display: block;
            overflow-y: auto;
            overflow-x: hidden;
            height: calc(100vh - 115px - 66px);
            width: 100%;
            text-align: center;
            padding-left: 13px;
            padding-right: 13px;

            scrollbar-width: none;
            -ms-overflow-style: none;

            &::-webkit-scrollbar {
                display: none;
            }

            @media only screen and (max-width: 1199px) {
                height: calc(100vh - 115px - 132px - 74px);
            }
        }

        div.bottom {
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: center;
            height: 115px;
            padding-top: 20px;

            div.inputField {
                margin-bottom: 7px;
                width: 100%;
                margin-left: auto;
                float: left;
                padding: 0 .72rem;
                min-height: 1px;

                & > textarea {
                    margin-bottom: 0;
                    color: #787ead;
                    width: 100%;
                    background-color: #1f1b1b;
                    border: 0.5px solid #27273e;
                    height: 50px;
                    resize: none;
                    padding: 10px;
                    padding-right: 25px;
                    font-size: 13px;
                    font-weight: 500;
                    outline: 0;
                    -webkit-box-shadow: none;
                    -moz-box-shadow: none;
                    box-shadow: none;

                    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;

                    overflow: auto;

                    line-height: 1.15;
                    margin: 0;
                }

                div.chatUnlockContent {
                    margin-bottom: 0;
                    color: #787ead;
                    width: 100%;
                    background: #1f1b1b;
                    border: .5px solid #27273e;
                    height: 50px;
                    resize: none;
                    padding: 10px;
                    padding-right: 25px;
                    font-size: 13px;
                    font-weight: 500;
                    outline: 0;
                    box-shadow: 0;

                    span {
                        font-style: normal;
                        font-weight: 700;
                        font-size: 12px;
                        display: flex;
                        align-items: center;
                        letter-spacing: -.03em;
                        color: $active-text-color;
                        justify-content: center;
                        gap: 5px;
                        height: 100%;
                    }
                }
            }

            div.bottomOnline {
                text-align: left;
                color: rgb(88, 163, 88);
                padding-left: 18px;
                font-weight: normal;
                font-size: 13px;

                span.chatOnlineOuter {
                    height: 17px;
                    width: 17px;
                 
                    border-radius: 100%;
                    display: inline-block;
                    position: relative;
                    margin-right: 3px;

                    span.chatOnlineInner {
                        height: 9px;
                        width: 9px;
                        background: rgb(88, 163, 88);
                        border-radius: 100%;
                        display: inline-block;
                        position: relative;
                        left: 4px;
                        top: -1px;
                    }
                }
            }
        }
    }
</style>