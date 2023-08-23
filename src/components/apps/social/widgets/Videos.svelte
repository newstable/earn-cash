<script>
	import { Card, CardHeader, CardBody } from 'sveltestrap';

	import BiggerPicture from 'bigger-picture/svelte';
	import 'bigger-picture/css';
	import { onMount } from 'svelte';

	const videos = [
		{
			thumb: 'juice-2.png'
		},
		{
			thumb: 'cup-card.png'
		},
		{
			thumb: 'round-box.png'
		},
		{
			thumb: 'glass.png'
		},
		{
			thumb: 'bottles.png'
		},
		{
			thumb: '325.png'
		}
	];

	onMount(() => {
		let bp = BiggerPicture({
			target: document.body
		});

		let links = document.querySelectorAll('a.popup-youtube');
		for (let link of links) {
			link.addEventListener('click', openBiggerPicture);
		}

		function openBiggerPicture(e) {
			e.preventDefault();
			bp.open({
				items: e.currentTarget,
				el: e.currentTarget
			});
		}
	});
</script>

<Card class="global-shadow mb-25">
	<div class="video-gallery-widget">
		<CardHeader class="justify-content-between d-flex flex-wrap px-md-25 px-3">
			<h6>videos</h6>
			<a class="color-primary fs-13 fw-500 mt-lg-0 mt-1" href={'#'}>see all</a>
		</CardHeader>
		<CardBody>
			<div class="wig">
				{#each videos as video}
					<div class="wig__item wig-overlay">
						<img src="/img/{video.thumb}" alt="gallery" />
						<div class="wig-overlay__content">
							<a
								class="wig-overlay__iconWrapper popup-youtube"
								href="https://www.youtube.com/embed/6gYk-3MEY1g"
								data-thumb="/img/{video.thumb}"
								data-iframe="https://www.youtube.com/embed/6gYk-3MEY1g?autoplay=1&playsinline=1"
							>
								<img class="svg" alt="" src={'/img/svg/play.svg'} />
							</a>
						</div>
					</div>
				{/each}
			</div>
		</CardBody>
	</div>
</Card>
