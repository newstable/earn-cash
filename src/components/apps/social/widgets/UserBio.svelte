<script>
	import { Card, CardHeader, CardBody } from 'sveltestrap';

	const contactInfo = [
		{
			icon: 'mail.svg',
			label: 'Clayton@example.com'
		},
		{
			icon: 'phone.svg',
			label: '+44 (0161) 347 8854'
		},
		{
			icon: 'globe.svg',
			label: 'www.example.com'
		}
	];

	const tags = ['UI/UX', 'Branding', 'Product Design', 'Application', 'Web Design'];
	const socials = ['facebook-f', 'twitter', 'dribbble', 'instagram'];
</script>

<Card class="mb-25">
	<div class="user-bio border-bottom">
		<CardHeader class="border-bottom-0 pt-sm-30 pb-sm-0 px-md-25 px-3">
			<div class="profile-header-title">User Bio</div>
		</CardHeader>
		<CardBody class="pt-md-1 pt-0">
			<div class="user-bio__content">
				<p class="m-0">
					Nam malesuada dolor tellus pretium amet was hendrerit facilisi id vitae enim sed ornare
					there suspendisse sed orci neque ac sed aliquet risus faucibus in pretium molestie nisl
					tempor quis odio habitant.
				</p>
			</div>
		</CardBody>
	</div>
	<div class="user-info border-bottom">
		<CardHeader class="border-bottom-0 pt-sm-25 pb-sm-0 px-md-25 px-3">
			<div class="profile-header-title">Contact info</div>
		</CardHeader>
		<CardBody class="pt-md-1 pt-0">
			<div class="user-content-info">
				{#each contactInfo as info}
					<p class="user-content-info__item">
						<img class="svg" alt="" src={`/img/svg/${info.icon}`} />
						{info.label}
					</p>
				{/each}
			</div>
		</CardBody>
	</div>
	<div class="user-skils border-bottom">
		<CardHeader class="border-bottom-0 pt-sm-25 pb-sm-0 px-md-25 px-3">
			<div class="profile-header-title">Skills</div>
		</CardHeader>
		<CardBody class="pt-md-1 pt-0">
			<ul class="user-skils-parent">
				{#each tags as tag}
					<li class="user-skils-parent__item">
						<a href={'#'}>{tag}</a>
					</li>
				{/each}
			</ul>
		</CardBody>
	</div>
	<div class="db-social">
		<CardHeader class="border-bottom-0 pt-sm-25 pb-sm-0 px-md-25 px-3">
			<div class="profile-header-title">Social Profiles</div>
		</CardHeader>
		<CardBody class="pt-md-1 pt-0">
			<ul class="db-social-parent mb-0">
				{#each socials as icon}
					<li class="db-social-parent__item">
						<a class="color-{icon} hover-{icon} wh-44 fs-18" href={'#'}>
							<i class="lab la-{icon}" />
						</a>
					</li>
				{/each}
			</ul>
		</CardBody>
	</div>
</Card>
