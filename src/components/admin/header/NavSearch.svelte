
<a href={'#'} class="search-toggle">
	<i class="uil uil-search" />
	<i class="uil uil-times" />
</a>
<form action="/" class="search-form-topMenu">
	<span class="search-icon uil uil-search" />
	<input
		class="form-control me-sm-2 box-shadow-none"
		type="search"
		placeholder="Search..."
		aria-label="Search"
	/>
</form>

<style lang="scss">
	:global {
		.search-toggle.active {
			.uil-search {
				display: none;
			}
			.uil-times {
				display: block;
			}
		}
	}
</style>
