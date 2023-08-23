<script>
	import { Card, CardBody } from 'sveltestrap';
</script>

<Card class="banner-feature banner-feature--7 border-0 mb-0">
	<div class="d-flex justify-content-center">
		<CardBody class="p-0">
			<div class="div p-25">
				<h4 class="banner-feature__heading">Subscribe to our newsletter</h4>
				<p class="banner-feature__para ">We notify you once any post is published</p>
				<button type="button" class="btn btn-primary mt-15 btn-md">Subscribe</button>
			</div>
			<div class="banner-feature__shape">
				<img src="/img/new-message.png" alt="img" class="svg" />
			</div>
		</CardBody>
	</div>
</Card>

<style lang="scss">
	@import '../../../assets/sass/mixins/media-queries';
	:global {
		.demo4 {
			.banner-feature--7 {
				min-height: 161px;
			}
		}
		.banner-feature--7 {
			margin-bottom: 0;
			justify-content: center;
			@include md {
				min-height: 160px;
				max-height: 100%;
			}

			.card-body {
				padding: 40px 30px 40px 0;
				display: flex;
				justify-content: space-between;
				.banner-feature__shape{
					padding-right: 10px;
				}
			}

			.banner-feature__para {
				margin: 9px 0 0 0;
				color: var(--color-gray);
				font-size: 15px;
			}
			button{
				height: 38px;
				border-radius: 4px;
				font-size: 14px;
				font-weight: 500;
			}
		}
	}
</style>
