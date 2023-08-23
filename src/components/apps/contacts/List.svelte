<script>
	import { Dropdown, DropdownMenu, DropdownToggle } from 'sveltestrap';
	import contactData from '@data/contacts.json';
</script>

<div class="contact-list-wrap mb-25">
	<div class="contact-list radius-xl w-100">
		<div class="table-responsive table-responsive--dynamic">
			<table class="table mb-0 table-borderless table-rounded">
				<thead>
					<tr>
						<th>
							<div class="d-flex align-items-center">
								<div class="custom-checkbox check-all">
									<input class="checkbox" type="checkbox" id="check-33" />
									<label for="check-33">
										<span class="checkbox-text userDatatable-title">Name</span>
									</label>
								</div>
							</div>
						</th>
						<th class="c-email">
							<span>email</span>
						</th>
						<th class="c-company">
							<span>company</span>
						</th>
						<th class="c-position">
							<span class="">position</span>
						</th>
						<th class="c-phone">
							<span class="">Phone</span>
						</th>
						<th class="c-action">
							<span class="float-end" />
						</th>
					</tr>
				</thead>
				<tbody>
					{#each contactData as contact, i}
						<tr>
							<td>
								<div class="contact-item d-flex align-items-center">
									<div class="contact-personal-wrap">
										<div class="checkbox-group-wrapper">
											<div class="checkbox-group d-flex">
												<div
													class="checkbox-theme-default custom-checkbox checkbox-group__single d-flex"
												>
													<input class="checkbox" type="checkbox" id="check-grp-c-{i}" />
													<label for="check-grp-c-{i}" />
												</div>
											</div>
										</div>
									</div>
									<div class="contact-personal-info d-flex">
										<a href={'#'}
											><img
												src={`/img/${contact.img}`}
												alt=""
												class="profile-image rounded-circle d-block m-0 wh-38"
											/></a
										>
										<div class="contact_title">
											<h6>
												<a href={'#'}>{contact.name}</a>
											</h6>
											<span class="location">{contact.country}</span>
										</div>
									</div>
								</div>
							</td>
							<td>
								<span class="email">{contact.email}</span>
							</td>
							<td>
								<span class="com-name">{contact.company}</span>
							</td>
							<td>
								<span class="position">{contact.designation}</span>
							</td>
							<td>
								<span class="email">{contact.phone}</span>
							</td>
							<td>
								<div class="table-actions">
									<a href={'#'} class={contact.favoirte ? 'active' : ''}>
										<img class="svg" alt="" src={'/img/svg/star.svg'} />
									</a>
									<Dropdown class="dropdown-click">
										<DropdownToggle class="btn-link border-0 p-0 bg-transparent">
											<img class="svg" alt="" src={'/img/svg/more-vertical.svg'} />
										</DropdownToggle>
										<DropdownMenu class="dropdown-default dropdown-menu--dynamic">
											<a class="dropdown-item" href={'#'}>view</a>
											<a class="dropdown-item" href={'#'}>edit</a>
											<a class="dropdown-item" href={'#'}>delete</a>
										</DropdownMenu>
									</Dropdown>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<style lang="scss">
	:global {
		@import '../../../../../src/assets/sass/mixins/media-queries';
		@import '../../../../../src/assets/sass/mixins/rfs';
		@import '../../../../../src/assets/sass/mixins/functions';
		@import '../../../../../src/assets/sass/mixins/helpers';
		@import '../../../../../src/assets/sass/components/contact';
		@import '../../../../../src/assets/sass/components/breadcrumb';
		@import '../../../../../src/assets/sass/components/modal';
		@import '../../../../../src/assets/sass/components/table';
		.bg-transparent {
			background-color: transparent !important;
			&:hover {
				background-color: transparent !important;
			}
		}
	}
</style>
