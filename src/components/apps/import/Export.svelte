<script>
	import contactData from '@data/export.json';

	import { onMount } from 'svelte';
	import { read, utils, writeFileXLSX } from 'xlsx';
	import Papa from 'papaparse';
	import { Dropdown, DropdownMenu, DropdownToggle } from 'sveltestrap';

	import { Form, FormGroup, Input, Button, Modal, ModalBody, ModalHeader } from 'sveltestrap';

	let open = false;
	const toggle = () => (open = !open);

	let pres = [];
	onMount(async () => {
		const f = await (await fetch('https://sheetjs.com/pres.xlsx')).arrayBuffer();
		const wb = read(f);
		const ws = wb.Sheets[wb.SheetNames[0]];
		pres = utils.sheet_to_json(ws);
	});

	function exportToCSV() {
		const csv = Papa.unparse(contactData);
		const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		const csvURL = URL.createObjectURL(csvData);
		const tempLink = document.createElement('a');
		tempLink.href = csvURL;
		tempLink.setAttribute('download', 'table.csv');
		tempLink.click();
	}

	function exportFile() {
		const ws = utils.json_to_sheet(pres);
		const wb = utils.book_new();
		utils.book_append_sheet(wb, ws, 'Data');
		writeFileXLSX(wb, 'SheetJSSvelteAoO.xlsx');
	}
</script>

<div class="row">
	<div class="col-12">
		<div class="contact-list-wrap mb-25">
			<div class="contact-list global-shadow border-0 py-30 bg-white radius-xl w-100 mb-30 px-30">
				<div class="contact-breadcrumb">
					<div
						class="add-contact d-flex flex-wrap justify-content-sm-between justify-content-center"
					>
						<div class="add-contact-modal">
							<Button color="primary" class="px-15" on:click={toggle}>Export</Button>
							<Modal isOpen={open} {toggle} class="add-contact-modal modal-dialog-centered">
								<ModalHeader>
									Export File
									<Button size="default" on:click={toggle}>
										<i class="uil uil-times" />
									</Button>
								</ModalHeader>
								<ModalBody class="pt-10">
									<div class="add-new-contact">
										<Form action="/">
											<FormGroup class="mb-20">
												<Input type="text" class="form-control" placeholder="Enter File Name" />
											</FormGroup>
											<FormGroup>
												<Dropdown class="dropdown-click">
													<DropdownToggle class="btn-link">Export File</DropdownToggle>
													<DropdownMenu class="dropdown-default dropdown-menu--dynamic">
														<button type="submit" class="dropdown-item" on:click={exportToCSV}
															>Export to CSV</button
														>
														<button type="submit" class="dropdown-item" on:click={exportFile}
															>Export XLSX</button
														>
													</DropdownMenu>
												</Dropdown>
											</FormGroup>
										</Form>
									</div>
								</ModalBody>
								<div class="modal-footer m-n1">
									<button
										type="button"
										class="btn btn-light btn-default btn-squared fw-400 text-capitalize b-light text-light"
										data-bs-dismiss="modal"
										on:click={toggle}>Cancel</button
									>
									<button
										type="button"
										class="btn btn-primary btn-default btn-squared text-capitalize">Create</button
									>
								</div>
							</Modal>
						</div>
						<div class="d-flex flex-wrap justify-content-center">
							<Form action="/" class="d-flex align-items-center add-contact__form my-sm-0 my-2">
								<img class="svg" alt="" src={'/img/svg/search.svg'} />
								<Input
									class="form-control me-sm-2 border-0 box-shadow-none"
									type="search"
									placeholder="Search by Name"
									aria-label="Search"
								/>
							</Form>
						</div>
					</div>
				</div>
				<div class="table-responsive">
					<table class="table mb-0 table-borderless table-rounded ">
						<thead>
							<tr>
								<th>
									<div class="d-flex align-items-center">
										<div class="custom-checkbox  check-all">
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
									<span class="float-end">Phone</span>
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
															<input class="checkbox" type="checkbox" id="check-grp-{i}" />
															<label for="check-grp-{i}" />
														</div>
													</div>
												</div>
											</div>
											<div class="contact-personal-info d-flex">
												<div class="contact_title">
													<h6>
														{contact.name}
													</h6>
												</div>
											</div>
										</div>
									</td>
									<td>
										<span class="email">{contact.email}</span>
									</td>
									<td>
										<span class="company">{contact.company}</span>
									</td>
									<td>
										<span class="position">{contact.position}</span>
									</td>
									<td>
										<span class="float-end">{contact.date}</span>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<!-- ends: col-12 -->
