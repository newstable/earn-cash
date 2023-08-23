<script>
	import {
		Button,
		Modal,
		ModalBody,
		ModalHeader,
		Form,
		FormGroup,
		Label,
		Input
	} from 'sveltestrap';

	import tickets from '@data/support-tickets.json';
	import PaginationBasic from '@components/paginations/PaginationBasic.svelte';
	let open = false;
	const toggle = () => (open = !open);
</script>

<div class="support-ticket-system">
	<div class="breadcrumb-main breadcrumb-main--ticket justify-content-sm-between ">
		<div class=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
			<div
				class="d-flex align-items-center ticket__title justify-content-center me-md-25 mb-md-0 mb-20"
			>
				<h4 class="text-capitalize fw-500 breadcrumb-title">All Support Ticket</h4>
			</div>
		</div>
		<div class="action-btn">
			<Button color="primary" on:click={toggle}><i class="uil uil-plus" />Add Ticket</Button>

			<!-- Modal -->
			<Modal class="ticket_modal" isOpen={open} {toggle}>
				<ModalBody class=" pb-sm-50 pb-30">
					<ModalHeader>
						<h1>Submit your Ticket</h1>
						<Button size="default" on:click={toggle}>
							<i class="uil uil-times" />
						</Button>
					</ModalHeader>
					<div class="ticket_modal-modal">
						<Form>
							<FormGroup class="form-group">
								<Label for="email">Email</Label>
								<Input id="email" type="text" class="form-control" />
							</FormGroup>
							<FormGroup class="form-group">
								<Label for="subject">Subject</Label>
								<Input id="subject" type="text" class="form-control" />
							</FormGroup>
							<FormGroup class="form-group">
								<Label for="priority">Priority</Label>
								<Input id="priority" type="text" class="form-control" placeholder="High" />
							</FormGroup>
							<FormGroup class="form-group">
								<Label for="status">Status</Label>
								<Input id="status" type="text" class="form-control" placeholder="Open" />
							</FormGroup>
							<FormGroup class="form-group">
								<Label for="description">Description</Label>
								<Input id="description" type="textarea" class="form-control" />
							</FormGroup>
							<div class="button-group d-flex pt-15">
								<Button color="primary" size="default">Submit ticket</Button>
							</div>
						</Form>
					</div>
				</ModalBody>
			</Modal>
		</div>
	</div>

	<div class="support-form d-flex justify-content-between align-items-center flex-wrap">
		<div class="support-form__input">
			<div class="d-flex flex-wrap">
				<div class="support-form__input-id">
					<Label>Id:</Label>
					<div class="dm-select ">
						<select name="select-search" class="select-search form-control ">
							<option value="01">All</option>
							<option value="02">Option 2</option>
							<option value="03">Option 3</option>
							<option value="04">Option 4</option>
							<option value="05">Option 5</option>
						</select>
					</div>
				</div>
				<div class="support-form__input-status">
					<Label>status:</Label>

					<div class="dm-select ">
						<select name="select-search" class="select-search form-control ">
							<option value="01">All</option>
							<option value="02">Option 2</option>
							<option value="03">Option 3</option>
							<option value="04">Option 4</option>
							<option value="05">Option 5</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<div class="support-form__search">
			<div class="support-order-search">
				<Form action="/" class="support-order-search__form">
					<img class="svg" alt="" src={'/img/svg/search.svg'} height="16" />
					<Input
						class="form-control border-0 box-shadow-none"
						type="search"
						placeholder="Search"
						aria-label="Search"
					/>
				</Form>
			</div>
		</div>
	</div>
	<div class="userDatatable userDatatable--ticket mt-1">
		<div class="table-responsive">
			<table class="table mb-0 table-borderless">
				<thead>
					<tr class="userDatatable-header">
						<th>
							<span class="userDatatable-title">ID</span>
						</th>
						<th>
							<span class="userDatatable-title">Requested By</span>
						</th>
						<th>
							<span class="userDatatable-title">Subject</span>
						</th>
						<th>
							<span class="userDatatable-title">Priority</span>
						</th>
						<th>
							<span class="userDatatable-title">Status</span>
						</th>
						<th>
							<span class="userDatatable-title">Created Date</span>
						</th>
						<th class="actions">
							<span class="userDatatable-title">Actions</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{#each tickets as ticket, i}
						<tr>
							<td>#{i + 1}</td>
							<td>
								<div class="d-flex">
									<div class="userDatatable__imgWrapper d-flex align-items-center">
										<img src="/img/{ticket.img}" alt="" />
									</div>
									<div class="userDatatable-inline-title">
										<a href={'#'} class="text-dark fw-500">
											<h6>{ticket.from}</h6>
										</a>
									</div>
								</div>
							</td>
							<td>
								<div class="userDatatable-content--subject">{ticket.subject}</div>
							</td>
							<td>
								<div class="userDatatable-content--priority">{ticket.priority}</div>
							</td>
							<td>
								<div class="userDatatable-content d-inline-block">
									<span class="status-{ticket.status} userDatatable-content-status"
										>{ticket.status}</span
									>
								</div>
							</td>
							<td>
								<div class="userDatatable-content--date">{ticket.date}</div>
							</td>
							<td>
								<ul class="orderDatatable_actions mb-0 d-flex flex-wrap">
									<li>
										<a href={'#'} class="view">
											<i class="uil uil-setting" />
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
		<div class="d-flex justify-content-end pt-30">
			<PaginationBasic />
		</div>
	</div>
</div>

<style lang="scss">
	:global {
		.ticket_modal {
			.modal-header {
				.modal-title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					button {
						padding: 0;
						background-color: transparent !important;
						outline: none;
						color: var(--color-dark);
						border: none;
						i {
							font-size: 22px;
							color: var(--color-dark);
						}
						&:hover {
							color: var(--color-danger);
							i {
								color: currentColor;
							}
						}
					}
				}
			}
		}
	}
</style>
