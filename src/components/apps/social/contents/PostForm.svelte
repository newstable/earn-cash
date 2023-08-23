<script>
	import { onMount } from 'svelte';
	import { Card, CardHeader, CardBody, Button } from 'sveltestrap';

	function postFormActive() {
		this.closest('.ap-post-form').classList.add('active');
		document.body.classList.add('post-form-active');
	}
	onMount(() => {
		document.body.addEventListener('click', function (e) {
			let targetElm = document.querySelector('.ap-post-form textarea');
			if (e.target !== targetElm) {
				this.classList.remove('post-form-active');
			}
		});
	});
</script>

<div class="ap-post-form">
	<Card class="border-0 mb-25">
		<CardHeader class="px-md-25 px-3">
			<h6>Post something</h6>
		</CardHeader>
		<CardBody class="p-0 px-25">
			<div class="d-flex flex-column">
				<div class="border-0 flex-1 position-relative">
					<div class="pt-20 outline-0 pb-2 pe-0 ps-0 rounded-0 position-relative border-bottom">
						<span
							class="ap-profile-image bg-opacity-secondary rounded-circle d-block position-absolute"
							style="background-image:url('/img/ap-author.png'); background-size: cover;"
						/>
						<div class="ps-15 ms-50 pt-10">
							<textarea
								class="form-control border-0 p-0 fs-xl bg-transparent"
								rows="3"
								placeholder="Write something..."
								on:click={postFormActive}
							/>
						</div>
					</div>
				</div>
				<div class="ap-post-attach d-flex flex-row align-items-center flex-wrap flex-shrink-0">
					<a href={'#'} class="btn rounded-pill me-2">
						<img class="svg" alt="" src={'/img/svg/image.svg'} /> Photo/Video
					</a>
					<a href={'#'} class="btn rounded-pill ap-post-attach__drop">
						<img class="svg" alt="" src={'/img/svg/more-horizontal.svg'} />
					</a>

					<Button color="primary" size="default" class="btn-squared ms-auto ap-post-attach__btn"
						>post <i class="uil uil-message" />
					</Button>
				</div>
			</div>
		</CardBody>
	</Card>
</div>

<style lang="scss">
	:global {
		.post-form-active {
			&::before {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				background: rgba(0, 0, 0, 0.5);
				z-index: 9999;
				transition: 0.3s ease;
			}
		}
		.ap-post-form.active {
			position: relative;
			z-index: 99999;
		}
	}
</style>
