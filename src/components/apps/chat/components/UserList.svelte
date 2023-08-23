<script>
	import moment from 'moment';
	export let allUsers;
</script>

{#each allUsers as user}
	<li class="user-list-item">
		<a href={'#'} class="user-list-item__wrapper active" data-user={user.email || user.id}>
			<div class="avatar avatar-circle ms-0">
				<img
					src="/img/{user.img}"
					class="rounded-circle wh-46 d-flex bg-opacity-primary"
					alt="user-img"
				/>
				<div class="badge-direction-bottom">
					<span class="chat-badge-dot avatar-online" />
				</div>
			</div>
			<div class="users-list-body">
				<div class="users-list-body-title">
					<h6>{user.userName || user.groupName}</h6>
					<div class="text-limit">
						<p class="mb-0">
							<span class="text-truncate" style="max-width: 225px;"
								>{user.content[0].content.split(' ').slice(0, 5).join(' ')}...</span
							>
						</p>
					</div>
				</div>
				<div class="last-chat-time unread">
					<small>{moment(user.time).format('hh:mm A')}</small>

					{#if user.unread !== 0}
						<div class="total-message mt-1 d-flex justify-content-end">
							<span class="badge badge-success ">{user.unread}</span>
						</div>
					{/if}
				</div>
			</div>
		</a>
	</li>
{/each}
