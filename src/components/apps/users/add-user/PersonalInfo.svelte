<script>
	import { Row, Col, Form, FormGroup, Input, Label, Button } from 'sveltestrap';
</script>

<Row class="justify-content-center">
	<Col xxl={4}>
		<div class="mt-sm-40 mb-sm-50 mt-20 mb-20 px-xxl-0 px-30">
			<div class="user-tab-info-title mb-sm-40 mb-20 text-capitalize">
				<h5 class="fw-500">Personal Information</h5>
			</div>
			<div class="account-profile d-flex align-items-center mb-4">
				<div class="ap-img pro_img_wrapper">
					<Input id="file-upload" type="file" name="fileUpload" class="d-none" />
					<Label for="file-upload">
						<img
							class="ap-img__main rounded-circle wh-120 bg-lighter d-flex"
							src="/img/author/profile.png"
							alt="profile"
						/>
						<span class="cross" id="remove_pro_pic">
							<img class="svg" alt="" src={'/img/svg/camera.svg'} />
						</span>
					</Label>
				</div>
				<div class="account-profile__title">
					<h6 class="fs-15 ms-20 fw-500 text-capitalize">profile photo</h6>
				</div>
			</div>
			<div class="edit-profile__body">
				<Form>
					<FormGroup class="mb-25 form-group">
						<Label for="name1">name</Label>
						<Input type="text" class="form-control" id="name1" placeholder="Duran Clayton" />
					</FormGroup>
					<FormGroup class="mb-25 form-group">
						<Label for="name2">Email</Label>
						<Input type="email" class="form-control" id="name2" placeholder="sample@email.com" />
					</FormGroup>
					<FormGroup class="mb-25 form-group">
						<Label for="phoneNumber5">phone number</Label>
						<Input type="tel" class="form-control" id="phoneNumber5" placeholder="+440 2546 5236" />
					</FormGroup>
					<FormGroup class="mb-25 form-group">
						<div class="countryOption">
							<Label for="countryOption">country</Label>
							<select class="form-select form-control" id="countryOption">
								<option value="JAN">event</option>
								<option value="FBR">Venues</option>
							</select>
						</div>
					</FormGroup>
					<FormGroup class="mb-25 form-group">
						<div class="cityOption">
							<Label for="cityOption">city</Label>
							<select class="form-select form-control" id="cityOption">
								<option value="JAN">event</option>
								<option value="FBR">Venues</option>
							</select>
						</div>
					</FormGroup>
					<FormGroup class="mb-25 form-group">
						<Label for="name3">company name</Label>
						<Input type="text" class="form-control" id="name3" placeholder="Example" />
					</FormGroup>
					<FormGroup class="mb-25 form-group">
						<Label for="phoneNumber2">website</Label>
						<Input
							type="email"
							class="form-control"
							id="phoneNumber2"
							placeholder="www.example.com"
						/>
					</FormGroup>
					<div
						class="button-group d-flex pt-sm-25 justify-content-md-end flex-wrap justify-content-start "
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

<style lang="scss">
	:global {
		@import '../../../../../assets/sass/components/users';
		@import '../../../../../assets/sass/components/profile';
		@import '../../../../../assets/sass/components/style.scss';
	}
</style>
