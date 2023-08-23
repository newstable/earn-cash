<script>
	import { Col, Progress } from 'sveltestrap';
	import groupData from '@data/usersGroupData.json';
	import CardExtra from '@components/cards/CardExtra.svelte';
</script>

{#each groupData as item}
	<Col xl={4} md={6} class="mb-25">
		<div class="user-group px-30 pt-30 pb-25 radius-xl">
			<div class="border-bottom">
				<div class="media user-group-media d-flex justify-content-between">
					<div class="media-body d-flex align-items-center">
						<img
							class="me-20 wh-70 rounded-circle bg-opacity-primary"
							src="/img/users-group/{item.groupImg}"
							alt="author"
						/>
						<div>
							<a href={"#"}>
								<h6 class="mt-0  fw-500">{item.title}</h6>
							</a>
							<p class="fs-13 color-light mb-0">{item.company}</p>
						</div>
					</div>
					<div class="mt-n15">
						<CardExtra />
					</div>
				</div>
				<div class="user-group-people">
					<p class="mt-15">
						{item.content}
					</p>
					<ul class="d-flex flex-wrap mb-20 user-group-people__parent">
						{#each item.members as member}
							<li>
								<a href={'#'}
									><img
										class="rounded-circle wh-34 bg-opacity-secondary"
										src="/img/{member}"
										alt="author"
									/></a
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>
			<div class="user-group-project">
				<div class="d-flex justify-content-between user-group-progress-top">
					<div>
						<span class="color-light fs-12">Current project</span>
						<p class="fs-14 fw-500 color-dark mb-0">{item.projectName}</p>
					</div>
					<div>
						<span class="color-light fs-12">Project Completed</span>
						<p class="fs-16 fw-500 color-success mb-0 text-end">{item.progress}</p>
					</div>
				</div>
				<div class="user-group-progress-bar">
					<div class="progress-wrap d-flex align-items-center mb-0">
						<Progress color="primary" value={item.progress} />
						<span class="ratio-percentage">{item.progress}%</span>
					</div>

					<p class="color-light fs-12 mb-0">12 / 15 tasks completed</p>
				</div>
			</div>
		</div>
	</Col>
{/each}
