<script>
	import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Progress } from 'sveltestrap';

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
	<div class="projects-tab-content">
		<div class="tab-content mt-25" id="ap-tabContent">
			<div
				class="userDatatable projectDatatable project-table global-shadow border-0 p-30 bg-white radius-xl w-100"
			>
				<div class="table-responsive">
					<table class="table mb-0">
						<thead>
							<tr class="userDatatable-header">
								<th>
									<span class="projectDatatable-title">project</span>
								</th>
								<th>
									<span class="projectDatatable-title">start date</span>
								</th>
								<th>
									<span class="projectDatatable-title">deadline</span>
								</th>
								<th>
									<span class="projectDatatable-title">Assigned To</span>
								</th>
								<th>
									<span class="projectDatatable-title">status</span>
								</th>
								<th>
									<span class="projectDatatable-title">completion</span>
								</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{#each projectType as card}
								<tr>
									<td>
										<div class="d-flex">
											<div class="userDatatable-inline-title">
												<a href={'#'} class="text-dark fw-500">
													<h6>{card.title}</h6>
												</a>
												<p class="pt-1 d-block mb-0">{card.category}</p>
											</div>
										</div>
									</td>
									<td>
										<div class="userDatatable-content">26 Dec 2019</div>
									</td>
									<td>
										<div class="userDatatable-content">18 Mar 2020</div>
									</td>
									<td>
										<ul class="d-flex user-group-people__parent align-content-center">
											{#each card.assignedTo as user}
												<li>
													<a href={'#'}
														><img class="rounded-circle wh-34" src="/img/{user}" alt="author" /></a
													>
												</li>
											{/each}
										</ul>
									</td>
									<td>
										<div class="d-inline-block">
											<span class="media-badge color-white bg-{card.badge}">{card.status}</span>
										</div>
									</td>
									<td>
										<div class="project-progress d-flex align-items-center">
											<div class="user-group-progress-bar">
												<div class="progress-wrap d-flex align-items-center mb-0">
													<div class="progress" style="width: 100%; height: 6px;">
														<Progress bar color={card.badge} value={card.percentage} />
													</div>

													<span class="progress-percentage">{card.percentage}%</span>
												</div>

												<p class="color-light fs-12 mt-1 mb-0">12 / 15 tasks completed</p>
											</div>
										</div>
									</td>
									<td>
										<div class="project-progress text-end">
											<Dropdown>
												<DropdownToggle color="transparent"
													><img
														data-inlinesvg
														src={'/img/svg/more-horizontal.svg'}
													/></DropdownToggle
												>
												<DropdownMenu>
													<DropdownItem>View</DropdownItem>
													<DropdownItem>Edit</DropdownItem>
													<DropdownItem>Delete</DropdownItem>
												</DropdownMenu>
											</Dropdown>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</Col>
