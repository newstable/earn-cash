<script>
	import { Card, CardHeader, CardBody, Button } from 'sveltestrap';

	import CardExtra from '@components/cards/CardExtra.svelte';

	const activites = [
		{
			icon: 'inbox.svg',
			type: 'primary',
			author: 'James',
			authorImg: '1.jpg',
			content: 'sent you a message',
			time: '16 mins ago'
		},
		{
			icon: 'upload.svg',
			type: 'secondary',
			authorImg: '2.jpg',
			author: 'Mumtahin',
			content: 'has registered',
			time: '45 mins ago'
		},
		{
			icon: 'log-in.svg',
			type: 'info',
			authorImg: '3.jpg',
			author: 'Adam',
			content: 'upload website template for sale',
			time: '1 hours ago'
		},
		{
			icon: 'at-sign.svg',
			type: 'success',
			authorImg: '4.jpg',
			author: 'James',
			content: 'mentioned you in a post',
			time: '2 hours ago'
		},
		{
			icon: 'heart.svg',
			type: 'danger',
			authorImg: '1.jpg',
			author: 'Kerry',
			content: 'Liked your photos',
			time: '3 hours ago'
		},
		{
			icon: 'message-square.svg',
			type: 'warning',
			authorImg: '2.jpg',
			author: 'Fizz',
			content: 'sent you a message',
			time: '4 hours ago'
		},
		{
			icon: 'upload.svg',
			type: 'secondary',
			authorImg: '3.jpg',
			author: 'Aron',
			content: 'uploaded a photo',
			time: '6 hours ago'
		},
		{
			icon: 'log-in.svg',
			type: 'info',
			authorImg: '4.jpg',
			author: 'Ramsy',
			content: 'has registered',
			time: '7 hours ago'
		},
		{
			icon: 'at-sign.svg',
			type: 'success',
			authorImg: '1.jpg',
			author: 'Tony',
			content: 'mentioned you in a comment',
			time: '8 hours ago'
		},
		{
			icon: 'heart.svg',
			type: 'danger',
			authorImg: '2.jpg',
			author: 'Steve',
			content: 'Liked your comment',
			time: '8 hours ago'
		},
		{
			icon: 'message-square.svg',
			type: 'warning',
			authorImg: '3.jpg',
			author: 'Bucky',
			content: 'sent you a message',
			time: '9 hours ago'
		},
		{
			icon: 'upload.svg',
			type: 'secondary',
			authorImg: '4.jpg',
			author: 'Morgan',
			content: 'upload website template for sale',
			time: '10 hours ago'
		}
	];
</script>

<Card class="global-shadow mb-25">
	<div class="friends-widget">
		<CardHeader class="px-md-25 px-3">
			<h6>Activities</h6>
		</CardHeader>
		<CardBody class="p-0 py-10">
			{#each activites as item}
				<div class="ffp d-flex ffp--hover justify-content-between  align-items-center w-100">
					<div class="d-flex">
						<div class="me-3 ffp__imgWrapper d-flex align-items-center">
							<span class="ffp__icon color-{item.type} bg-opacity-{item.type}">
								<img class="svg" alt="" src={`/img/svg/${item.icon}`} />
							</span>
							<span
								class="profile-image bg-opacity-{item.type} rounded-circle d-block avatar avatar-md m-0 "
								style="background-image:url('/img/author/{item.authorImg}'); background-size: cover;"
							/>
						</div>
						<div class="ffp__title">
							<a href={'#'} class="text-dark fw-500">
								<h6>
									<span class="color-primary">{item.author}</span>
									{item.content}
								</h6>
							</a>
							<p class="d-block">{item.time}</p>
						</div>
					</div>
					<div class="ffp__button">
						<CardExtra />
					</div>
				</div>
			{/each}
		</CardBody>
	</div>
</Card>
