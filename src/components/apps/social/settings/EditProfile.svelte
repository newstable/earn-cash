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
				<h6>Edit Profile</h6>
				<span class="fs-13 color-light fw-400">Set up your personal information</span>
			</div>
		</CardHeader>
		<CardBody>
			<Row class="justify-content-center">
				<Col xxl={6}>
					<div class="edit-profile__body mx-xl-20">
						<Form>
							<FormGroup class="mb-20 form-group">
								<Label for="names">name</Label>
								<Input type="text" class="form-control" id="names" placeholder="Duran Clayton" />
							</FormGroup>
							<FormGroup class="mb-20 form-group">
								<Label for="phoneNumber1">phone number</Label>
								<Input
									type="tel"
									class="form-control"
									id="phoneNumber1"
									placeholder="+440 2546 5236"
								/>
							</FormGroup>
							<FormGroup class="mb-20 form-group">
								<div class="countryOption">
									<Label for="countryOption">country</Label>
									<select class="form-select form-control"
										id="countryOption"
									>
										<option value="JAN">UK</option>
										<option value="FBR">US</option>
									</select>
								</div>
							</FormGroup>
							<FormGroup class="mb-20 form-group">
								<div class="cityOption">
									<Label for="cityOption">city</Label>
									<select class="form-select form-control"
										id="cityOption"
									>
										<option value="JAN">Parkcity</option>
										<option value="FBR">Venues</option>
									</select>
								</div>
							</FormGroup>
							<FormGroup class="mb-20 form-group">
								<Label for="company1">company name</Label>
								<input type="text" class="form-control" id="company1" placeholder="Example" />
							</FormGroup>
							<FormGroup class="mb-20 form-group">
								<Label for="website">website</Label>
								<Input
									type="email"
									class="form-control"
									id="website"
									placeholder="www.example.com"
								/>
							</FormGroup>
							<FormGroup class="mb-20 form-group">
								<Label for="userBio">user bio</Label>
								<Input type="textarea" class="form-control" id="userBio" rows="5" />
							</FormGroup>
							<FormGroup class="mb-20 form-group">
								<div class="skillsOption">
									<Label for="skillsOption">skils</Label>
									<select class="form-select form-control"
										id="skillsOption"
									>
										<option value="JAN">event</option>
										<option value="FBR">Venues</option>
									</select>
								</div>
							</FormGroup>
							<div class="button-group d-flex flex-wrap pt-30 mb-15">
								<Button
									color="primary"
									size="default"
									class="btn-squared me-15 text-capitalize btn-sm"
									>update profile
								</Button>

								<Button
									color="light"
									default="default"
									class="btn-squared fw-400 text-capitalize btn-sm btn-transparent-light"
									>cancel
								</Button>
							</div>
						</Form>
					</div>
				</Col>
			</Row>
		</CardBody>
	</Card>
</div>
