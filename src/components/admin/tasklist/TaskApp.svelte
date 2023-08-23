<script>
	import { Input, Button, Modal, ModalBody, ModalHeader } from 'sveltestrap';
	import { createTasks } from '@store/taskStore';
	import taskData from '@data/task.json';

	export let taskLimit = 5;
	export let header;
	export let taskStatus;
	export let description;
	export let actionBtn = false;

	let open = false;
	const toggle = () => (open = !open);

	let slicedData = taskData.slice(0, taskLimit);
	let taskDataSorted = slicedData;
	let newTask = [];

	/* Add Todo */
	let defaultId = 8;
	function addTask(e) {
		e.preventDefault();
		const id = defaultId++;
		const title = document.querySelector('#add-task-input').value;
		newTask.push({ id, title, favorite: false, completed: false });
		taskDataSorted = [...slicedData, ...newTask];
		toggle();
	}
	$: tasks = createTasks(taskDataSorted);
	let favorite = taskDataSorted.filter((item) => item.favorite);
	let completed = taskDataSorted.filter((item) => item.completed);
</script>

<div class="task-list-style {actionBtn ? 'task-list-style--action' : ''}">
	<div class="ninjadash-tassklist-wrap">
		{#if header !== ''}
			<div class="ninjadash-tasklist-head">
				<h2 class="ninjadash-tasklist-head__title">{header}</h2>
			</div>
		{/if}

		<div class="ninjadash-tasklist-body">
			{#if taskStatus === 'favorite'}
				{#if favorite.length}
					<ul class="ninjadash-tasklist">
						{#each $tasks.filter((item) => item.favorite) as task}
							<!-- {#each favorite as item} -->
							<li class="ninjadash-tasklist-item">
								<div class="ninjadash-tasklist-item__content">
									<div class="ninjadash-tasklist-item__title">
										<Input
											type="checkbox"
											checked={!!task.completed}
											on:change={() => tasks.toggle(task)}
											label={task.title}
											id={task.id}
											class="checkbox-theme-default custom-checkbox custom-checkbox--success checkbox-group__single d-flex p-0"
										/>
									</div>

									{#if description}
										<div class="ninjadash-tasklist-item__text">
											<p>{task.description}</p>
										</div>
									{/if}
								</div>
								<div class="ninjadash-tasklist-item__action">
									<a class="ninjadash-edit" href={'#'}>
										<i class="uil uil-edit" />
									</a>
									<a
										href={'#'}
										class={`${
											task.favorite ? 'task-favourite task-favorite--active' : 'task-favourite'
										}`}
										on:click|preventDefault={() => tasks.favorite(task)}
									>
										<i class="uil uil-star" />
									</a>
									<a
										class="ninjadash-delete"
										href={'#'}
										on:click|preventDefault={() => tasks.remove(task)}
									>
										<i class="uil uil-times" />
									</a>
								</div>
							</li>
						{/each}
						<!-- {/each} -->
					</ul>
				{:else}
					<div class="ninjadash-tasklist-empty">
						<span>Sorry !! No Favorite Task Found :(</span>
					</div>
				{/if}
			{:else if taskStatus === 'completed'}
				{#if completed.length}
					<ul class="ninjadash-tasklist">
						{#each $tasks.filter((item) => item.completed) as task}
							<!-- {#each completed as item} -->
							<li class="ninjadash-tasklist-item">
								<div class="ninjadash-tasklist-item__content">
									<div class="ninjadash-tasklist-item__title">
										<Input
											type="checkbox"
											checked={!!task.completed}
											on:change={() => tasks.toggle(task)}
											label={task.title}
											id={task.id}
											class="checkbox-theme-default custom-checkbox custom-checkbox--success checkbox-group__single d-flex p-0"
										/>
									</div>

									{#if description}
										<div class="ninjadash-tasklist-item__text">
											<p>{task.description}</p>
										</div>
									{/if}
								</div>
								<div class="ninjadash-tasklist-item__action">
									<a class="ninjadash-edit" href={'#'}>
										<i class="uil uil-edit" />
									</a>
									<a
										href={'#'}
										class={`${
											task.favorite ? 'task-favourite task-favorite--active' : 'task-favourite'
										}`}
										on:click|preventDefault={() => tasks.favorite(task)}
									>
										<i class="uil uil-star" />
									</a>
									<a
										class="ninjadash-delete"
										href={'#'}
										on:click|preventDefault={() => tasks.remove(task)}
									>
										<i class="uil uil-times" />
									</a>
								</div>
							</li>
						{/each}
					</ul>
				{:else}
					<div class="ninjadash-tasklist-empty">
						<span>Sorry !! No Completed Task Found.</span>
					</div>
				{/if}
			{:else}
				<div>
					{#if $tasks.length}
						<ul class="ninjadash-tasklist">
							{#each $tasks as task}
								<!-- {#each $tasks.filter((t) => !t.done) as task (task.id)} -->
								<li class="ninjadash-tasklist-item">
									<div class="ninjadash-tasklist-item__content">
										<div class="ninjadash-tasklist-item__title">
											<Input
												type="checkbox"
												checked={!!task.completed}
												on:change={() => tasks.toggle(task)}
												label={task.title}
												id={task.id}
												class="checkbox-theme-default custom-checkbox custom-checkbox--success checkbox-group__single d-flex p-0"
											/>
										</div>

										{#if description}
											<div class="ninjadash-tasklist-item__text">
												<p>{task.description}</p>
											</div>
										{/if}
									</div>
									<div class="ninjadash-tasklist-item__action">
										<a class="ninjadash-edit" href={'#'}>
											<i class="uil uil-edit" />
										</a>
										<a
											href={'#'}
											class={`${
												task.favorite ? 'task-favourite task-favorite--active' : 'task-favourite'
											}`}
											on:click|preventDefault={() => tasks.favorite(task)}
										>
											<i class="uil uil-star" />
										</a>
										<a
											class="ninjadash-delete"
											href={'#'}
											on:click|preventDefault={() => tasks.remove(task)}
										>
											<i class="uil uil-times" />
										</a>
									</div>
								</li>
							{/each}
						</ul>
						{#if actionBtn}
							<div class="task-list-btn px-25 mb-25">
								<Button
									color="primary"
									class="btn-default btn-squared btn-transparent-primary radius-xs fs-15 fw-400 text-capitalize"
									on:click={toggle}
								>
									<i class="uil uil-plus me-1 fs-16" /> Add New Task
								</Button>
							</div>
							<div class="add-todo-modal">
								<Modal isOpen={open} {toggle}>
									<ModalHeader {toggle} class="add-todo-header">
										<h6 class="modal-title add-todo-title">Add New Todo</h6>
									</ModalHeader>
									<ModalBody>
										<div class="add-todo-form">
											<form action="/">
												<div class="form-group">
													<input
														type="text"
														class="form-control form-control-lg"
														id="add-task-input"
														name="todo-text"
														placeholder="Write your task"
													/>
												</div>
												<div class="form-group mb-0 mt-15">
													<Button color="primary" size="lg" on:click={addTask}>Add Task</Button>
												</div>
											</form>
										</div>
									</ModalBody>
								</Modal>
							</div>
						{/if}
					{:else}
						<div class="ninjadash-tasklist-empty">
							<span>Sorry! No Task Found.</span>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	:global {
		@import '../../../assets/sass/components/checkbox';
		.task-list {
			.card-body {
				padding: 0 0 17px 0;
			}
		}
	}
	@import '../../../../src/assets/sass/mixins/media-queries';
	.task-list-style--action {
		margin-left: 10px;
		@include xs {
			margin-left: 0;
		}
		.ninjadash-tasklist-body {
			.ninjadash-tasklist {
				.ninjadash-tasklist-item {
					padding: 9px 15px 9px 25px;
				}
			}
		}
	}

	.ninjadash-tassklist-wrap {
		/* background-color: #fff; */
		border-radius: 10px;
		min-height: 220px;
	}
	.ninjadash-tasklist-head {
		.ninjadash-tasklist-head__title {
			font-size: 16px;
			font-weight: 500;
			padding: 15px 30px;
			margin-bottom: 0;
			border-bottom: 1px solid var(--border-light);
		}
	}
	.ninjadash-tasklist-body {
		.ninjadash-tasklist {
			padding: 15px 0 21px;
			.ninjadash-tasklist-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 9px 0;
				@include xs {
					flex-direction: column;
					align-items: flex-start;
					.ninjadash-tasklist-item__action {
						margin-top: 5px;
						margin-left: 30px;
					}
				}
			}
			.ninjadash-tasklist-item__title {
				font-size: 16px;
				color: var(--color-dark);

				:global {
					.custom-checkbox {
						label {
							font-weight: 400;
							color: var(--color-gray);
							font-size: 15px;
						}
						input:checked ~ label {
							text-decoration: line-through;
						}
					}
				}
			}
			.ninjadash-tasklist-item__text {
				p {
					font-size: 14px;
					font-weight: 400;
					color: var(--color-gray);
					&:last-child {
						margin-bottom: 0;
					}
				}
			}
			.ninjadash-tasklist-item__action {
				display: flex;
				align-items: center;
				justify-content: center;
				min-width: 20px;
				@include cms2(1368px) {
					min-width: 118px;
					justify-content: flex-end;
				}
				@media only screen and (max-width: 575px) {
					margin-top: 0;
				}
				i {
					color: var(--color-lighten);
					font-size: 18px;
				}
				.ninjadash-delete {
					i {
						color: var(--color-lighten);
						font-size: 14px;
						&:hover {
							color: var(--color-danger);
						}
					}
				}
				.task-favourite {
					line-height: 1;
					i {
						color: var(--color-lighten);
					}
					&.task-favorite--active {
						i {
							color: var(--color-warning);
						}
					}
					i {
						position: relative;
						top: -2px;
						width: 16px;
						height: 16px;
					}
				}
				a {
					display: inline-block;
					margin: 0 10px;
					&:last-child {
						margin-right: 0;
					}
					@media only screen and (max-width: 575px) {
						margin: 0 3px;
					}
					@media only screen and (max-width: 499px) {
						&:first-child {
							margin-left: 0;
						}
					}
				}
				.task-favourite {
					cursor: pointer;
				}
				a {
					display: inline-block;
					margin: 0 10px;
				}
				.ninjadash-edit {
					&:hover {
						i {
							color: var(--color-info);
						}
					}
				}
				.ninjadash-delete {
					&:hover {
						i {
							color: var(--color-danger);
						}
					}
				}
			}
		}
		.ninjadash-tasklist-empty {
			min-height: 215px;
			display: flex;
			align-items: center;
			justify-content: center;
			span {
				font-size: 18px;
				font-weight: 500;
				color: var(--color-light);
			}
		}
	}
</style>
