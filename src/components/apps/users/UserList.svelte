<script>
	import { goto } from '$app/navigation';
	import { Col, Button } from 'sveltestrap';

    export let users = [
        {
            picture: "/img/tm1.png",
            username: "Hattorius",
            points: 5748.35,
            cashedOut: 35443.43,
            _id: 1
        }
    ];
</script>

{#each users as user}
	<Col md={6} lg={6} xxl={5} class="mb-25">
		<div class="media py-30 ps-sm-30 ps-20 pe-20 bg-white radius-xl users-list">
			<img
				class="me-20 rounded-circle wh-80 bg-opacity-primary"
				src={user.picture}
				alt="Profile"
			/>
			<div class="media-body d-xl-flex users-list-body">
				<div class="flex-1 pe-xl-30 users-list-body__title">
					<h6 class="mt-0 fw-500">{user.username}</h6>
					<div class="users-list-body__bottom">
						<span><span class="fw-600">{(user.points / 100).toLocaleString(undefined, { style: "currency", currency: "USD" })} </span>earned</span>
					</div>
                    <div class="users-list-body__bottom">
						<span><span class="fw-600">{(user.cashedOut / 100).toLocaleString(undefined, { style: "currency", currency: "USD" })} </span>withdrawn</span>
					</div>
				</div>
				<div class="users-list__button mt-xl-0 mt-15" style="display: flex; flex-direction: column; justify-content: center">
					<Button
						color="primary"
						size="default"
						class="btn-squared text-capitalize px-20 mb-10 global-shadow"
                        style="margin-bottom: 0 !important;"
                        on:click={() => goto("/admin/user/" + user._id)}
						>view
					</Button>
				</div>
			</div>
		</div>
	</Col>
{/each}
