<script>
	import { Card, CardBody } from 'sveltestrap';

	const summaryCard = [
		{
			icon: 'at.svg',
			total: '47',
			label: 'Total Task',
			type: 'primary'
		},
		{
			icon: 'at2.svg',
			total: '34',
			label: 'Task Completed',
			type: 'secondary'
		},
		{
			icon: 'at4.svg',
			total: '$27,500',
			label: 'Spendings',
			type: 'success'
		},
		{
			icon: 'at3.svg',
			total: '250',
			label: 'Hours Spent',
			type: 'warning'
		}
	];
</script>

<Card class="mt-25">
	<CardBody>
		{#each summaryCard as item}
			<div class="application-task d-flex align-items-center mb-25">
				<div class="application-task-icon wh-60 bg-opacity-{item.type} content-center">
					<img class="svg wh-25 text-{item.type}" alt="" src={`/img/svg/${item.icon}`} />
				</div>
				<div class="application-task-content">
					<h4>{item.total}</h4>
					<span class="text-light fs-14 mt-1 text-capitalize">{item.label}</span>
				</div>
			</div>
		{/each}
	</CardBody>
</Card>
