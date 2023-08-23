<script>
	import { Badge } from 'sveltestrap';
</script>

<div class="dropdown-custom">
	<a href={'#'} class="nav-item-toggle icon-active">
		<img class="svg" src="/img/svg/message.svg" alt="img" />
	</a>
	<div class="dropdown-parent-wrapper">
		<div class="dropdown-wrapper">
			<h2 class="dropdown-wrapper__title">
				Messages <Badge color="success" class="badge-circle ms-1">2</Badge>
			</h2>
			<ul>
				<li class="author-online has-new-message">
					<div class="user-avater">
						<img src="/img/team-1.png" alt="" />
					</div>
					<div class="user-message">
						<p>
							<a href={'#'} class="subject stretched-link text-truncate" style="max-width: 180px;"
								>Web Design</a
							>
							<span class="time-posted">3 hrs ago</span>
						</p>
						<p>
							<span class="desc text-truncate" style="max-width: 215px;"
								>Lorem ipsum dolor amet cosec Lorem ipsum</span
							>
							<Badge color="success" class="msg-count badge-circle badge-sm">1</Badge>
						</p>
					</div>
				</li>
				<li class="author-offline has-new-message">
					<div class="user-avater">
						<img src="/img/team-1.png" alt="" />
					</div>
					<div class="user-message">
						<p>
							<a href={'#'} class="subject stretched-link text-truncate" style="max-width: 180px;"
								>Web Design</a
							>
							<span class="time-posted">3 hrs ago</span>
						</p>
						<p>
							<span class="desc text-truncate" style="max-width: 215px;"
								>Lorem ipsum dolor amet cosec Lorem ipsum</span
							>
							<Badge color="success" class="msg-count badge-circle badge-sm">1</Badge>
						</p>
					</div>
				</li>
				<li class="author-online has-new-message">
					<div class="user-avater">
						<img src="/img/team-1.png" alt="" />
					</div>
					<div class="user-message">
						<p>
							<a href={'#'} class="subject stretched-link text-truncate" style="max-width: 180px;"
								>Web Design</a
							>
							<span class="time-posted">3 hrs ago</span>
						</p>
						<p>
							<span class="desc text-truncate" style="max-width: 215px;"
								>Lorem ipsum dolor amet cosec Lorem ipsum</span
							>
							<Badge color="success" class="msg-count badge-circle badge-sm">1</Badge>
						</p>
					</div>
				</li>
				<li class="author-offline">
					<div class="user-avater">
						<img src="/img/team-1.png" alt="" />
					</div>
					<div class="user-message">
						<p>
							<a href={'#'} class="subject stretched-link text-truncate" style="max-width: 180px;"
								>Web Design</a
							>
							<span class="time-posted">3 hrs ago</span>
						</p>
						<p>
							<span class="desc text-truncate" style="max-width: 215px;"
								>Lorem ipsum dolor amet cosec Lorem ipsum</span
							>
						</p>
					</div>
				</li>
				<li class="author-offline">
					<div class="user-avater">
						<img src="/img/team-1.png" alt="" />
					</div>
					<div class="user-message">
						<p>
							<a href={'#'} class="subject stretched-link text-truncate" style="max-width: 180px;"
								>Web Design</a
							>
							<span class="time-posted">3 hrs ago</span>
						</p>
						<p>
							<span class="desc text-truncate" style="max-width: 215px;"
								>Lorem ipsum dolor amet cosec Lorem ipsum</span
							>
						</p>
					</div>
				</li>
			</ul>
			<a href={'#'} class="dropdown-wrapper__more">See All Message</a>
		</div>
	</div>
</div>