</div>

<style lang="scss">
	:global {
		.contact-list {
			box-shadow: 0 5px 20px rgba(var(--light-gray-rgba), 0.03);
			border-radius: 10px;
			background-color: var(--bg-white);
			table.table-rounded {
				border-collapse: separate;
				border-spacing: 0;
				thead tr {
					border-radius: 10px;
					th {
						color: var(--color-gray);
						background: var(--bg-normal);
						border-top: 1px solid var(--border-color);
						border-bottom: 1px solid var(--border-color);
						border-bottom-color: var(--border-color) !important;
						white-space: nowrap;
						padding: 15px 20px;
						vertical-align: middle;
						font-size: 14px;
						font-weight: 500;
						color: var(--color-gray);
						text-transform: capitalize;
						&:first-child {
							border-left: 1px solid var(--border-color);
							border-radius: 10px 0 0 10px;
						}
						&:last-child {
							border-right: 1px solid var(--border-color);
							border-radius: 0 10px 10px 0;
						}
					}
				}
				tbody tr {
					transition: 0.3s ease;
					border-radius: 10px;
					box-shadow: none;
					td {
						border-top: 0;
						border-bottom: none;
						padding: 10px 20px;
						vertical-align: middle;
						white-space: nowrap;
						padding: 20px;
						font-size: 14px;
						line-height: 1.4285714286;
						font-weight: 500;
						color: var(--color-dark);
						&:first-child {
							border-top-left-radius: 10px;
						}
						.contact_title {
							h6 {
								font-size: 14px;
								font-weight: 500;
								line-height: 20px;
								color: #0a0a0a;
							}
						}
					}
				}
			}
		}
		.add-contact {
			gap: 20px;
			margin-bottom: 20px;
			form {
				background-color: transparent;
				border: 1px solid var(--border-color);
				padding: 12px 13px;
				width: 250px;
				padding: 15px 20px;
				background: var(--bg-lighter);
				height: 40px;
				display: flex;
				align-items: center;
				border-radius: 20px;
				svg {
					color: var(--color-light);
					width: 18px;
					height: 18px;
				}
				.form-control {
					padding: 8px 13px;
					background: 0 0;
					box-shadow: none;
				}
			}
		}
		.add-contact-modal {
			&.modal-dialog {
				max-width: 390px;
			}
			.modal-header {
				border-bottom: none;
				padding-bottom: 30px;
			}
			.modal-title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				font-size: 16px;
				button {
					margin: 0;
					padding: 0;
					transition: var(--transition);
					background-color: transparent !important;
					border: none;
					border-radius: 50%;
					font-size: 15px;
					line-height: 1.3333333333;
					font-weight: 600;
					display: flex;
					align-items: center;
					justify-content: center;
					i {
						color: var(--color-dark);
						font-size: 18px;
						margin: 0;
					}
				}
			}
			.modal-body {
				.form-control {
					height: 40px;
					&::placeholder {
						color: var(--color-lighten);
					}
				}
				.dropdown {
					width: 100%;
					.btn-link {
						text-align: left;
						display: flex;
						align-items: center;
						border: 1px solid var(--border-light) !important;
						color: var(--color-lighten);
						padding: 10px 20px;
						background: transparent !important;
						width: 100%;
						justify-content: flex-start;
						height: 40px;
						font-size: 14px;
						font-weight: 400;
						&:focus,
						&:hover {
							color: var(--color-lighten) !important;
						}
					}
				}
			}
			.modal-footer {
				border-top: none;
				padding: 0 30px 30px;
				margin: -0.25rem;
			}
		}
	}
</style>
