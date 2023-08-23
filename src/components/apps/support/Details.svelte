<script>
	import { Col, Form, Input, Label, Button } from 'sveltestrap';

	const conversations = [
		{
			img: 'ellipse1.png',
			name: 'Kellie Marquot',
			content: 'There are have a many variations of passages.',
			time: '1 hour ago'
		},
		{
			img: 'ellipse2.png',
			name: 'Daniel Pink',
			content: 'There are have a many.',
			time: '2 hours ago'
		},
		{
			img: 'ellipse3.png',
			name: 'Jhon Mayer',
			content:
				'All the Lorem Ipsum generators on the Internet tend There are have a many variations of passages.',
			time: '4 hours ago'
		},
		{
			img: 'ellipse4.png',
			name: 'Kellie Marquot',
			content: 'Lorem ipsum dolor us was they amet.',
			time: '7 hours ago'
		}
	];

	const files = [
		{
			icon: 'zip@2x.png',
			name: 'Main-Admin-Design.Zip',
			size: '7.09 MB'
		},
		{
			icon: 'pdf@2x.png',
			name: 'Product-Guidelines.Pdf',
			size: '1.29 MB'
		},
		{
			icon: 'psd@2x.png',
			name: 'Admin-Wireframe.Psd',
			size: '7.01 MB'
		},
		{
			icon: 'jpg@2x.png',
			name: 'Wirefram-Escreenshots.Jpg',
			size: '1.67 MB'
		}
	];
</script>

<Col lg={12}>
	<div class="back-page">
		<a href={'#'}>
			<img class="svg" alt="" src={'/img/svg/arrow-left.svg'} />
			Go Back
		</a>
	</div>
</Col>
<Col lg={8} class="mb-50">
	<div class="ticket-details-contact">
		<h4>Need to help for adding new contact</h4>
		<div class="ticket-details-contact__ift">
			<div class="ticket-details-contact__ift-wrapper">
				<span class="ticket-details-contact__ift-rule">Requested By:</span>
				<div class="ticket-details-contact__ift-namTitle">
					<img src="/img/tdi.png" alt="tdi.png" />
					<h6>Kellie Marquot</h6>
				</div>
			</div>
			<div class="ticket-details-contact__ift-wrapper">
				<span class="ticket-details-contact__ift-rule">Created Date</span>
				<div class="ticket-details-contact__ift-namTitle">
					<h6>January 20, 2020</h6>
				</div>
			</div>
			<div class="ticket-details-contact__ift-wrapper">
				<span class="ticket-details-contact__ift-rule">Updated Date</span>
				<div class="ticket-details-contact__ift-namTitle">
					<h6>February 02, 2020</h6>
				</div>
			</div>
		</div>
		<div class="ticket-details-contact__status">
			<div class="ticket-details-contact__status-item">
				<Label for="">Priority</Label>
				<div class="dm-select">
					<select name="select-search" class="select-search form-control">
						<option value="01">All</option>
						<option value="02">Easy</option>
						<option value="03" selected>Medium</option>
						<option value="04">Option 4</option>
						<option value="05">Option 5</option>
					</select>
				</div>
			</div>
			<div class="ticket-details-contact__status-item">
				<Label>Status</Label>
				<div class="dm-select">
					<select name="select-search" class="select-search form-control">
						<option value="01">All</option>
						<option value="02">Deactivate</option>
						<option value="03" selected>Open</option>
						<option value="04">Close</option>
					</select>
				</div>
			</div>
		</div>
		<div class="ticket-details-contact__overview">
			<h4 class="ticket-details-contact__overview-title">Overview :</h4>
			<p>
				There are have a many variations of passages of Lorem Ipsum available, but the randomised
				words which don't look even slightly believable. If you are going to sdsss embarrassing
				hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend
			</p>
		</div>
	</div>

	<div class="ticket-chat-wrapper pt-25 pb-30 mt-30">
		<h4>Conversation</h4>
		<div class="ticket-search-body">
			<ul class="ticket-user-list pe-15">
				{#each conversations as item}
					<li class="ticket-user-list-item">
						<div class="ticket-user-list-item__wrapper">
							<div class="avatar avatar-circle ms-0">
								<img
									src="/img/{item.img}"
									class="rounded-circle d-flex bg-opacity-primary"
									alt=""
								/>
							</div>
							<div class="ticket-users-list-body">
								<div class="ticket-users-list-body-title">
									<h6>{item.name}</h6>
									<div class="text-limit" data-maxlength="10">
										<p class="mb-0">{item.content}</p>
									</div>
								</div>
								<div class="last-chat-time unread">
									<small>{item.time}</small>
								</div>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
		<div class="ticket-search-header">
			<Form action="/" class="d-flex align-items-center">
				<img class="svg" alt="" src={'/img/svg/smile.svg'} />
				<Input
					class="form-control me-sm-2 border-0 box-shadow-none"
					type="search"
					placeholder="Type your message..."
					aria-label="Search"
				/>
			</Form>
			<Button color="primary" class="border-0 wh-50 p-10 rounded-circle">
				<img class="svg" alt="" src={'/img/svg/send.svg'} />
			</Button>
		</div>
	</div>
</Col>
<Col lg={4} class="mb-30">
	<div class="ticket-file-attach">
		<h4>File Attachment</h4>
		<div class="ticket-file-attach__wrapper">
			{#each files as file}
				<div class="ticket-file-attach__items">
					<div class="ticket-file-attach__items_detail">
						<img src="/img/{file.icon}" alt={file.icon} />
						<div class="div">
							<h6>{file.name}</h6>
							<span>{file.size}</span>
						</div>
					</div>
					<div class="ticket-file-attach__items_download">
						<a href={'#'}>
							<img class="svg" alt="" src={'/img/svg/download.svg'} />
						</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Col>
