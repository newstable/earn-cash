<script>
	import { Card, CardHeader, CardBody } from 'sveltestrap';
	import Chartjs from '@components/utilities/Chartjs.svelte';
	import { chartLinearGradient, customTooltips } from '@components/utilities/utilities';
	import CardExtra from '@components/cards/CardExtra.svelte';
	import { onMount } from 'svelte';
	let revenue = 'today';
	let isLoading = false;

	let innerWidth;
	let primaryColor;
	let primaryColorRGB;
	onMount(() => {
		primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
		primaryColorRGB = getComputedStyle(document.documentElement).getPropertyValue(
			'--color-primary-rgba'
		);
		innerWidth = window.innerWidth;
	});

	const tooltip = {
		callbacks: {
			title() {
				return `Total Revenue`;
			},
			label(t) {
				const { formattedValue, dataset } = t;
				return `${formattedValue}k ${dataset.label}`;
			}
		}
	};

	let salesRevenue = {
		today: {
			current: [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65],
			pervious: [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55],
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		}
	};
	$: salesRevenueDatasets = [
		{
			data: salesRevenue[revenue].current,
			borderColor: primaryColor,
			borderWidth: 4,
			fill: true,
			backgroundColor: () =>
				chartLinearGradient(document.getElementById('ninjadash-sales-revenue'), 300, {
					start: `rgba(${primaryColorRGB},0.3)`,
					end: 'rgba(255,255,255,0.05)'
				}),
			label: 'Current period',
			pointStyle: 'circle',
			pointRadius: '0',
			hoverRadius: '6',
			pointBorderColor: '#fff',
			pointBackgroundColor: primaryColor,
			hoverBorderWidth: 2,
			lineTension: 0.5
		},
		{
			data: salesRevenue[revenue].pervious,
			borderColor: '#C6D0DC',
			borderWidth: 2,
			fill: false,
			backgroundColor: '#00173750',
			label: 'Pervious period',
			pointStyle: 'circle',
			pointRadius: '0',
			hoverRadius: '0',
			pointBorderColor: '#fff',
			pointBackgroundColor: '#C6D0DC',
			hoverBorderWidth: 2,
			lineTension: 0.4,
			borderDash: [3, 3]
		}
	];

	$: lineChartLayout = {
		padding: {
			left: -15,
			right: 0,
			top: 0,
			bottom: 0
		}
	};

	const scales = {
		y: {
			grid: {
				color: '#E3E6EF',
				borderDash: [3, 3],
				zeroLineColor: '#E3E6EF',
				zeroLineWidth: 1,
				zeroLineBorderDash: [3, 3],
				drawTicks: false,
				drawBorder: false
			},
			ticks: {
				beginAtZero: true,
				font: {
					size: 14,
					family:"'Jost', sans-serif",
				},
				color: '#747474',
				Min: 0,
				Max: 80,
				stepSize: 20,
				padding: 15,
				callback(label) {
					return `${label}k`;
				}
			}
		},

		x: {
			grid: {
				display: true,
				zeroLineWidth: 0,
				drawTicks: true,
				drawBorder: false,
				zeroLineColor: '#E3E6EF',
				color: 'transparent',
				z: 1,
				tickMarkLength: 0
			},
			ticks: {
				beginAtZero: true,
				font: {
					size: 14,
					family:"'Jost', sans-serif",
				},
				color: '#747474'
			}
		}
	};

	let tooltipss = {
		custom: customTooltips,
		...tooltip
	};
</script>

<Card>
	<CardHeader class="text-capitalize px-md-25 px-3">
		<h6>General Statistics</h6>
		<CardExtra />
	</CardHeader>
	<CardBody>
		<div class="ap-statistics-charts">
			{#if !isLoading}
				<div class="parentContainer">
					<Chartjs
						type="line"
						id="ninjadash-sales-revenue"
						className="ninjadash-sales-revenue"
						labels={salesRevenue[revenue].labels}
						datasets={salesRevenueDatasets}
						{scales}
						layout={lineChartLayout}
						height={innerWidth < 1399 ? (innerWidth < 575 ? 200 : 150) : 67}
						{tooltip}
					/>
				</div>
			{:else}
				<div class="ninjadash-sales-revenue-loading"><a-spin /></div>
			{/if}
		</div>
	</CardBody>
</Card>

<style lang="scss">
</style>
