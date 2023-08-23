<script>
	import { SearchIcon } from 'svelte-feather-icons';
	import { Input } from 'sveltestrap';

	export let filtering;
	export let buttonText;
</script>

<div class="table-top-toolbox-wrap d-flex justify-content-between flex-wrap mb-25 mt-n10">
	<div class="toolbox-search global-shadow">
		<div class="toolbox-search__left">
			<div class="toolbox-search__form">
				<SearchIcon />
				<Input
					class="me-sm-2 border-0 box-shadow-none"
					type="Search"
					placeholder="Filter by keyword"
				/>
			</div>
			{#if filtering === true}
				<div class="order-tab">
					<p>Status :</p>
					<div class="data-filter-wrap">
						<ul class="nav px-1 data-filter-box">
							<li>
								<a class="active" href="#all">All</a>
							</li>
							<li>
								<a href="#shipped">Shipped</a>
							</li>
							<li>
								<a href="#awaiting-shipment">Awaiting Shipment</a>
							</li>
							<li>
								<a href="#canceled">Canceled</a>
							</li>
						</ul>
					</div>
				</div>
			{/if}
		</div>

		<div class="content-center mt-10">
			<div class="button-group m-0 mt-xl-0 mt-sm-10 order-button-group">
				<button class="order-bg-opacity-secondary radius-md btn btn-sm color-secondary">
					Export
				</button>
				<button class="btn-primary radius-md btn btn-sm">
					<i class="la la-plus" /> Add {buttonText}
				</button>
			</div>
		</div>
	</div>
</div>
