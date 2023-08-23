<script>
	import { Card, CardBody } from 'sveltestrap';

	export let notes;
</script>

<div class="note-grid">
	{#each $notes as note}
		<div class="note-single">
			<div class="note-card note-{note.label}">
				<Card class="border-0">
					<CardBody>
						<h4 class="note-title">{note.title} <span class="note-status" /></h4>
						<p class="note-excerpt">{note.description}</p>
						<div class="note-action">
							<div class="note-action__left">
								<a href={'#'} on:click|preventDefault={() => notes.favorite(note)}>
									{#if note.starred}
										<img class="svg" alt="" src={'/img/svg/star-solid.svg'} />
									{:else}
										<img class="svg" alt="" src={'/img/svg/star.svg'} />
									{/if}
								</a>
								<a href={'#'} on:click|preventDefault={() => notes.remove(note)}>
									<img class="svg" alt="" src={'/img/svg/trash-2.svg'} />
								</a>
							</div>
							<div class="note-action__right">
								<div class="label-dropdown dropdown dropdown-hover">
									<a class="btn-link" href={'#'}
										><img class="svg" alt="" src={'/img/svg/more-vertical.svg'} /></a
									>
									<div class="dropdown-default">
										<a class="nl-personal dropdown-item" href={'#'}>Personal</a>
										<a class="nl-work dropdown-item" href={'#'}>Work</a>
										<a class="nl-social dropdown-item" href={'#'}>Socail</a>
										<a class="nl-important dropdown-item" href={'#'}>Important</a>
									</div>
								</div>
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
		</div>
	{/each}
</div>
