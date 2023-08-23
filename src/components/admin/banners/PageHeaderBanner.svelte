<script>
	import { Card, CardBody } from 'sveltestrap';
	export let cardClass;
	export let imgPath;
	export let title;
</script>

<Card class="banner-page-header d-flex border-0 {cardClass}">
	<CardBody class="p-0">
		<div class="banner-feature__content">
			<h1 class="banner-feature__heading">{title}</h1>
			<p class="banner-feature__para">
				There are many variations of passages of Lorem Ipsum available, <br /> ut the majority have suffered
				passages of Lorem Ipsum available alteration in some form
			</p>
			<div class="d-flex justify-content-sm-start justify-content-center">
				<button
					class="banner-feature__btn btn btn-primary color-white btn-md px-20 radius-xs fs-15"
					type="button">Learn More</button
				>
			</div>
		</div>

		<div class="banner-feature__shape">
			<img src="{imgPath}" alt="img" />
		</div>
	</CardBody>
</Card>

<style lang="scss">
	:global {
		@import '../../../assets/sass/components/banner';
		.banner-page-header {
			justify-content: center;
			border-radius: 10px;
			&.bg-dark-area{
				padding: 40px;
				background-color: #090e30;
				.banner-feature__heading{
					color:var(--color-white);
				}
				.banner-feature__para{
					color: var(--color-white);
				}
				.banner-feature__content{
					padding: 0 10px;
				}
				.card-body{
					align-items: center;
					.banner-feature__shape{
						@include sm{
							margin-top: 30px;
						}
					}
					>div{
						flex: none;
						@include sm{
							flex:100%;
						}
					}
				}
			}

			.card-body {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				align-items: end;
				padding: 15px 50px;
				@include xs{
					flex-direction: column;
				}
			}
			.banner-feature__content {
				flex: 2;
				padding: 40px 40px 40px;
			}
			.banner-feature__shape {
				@include MinSm{
					flex: 17%;
				}
				flex: 1;
				img {
					height: 215px;
					max-height: 215px;
					object-fit: cover;
					@include cms2(1368px){
						object-fit: contain;
					}

					@include xs {
						object-fit: contain;
					}
				}
			}

			.banner-feature__btn {
				min-height: 50px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 15px;
				font-weight: 600;

				@include ssm {
					min-height: 40px;
				}
			}

			.card-body {
				@include ssm {
					text-align: center;
				}
			}
		}
	}
</style>
