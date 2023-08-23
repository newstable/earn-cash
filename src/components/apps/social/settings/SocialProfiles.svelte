<script>
	import { Card, CardHeader, CardBody, Row, Col, Form, Input, Label, Button } from 'sveltestrap';

	const socialProfiles = [
		{
			name: 'Facebook',
			icon: 'facebook-f',
			color: 'facebook',
			placeholder: 'URL'
		},
		{
			name: 'Twitter',
			icon: 'twitter',
			color: 'twitter',
			placeholder: '@Username'
		},
		{
			name: 'Instagram',
			icon: 'instagram',
			color: 'instagram',
			placeholder: 'URL'
		},
		{
			name: 'Github',
			icon: 'github',
			color: 'dark',
			placeholder: 'Username'
		},
		{
			name: 'Medium',
			icon: 'medium-m',
			color: 'dark',
			placeholder: 'Username'
		},
		{
			name: 'Website',
			icon: 'globe',
			color: 'ruby',
			placeholder: 'URL'
		}
	];
</script>

<div class="edit-profile edit-social mt-25">
	<Card>
		<CardHeader class="px-sm-25 px-3">
			<div class="edit-profile__title">
				<h6>social profiles</h6>
				<span class="fs-13 color-light fw-400">Add elsewhere links to your profile</span>
			</div>
		</CardHeader>
		<CardBody>
			<Row class="justify-content-center">
				<Col xxl={6}>
					<div class="edit-profile__body mx-xl-20">
						<Form>
							{#each socialProfiles as item}
								<div class="mb-30">
									<Label for="socialUrl">{item.name}</Label>
									<div class="input-group flex-nowrap">
										<div class="input-group-prepend">
											<span
												class="input-group-text border-{item.color} bg-{item.color} text-white wh-44 radius-xs justify-content-center"
											>
												<i class="uil uil-{item.icon} fs-18" />
											</span>
										</div>
										<Input
											type="text"
											class="form-control form-control--social"
											placeholder={item.placeholder}
											aria-label={item.placeholder}
											aria-describedby="addon-wrapping1"
										/>
									</div>
								</div>
							{/each}
							<div class="button-group d-flex flex-wrap pt-md-50 mb-15">
								<Button color="primary" size="default" class="fs-15 btn-squared me-15 text-capitalize"
									>Update Social Profiles
								</Button>

								<Button color="light" size="default" class="fs-15 btn-squared fw-400 text-capitalize btn-transparent-light"
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
