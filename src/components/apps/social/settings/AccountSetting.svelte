<script>
	import {
		Card,
		CardHeader,
		CardBody,
		CardFooter,
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
				<h6>Account setting</h6>
				<span class="fs-13 color-light fw-400">Update your username and manage your account</span>
			</div>
		</CardHeader>
		<CardBody>
			<Row class="justify-content-center">
				<Col xxl={6}>
					<div class="edit-profile__body mx-xl-20">
						<Form>
							<FormGroup class="mb-20">
								<Label for="name1">username</Label>
								<Input type="text" class="form-control" id="name1" placeholder="Duran Clayton" />
								<small id="passwordHelpInline2" class="text-light fs-13"
									>Your Dashboard URL: https://dashboard.com/<span class="color-dark">clayton</span>
								</small>
							</FormGroup>
							<FormGroup class="mb-1">
								<Label for="email45">email</Label>
								<Input
									type="email"
									class="form-control"
									id="email45"
									placeholder="Contact@example.com"
								/>
							</FormGroup>
						</Form>
					</div>
				</Col>
			</Row>
		</CardBody>
		<CardFooter class="bg-transparent">
			<Row class="justify-content-center align-items-center">
				<Col xxl={6}>
					<div class="d-flex justify-content-between mt-1 align-items-center flex-wrap">
						<div class="text-capitalize py-10">
							<h6>close account</h6>
							<span class="fs-13 color-light fw-400">Delete your account and account data</span>
						</div>
						<div class="my-sm-0 my-10 py-10">
							<Button color="danger" size="default" class="btn-squared fw-400 text-capitalize"
								>close account
							</Button>
						</div>
					</div>
					<div class="button-group d-flex flex-wrap pt-35 mb-35">
						<Button color="primary" size="default" class="fs-15 btn-squared me-15 text-capitalize"
							>Save Changes
						</Button>

						<Button color="light" size="default" class="fs-15 btn-squared fw-400 text-capitalize btn-transparent-light"
							>cancel
						</Button>
					</div>
				</Col>
			</Row>
		</CardFooter>
	</Card>
</div>
