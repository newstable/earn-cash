<script>
	import { Card, CardHeader, CardBody, Button } from 'sveltestrap';

	const friends = [
		{
			img: '1.jpg',
			name: 'Shawn Mare',
			label: 'UI Designer',
			following: false
		},
		{
			img: '2.jpg',
			name: 'Aron Ramsy',
			label: 'Product Designer',
			following: false
		},
		{
			img: '3.jpg',
			name: 'Phil Jones',
			label: 'Executive Assistant',
			following: true
		},
		{
			img: '4.jpg',
			name: 'Tony Stak',
			label: 'Backend Developer',
			following: false
		},
		{
			img: '1.jpg',
			name: 'Tohin Molla',
			label: 'Support Engineer',
			following: true
		}
	];
</script>

<Card class="global-shadow mb-25">
	<div class="friends-widget">
		<CardHeader class="px-md-25 px-3">
			<h6>Friends</h6>
		</CardHeader>
		<CardBody class="p-0">
			{#each friends as friend}
				<div class="ffw d-flex justify-content-between">
					<div class="d-flex flex-wrap">
						<div class="me-3 ffw__imgWrapper">
							<span
								class=" profile-image bg-opacity-secondary rounded-circle d-block ap-profile-image "
								style="background-image:url('/img/author/{friend.img}'); background-size: cover;"
							/>
						</div>
						<div class="ffw__title">
							<a href={'#'} class="text-dark fw-500">
								<h6>{friend.name}</h6>
							</a>
							<span class="d-block"> {friend.label} </span>
						</div>
					</div>
					<div>
						<Button
							color={friend.following ? 'primary' : 'light'}
							size="default"
							outline={!friend.following ? true : false}
							class="btn-squared {!friend.following ? 'friends-follow' : 'friends-unfollow'}"
							>{friend.following ? 'Unfollow' : 'Follow'}
						</Button>
					</div>
				</div>
			{/each}
			<a class="view-more-comment color-primary fs-13 fw-500 px-25 pb-20" href={'#'}
				>Load more friends</a
			>
		</CardBody>
	</div>
</Card>
