<script>
	import {
		Row,
		Col,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Progress
	} from 'sveltestrap';

	import projects from '@data/projects.json';

	const projectsArr = Object.assign([], ...projects);
	const allProjects = [
		...projectsArr.progress,
		...projectsArr.completed,
		...projectsArr.late,
		...projectsArr.early
	];
	export let projectType = allProjects;
</script>

<Col lg={12}>
	<Row>
		{#each projectType as card}
			<Col lg={4} md={6} class="mb-25 project-card" data-type={card.status}>
				<div class="user-group radius-xl media-ui media-ui--early pt-30 pb-25">
					<div class="border-bottom px-30">
						<div class="media user-group-media d-flex justify-content-between">
							<div
								class="media-body d-flex align-items-center flex-wrap text-capitalize my-sm-0 my-n2"
							>
								<a href={'#'}>
									<h6 class="mt-0  fw-500 user-group media-ui__title bg-transparent">
										{card.title}
									</h6>
								</a>
								<span class="my-sm-0 my-2 media-badge text-uppercase color-white bg-{card.badge}"
									>{card.status}</span
								>
							</div>
							<div class="mt-n15">
								<Dropdown>
									<DropdownToggle color="trasnparent p-0"
										><img class="svg" alt="" src={'/img/svg/more-horizontal.svg'} /></DropdownToggle
									>
									<DropdownMenu>
										<DropdownItem>View</DropdownItem>
										<DropdownItem>Edit</DropdownItem>
										<DropdownItem>Delete</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</div>
						</div>
						<div class="user-group-people mt-15 text-capitalize">
							<p>
								{card.content}
							</p>
							<div class="user-group-project">
								<div class="d-flex align-items-center user-group-progress-top">
									<div class="media-ui__start">
										<span class="color-light fs-12">Start Date</span>
										<p class="fs-14 fw-500 color-dark mb-0">26 Dec 2019</p>
									</div>
									<div class="media-ui__end">
										<span class="color-light fs-12">end date</span>
										<p class="fs-16 fw-500 color-success mb-0">18 Mar 2020</p>
									</div>
								</div>
							</div>
						</div>
						<div class="user-group-progress-bar">
							<div class="progress-wrap mb-0">
								<div class="progress-wrap d-flex align-items-center">
									<div class="progress" style="width: 100%; height: 6px;">
										<Progress bar color={card.badge} value={card.percentage} />
									</div>
									<span class="ratio-percentage">{card.percentage}%</span>
								</div>
							</div>

							<p class="color-light fs-12 mb-20">12 / 15 Tasks Completed</p>
						</div>
					</div>
					<div class="mt-20 px-30">
						<p class="fs-13 color-light mb-10">Assigned To</p>
						<ul class="d-flex flex-wrap user-group-people__parent">
							{#each card.assignedTo as user}
								<li>
									<a href={'#'}
										><img
											class="rounded-circle wh-34 bg-opacity-secondary"
											src="/img/{user}"
											alt="author"
										/></a
									>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</Col>
		{/each}
	</Row>
</Col>
