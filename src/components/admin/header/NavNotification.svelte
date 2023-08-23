<script>
	import { Badge } from 'sveltestrap';
</script>

<div class="dropdown-custom">
	<a href={'#'} class="nav-item-toggle icon-active">
		<img class="svg" src="/img/svg/alarm.svg" alt="img" />
	</a>
	<div class="dropdown-parent-wrapper">
		<div class="dropdown-wrapper">
			<h2 class="dropdown-wrapper__title">
				Notifications <Badge color="warning" class="badge-circle ms-1">4</Badge>
			</h2>
			<ul>
				<li class="nav-notification__single nav-notification__single--unread d-flex flex-wrap">
					<div class="nav-notification__type nav-notification__type--primary">
						<img class="svg" alt="" src={'/img/svg/inbox.svg'} />
					</div>
					<div class="nav-notification__details">
						<p>
							<a href={'#'} class="subject stretched-link text-truncate" style="max-width: 180px;"
								>James</a
							>
							<span>sent you a message</span>
						</p>
						<p>
							<span class="time-posted">5 hours ago</span>
						</p>
					</div>
				</li>
				<li class="nav-notification__single nav-notification__single--unread d-flex flex-wrap">
					<div class="nav-notification__type nav-notification__type--secondary">
						<img class="svg" alt="" src={'/img/svg/upload.svg'} />
					</div>
					<div class="nav-notification__details">
						<p>
							<a href={'#'} class="subject stretched-link text-truncate" style="max-width: 180px;"
								>James</a
							>
							<span>sent you a message</span>
						</p>
						<p>
							<span class="time-posted">5 hours ago</span>
						</p>
					</div>
				</li>
				<li class="nav-notification__single nav-notification__single--unread d-flex flex-wrap">
					<div class="nav-notification__type nav-notification__type--success">
						<img class="svg" alt="" src={'/img/svg/log-in.svg'} />
					</div>
					<div class="nav-notification__details">
						<p>
							<a href={'#'} class="subject stretched-link text-truncate" style="max-width: 180px;"
								>James</a
							>
							<span>sent you a message</span>
						</p>
						<p>
							<span class="time-posted">5 hours ago</span>
						</p>
					</div>
				</li>
				<li class="nav-notification__single nav-notification__single d-flex flex-wrap">
					<div class="nav-notification__type nav-notification__type--info">
						<img class="svg" alt="" src={'/img/svg/at-sign.svg'} />
					</div>
					<div class="nav-notification__details">
						<p>
							<a href={'#'} class="subject stretched-link text-truncate" style="max-width: 180px;"
								>James</a
							>
							<span>sent you a message</span>
						</p>
						<p>
							<span class="time-posted">5 hours ago</span>
						</p>
					</div>
				</li>
				<li class="nav-notification__single nav-notification__single d-flex flex-wrap">
					<div class="nav-notification__type nav-notification__type--danger">
						<img class="svg" alt="" src={'/img/svg/heart.svg'} />
					</div>
					<div class="nav-notification__details">
						<p>
							<a href={'#'} class="subject stretched-link text-truncate" style="max-width: 180px;"
								>James</a
							>
							<span>sent you a message</span>
						</p>
						<p>
							<span class="time-posted">5 hours ago</span>
						</p>
					</div>
				</li>
			</ul>
			<a href={'#'} class="dropdown-wrapper__more">See all incoming activity</a>
		</div>
	</div>
</div>
