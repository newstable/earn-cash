<script>
	import { Card, CardBody, Badge } from 'sveltestrap';
	import MailTop from './sharedComponents/MailTop.svelte';
	import MailBox from './MailBox.svelte';
	import { mailList } from '../../../store/mailStore';
	import { onMount } from 'svelte';

	onMount(() => {
		document.querySelector('.mailbar-toggle').addEventListener('click', () => {
			document.querySelector('.dm-mail-sidebar').classList.toggle('show');
		});
		document.querySelector('.mailbar-cross').addEventListener('click', () => {
			document.querySelector('.dm-mail-sidebar').classList.remove('show');
		});
		if (window.innerWidth <= 767) {
			document.querySelector('.dm-mail-sidebar').classList.remove('show');
		}
	});

	export let mailType;

	const inboxMail = $mailList.allMails.filter((signleMail) => signleMail.type === mailType);
</script>

<div class="mailbox-container">
	<div class="mailbar-toggle d-md-none">
		<span />
		<span />
		<span />
	</div>
	<div class="mailbox-list">
		<Card>
			<CardBody>
				<MailTop />
				<div class="mailbox-list__content">
					{#each inboxMail as { username, img, subject, attach, body, stared, unread }, i}
						<div
							class={unread
								? 'mailbox-list__single d-flex justify-content-between active'
								: 'mailbox-list__single d-flex justify-content-between'}
						>
							<div class="mail-authorBox d-flex">
								<div class="checkbox-theme-default custom-checkbox">
									<input class="checkbox" type="checkbox" id="mail-{i}" />
									<label for="mail-{i}" />
								</div>
								<a href={'#'} class="star-toggle"><i class="lar la-star" /></a>
								<span class="author-info">
									<img src="/img/chat-author/{img}" alt="Admin Dashboard Template" />
									<span class="author-name">{username}</span>
								</span>
							</div>
							<div class="mail-content">
								<div class="mail-content__top">
									<a href={'#'}>
										<h6 class="mail-title">
											{subject}
											<Badge class="badge-round" color="transpaarent">{mailType}</Badge>
										</h6>
										<p>
											{body}
										</p>
									</a>
								</div>

								{#if attach.length !== 0}
									<div class="mail-content__bottom">
										{#each attach as attachItem, i}
											<a href={'#'} class="mail-attatchment">
												<i class="las la-paperclip" />
												<span class="attatched-file">{attachItem}</span>
											</a>
										{/each}
									</div>
								{/if}
							</div>

							<span class="time-meta">8:30 PM</span>
						</div>
					{/each}
				</div>
			</CardBody>
		</Card>
	</div>
</div>

<MailBox />
