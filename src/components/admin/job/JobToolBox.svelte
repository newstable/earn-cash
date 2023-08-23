<script>
	import { SearchIcon, GridIcon, ListIcon } from 'svelte-feather-icons';
	export let cardType;
</script>

<div class="shop_products_top_filter">
	<div class="project-top-wrapper d-flex flex-wrap align-items-center">
		<div class="project-top-left d-flex flex-wrap align-items-center">
			<span class="project-result-showing">
				Showing <span>1-8</span> of <span>86</span> results
			</span>
		</div>
		<div class="project-top-right d-flex flex-wrap align-items-center">
			<div class="job-category flex-wrap d-flex align-items-center">
				<p class="mb-0 me-10 fs-14 color-light">sort by:</p>
				<div class="job__select dm-select">
					<select class="form-control color-primary">
						<option value="all">All</option>
						<option value="latest">Latest</option>
						<option value="old">Old</option>
					</select>
				</div>
			</div>
			<div class="project-icon-selected content-center">
				<div class="listing-social-link">
					<div class="icon-list-social d-flex">
						<a
							href="/job/job-grid"
							class="icon-list-social__link rounded-circle icon-list-social__style justify-content-center {cardType ===
							'card'
								? 'active'
								: ''}"
						>
							<GridIcon />
						</a>
						<a
							href="/job/job-list"
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
