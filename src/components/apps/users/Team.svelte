<script>
	import { Row, Card, CardBody } from 'sveltestrap';
	import CardExtra from '@components/cards/CardExtra.svelte';
	import teamData from '@data/teamData.json';
	const socialIcons = [
		{
			icon: 'facebook-f',
			color: 'facebook'
		},
		{
			icon: 'twitter',
			color: 'twitter'
		},
		{
			icon: 'dribbble',
			color: 'ruby'
		},
		{
			icon: 'instagram',
			color: 'instagram'
		}
	];
</script>

<Row class="mb-20">
	{#each teamData as item}
		<div class="cos-xl-2 mb-30 col-sm-6">
			<Card class="position-relative user-member-card">
				<CardBody class="text-center p-30">
					<div class="account-profile">
						<div class="ap-img d-flex justify-content-center">
							<img
								class="ap-img__main rounded-circle mb-20 bg-opacity-primary wh-150"
								src="/img/{item.img}"
								alt="profile"
							/>
						</div>
						<div class="ap-nameAddress pb-3">
							<h6 class="ap-nameAddress__title">{item.name}</h6>
							<p class="ap-nameAddress__subTitle fs-13 pt-1 m-0">{item.designation}</p>
						</div>
						<ul class="db-social-parent mb-0 justify-content-center">
							{#each socialIcons as icon}
								<li class="db-social-parent__item">
									<a
										class="color-{icon.color} hover-{icon.color} wh-38 fs-16 rounded-circle"
										href={'#'}><i class="uil uil-{icon.icon}" /></a
									>
								</li>
							{/each}
						</ul>
					</div>
					<div class="tm-card-overlay position-absolute">
						<CardExtra />
					</div>
				</CardBody>
			</Card>
		</div>
	{/each}
</Row>
