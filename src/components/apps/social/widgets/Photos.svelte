<script>
	import { Card, CardHeader, CardBody } from 'sveltestrap';

	const images = ['315.png', '325.png', 'design.png', '99.png', '166.png'];
</script>

<Card class="global-shadow mb-25">
	<div class="photo-gallery-widget">
		<CardHeader class="justify-content-between d-flex flex-wrap px-md-25 px-3">
			<h6>photos</h6>
			<a class="color-primary fs-13 fw-500 mt-lg-0 mt-1" href={'#'}>see all</a>
		</CardHeader>
		<CardBody>
			<div class="wig">
				{#each images as image}
					<div class="wig__item">
						<img src="/img/{image}" alt="gallery" />
					</div>
				{/each}
			</div>
		</CardBody>
	</div>
</Card>
