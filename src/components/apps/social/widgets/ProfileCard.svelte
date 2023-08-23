<script>
	import { Card, CardBody, CardFooter, Button } from 'sveltestrap';

	const overview = [
		{
			total: '$72,573',
			label: 'Total Revenue'
		},
		{
			total: '3,257',
			label: 'Order'
		},
		{
			total: '74',
			label: 'Products'
		}
	];
</script>

<Card class="mb-25">
	<CardBody class="text-center pt-sm-30 pb-sm-0  px-25 pb-0">
		<div class="account-profile">
			<div class="ap-img w-100 d-flex justify-content-center">
				<img
					class="ap-img__main rounded-circle mb-3 wh-120 d-flex bg-opacity-primary"
					src="/img/author/profile.png"
					alt="profile"
				/>
			</div>
			<div class="ap-nameAddress pb-3 pt-1">
				<h5 class="ap-nameAddress__title">Duran Clayton</h5>
				<p class="ap-nameAddress__subTitle fs-14 m-0">UI/UX Designer</p>
				<p class="ap-nameAddress__subTitle fs-14 m-0">
					<img class="svg" alt="" src={'/img/svg/map-pin.svg'} /> London, England
				</p>
			</div>
			<div class="ap-button button-group d-flex justify-content-center flex-wrap">
				<Button
					color="transparent"
					class="border text-capitalize px-25 color-gray transparent radius-md"
				>
					<img class="svg" alt="" src={'/img/svg/mail.svg'} /> message</Button
				>

				<Button color="primary" size="default" class="btn-squared text-capitalize px-25"
					><img class="svg" alt="" src={'/img/svg/user-plus.svg'} /> follow
				</Button>
			</div>
		</div>

		<CardFooter class="mt-20 pt-20 pb-20 px-0 bg-transparent">
			<div class="profile-overview d-flex justify-content-between flex-wrap">
				{#each overview as data}
					<div class="po-details">
						<h6 class="po-details__title pb-1">{data.total}</h6>
						<span class="po-details__sTitle">{data.label}</span>
					</div>
				{/each}
			</div>
		</CardFooter>
	</CardBody>
</Card>
