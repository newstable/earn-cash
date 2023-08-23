<script>
	import { Col, Card, CardBody, CardFooter, Button } from 'sveltestrap';

	import teamData from '@data/teamData.json';
</script>

{#each teamData as item}
	<Col xxl={3} md={6} class="mb-25">
		<Card>
			<CardBody class="text-center pt-30 px-25 pb-0">
				<div class="account-profile-cards">
					<div class="ap-img d-flex justify-content-center">
						<img
							class="ap-img__main bg-opacity-primary wh-120 rounded-circle mb-3"
							src="/img/{item.img}"
							alt="profile"
						/>
					</div>
					<div class="ap-nameAddress">
						<h6 class="ap-nameAddress__title">{item.name}</h6>
						<p class="ap-nameAddress__subTitle fs-14 pt-1 m-0">{item.designation}</p>
					</div>
					<div
						class="ap-button account-profile-cards__button button-group d-flex justify-content-center flex-wrap pt-20"
					>
						<Button
							color="transparent"
							class="border text-capitalize px-25 color-gray transparent radius-md"
						>
							<img class="svg" alt="" src={'/img/svg/mail.svg'} />
							message</Button
						>
						<Button
							color="transparent"
							class="border text-capitalize px-25 color-gray transparent follow radius-md"
						>
							<span class="uil uil-user-plus follow-icon" />follow</Button
						>
					</div>
				</div>

				<CardFooter class="mt-20 pt-20 pb-20 px-0 bg-transparent">
					<div class="profile-overview d-flex justify-content-between flex-wrap">
						<div class="po-details">
							<h6 class="po-details__title">$72,572</h6>
							<span class="po-details__sTitle">Total Revenue</span>
						</div>
						<div class="po-details">
							<h6 class="po-details__title">3,257</h6>
							<span class="po-details__sTitle">order</span>
						</div>
						<div class="po-details">
							<h6 class="po-details__title">74</h6>
							<span class="po-details__sTitle">Products</span>
						</div>
					</div>
				</CardFooter>
			</CardBody>
		</Card>
	</Col>
{/each}
