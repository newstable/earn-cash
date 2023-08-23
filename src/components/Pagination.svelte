<script>
    let page = 1;
    export let totalPages = 0;
    export let pageHandler = paige => {}

    const maxPage = () => totalPages;

    const setPage = newPage => {
        page = newPage;
        pageHandler(newPage);
    }
</script>

<div class="profilePagination">
    <div>
        <ul class="pagination unselectable">
            <li class:disabled={page == 1}>
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <a on:click={() => page !== 1 && setPage(page - 1)}>
                    <iconify-icon icon="ic:baseline-chevron-left" style="line-height: 33px; font-size: 1.5rem;"></iconify-icon>
                </a>
            </li>
            <li class:active={page == 1}>
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <a on:click={() => page != 1 && setPage(page - 1)}>
                    {#if page == 1}
                        1
                    {:else if maxPage() == page && maxPage() - 2 >= 1}
                        {maxPage() - 2}
                    {:else}
                        {page - 1}
                    {/if}
                </a>
            </li>
            <li class:disabled={page == 1 && page + 1 > maxPage()} class:active={page != 1 && page != maxPage()}>
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <a on:click={() => page == 1 && maxPage() > 1 && setPage(2)}>
                    {#if page == 1}
                        2
                    {:else if maxPage() == page}
                        {maxPage() - 1}
                    {:else}
                        {page}
                    {/if}
                </a>
            </li>
            <li class:disabled={page + 1 > maxPage()} class:active={page == maxPage() && page != 1}>
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <a on:click={() => (page + 1 <= maxPage()) && (page == 1 ? setPage(3) : setPage(page + 1))}>
                    {#if page == 1}
                        3
                    {:else if maxPage() == page}
                        {maxPage()}
                    {:else}
                        {page + 1}
                    {/if}
                </a>
            </li>
            <li class:disabled={page + 1 > maxPage()}>
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <a on:click={() => page != maxPage() ? setPage(page + 1) : (page !== maxPage()) && setPage(maxPage())}>
                    <iconify-icon icon="ic:baseline-chevron-right" style="line-height: 33px; font-size: 1.5rem;"></iconify-icon>
                </a>
            </li>
        </ul>
    </div>
</div>

<style lang="scss">
    .unselectable {
        user-select: none;
    }

    ul:not(.browser-default) {
        padding-left: 0;
        list-style-type: none;
    }

    div.profilePagination {
        padding-top: 20px;
        display: flex;
        justify-content: center;

        ul {
            display: flex;
            gap: 5px;

            li {
                opacity: 1;
                background: #302f2f;
                box-shadow: 0 2px 0 rgba(47,48,67,0.4);
                width: 32px;
                height: 32px;
                text-align: center;
                color: #a9a9ca;
                border-radius: 6px;

                &.disabled {
                    opacity: .6;
                    border-radius: 6px;

                    a {
                        opacity: .4;
                        cursor: default;
                    }
                }

                &.active {
                    background: #ff5a5c;

                    a {
                        color: #000;
                    }
                }

                list-style-type: none;

                display: inline-block;
                vertical-align: top;

                a {
                    font-family: "Poppins";
                    font-style: normal;
                    font-weight: 500;
                    font-size: 12px;
                    color: #a9a9ca;
                    line-height: 33px;
                    display: flex;
                    justify-content: center;
                    padding: 0 10px;
                    width: 100%;
                    height: 100%;
                    align-items: center;
                    text-decoration: none;
                    cursor: pointer;
                }
            }
        }
    }
</style>