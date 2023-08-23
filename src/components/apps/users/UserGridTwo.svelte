<script>
	import { Col, Card, Button } from 'sveltestrap';

	import teamData from '@data/teamData.json';
	import CardExtra from '@components/cards/CardExtra.svelte';
</script>

{#each teamData as item}
	<Col xxl={3} lg={4} md={6} class="cos-xl-2 mb-30">
		<Card class="profile-card-3">
			<div class="background-block">
				<img
					src="/img/{item.coverImg}"
					alt="profile-sample1"
					class="background bg-opacity-success"
				/>
			</div>
			<div class="card-content mt-n25">
				<div class="card-content__body mt-n40 pt-0">
					<div class="profile-thumb-block position-relative d-flex justify-content-center">
						<img src="/img/{item.img}" alt="profileimage" class="profile wh-120 " />
						<div class="card-dropdown">
							<CardExtra />
						</div>
					</div>
					<div class="ap-nameAddress pb-3 pt-10">
						<h6 class="ap-nameAddress__title">{item.name}</h6>
						<p class="ap-nameAddress__subTitle fs-14 pt-1 m-0">{item.designation}</p>
					</div>
					<div
						class="ap-button account-profile-cards__button button-group d-flex justify-content-center flex-wrap m-n1"
					>
						<Button
							color="light"
							outline
							class="border text-capitalize px-20 color-gray transparent"
						>
							<img class="svg" alt="" src={'/img/svg/message-square.svg'} /> chat</Button
						>
						<Button
							color="light"
							outline
							class="border text-capitalize px-20 color-gray transparent follow"
						>
							view profile</Button
						>
					</div>
				</div>
			</div>
		</Card>
	</Col>
{/each}
