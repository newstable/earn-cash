<script>
	import {
		InputGroup,
		Input,
		Badge,
		Tooltip,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle
	} from 'sveltestrap';
	import Editor from 'cl-editor/src/Editor.svelte';

	const printerIcon = '/img/svg/printer.svg';
	const shareIcon = '/img/svg/share.svg';
	const downloadIcon = '/img/svg/download.svg';
	const starIcon = '/img/svg/star.svg';
	const cornerLeft = '/img/svg/corner-up-left.svg';
	const cornerRight = '/img/svg/corner-up-right.svg';
	const moreVerticalIcon = '/img/svg/more-vertical.svg';
	const paperClipIcon = '/img/svg/paperclip.svg';
	const smileIcon = '/img/svg/smile.svg';
	const trashIcon = '/img/svg/trash-2.svg';
</script>

<div class="mail-read-content">
	<div class="mail-details">
		<div class="mail-details__top d-flex justify-content-between">
			<h2 class="mail-details__title">
				<span>Email subject lorem ipsum</span>
				<Badge color="primary" class="badge-transparent badge-round badge-primary">Inbox</Badge>
			</h2>
			<div class="mail-details__action d-flex">
				<a href="/" class="icon-action">
					<div class="double-icon d-flex flex-column">
						<i class="la la-angle-up" />
					</div>
				</a>
				<a href="/" class="icon-action">
					<img class="svg" alt="" src={printerIcon} />
				</a>
			</div>
		</div>
		<div class="mail-details__content mdc media">
			<div class="mdc__left">
				<img src="/img/3.jpg" alt="Dashboard Market" />
			</div>
			<div class="mdc__right media-body">
				<div class="mdc__head d-flex justify-content-between">
					<div class="mdc__body">
						<h6>Hello Adam,</h6>
						<p>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
							invidunt ulabore etdolore magna aliquyam erat, sed diam voluptua. Atvero eos etaccusam
							justo duo dolores et ea rebum. Stet clita kasd gubergren nosea takimata sanctus est
							Lorem ipsum dolor amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
							diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
							voluptua.
						</p>
						<div class="mail-signature">
							<span>Best regards</span>
							<p class="author-name">Alice Freeman</p>
						</div>
					</div>
					<div class="mdc__footer">
						<div class="mail-attatched d-flex">
							<div class="mail-attatched__item">
								<figure class="mb-0">
									<div class="mail-attatched__image mb-3">
										<img src="/img/1.png" alt="Admin Dashboard" />
										<div class="mail-attatched__hover">
											<a href="/" class="btn-mail">
												<img class="svg" alt="" src={shareIcon} />
											</a>
											<a href="/" class="btn-mail">
												<img class="svg" alt="" src={downloadIcon} />
											</a>
										</div>
									</div>
									<figcaption>
										<h6 class="file-name">Attatched.jpg</h6>
										<span class="file-size">256.5 KB</span>
									</figcaption>
								</figure>
							</div>
							<div class="mail-attatched__item">
								<figure class="mb-0">
									<div class="mail-attatched__image mb-3">
										<img src="/img/2.png" alt="Admin Dashboard" />
										<div class="mail-attatched__hover">
											<a href="/" class="btn-mail">
												<img class="svg" alt="" src={shareIcon} />
											</a>
											<a href="/" class="btn-mail">
												<img class="svg" alt="" src={downloadIcon} />
											</a>
										</div>
									</div>
									<figcaption>
										<h6 class="file-name">Attatched.jpg</h6>
										<span class="file-size">256.5 KB</span>
									</figcaption>
								</figure>
							</div>
							<div class="mail-attatched__item">
								<figure class="mb-0">
									<div class="mail-attatched__image mb-3">
										<img src="/img/3.png" alt="Admin Dashboard" />
										<div class="mail-attatched__hover">
											<a href="/" class="btn-mail">
												<img class="svg" alt="" src={shareIcon} />
											</a>
											<a href="/" class="btn-mail">
												<img class="svg" alt="" src={downloadIcon} />
											</a>
										</div>
									</div>
									<figcaption>
										<h6 class="file-name">Attatched.jpg</h6>
										<span class="file-size">256.5 KB</span>
									</figcaption>
								</figure>
							</div>
							<div class="mail-attatched__item">
								<figure class="mb-0">
									<div class="mail-attatched__image mb-3">
										<img src="/img/4.png" alt="Admin Dashboard" />
										<div class="mail-attatched__hover">
											<a href="/" class="btn-mail">
												<img class="svg" alt="" src={shareIcon} />
											</a>
											<a href="/" class="btn-mail">
												<img class="svg" alt="" src={downloadIcon} />
											</a>
										</div>
									</div>
									<figcaption>
										<h6 class="file-name">Attatched.jpg</h6>
										<span class="file-size">256.5 KB</span>
									</figcaption>
								</figure>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="mail-reply">
		<div class="mail-reply__single">
			<div class="mail-details__content mdc media">
				<div class="mdc__left">
					<img src="/img/3.jpg" alt="Admin Template" />
				</div>
				<div class="mdc__right media-body">
					<div class="mdc__head d-flex justify-content-between">
						<div class="mdc__author media">
							<div class="author-info">
								<h6>Alice Freeman</h6>
							</div>
							<div class="mdc__excerpt">
								<span class="date-meta">Jan 2, 2023, 5:22 PM</span>
								<a href="/">
									<img class="svg" alt="" src={starIcon} />
								</a>
								<a href="/">
									<img class="svg" alt="" src={cornerLeft} />
								</a>
								<a href="/">
									<img class="svg" alt="" src={moreVerticalIcon} />
								</a>
							</div>
						</div>
					</div>
					<div class="mdc__body">
						<p>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
							inviduntLorem ipsum dolor...
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="mail-reply__action d-flex">
			<a href="/" class="btn btn-outline-lighten btn-md"
				><img class="svg" alt="" src={cornerLeft} /> Reply</a
			>
			<a href="/" class="btn btn-outline-lighten btn-md"
				><img class="svg" alt="" src={cornerRight} />Forword</a
			>
		</div>
		<div class="mail-reply-box media">
			<figure>
				<img src="/img/reply-1.png" alt="Admin Dashboard" />
			</figure>
			<div class="mail-reply-inner media-body">
				<div class="reply-form">
					<form action="">
						<div class="mailCompose-form-content">
							<div class="form-group positon-relative">
								<div class="form-group positon-relative">
									<input type="email" class="form-control-lg" name="email-to" placeholder="To" />
								</div>
								<span class="mail-cc">Cc</span>
							</div>
							<div class="form-group">
								<Editor />
							</div>
						</div>
						<div class="reply-form__action d-flex justify-content-between align-items-center">
							<div class="reply-form__left d-flex align-items-center">
								<button class="btn btn-md btn-primary btn-send">Send</button>
								<a href="/"><img class="svg" alt="" src={paperClipIcon} /></a>
								<a href="/"><img class="svg" alt="" src={smileIcon} /></a>
							</div>
							<div class="reply-form__right">
								<a href="/" class="btn-remove">
									<img class="svg" alt="" src={trashIcon} />
								</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
