<script>
    
    import { Pagination, PaginationItem, PaginationLink, } from 'sveltestrap';
    export let pageDropdown;
    export let size;

    export let totalPage = 5;
    export let currentPage = 1;
    export let onPageChange = page => {
        if (page === currentPage) return;
        console.log(page);
    }
</script>

<div class="gay">
    <Pagination size={size}>
        <PaginationItem disabled>
            <PaginationLink previous on:click={() => onPageChange(currentPage - 1)} />
        </PaginationItem>
        {#if totalPage > 1}
            <PaginationItem active>
                <PaginationLink on:click={() => 
                    currentPage <= 2 ? onPageChange(1) : onPageChange(currentPage - 2)
                }>
                    {#if currentPage <= 2}
                        1
                    {:else}
                        {currentPage - 2}
                    {/if}
                </PaginationLink>
            </PaginationItem>
        {/if}
        <PaginationItem>
            <PaginationLink href="#">
    
                    5
            </PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href="#">...</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href="#">12</PaginationLink>
        </PaginationItem>
        <PaginationItem disabled>
            <PaginationLink next href="#" />
        </PaginationItem>
        {#if pageDropdown }
        <PaginationItem>
            <div class="paging-option">
                <select name="page-number" class="page-selection">
                    <option value="20">20/page</option>
                    <option value="40">40/page</option>
                    <option value="60">60/page</option>
                </select>
            </div>
        </PaginationItem>
        {/if}
    </Pagination>
</div>

<style lang="scss">
	:global(div.gay) {
		.pagination {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			gap: 5px;
			&:not(.pagination-lg) {
				.page-link {
					font-size: 14px;
				}
			}
			&:not(.pagination-sm) {
				.page-link {
					font-size: 14px;
				}
			}
			.page-item {
				.page-link {
					padding: 4px 12px;
					color: var(--light-gray);
					border-color: var(--border-color);
					border-radius: 2px;
				}
				&.active {
					.page-link {
						color: var(--color-white);
						border-color: var(--color-primary);
						background-color: var(--color-primary);
					}
				}
			}
		}
	}
</style>