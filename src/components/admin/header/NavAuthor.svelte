<script>
	import { goto } from '$app/navigation';

	const handleSignOut = (event) => {
		event.preventDefault();
		setItem('user', '');
		setItem('loggedin', false);
		setItem('access_token', '');
		goto(`/signin`);
	};
</script>

<div class="dropdown-custom">
	<a href={'#'} class="nav-item-toggle">
		<img src="/img/author-nav.png" alt="" class="rounded-circle" />
		<span class="nav-item__title">Danial<i class="las la-angle-down nav-item__arrow" /></span>
	</a>
	<div class="dropdown-parent-wrapper">
		<div class="dropdown-wrapper">
			<div class="nav-author__info">
				<div class="author-img">
					<img src="/img/author-nav.png" alt="" class="rounded-circle" />
				</div>
				<div>
					<h6>Danial</h6>
					<span>Support Engineer</span>
				</div>
			</div>
			<div class="nav-author__options">
				<ul>
					<li>
						<a href={'#'}> <i class="uil uil-user" /> Profile</a>
					</li>
					<li>
						<a href={'#'}><i class="uil uil-setting" />Settings</a>
					</li>
					<li>
						<a href={'#'}> <i class="uil uil-key-skeleton" /> Billing</a>
					</li>
					<li>
						<a href={'#'}> <i class="uil uil-users-alt" /> Activity</a>
					</li>
					<li>
						<a href={'#'}> <i class="uil uil-bell" /> Help</a>
					</li>
				</ul>
				<a href={'#'} class="nav-author__signout" on:click={(event) => handleSignOut(event)}>
					<i class="uil uil-sign-out-alt" /> Sign Out</a
				>
			</div>
		</div>
		<!-- ends: .dropdown-wrapper -->
	</div>
</div>
