<script>
	import usersData from '@data/usersDatatable.json';
	$: checked = false;
	function toggleCheck() {
		checked ? (checked = false) : (checked = true);
	}
</script>

<div class="userDatatable global-shadow border-light-0 p-30 bg-white radius-xl w-100 mb-30">
	<div class="table-responsive">
		<table class="table mb-0 table-borderless">
			<thead>
				<tr class="userDatatable-header">
					<th>
						<div class="d-flex align-items-center">
							<div class="custom-checkbox  check-all">
								<input class="checkbox" type="checkbox" id="check-all" on:click={toggleCheck} />
								<label for="check-all">User</label>
							</div>
						</div>
					</th>
					<th>
						<span class="userDatatable-title">emaill</span>
					</th>
					<th>
						<span class="userDatatable-title">company</span>
					</th>
					<th>
						<span class="userDatatable-title">position</span>
					</th>
					<th>
						<span class="userDatatable-title">join date</span>
					</th>
					<th>
						<span class="userDatatable-title">status</span>
					</th>
					<th>
						<span class="userDatatable-title float-end">action</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each usersData as data, i}
					<tr>
						<td>
							<div class="d-flex">
								<div class="userDatatable__imgWrapper d-flex align-items-center">
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
									<a href={'#'} class="profile-image rounded-circle d-block m-0 wh-38"
										><img src="/img/{data.img}" alt="user" class="img-fluid" /></a
									>
								</div>
								<div class="userDatatable-inline-title">
									<a href={'#'} class="text-dark fw-500">
										<h6>{data.name}</h6>
									</a>
									<p class="d-block mb-0">{data.country}</p>
								</div>
							</div>
						</td>
						<td>
							<div class="userDatatable-content">{data.email}</div>
						</td>
						<td>
							<div class="userDatatable-content">{data.company}</div>
						</td>
						<td>
							<div class="userDatatable-content">{data.designation}</div>
						</td>
						<td>
							<div class="userDatatable-content">{data.joining}</div>
						</td>
						<td>
							<div class="userDatatable-content d-inline-block">
								<span
									class="bg-opacity-{data.status === 'active'
										? 'success'
										: data.status === 'deactive'
										? 'warning'
										: 'danger'}  color-{data.status === 'active'
										? 'success'
										: data.status === 'deactive'
										? 'warning'
										: 'danger'} rounded-pill userDatatable-content-status {data.status}"
									>{data.status}</span
								>
							</div>
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
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style lang="scss">
	:global {
		@import '../../../../assets/sass/components/_table';
	}
</style>

