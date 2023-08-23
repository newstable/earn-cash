<script>
	import { Card, CardHeader, CardBody, Row, Col, Form, Input, Label, Button } from 'sveltestrap';

	const notifications = [
		{
			name: 'Company News',
			label: 'Get company news, announcements, and product updates',
			enabled: false
		},
		{
			name: 'Meetups near you',
			label: 'Get company news, announcements, and product updates',
			enabled: true
		},
		{
			name: 'Opportunities',
			label: 'Get company news, announcements, and product updates',
			enabled: false
		},
		{
			name: 'Weekly Newsletters',
			label: 'Get company news, announcements, and product updates',
			enabled: false
		}
	];

	const activities = [
		{
			name: 'Anyone seeing my profile page',
			enabled: false
		},
		{
			name: 'Anyone follow me',
			enabled: true
		},
		{
			name: 'Someone mentioned me',
			enabled: false
		},
		{
			name: 'Someone accepts my invitation',
			enabled: true
		},
		{
			name: 'Anyone send me a message',
			enabled: false
		}
	];
</script>

<div class="edit-profile edit-social mt-25">
	<Card>
		<CardHeader class="px-sm-25 px-3">
			<div class="edit-profile__title">
				<h6>Notifications</h6>
				<span class="fs-13 color-light fw-400">Add elsewhere links to your profile</span>
			</div>
		</CardHeader>
		<CardBody>
			<div class="notification-content p-25 mb-25">
				<div
					class="notification-content__title d-flex justify-content-between flex-wrap pb-20 text-capitalize"
				>
					<h6 class="fs-15 text-light fw-500 lh-normal">Notifications</h6>
					<a class="color-primary fs-13" href={'#'}>toggle all</a>
				</div>
				<div class="global-shadow radius-xl notification-content__body-wrapper">
					{#each notifications as item}
						<div class="notification-content__body p-25 border-bottom">
							<div class="d-flex justify-content-between flex-wrap align-items-center">
								<div class="div">
									<h6>{item.name}</h6>
									<span>{item.label}</span>
								</div>
								<div class="my-lg-0 my-10">
									<Input
										type="switch"
										class="form-check-input border-0"
										id="nc1"
										checked={item.enabled ? true : false}
									/>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="notification-content p-25 mb-25">
				<div
					class="notification-content__title d-flex justify-content-between flex-wrap pb-20 text-capitalize"
				>
					<h6 class="fs-15 text-light fw-500 lh-normal">Account Activity</h6>
					<a class="color-primary fs-13" href={'#'}>toggle all</a>
				</div>
				<div class="global-shadow radius-xl notification-content__body-wrapper">
					{#each activities as item}
						<div class="notification-content__body p-25 border-bottom">
							<div class="d-flex justify-content-between flex-wrap align-items-center">
								<div class="div">
									<h6>{item.name}</h6>
								</div>
								<div class="my-lg-0 my-10">
									<Input
										type="switch"
										class="form-check-input border-0"
										id="nc5"
										checked={item.enabled ? true : false}
									/>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="button-group d-flex flex-wrap pt-25 mb-25">
				<Button color="primary" size="default" class="btn-squared fs-15  me-15 text-capitalize"
					>Update notification Profiles
				</Button>

				<Button color="light" size="default" class="btn-squared fs-15 fw-400 text-capitalize btn-transparent-light"
					>cancel
				</Button>
			</div>
		</CardBody>
	</Card>
</div>
