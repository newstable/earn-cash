<script>
	import { Row, Col, Progress, Card, CardHeader, CardBody, Button } from 'sveltestrap';
	import Activities from './components/Activities.svelte';
	import Summary from './components/Summary.svelte';
	import Users from './components/Users.svelte';
	import Files from './components/Files.svelte';
	import Task from './components/Task.svelte';

	const projectTabs = [Task, Activities];
	let activeTab = projectTabs.indexOf(Task);

	function removeActive(selector) {
		selector
			.closest('ul')
			.querySelectorAll('.nav-link')
			.forEach((elm) => {
				elm.classList.remove('active');
			});
	}
	function shiftTabs(e) {
		e.preventDefault();
		if (this.dataset.type === 'task-app') {
			removeActive(this);
			this.classList.add('active');
			activeTab = projectTabs.indexOf(Task);
		} else if (this.dataset.type === 'activities') {
			removeActive(this);
			this.classList.add('active');
			activeTab = projectTabs.indexOf(Activities);
		}
	}
	
</script>

<div class="projects-tab-content mb-30">
	<Row>
		<Col xxl={3} xl={6} class="mb-25">
			<div class="progress-box px-25 pt-25 pb-10 bg-success radius-xl">
				<div class="d-flex justify-content-between mb-3">
					<h6 class="text-white fw-500 fs-16 text-capitalize">progress</h6>

					<span class="progress-percentage text-white fw-500 fs-16 text-capitalize">64%</span>
				</div>
				<div class="progress-wrap d-flex align-items-center mb-15">
					<div class="progress progress-height" style="width: 100%; height: 6px;">
						<Progress bar color="white" value={64} />
					</div>
				</div>
			</div>
			<Summary />
		</Col>

		<Col xxl={6} class="mb-25">
			<Card class="border-0 pb-md-50 pb-15 h-100">
				<CardHeader class="py-sm-20 py-3 px-sm-25 px-3">
					<h6>About Project</h6>
				</CardHeader>
				<CardBody>
					<div class="about-projects">
						<div class="about-projects__details">
							<p class="fs-15 mb-25">
								Many support queries and technical questions will already be answered in supporting
								documentation such as FAQ's and comments from previous buyers. Anim pariatur cliche
								reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
								moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
								laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
								single-origin coffee nulla assumenda shoreditch.
							</p>
							<p class="fs-15">
								Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
								richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
								brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor
							</p>
						</div>
						<ul class="d-flex text-capitalize">
							<li>
								<span class="color-light fs-13">Project owner</span>
								<p class="color-dark fs-14 mt-1 mb-0 fw-500">Peter Jackson</p>
							</li>
							<li>
								<span class="color-light fs-13">Budget</span>
								<p class="color-dark fs-14 mt-1 mb-0 fw-500">$56,700</p>
							</li>
							<li>
								<span class="color-light fs-13">Start Date</span>
								<p class="color-primary fs-14 mt-1 mb-0 fw-500">26 Dec 2019</p>
							</li>
							<li>
								<span class="color-light fs-13">Deadline</span>
								<p class="color-danger fs-14 mt-1 mb-0 fw-500">18 Mar 2020</p>
							</li>
						</ul>
					</div>
				</CardBody>
			</Card>
		</Col>

		<Col xxl={3} xl={5} class="mb-25">
			<Users />
		</Col>

		<Col xxl={8} xl={7} class="mb-25">
			<Card>
				<CardHeader class="p-0">
					<ul class="nav px-25 ap-tab-main app-ui-tab" id="project-ap-tab">
						<li class="nav-item">
							<a
								class="nav-link active"
								id="project-overview-tab"
								href={'#'}
								data-type="task-app"
								on:click={shiftTabs}>task list</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="project-timeline-tab"
								href={'#'}
								data-type="activities"
								on:click={shiftTabs}>Activities</a
							>
						</li>
					</ul>
				</CardHeader>
				<div class="w-100" id="projectContent">
					<svelte:component this={projectTabs[activeTab]} />
				</div>
			</Card>
		</Col>

		<Col xxl={4} xl={6} class="mb-25 files-order-n1">
			<Files />
		</Col>
	</Row>
</div>


<style lang="scss">
	:global{
		@import "../../../.././../src/assets/sass/mixins/media-queries";
		.files-order-n1{
			@include cms2(1368px){
				order: -1;
			}
			@include lg{
				order: 1;
			}
		}
	}
</style>