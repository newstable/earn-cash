<script>
	import {
		Form,
		FormGroup,
		Input,
		Label,
		Button,
		Modal,
		ModalBody,
		ModalHeader
	} from 'sveltestrap';
	import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';

	export let pageTitle = 'Dashboard';
	export let pageLabel = 'Home';

	let open = false;
	const toggle = () => (open = !open);

	const team = ['tm1.png', 'tm2.png', 'tm3.png', 'tm4.png', 'tm5.png'];
</script>

<div class="breadcrumb-main user-member justify-content-sm-between">
	<div class="d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
		<div class="d-flex align-items-center user-member__title justify-content-center me-sm-25">
			<h4 class="text-capitalize fw-500 breadcrumb-title">{pageTitle}</h4>
			<span class="sub-title ms-sm-25 ps-sm-25">{pageLabel}</span>
		</div>

		<Form class="d-flex align-items-center user-member__form my-sm-0 my-2">
			<img class="svg" alt="" src="/img/svg/search.svg" />
			<Input
				class="form-control me-sm-2 border-0 box-shadow-none"
				type="search"
				placeholder="Search by Name"
				aria-label="Search"
			/>
		</Form>
	</div>
	<div class="action-btn">
		<Button color="primary" class="px-15" on:click={toggle}>
			<i class="uil uil-plus fs-16" /> Add Member
		</Button>
		<Modal isOpen={open} {toggle} class="new-member modal-dialog-centered">
			<ModalHeader {toggle}>
				<h6 class="modal-title fw-500">Create project</h6>
			</ModalHeader>
			<ModalBody>
				<div class="new-member-modal">
					<form on:submit|preventDefault={toggle}>
						<FormGroup class="mb-20">
							<Input type="text" class="form-control" placeholder="Duran Clayton" />
						</FormGroup>
						<FormGroup class="mb-20">
							<div class="category-member">
								<Input type="select" class="js-example-basic-single js-states form-control">
									<option value="JAN">1</option>
									<option value="FBR">2</option>
								</Input>
							</div>
						</FormGroup>
						<FormGroup class="mb-20">
							<Input
								type="textarea"
								class="form-control"
								rows="3"
								placeholder="Project description"
							/>
						</FormGroup>
						<FormGroup class="textarea-group">
							<Label class="mb-15">status</Label>
							<div class="d-flex">
								<div class="project-task-list__left d-flex align-items-center">
									<div class="checkbox-group d-flex me-50 pe-10">
										<div
											class="checkbox-theme-default custom-checkbox checkbox-group__single d-flex"
										>
											<Input
												class="checkbox"
												type="checkbox"
												id="check-grp-1"
												checked
												label="Status"
											/>
										</div>
									</div>
									<div class="checkbox-group d-flex me-50 pe-10">
										<div
											class="checkbox-theme-default custom-checkbox checkbox-group__single d-flex"
										>
											<Input
												class="checkbox"
												type="checkbox"
												id="check-grp-2"
												label="Deactivated"
											/>
										</div>
									</div>
									<div class="checkbox-group d-flex">
										<div
											class="checkbox-theme-default custom-checkbox checkbox-group__single d-flex"
										>
											<Input class="checkbox" type="checkbox" id="check-grp-3" label="Bloked" />
										</div>
									</div>
								</div>
							</div>
						</FormGroup>
						<div class="mb-25">
							<FormGroup class="mb-10">
								<Label for="name47">project member</Label>
								<Input type="text" class="form-control" id="name47" placeholder="Search members" />
							</FormGroup>
							<ul class="d-flex flex-wrap mb-20 user-group-people__parent">
								{#each team as img}
									<li>
										<a href={'#'}
											><img class="rounded-circle wh-34" src="/img/{img}" alt="author" /></a
										>
									</li>
								{/each}
							</ul>
						</div>
						<div class="d-flex new-member-calendar custom-date-ranger custom-date-ranger__sm">
							<FormGroup class="w-100 me-sm-15 form-group-calender">
								<Label for="datepicker">start Date</Label>
								<div class="position-relative">
									<DatePicker format="MMMM DD, YYYY" />
									<a href={'#'}> <img class="svg" alt="" src={'/img/svg/chevron-right.svg'} /></a>
								</div>
							</FormGroup>
							<FormGroup class="w-100 form-group-calender">
								<Label for="datepicker2">End Date</Label>
								<div class="position-relative">
									<DatePicker format="MMMM DD, YYYY" />
									<a href={'#'}> <img class="svg" alt="" src={'/img/svg/chevron-right.svg'} /></a>
								</div>
							</FormGroup>
						</div>
						<div class="button-group d-flex pt-25">
							<Button color="primary" size="default" class="btn-squared text-capitalize"
								>add new project
							</Button>

							<Button
								color="light"
								size="default"
								class="btn-squared fw-400 text-capitalize b-light color-light">cancel</Button
							>
						</div>
					</form>
				</div>
			</ModalBody>
		</Modal>
	</div>
</div>

<style lang="scss">
	:global {
		@import '../../../../src/assets/sass/components/breadcrumb';
		@import '../../../../src/assets/sass/components/users';
		@import '../../../../src/assets/sass/components/profile';
		@import '../../../assets/sass/components/progress-bar';
		@import '../../../assets/sass/components/responsive';
	}
</style>
