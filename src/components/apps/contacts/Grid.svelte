<script>
	import { Col, Card, CardBody, CardFooter } from 'sveltestrap';
	import CardExtra from '@components/cards/CardExtra.svelte';
	import contactData from '@data/contacts.json';
</script>

{#each contactData as contact}
	<Col xxl={3} lg={4} md={6} class="mb-25">
		<Card class="contact-card">
			<CardBody class="text-center pt-30 px-25 pb-0">
				<div class="card__more-action">
					<CardExtra />
				</div>
				<div class="contact-profile-card text-center">
					<div class="cp-img d-flex justify-content-center">
						<img class="cp-img__main" src="/img/{contact.img}" alt="ninjadash Contact" />
					</div>
					<div class="cp-info">
						<h6 class="cp-info__title">{contact.name}</h6>
						<span class="cp-info__designation">{contact.designation}</span>
					</div>
				</div>

				<CardFooter class="mt-20 pt-20 pb-20 px-0 bg-transparent">
					<ul class="c-info-list">
						<li class="c-info-list__item d-flex">
							<div class="c-info-item-icon">
								<img class="svg" alt="" src={'/img/svg/phone.svg'} />
							</div>
							<p class="c-info-item-text">{contact.phone}</p>
						</li>

						<li class="c-info-list__item d-flex">
							<div class="c-info-item-icon">
								<img class="svg" alt="" src={'/img/svg/mail.svg'} />
							</div>
							<p class="c-info-item-text">{contact.email}</p>
						</li>

						<li class="c-info-list__item d-flex">
							<div class="c-info-item-icon">
								<img class="svg" alt="" src={'/img/svg/map-pin.svg'} />
							</div>
							<p class="c-info-item-text">{contact.country}</p>
						</li>
					</ul>
				</CardFooter>
			</CardBody>
		</Card>
	</Col>
{/each}

<style lang="scss">
	:global {
		@import '../../../../../src/assets/sass/mixins/media-queries';
		@import '../../../../../src/assets/sass/mixins/rfs';
		@import '../../../../../src/assets/sass/mixins/functions';
		@import '../../../../../src/assets/sass/mixins/helpers';
		@import '../../../../../src/assets/sass/components/contact';
		@import '../../../../../src/assets/sass/components/breadcrumb';
		@import '../../../../../src/assets/sass/components/modal';
	}
</style>
