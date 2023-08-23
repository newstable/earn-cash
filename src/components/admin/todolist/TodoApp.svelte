<script>
	import {
		createTodos
	} from '@store/todoStore';
	import todoData from '@data/todo.json';
	import CardExtra from '$lib/components/cards/CardExtra.svelte';

	let todos = createTodos(todoData);

	export let header;
	export let todoStatus;
	export let description;
	export let todoLimit;

	export let trash = $todos.filter((item) => item.trash);
	export let completed = $todos.filter((item) => item.completed);
</script>

<div class="task-list-style">
	<div class="ninjadash-tassklist-wrap">
		{#if header !== ''}
			<div class="ninjadash-tasklist-head">
				<h2 class="ninjadash-tasklist-head__title">{header}</h2>
			</div>
		{/if}

		<div class="ninjadash-tasklist-body">
			{#if todoStatus === 'trash'}
				{#if trash.length}
					<ul class="ninjadash-tasklist">
						{#each $todos.filter((item) => item.trash) as todo}
							<li class="ninjadash-tasklist-item  d-flex align-items-center justify-content-between">
								<div class="ninjadash-tasklist-item__content">
									<div class="ninjadash-tasklist-item__title">
										<div class="checkbox-theme-default custom-checkbox custom-checkbox--success checkbox-group__single d-flex p-0 form-check">
											<input placeholder="" class="form-check-input" id="{todo.title}" type="checkbox" name="" value="" checked={!!todo.completed} disabled>
											<label for="{todo.title}" class="form-check-label">
												{todo.title}
												<span>{todo.time}</span>
											</label>
										</div>
									</div>

									{#if description}
										<div class="ninjadash-tasklist-item__text">
											<p>{todo.description}</p>
										</div>
									{/if}
								</div>
								
								<CardExtra />
							</li>
						{/each}
					</ul>
				{:else}
					<div class="ninjadash-tasklist-empty">
						<span>Sorry !! No Trash Item Found :(</span>
					</div>
				{/if}
			{:else if todoStatus === 'completed'}
				{#if completed.length}
					<ul class="ninjadash-tasklist">
						{#each $todos.filter((item) => item.completed) as todo}
							{#if !todo.trash}
								<li class="ninjadash-tasklist-item d-flex align-items-center justify-content-between">
									<div class="ninjadash-tasklist-item__content">
										<div class="ninjadash-tasklist-item__title">
											<div class="checkbox-group d-flex" on:change={() => todos.toggle(todo)}>
												<div class="checkbox-theme-default custom-checkbox custom-checkbox--success checkbox-group__single d-flex">
													<input class="checkbox" type="checkbox" id="{todo.title}" checked={!!todo.completed}>
													<label for="{todo.title}" class="fs-14 color-light">
														{todo.title}
														<span>{todo.time}</span>
													</label>
												</div>
											</div>
										</div>

										{#if description}
											<div class="ninjadash-tasklist-item__text">
												<p>{todo.description}</p>
											</div>
										{/if}
									</div>

									<CardExtra />
								</li>
							{/if}
						{/each}
					</ul>
				{:else}
					<div class="ninjadash-tasklist-empty">
						<span>Sorry !! No Completed Todo Found :(</span>
					</div>
				{/if}
			{:else}
				<div>
					{#if $todos.length}
						<ul class="ninjadash-tasklist">
							{#each $todos as todo}
								{#if !todo.trash}
									<li class="ninjadash-tasklist-item  d-flex align-items-center justify-content-between">
										<div class="ninjadash-tasklist-item__content">
											<div class="ninjadash-tasklist-item__title">
												<div class="checkbox-group d-flex" on:change={() => todos.toggle(todo)}>
													<div class="checkbox-theme-default custom-checkbox custom-checkbox--success checkbox-group__single d-flex">
														<input class="checkbox" type="checkbox" id="{todo.title}" checked={!!todo.completed}>
														<label for="{todo.title}" class="fs-14 color-light">
															{todo.title}
															<span>{todo.time}</span>
														</label>
													</div>
												</div>
											</div>

											{#if description}
												<div class="ninjadash-tasklist-item__text">
													<p>{todo.description}</p>
												</div>
											{/if}
										</div>
										<CardExtra />
									</li>
								{/if}
							{/each}
						</ul>
					{:else}
						<div class="ninjadash-tasklist-empty">
							<span>Sorry !! No Todo Found :(</span>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.ninjadash-tasklist {
		.ninjadash-tasklist-item{
			&:not(:last-child){
				margin-bottom: 16px;
			}
		}
	}
	.custom-checkbox input[type=checkbox]+label{
		color:var(--color-dark);
		font-weight:500;
		font-size:15px;
		span{
			font-size: 12px;
			font-weight: 400;
			color: var(--color-light);
			pointer-events: none;
			margin-top: 4px;
			display: flex;
		}
	}
</style>