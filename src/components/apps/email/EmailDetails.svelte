<script>
	import { Card, CardBody, Badge } from 'sveltestrap';
	import MailTop from './sharedComponents/MailTop.svelte';
	import DetailsEmail from './detailsComponents/DetailsEmail.svelte';
	import MailBox from './MailBox.svelte';
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
	// let mailBoxVisibility = mailBoxVisibility;
</script>

<svelte:head>
	<title>Single</title>
</svelte:head>

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
				<DetailsEmail />
			</CardBody>
		</Card>
	</div>
</div>

<MailBox />