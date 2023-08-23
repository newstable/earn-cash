<script>
	import { Card, CardBody, CardHeader } from 'sveltestrap';
	import { Svroller } from 'svrollbar';
	import CardExtra from '@components/cards/CardExtra.svelte';

	import moment from 'moment';

	const author = 'author@mail.com';
	export let singleContent;
	export let userNames;
	export let singleComponent = false;
	export let groupChat = false;
</script>

<Card class="border-0">
	{#if !singleComponent}
		<div class="chat-header">
			<div class="media chat-name align-items-center">
				<div class="media-body align-self-center ">
					<h5 class=" mb-0 fw-500 mb-2">
						{userNames || item.userName}
					</h5>
					{#if !groupChat}
						<div class="media-body__content d-flex align-items-center">
							<span class="badge-dot dot-success me-1" />
							<small class="d-flex color-light fs-12 text-capitalize"> active now </small>
						</div>
					{/if}
				</div>
			</div>
			{#if groupChat}
				<div class="image-group">
					<ul class="d-flex">
						<li>
							<img src="/img/author/1.jpg" alt="img" class="wh-30 rounded-circle" />
						</li>
						<li>
							<img src="/img/author/2.jpg" alt="img" class="wh-30 rounded-circle" />
						</li>
						<li>
							<img src="/img/author/3.jpg" alt="img" class="wh-30 rounded-circle" />
						</li>
						<li>
							<img src="/img/author/4.jpg" alt="img" class="wh-30 rounded-circle" />
						</li>
						<li>
							<img src="/img/author/1.jpg" alt="img" class="wh-30 rounded-circle" />
						</li>
						<li>
							<a
								href={'#'}
								class="bg-primary rounded-circle wh-30 color-white content-center fs-10 fw-500"
								>20+</a
							>
						</li>
						<li>
							<a href={'#'} class="border rounded-circle wh-30 color-extra-light content-center">
								<img class="svg" alt="" src={'/img/svg/plus.svg'} />
							</a>
						</li>
					</ul>
				</div>
			{/if}
			<CardExtra />
		</div>
	{:else}
		<CardHeader class="border-0">
			<h6>Chat</h6>
			<CardExtra />
		</CardHeader>
	{/if}
	<CardBody class="p-0">
		<div class="chat mini-chat">
			<div class="chat-body bg-white radius-xl">
				<Svroller width="100%" height="100%" initiallyVisible={true}>
					<div class="chat-box chat-box--big">
						{#each singleContent as item, i}
							<div
								class="flex-1 mb-15 {author !== item.email
									? 'incoming-chat'
									: 'justify-content-end d-flex outgoing-chat'}"
							>
								<div class="chat-text-box">
									<div class="media">
										{#if author !== item.email}
											<div class="chat-text-box__photo ">
												<img src="/img/{item.img}" class="align-self-start me-15 wh-46" alt="img" />
											</div>
										{/if}
										<div class="media-body">
											<div class="chat-text-box__content">
												<div
													class="chat-text-box__title d-flex align-items-center {author ===
													item.email
														? 'justify-content-end'
														: ''}"
												>
													{#if author !== item.email}
														<h6 class="fs-14 fw-500">
															{typeof item.userName === 'undefined' ? userNames : item.userName}
														</h6>
													{/if}
													<span
														class="chat-text-box__time fs-12 color-light fw-400 {author !==
														item.email
															? 'ms-sm-25 '
															: ''}"
													>
														{moment(item.time).format('MM-DD-YYYY') ===
														moment().format('MM-DD-YYYY')
															? moment(i).format('hh:mm A')
															: moment(i).format('LL')}
													</span>
												</div>
												<div
													class="d-flex align-items-center {author !== item.email
														? 'mt-10'
														: 'justify-content-end'}"
												>
													<div
														class="chat-text-box__subtitle p-20 {author !== item.email
															? 'bg-secondary'
															: 'bg-deep'}"
													>
														<p class={author !== item.email ? 'color-white' : 'color-dark'}>
															{item.content}
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</Svroller>
				<div class="chat-footer">
					<div class="chat-type-text">
						<div
							class="pt-0 outline-0 pb-0 pe-0 ps-0 rounded-0 position-relative d-flex align-items-center"
							tabindex="-1"
						>
							<div class="d-flex justify-content-between align-items-center w-100 flex-wrap">
								<div
									class="bg-lighters flex-1 d-flex align-items-center chat-type-text__write ms-0"
								>
									<a href={'#'}>
										<img class="svg" src="/img/svg/smile.svg" alt="smile" />
									</a>
									<input
										class="form-control border-0 bg-transparent box-shadow-none"
										placeholder="Type your message..."
									/>
								</div>
								<div class="chat-type-text__btn">
									{#if !singleComponent}
										<button
											type="button"
											class="border-0 btn-deep color-light wh-50 p-10 rounded-circle"
										>
											<img class="svg" alt="" src={'/img/svg/image.svg'} />
										</button>

										<button
											type="button"
											class="border-0 btn-deep color-light wh-50 p-10 rounded-circle"
										>
											<img class="svg" alt="" src={'/img/svg/paperclip.svg'} />
										</button>
									{/if}
									<button
										type="button"
										class="border-0 bg-secondary wh-50 p-10 rounded-circle color-svgDF-white"
									>
										<img class="svg" alt="" src={'/img/svg/send.svg'} />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</CardBody>
</Card>

<style lang="scss">
	:global {
		@import '../../../../assets/sass/components/chat';
	}
</style>
