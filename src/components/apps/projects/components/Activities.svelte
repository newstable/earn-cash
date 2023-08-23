<script>
	import { CardBody } from 'sveltestrap';

	const activities = [
		{
			day: '22',
			month: 'December',
			tasks: [
				{
					icon: 'plus',
					style: 'primary',
					userImg: 'tm1.png',
					userName: 'Mumtahin',
					taskType: 'added new task',
					taskLink: 'Dashboard Project',
					time: '3:30 PM'
				},
				{
					icon: 'arrow',
					style: 'secondary',
					userImg: 'tm2.png',
					userName: 'Mike Green',
					taskType: 'pushed commit',
					taskLink: '#656723',
					time: '9:30 PM'
				},
				{
					icon: 'check',
					style: 'success',
					userImg: 'tm3.png',
					userName: 'L. Tomlinson',
					taskType: 'completed task',
					taskLink: 'Invoice template',
					time: '10:00 PM'
				}
			]
		},
		{
			day: '21',
			month: 'December',
			tasks: [
				{
					icon: 'user-plus',
					style: 'primary',
					userImg: 'tm4.png',
					userName: 'Andrew Tat',
					taskType: 'added new task',
					taskLink: 'Plugin Development',
					time: '4:16 PM'
				},
				{
					icon: 'arrow',
					style: 'warning',
					userImg: 'tm5.png',
					userName: 'Mark Hessen',
					taskType: 'created an event',
					taskLink: 'Yearly Meetup',
					time: '5:01 PM'
				},
				{
					icon: 'upload',
					style: 'info',
					userImg: 'tm6.png',
					userName: 'Erik Englas',
					taskType: 'uploded a file',
					taskLink: 'Project Files',
					time: '5:46 PM'
				}
			]
		}
	];
</script>

<div id="project-timeline">
	{#each activities as activity}
		<CardBody class="px-0 mx-25 activity-card">
			<div class="task-activities d-flex align-items-center">
				<div class="task-activities__left d-flex">
					<div
						class="content-center border bg-normal radius-xl me-sm-20 me-0 task-activities__month"
					>
						<div class=" px-20 text-center">
							<h5>{activity.day}</h5>
							<span class="fs-13 color-gray">{activity.month}</span>
						</div>
					</div>
					<div class="task-activities__right">
						<ul>
							{#each activity.tasks as task}
								<li>
									<div class="ffp d-flex justify-content-between align-items-center w-100">
										<div class="d-flex">
											<div class="me-3 ffp__imgWrapper d-flex align-items-center ">
												<span
													class="wh-24 me-15 rounded-circle content-center color-{task.style} bg-opacity-{task.style}"
												>
													<i class="uil uil-{task.icon}" />
												</span>
												<span class="profile-image rounded-circle d-block wh-34 m-0">
													<img src="/img/{task.userImg}" alt="" class="img-fluid" />
												</span>
											</div>
											<div>
												<a href={'#'}>
													<p class="fw-500 fs-14 text-dark mb-0">
														{task.userName}
														<span class="color-light mx-1 fw-400">{task.taskType}</span
														>{task.taskLink}
													</p>
												</a>
												<span class="pt-1 d-block color-extra-light fs-12"> {task.time} </span>
											</div>
										</div>
									</div>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</CardBody>
	{/each}
</div>
