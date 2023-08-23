<script>
	import { onMount } from 'svelte';
	import { Table, Badge } from 'sveltestrap';
	import orders from '@data/orders.json';

	$: checked = false;
	function toggleCheck() {
		checked ? (checked = false) : (checked = true);
	}

	let tableType = 'All';
	$: tableType;
	onMount(() => {
		let sortLinks = document.querySelectorAll('.data-filter-box a');
		sortLinks.forEach((item) => {
			item.addEventListener('click', function () {
				tableType = this.innerText;
				item
					.closest('.data-filter-box')
					.querySelectorAll('a')
					.forEach((elm) => {
						elm.classList.remove('active');
					});
				this.classList.add('active');
			});
		});
	});
</script>

<div class="table-responsive">
	<Table class="mb-0" borderless>
		<thead>
			<tr class="userDatatable-header">
				<th>
					<div class="d-flex align-items-center">
						<div class="custom-checkbox  check-all">
							<input class="checkbox" type="checkbox" id="check-all" on:click={toggleCheck} />
							<label for="check-all">Order Id</label>
						</div>
					</div>
				</th>
				<th>
					<span class="userDatatable-title">Customers</span>
				</th>
				<th>
					<span class="userDatatable-title">Status</span>
				</th>
				<th>
					<span class="userDatatable-title">Amount</span>
				</th>
				<th>
					<span class="userDatatable-title">Date</span>
				</th>

				<th>
					<span class="userDatatable-title float-end">action</span>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each orders as data, i}
				{#if data.status === tableType}
					<tr>
						<td>
							<div class="d-flex align-items-center">
								<div class="me-3 d-flex align-items-center">
									<div class="checkbox-group-wrapper">
										<div class="checkbox-group d-flex">
											<div
												class="checkbox-theme-default custom-checkbox checkbox-group__single d-flex"
											>
												<input
													class="checkbox"
													type="checkbox"
													id="check-grp-content-{i}"
													{checked}
												/>
												<label for="check-grp-content-{i}" />
											</div>
										</div>
									</div>
									<div class="orderDatatable-title">
										<p class="d-block mb-0">#02-0003</p>
									</div>
								</div>
							</div>
						</td>
						<td>
							<div class="orderDatatable-title">{data.customers}</div>
						</td>
						<td>
							<div class="userDatatable-content d-inline-block">
								<Badge
									pill
									color={data.status === 'Shipped'
										? 'success'
										: data.status === 'Awaiting Shipment'
										? 'warning'
										: 'danger'}
									class="bg-opacity-{data.status === 'active'
										? 'success'
										: data.status === 'deactive'
										? 'warning'
										: 'danger'}"
									>{data.status}
								</Badge>
							</div>
						</td>
						<td>
							<div class="userDatatable-title">{data.amount}</div>
						</td>
						<td>
							<div class="userDatatable-title">{data.date}</div>
						</td>
						<td>
							<ul class="orderDatatable_actions mb-0 d-flex flex-wrap">
								<li>
									<a href={'#'} class="view">
										<i class="uil uil-eye" />
									</a>
								</li>
								<li>
									<a href={'#'} class="edit">
										<i class="uil uil-edit" />
									</a>
								</li>
								<li>
									<a href={'#'} class="remove">
										<i class="uil uil-trash-alt" />
									</a>
								</li>
							</ul>
						</td>
					</tr>
				{:else if tableType === 'All'}
					<tr>
						<td>
							<div class="d-flex align-items-center">
								<div class="me-3 d-flex align-items-center">
									<div class="checkbox-group-wrapper">
										<div class="checkbox-group d-flex">
											<div
												class="checkbox-theme-default custom-checkbox checkbox-group__single d-flex"
											>
												<input
													class="checkbox"
													type="checkbox"
													id="check-grp-content-{i}"
													{checked}
												/>
												<label for="check-grp-content-{i}" />
											</div>
										</div>
									</div>
									<div class="orderDatatable-title">
										<p class="d-block mb-0">#02-0003</p>
									</div>
								</div>
							</div>
						</td>
						<td>
							<div class="orderDatatable-title">{data.customers}</div>
						</td>
						<td>
							<div class="userDatatable-content d-inline-block">
								<Badge
									pill
									color={data.status === 'Shipped'
										? 'success'
										: data.status === 'Awaiting Shipment'
										? 'warning'
										: 'danger'}
									class="bg-opacity-{data.status === 'active'
										? 'success'
										: data.status === 'deactive'
										? 'warning'
										: 'danger'}"
									>{data.status}
								</Badge>
							</div>
						</td>
						<td>
							<div class="userDatatable-title">{data.amount}</div>
						</td>
						<td>
							<div class="userDatatable-title">{data.date}</div>
						</td>
						<td>
							<ul class="orderDatatable_actions mb-0 d-flex flex-wrap">
								<li>
									<a href={'#'} class="view">
										<i class="uil uil-eye" />
									</a>
								</li>
								<li>
									<a href={'#'} class="edit">
										<i class="uil uil-edit" />
									</a>
								</li>
								<li>
									<a href={'#'} class="remove">
										<i class="uil uil-trash-alt" />
									</a>
								</li>
							</ul>
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</Table>
</div>

<style lang="scss">
	:global {
		@import '../../../../assets/sass/components/_table';
	}
</style>
