<script>
	import Chartjs from './Chartjs.svelte';

	let height = 479;
	let labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let datasets = [
		{
			data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
			borderColor: '#001737',
			borderWidth: 1,
			fill: false
		},
		{
			data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
			borderColor: '#1ce1ac',
			borderWidth: 1,
			fill: false
		}
	];
	let id = 'myChart';
	let className = 'myChart';
	let legend = {
		display: false,
		labels: {
			display: false
		}
	};
	let layout = {};
	let elements = {
		line: {
			tension: 0.5,
			borderCapStyle: 'round',
			borderJoinStyle: 'round',
			capBezierPoints: true
		},
		point: {
			radius: 0,
			z: 5
		}
	};
	let scales = {
		y: {
			display: false
		},
		x: {
			display: false
		}
	};
	let tooltip = {};
	let options = {};

	export {
		height,
		labels,
		datasets,
		id,
		className,
		legend,
		layout,
		elements,
		scales,
		tooltip,
		options
	};
</script>

<div class="doughnutchart-inner">
	<div class="doughnutchart-inner-text">
		{#if datasets[0].centerText === ''}
			<span class="doughnutchart-inner-content">
				{datasets[0].data.reduce((a, b) => a + b, 0)}%
			</span>
		{:else}
			<span class="doughnutchart-inner-content">{datasets[0].centerText}</span>
		{/if}

		<span class="doughnutchart-inner-label">{datasets[0].centerTextLabel}</span>
	</div>

	<Chartjs
		type="doughnut"
		{height}
		{labels}
		{datasets}
		{id}
		{className}
		{legend}
		{layout}
		{elements}
		{scales}
		{tooltip}
		{options}
	/>
</div>

<style lang="scss">
	:global {
		.doughnutchart-inner {
			position: relative;
			.doughnutchart-inner-text {
				position: absolute;
				top: 50%;
				left: 50%;
				text-align: center;
				width: 200px;
				line-height: 1;
				margin-bottom: 0px;
				display: inline-block;
				transform: translate(-50%, -50%);
				.doughnutchart-inner-content {
					font-size: 30px;
					font-weight: 600;
					line-height: 1;
					color: var(--color-dark);
					display: block;
					@media only screen and (max-width: 480px) {
						font-size: 24px;
					}
				}
				.doughnutchart-inner-label {
					font-size: 15px;
					color: var(--color-dark);
					margin-top: 3px;
					display: block;
					@media only screen and (max-width: 480px) {
						font-size: 14px;
					}
				}
			}
			canvas {
				margin: 0 auto;
			}
			.salesOverview {
				@media only screen and (max-width: 480px) {
					height: 150px !important;
					width: auto !important;
				}
			}
		}
	}
</style>
