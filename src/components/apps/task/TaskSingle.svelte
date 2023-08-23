<script>
	export let tasks;
	export let task;
</script>

<div class="task-single">
	<div class="task-card__content d-flex justify-content-between align-items-center">
		<div class="task-card__header">
			<div class="checkbox-group d-flex">
				<div class="checkbox-theme-default custom-checkbox checkbox-group__single d-flex">
					<input
						type="checkbox"
						checked={!!task.completed}
						on:change={() => tasks.toggle(task)}
						label={task.title}
						id={task.id}
						class="checkbox"
					/>
					<label for={task.id} class=""> {task.title}</label>
				</div>
			</div>
			<span>{task.description}</span>
		</div>
		<div class="table-actions">
			<a href="/" on:click|preventDefault>
				<img class="svg" alt="" src={'/img/svg/edit.svg'} />
			</a>
			<a href="/" on:click|preventDefault={() => tasks.favorite(task)}>
				{#if task.favorite}
					<img class="svg" alt="" src={'/img/svg/star-solid.svg'} />
				{:else}
					<img class="svg" alt="" src={'/img/svg/star.svg'} />
				{/if}
			</a>
			<a href="/" on:click|preventDefault={() => tasks.remove(task)}>
				<img class="svg" alt="" src={'/img/svg/trash-2.svg'} />
			</a>
		</div>
	</div>
</div>
