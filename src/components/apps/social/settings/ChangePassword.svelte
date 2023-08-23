<script>
	import {
		Card,
		CardHeader,
		CardBody,
		Row,
		Col,
		Form,
		Input,
		Label,
		Button,
		FormGroup
	} from 'sveltestrap';
</script>

<div class="edit-profile mt-25">
	<Card>
		<CardHeader class="px-sm-25 px-3">
			<div class="edit-profile__title">
				<h6>change password</h6>
				<span class="fs-13 color-light fw-400">Change or reset your account password</span>
			</div>
		</CardHeader>
		<CardBody>
			<Row class="justify-content-center">
				<Col xxl={6}>
					<div class="edit-profile__body mx-xl-20">
						<Form>
							<FormGroup class="mb-20">
								<Label for="name">old passowrd</Label>
								<Input type="text" class="form-control" id="name" />
							</FormGroup>
							<FormGroup class="mb-1">
								<Label for="password-field">new password</Label>
								<div class="position-relative">
									<Input
										id="password-field"
										type="password"
										class="form-control"
										name="password"
										placeholder="Password"
									/>
									<span class="uil uil-eye-slash text-lighten fs-15 field-icon toggle-password2" />
								</div>
								<small id="passwordHelpInline" class="text-light fs-13"
									>Minimum 6 characters
								</small>
								<div class="button-group d-flex flex-wrap pt-45 mb-35">
									<Button color="primary" size="default" class="fs-15 btn-squared me-15 text-capitalize"
										>Save Changes
									</Button>

									<Button class="fs-15 btn-squared fw-400 text-capitalize btn btn-light btn-default btn-transparent-light">cancel</Button>
								</div>
							</FormGroup>
						</Form>
					</div>
				</Col>
			</Row>
		</CardBody>
	</Card>
</div>
