<script>
	import { Card, CardBody } from 'sveltestrap';
</script>

<Card class="banner-feature banner-feature--20 border-0 mb-0">
	<div class="d-flex justify-content-center">
		<CardBody class="py-sm-45 py-30 px-30">
			<div class="banner-feature__shape me-20">
				<img class="svg" alt="" src={'/img/svg/subscribe-message.svg'} />
			</div>
			<div>
				<h2 class="banner-feature__heading">Subscribe To Our Newsletter</h2>
				<p class="banner-feature__para ">Lorem ipsum dolor sit amet, consetetur</p>
			</div>
		</CardBody>
	</div>
</Card>

<style lang="scss">
	@import '../../../assets/sass/mixins/media-queries';
	:global {
		.banner-feature--20 {
			margin-bottom: 0;
			justify-content: center;
			@include md {
				min-height: 160px;
				max-height: 100%;
			}

			.card-body {
				padding: 40px 30px 40px 0;
				display: flex;
				align-items: center;
			}

			.banner-feature__para {
				margin: 5px 0 0 0;
				color: var(--color-gray);
				font-size: 16px;
			}
			button {
				height: 38px;
				border-radius: 4px;
				font-size: 14px;
				font-weight: 500;
			}
		}
	}
</style>
