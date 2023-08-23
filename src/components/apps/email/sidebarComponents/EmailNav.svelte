<script>
	import { page } from '$app/stores';
	import { mailList } from '../../../../store/mailStore';
	export let navList;

	let urlPath;
	// console.log(navList.filter(item=> item.unread === true))
	$: urlPath = $page.url.pathname.substring($page.url.pathname.lastIndexOf('/') + 1);
	// console.log(unreadCount);
</script>

<nav class="dm-mail-navbar">
	<ul class="dm-mail-list">
		{#each navList as { text, icon, path, unread }, i}
			<li>
				<a
					href={path}
					class={urlPath === path ? 'dm-mailbox-navlink active' : 'dm-mailbox-navlink'}
					id={i}
				>
					<i class={'uil uil-' + icon} />
					<div class="dm-mailbox-navlink__text">
						<span>{text}</span>
						{#if unread !== 0}
							<span class="badge badge-primary">{unread}</span>
						{/if}
					</div>
				</a>
			</li>
		{/each}
	</ul>
</nav>
