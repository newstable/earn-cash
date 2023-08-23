<script>
	import { Card, CardHeader, CardBody, Button } from 'sveltestrap';

	const users = [
		{
			img: 'tm1.png',
			name: 'Jhon Meyer',
			role: 'App Developer'
		},
		{
			img: 'tm2.png',
			name: 'Trent Bolt',
			role: 'Software Engineer'
		},
		{
			img: 'tm3.png',
			name: 'Neil Nam',
			role: 'UI/UX Developer'
		},
		{
			img: 'tm4.png',
			name: 'Orlando Floom',
			role: 'Forntend Engineer'
		},
		{
			img: 'tm5.png',
			name: 'Erik Herz',
			role: 'Project Manager'
		}
	];
</script>

<Card class="h-100">
	<CardHeader class="d-flex justify-content-between align-items-center py-10 px-sm-25 px-3">
		<h6 class="fw-500 ">users</h6>
		<Button
			color="transparent"
			class="border radius-lg color-primary fw-500 fs-12 bg-transparent acButton"
		>
			<img class="svg" alt="" src={'/img/svg/user-plus.svg'} /> add user</Button
		>
	</CardHeader>
	<CardBody>
		{#each users as user}
			<div class="d-flex align-items-center mb-25">
				<img src="/img/{user.img}" class="wh-46 me-15" alt="img" />
				<div>
					<p class="fs-14 fw-600 color-dark mb-0">{user.name}</p>
					<span class="mt-1 fs-14 color-light">{user.role}</span>
				</div>
			</div>
		{/each}
	</CardBody>
</Card>
