<script>
	import { Card, CardBody, Button } from 'sveltestrap';
	import CardExtra from '@components/cards/CardExtra.svelte';

	import postContent from '@data/socialPost.json';
</script>

<div class="ap-main-post">
	{#each postContent as content}
		<Card class="mb-25">
			<CardBody class="pb-0 px-sm-25 ap-main-post__header">
				<div
					class="d-flex flex-row pb-20 border-top-0 border-left-0 border-right-0 ap-post-content__title align-items-center "
				>
					<div class="d-inline-block align-middle me-15">
						<span
							class="profile-image bg-opacity-secondary rounded-circle d-block avatar avatar-md m-0"
							style="background-image:url('/img/author/{content.author}'); background-size: cover;"
						/>
					</div>
					<h6 class="mb-0 flex-1 text-dark">
						{content.from}
						<small class="m-0 d-block"> {content.time} </small>
					</h6>

					<CardExtra />
				</div>
				{#if content.img.length < 2 && content.img.length !== 0}
					<div class="mb-15">
						{#each content.img as image}
							<img src="/img/{image}" alt="postImage" class="ap-post-attach__headImg w-100" />
						{/each}
					</div>
				{:else if content.img.length >= 2}
					<div class="mb-15 ap-post-gallery">
						{#each content.img as image, i}
							{#if i !== content.img.length - 1}
								<div class="ap-post-gallery__item">
									<a href={'#'}><img src="/img/{image}" alt="gallery" class="w-100 img-fluid" /></a>
								</div>
							{:else if i === content.img.length - 1}
								<div class="ap-post-gallery__item">
									<a href={'#'}>
										<img src="/img/{image}" alt="gallery" class="w-100 img-fluid" />
										<div class="ap-post-gallery-overlay__content">
											<span>26<span class="las la-plus" /></span>
										</div>
									</a>
								</div>
							{/if}
						{/each}
					</div>
				{/if}
				{#if content.text}
					<div class="pb-3 border-top-0 border-left-0 border-right-0 ap-post-content__p">
						{content.text}
					</div>
				{/if}
			</CardBody>

			<CardBody class="border-top border-bottom py-0 ap-main-post__reaction">
				<div class="d-flex align-items-center demo-h-spacing ap-post-content__feedback">
					<a href={'#'} class="d-inline-flex align-items-center">
						<img class="svg" alt="" src={'/img/svg/thumbs-up.svg'} />
						{content.like}
					</a>
					<a href={'#'} class="d-inline-flex align-items-center">
						<img class="svg" alt="" src={'/img/svg/message-square.svg'} />
						{content.comment.length}
					</a>
					<a href={'#'} class="d-inline-flex align-items-center">
						<img class="svg" alt="" src={'/img/svg/share-2.svg'} />
						Share
					</a>
				</div>
			</CardBody>

			<CardBody class="px-sm-25 py-20 ap-main-post__footer">
				<div class="ap-post-content-comment">
					<div
						class="pt-0 outline-0 pb-0 pe-0 ps-0 rounded-0 position-relative d-flex align-items-center"
						tabindex="-1"
					>
						<span
							class="rounded-circle d-block position-absolute wh-36"
							style="background-image:url('/img/ap-author.png'); background-size: cover;"
						/>
						<div class="d-flex justify-content-between align-items-center w-100">
							<div class=" flex-1 d-flex align-items-center me-10 ap-post-content-comment__write">
								<input
									class="form-control border-0 p-0 bg-transparent pe-sm-0 pe-20"
									placeholder="This is my comment..."
								/>
								<div class="d-flex">
									<a href={'#'}><img class="svg" alt="" src={'/img/svg/smile.svg'} /></a>
									<a href={'#'}><img class="svg" alt="" src={'/img/svg/image.svg'} /></a>
									<a href={'#'}><img class="svg" alt="" src={'/img/svg/paperclip.svg'} /></a>
								</div>
							</div>
							<Button color="primary" class="border-0 btn-primary wh-50 p-10 rounded-circle">
								<img class="svg" alt="" src={'/img/svg/send.svg'} />
							</Button>
						</div>
					</div>
				</div>
			</CardBody>
			{#if content.comment.length > 0}
				<CardBody class="pt-20 ap-main-post__comment">
					{#each content.comment as comment}
						<div class="ap-post-cc-reply d-flex flex-column align-items-center">
							<div class="d-flex flex-row w-100">
								<div class="d-inline-block align-middle status status-sm status-success">
									<span
										class=" profile-image bg-opacity-secondary profile-image-md rounded-circle d-block ms-0 wh-36 me-10"
										style="background-image:url('/img/author/{comment.author}'); background-size: cover;"
									/>
								</div>
								<div class="mb-0 flex-1 text-dark">
									<div class="cbg-light radius-xl py-10 px-10">
										<div class="d-flex ap-post-content__title">
											<a href={'#'} class="fw-500">
												<h6>{comment.from}</h6>
											</a>
										</div>
										<p class="mb-0 mt-10 text-gray">
											{comment.text}
										</p>
									</div>
									<ul class="mb-0 d-flex ap-post-cc-reply__reaction">
										<li class={'#'}>
											<a href={'#'}>Like</a>
										</li>
										<li class={'#'}>
											<a href={'#'}> reply </a>
										</li>
										<li class={'#'}>
											<span>5 months ago</span>
										</li>
									</ul>
									{#if comment.reply}
										{#each comment.reply as reply}
											<div class="ap-post-cc-reply__reply ps-0 d-flex flex-row w-100 pb-0">
												<div class="d-inline-block align-middle status status-sm status-success">
													<span
														class=" profile-image bg-opacity-secondary profile-image-md rounded-circle d-block ms-0 wh-36 me-10"
														style="background-image:url('/img/author/{reply.author}'); background-size: cover;"
													/>
												</div>
												<div class="mb-0 flex-1 text-dark">
													<div class="cbg-light radius-xl py-10 px-10">
														<div class="d-flex ap-post-content__title">
															<a href={'#'} class="fw-500">
																<h6>{reply.from}</h6>
															</a>
														</div>
														<p class="mb-0 mt-10 text-gray">
															{reply.text}
														</p>
													</div>
													<ul class="mb-0 d-flex ap-post-cc-reply__reaction">
														<li class={'#'}>
															<a href={'#'}>Like</a>
														</li>
														<li class={'#'}>
															<a href={'#'} class="color-primary"> reply </a>
														</li>
														<li class={'#'}>
															<span>5 months ago</span>
														</li>
													</ul>
												</div>
											</div>
										{/each}
									{/if}
								</div>
							</div>
						</div>
					{/each}
					<div class="ap-post-cc-reply mt-20">
						<div
							class="pt-0 outline-0 pb-0 pe-0 ps-0 rounded-0 position-relative d-flex align-items-center"
							tabindex="-1"
						>
							<div class="d-flex justify-content-between align-items-center w-100">
								<div class=" flex-1 d-flex align-items-center me-10 ap-post-content-comment__write">
									<input
										class="form-control border-0 p-0 bg-transparent pe-sm-0 pe-20"
										placeholder="This is my comment..."
									/>
									<div class="d-flex">
										<a href={'#'}><img class="svg" alt="" src={'/img/svg/smile.svg'} /></a>
										<a href={'#'}><img class="svg" alt="" src={'/img/svg/image.svg'} /></a>
										<a href={'#'}><img class="svg" alt="" src={'/img/svg/paperclip.svg'} /></a>
									</div>
								</div>
								<Button color="primary" class="border-0 btn-primary wh-50 p-10 rounded-circle">
									<img class="svg" alt="" src={'/img/svg/send.svg'} />
								</Button>
							</div>
						</div>
					</div>
					<a class="view-more-comment color-primary fs-13 fw-500" href={'#'}
						>View 53 more comments</a
					>
				</CardBody>
			{/if}
		</Card>
	{/each}
</div>
