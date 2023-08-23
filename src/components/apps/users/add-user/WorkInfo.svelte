<script>
	import { Row, Col, Form, FormGroup, Input, Label, Button } from 'sveltestrap';

	import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';
</script>

<Row class="justify-content-center">
	<Col xxl={4}>
		<div class="mt-40 mb-50 px-xxl-0 px-30">
			<div class="user-tab-info-title mb-35 text-capitalize">
				<h5 class="fw-500">work Information</h5>
			</div>
			<div class="edit-profile__body">
				<Form>
					<FormGroup class="mb-25 form-group">
						<Label for="name4">company name</Label>
						<Input type="text" class="form-control" id="name4" placeholder="Duran Clayton" />
					</FormGroup>
					<FormGroup class="mb-25 form-group">
						<Label for="phoneNumber1">Department</Label>
						<Input type="text" class="form-control" id="phoneNumber1" placeholder="Design" />
					</FormGroup>
					<FormGroup class="mb-25 form-group">
						<Label for="phoneNumber">Designation</Label>
						<Input type="text" class="form-control" id="phoneNumber" placeholder="UI Designrt" />
					</FormGroup>
					<FormGroup class="mb-25 form-group form-group-calender">
						<Label for="datepicker">Hiring Date</Label>
						<div class="custom-date-picker">
							<div class="form-group mb-0 form-group-calender">
								<div class="position-relative">
									<DatePicker format="MMMM DD, YYYY" />
									<a href={'#'}>
										<img class="svg" alt="" src={'/img/svg/calendar.svg'} />
									</a>
								</div>
							</div>
						</div>
					</FormGroup>
					<FormGroup class="mb-25 form-group status-radio">
						<Label class="mb-15" for="phoneNumber2">status</Label>
						<div class="d-flex">
							<div class="radio-horizontal-list d-flex flex-wrap">
								<div class="radio-theme-default custom-radio ">
									<Input
										class="radio"
										type="radio"
										name="radio-optional"
										value="0"
										id="radio-hl1"
										label="Active"
									/>
								</div>

								<div class="radio-theme-default custom-radio ">
									<Input
										class="radio"
										type="radio"
										name="radio-optional"
										value="0"
										id="radio-hl2"
										label="Deactive"
									/>
								</div>

								<div class="radio-theme-default custom-radio ">
									<Input
										class="radio"
										type="radio"
										name="radio-optional"
										value="0"
										id="radio-hl3"
										label="Block"
									/>
								</div>
							</div>
						</div>
					</FormGroup>
					<div
						class="button-group d-flex pt-20 justify-content-md-end justify-content-start flex-wrap"
					>
						<Button
							color="light"
							size="default"
							class="btn-squared fw-400 text-capitalize radius-md"
							>cancel
						</Button>

						<Button
							color="primary"
							size="default"
							class="btn-squared text-capitalize radius-md shadow2"
							>Save &amp; Next
						</Button>
					</div>
				</Form>
			</div>
		</div>
	</Col>
</Row>
