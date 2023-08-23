<script>
	import { Row, Col, Form, FormGroup, Input, Label, Button } from 'sveltestrap';
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

<Row class="justify-content-center">
	<Col xxl={4}>
		<div class="user-social-profile mt-40 mb-50 px-xxl-0 px-30">
			<div class="user-tab-info-title mb-40 text-capitalize">
				<h5>social profiles</h5>
			</div>
			<div class="edit-profile__body">
				<Form>
					{#each socialProfiles as profile, i}
						<div class="mb-30">
							<Label for="socialUrl">{profile.name}</Label>
							<div class="input-group flex-nowrap">
								<div class="input-group-prepend">
									<span
										class="input-group-text bg-{profile.color} border-{profile.color} text-white wh-44 radius-xs justify-content-center"
										id="addon-wrapping1"
									>
										<i class="uil uil-{profile.icon} fs-18" />
									</span>
								</div>
								<Input
									type="text"
									class="form-control form-control--social"
									placeholder={profile.placeholder}
									aria-label={profile.placeholder}
									aria-describedby="addon-wrapping-{i}"
									id="socialUrl-{i}"
								/>
							</div>
						</div>
					{/each}
					<div class="button-group d-flex pt-20 justify-content-md-end justify-content-start flex-wrap">
						<Button
							color="light"
							size="default"
							class="btn-squared fw-400 text-capitalize radius-md"
							>back
						</Button>

						<Button
							color="primary"
							size="default"
							class="btn-squared text-capitalize radius-md shadow2"
							>Save profile
						</Button>
					</div>
				</Form>
			</div>
		</div>
	</Col>
</Row>
