<script>
	import { Card, CardBody, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'sveltestrap';

	export let taskActiveTab;
	export let handleTabActivation;
	export let addTask;
	export let showModal;
	export let toggleModal;
</script>

<div class="task-sidebar-wrapper mb-30">
	<div class="task-sidebar">
		<Card class="border-0 shadow-none">
			<CardBody class="px-15 pt-30">
				<div class="px-3">
					<Button
						color="primary"
						size="default"
						class="btn-default btn-block btn-rounded fs-14"
						on:click={toggleModal}
					>
						<img class="svg" alt="" src={'/img/svg/plus.svg'} />
						Add Tasks</Button
					>
				</div>
				<div class="task-types">
					<ul class="mb-3" id="pills-tab">
						<li class="nav-item">
							<a
								class="nav-link {taskActiveTab === 'all' ? 'active' : ''}"
								id="pills-home-tab"
								href="/"
								on:click|preventDefault={(e) => handleTabActivation('all', e)}
							>
								<img class="svg" alt="" src={'/img/svg/edit.svg'} /> All
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link {taskActiveTab === 'favorite' ? 'active' : ''}"
								id="pills-profile-tab"
								href="/"
								on:click|preventDefault={(e) => handleTabActivation('favorite', e)}
							>
								<img class="svg" alt="" src={'/img/svg/star.svg'} />
								Favorite
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link {taskActiveTab === 'completed' ? 'active' : ''}"
								id="pills-contact-tab"
								href="/"
								on:click|preventDefault={(e) => handleTabActivation('completed', e)}
							>
								<img class="svg" alt="" src={'/img/svg/check.svg'} />
								Completed
							</a>
						</li>
					</ul>
				</div>
			</CardBody>
		</Card>
	</div>
</div>

<Modal isOpen={showModal} {toggleModal} class="task-modal">
	<ModalHeader {toggleModal}>
		Add Task
		<Button size="default" class="close" on:click={toggleModal}>
			<i class="uil uil-times" />
		</Button>
	</ModalHeader>
	<ModalBody>
		<form action="/">
			<div class="form-group mb-20">
				<input type="text" class="form-control" id="add-task-input" placeholder="Title" />
			</div>
			<div class="form-group">
				<textarea class="form-control" id="add-task-textarea" placeholder="Add description" />
			</div>
		</form>
	</ModalBody>
	<ModalFooter>
		<Button color="outline-light" on:click={toggleModal}>Cancel</Button>
		<Button color="primary" on:click={addTask}>Add Task</Button>
	</ModalFooter>
</Modal>

<style lang="scss">
	:global {
		@import url('../../../../assets/sass/mixins/_media-queries.scss');
		@import url('../../../../assets/sass/mixins/function.scss');
		@import url('../../../../assets/sass/mixins/rfs.scss');
		@import url('../../../../assets/sass/mixins/task-app.scss');
	}
</style>
