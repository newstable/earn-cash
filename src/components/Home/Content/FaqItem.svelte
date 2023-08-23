<script>
    import "../../../app.scss";

    export let question = "???";
    var active = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="item" class:active={active} on:click={() => active = !active}>
    <div class="question">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="28" width="28" height="28" rx="5" transform="rotate(90 28 0)" fill="#ff5a5c" fill-opacity="0.25"></rect>
            <path d="M14.5 9L14.5 19.08" stroke="#ff5a5c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M19 14.67L14.5 19.08L10 14.67" stroke="#ff5a5c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <span>{question}</span>
    </div>

    <div class="answer">
        <slot/>
    </div>
</div>

<style lang="scss">
    div.item {
        width: 60%;
        max-width: 1150.8px;
        margin: 0 auto;
        font-size: 14px;
        cursor: pointer;

        &:not(:last-child) {
            margin-bottom: 15px;
        }

        @media only screen and (max-width: 700px) {
            margin-left: 0;
            width: 100%;
        }

        & > div {
            @media only screen and (max-width: 700px) {
                padding: 15.5px 20px 0 18px;
            }
        }

        & > div.question {
            min-height: 61px;
            background: rgba(255,90,92,0.070588235);
            border-radius: 10px;
            position: relative;
            display: flex;
            align-items: center;
            gap: 20px;
            padding: 0 20px 0 20px;

            & > svg {
                overflow: hidden;
            }
        }

        &.active > div.question {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;

            svg {
                transform: rotate(180deg);
            }
        }

        & > div.answer {
            background: #1f2034;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            max-height: 0;
            overflow: hidden;
            transition: padding .4s ease-out;
            color: rgba(255,255,255,0.8);
            padding: 0 20px 0 20px;
        }

        &.active > div.answer {
            max-height: 10000px;
            padding-bottom: 20px;
            padding-top: 20px;
        }
    }
</style>