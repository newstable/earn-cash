<script>
	import { SearchIcon, GridIcon, ListIcon } from 'svelte-feather-icons';
	export let cardType;
</script>

<div class="shop_products_top_filter">
	<div class="project-top-wrapper d-flex flex-wrap align-items-center">
		<div class="project-top-left d-flex flex-wrap align-items-center">
			<div class="project-search shop-search global-shadow">
				<form action="/" class="d-flex align-items-center user-member__form">
					<SearchIcon />
					<input
						type="text"
						class="form-control mr-sm-2 border-0 box-shadow-none"
						placeholder="Search"
						aria-label="Search"
					/>
				</form>
			</div>
			<span class="project-result-showing">
				Showing <span>1-8</span> of <span>86</span> results
			</span>
		</div>
		<div class="project-top-right d-flex flex-wrap align-items-center">
			<div class="project-category flex-wrap d-flex align-items-center">
				<p class="fs-14 color-gray text-capitalize">sort by:</p>
				<div class="project-tab">
					<ul class="nav px-1">
						<li class="nav-item">
							<a href={'#'} class="nav-link acive">Top Rated</a>
						</li>
						<li class="nav-item">
							<a href={'#'} class="nav-link">Popular</a>
						</li>
						<li class="nav-item">
							<a href={'#'} class="nav-link">Newest</a>
						</li>
						<li class="nav-item">
							<a href={'#'} class="nav-link">Price</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="project-icon-selected content-center">
				<div class="listing-social-link">
					<div class="icon-list-social d-flex">
						<a
							href="/ecommerce/product-grid"
							class="icon-list-social__link rounded-circle icon-list-social__style justify-content-center {cardType ===
							'card'
								? 'active'
								: ''}"
						>
							<GridIcon />
						</a>
						<a
							href="/ecommerce/product-list"
							class="icon-list-social__link rounded-circle icon-list-social__style justify-content-center {cardType ===
							'list'
								? 'active'
								: ''}"
						>
							<ListIcon />
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
