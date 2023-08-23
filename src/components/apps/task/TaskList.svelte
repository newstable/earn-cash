<script>
	import {
		Card,
		CardHeader,
		CardBody
	} from 'sveltestrap';
	import {
		createTasks
	} from '@store/taskStore';
	import taskData from '@data/task.json';
	import TaskSingle from './TaskSingle.svelte';

	let slicedData = taskData;
	export let taskDataSorted = slicedData;
	export let taskStatus;

	$: tasks = createTasks(taskDataSorted);
	let favorite = taskDataSorted.filter((item) => item.favorite);
	let completed = taskDataSorted.filter((item) => item.completed);
</script>

<div class="task-grid-wrapper mb-30">
	<div class="task-wrapper">
		<Card class="task-card">
			<CardHeader>Task Lists</CardHeader>
			<CardBody class="task-card__body">
				{#if taskStatus === 'favorite'}
					{#if favorite.length}
						{#each $tasks.filter((item) => item.favorite) as task}
							<TaskSingle {tasks} {task} />
						{/each}
					{:else}
						<div class="task-single">
							<div class="task-card__content d-flex justify-content-between align-items-center">
								<div class="tasklist-empty">
							<span>Sorry !! No Favorite Task Found :(</span>
						</div>
							</div>
						</div>
						
					{/if}
				{:else if taskStatus === 'completed'}
					{#if completed.length}
						{#each $tasks.filter((item) => item.completed) as task}
							<TaskSingle {tasks} {task} />
						{/each}
					{:else}
					<div class="task-single">
						<div class="task-card__content d-flex justify-content-between align-items-center">
							<div class="tasklist-empty">
								<span>Sorry !! No Completed Task Found.</span>
							</div>
						</div>
					</div>
						
					{/if}
				{:else if $tasks.length}
					{#each $tasks as task}
						<TaskSingle {tasks} {task} />
					{/each}
				{:else}
				<div class="task-single">
					<div class="task-card__content d-flex justify-content-between align-items-center">
						<div class="ninjadash-tasklist-empty">
							<span>Sorry! No Task Found.</span>
						</div>
					</div>
				</div>
					
				{/if}
			</CardBody>
		</Card>
	</div>
</div>