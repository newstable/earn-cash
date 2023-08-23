<script>
	import { Card, CardBody } from 'sveltestrap';
</script>

<Card class="banner-feature banner-feature--5 mb-0 h-100">
	<div class="banner-feature__shape">
		<img src="/img/glass-trophy.png" alt="img" class="svg" />
	</div>
	<div class="d-flex justify-content-center">
		<CardBody>
			<h1 class="banner-feature__heading fw-700 color-white">Congratulations Danial!</h1>
			<p class="banner-feature__para">Best Seller on the last month.</p>
			<button class="banner-feature__btn btn btn-lg px-20 radius-xs fs-15" type="button"
				>Learn More</button
			>
		</CardBody>
	</div>
</Card>

<style lang="scss">
	:global {
		@import '../../../assets/sass/components/banner';
		.banner-feature--5 {
			border-radius: 10px;
			background-color: var(--bg-dark) !important;

			.banner-feature__shape {
				position: absolute;
				bottom: 0;
				right: 0;
				z-index: -1;
				width: 245px;
				height: 245px;
			}

			.card-body {
				padding: 55px 30px 55px 30px;
			}

			.banner-feature__para {
				margin: 14px 0 22px 0;
				color: rgba(var(--color-white-rgba), 0.9);
			}

			.banner-feature__btn {
				background-color: var(--color-gray);
				color: #fff;
				height: 44px;
				border-radius: 6px;
				font-size: 15px;
				font-weight: 500;
				&.color-primary {
					color: var(--color-primary) !important;
				}
				&:hover {
					background-color: var(--bg-dark-hover);
				}
			}
		}
	}
</style>
