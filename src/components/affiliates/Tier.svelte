<script>
    import MoneyBag from "../icons/MoneyBag.svelte";
    import TickIcon from "../icons/TickIcon.svelte";

    export let tier = 1;
    export let commission = 0.05;
    export let requirement = 0;
    export let requirementActive = true;
    export let active = true;
</script>

<div class="tier" class:active>
    <div class="active-tag" class:active>Active</div>

    <div class="tier-info">
        <div>
            <span>Tier {tier}</span>
        </div>
        <div class:active>
            <MoneyBag/>
            <span>
                {(commission*100).toLocaleString()}% commission
            </span>
        </div>
    </div>

    <hr>

    <p>Requirements</p>

    <div class="requirement">
        <div>
            {#if requirementActive}
                <TickIcon/>
            {:else}
                <div class="affiliate-checkmark-empty"></div>
            {/if}
        </div>

        <div class="info">
            <img src="/favicon.png" alt="logo"/>
            <div>{requirement.toLocaleString()} affiliate earnings</div>
        </div>
    </div>
</div>

<style lang="scss">
    img {
        width: 16px;
    }

    div.info {
        display: flex;
        flex: 1;
        flex-wrap: nowrap;
        gap: 5px;
        align-items: start;
    }

    div.affiliate-checkmark-empty {
        width: 18px;
        height: 18px;
        border-radius: 99px;
        border: 1px solid #a9a9ca;
    }

    div.requirement {
        display: flex;
        flex-wrap: flex;
        gap: 10px;
        font-size: 12px;

        & > div:first-child {
            flex: none;
        }
    }

    hr {
        border: 0;
        border-bottom: 1px solid #272938;
        margin: 15px 0;
    }

    div.tier-info {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 10px;

        & > div {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 10px;

            &:first-child > span {
                font-weight: 500;
            }

            &:last-child {
                fill: #a9a9ca;
            }

            &:last-child.active {
                fill: #ff5a5c;
            }
        }
    }

    div.active-tag {
        display: none;
        text-transform: uppercase;
        background-color: #ff5a5c;
        position: absolute;
        color: black;
        font-weight: 600;
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
        padding: 4px 10px;
        border-radius: 99px;

        &.active {
            display: block;
        }
    }

    div.tier {
        border-radius: 20px;
        padding: 25px 20px;
        background: #1c1b1b;
        border: 1px solid #1c1b1b;
        min-height: 170px;
        position: relative;

        &.active {
            border: 1px solid #ff5a5c;
        }

        & > p {
            color: #ccd;
            font-size: 12px;
        }
    }
</style>