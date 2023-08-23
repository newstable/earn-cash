<script>
	import { onMount } from 'svelte';
	import { Row, Col } from 'sveltestrap';
	import Chartjs from '@components/utilities/Chartjs.svelte';

	let innerWidth,
		primaryColor,
		primaryColorRGB,
		secondaryColor,
		secondaryColorRGB,
		successColor,
		successColorRGB;

	onMount(() => {
		innerWidth = window.innerWidth;
		primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
		primaryColorRGB = getComputedStyle(document.documentElement).getPropertyValue(
			'--color-primary-rgba'
		);
		secondaryColor = getComputedStyle(document.documentElement).getPropertyValue(
			'--color-secondary'
		);
		secondaryColorRGB = getComputedStyle(document.documentElement).getPropertyValue(
			'--color-secondary-rgba'
		);
		successColor = getComputedStyle(document.documentElement).getPropertyValue('--color-success');
		successColorRGB = getComputedStyle(document.documentElement).getPropertyValue(
			'--color-success-rgba'
		);
	});

	$: contents = [
		{
			id: 1,
			total: '3,245',
			label: 'Orders',
			growthStatus: 'up',
			growthRate: '25%',
			chartData: [
				{
					data: [35, 55, 25, 60, 42, 80, 35],
					backgroundColor: `rgba(${primaryColorRGB},0.1)`,
					hoverBackgroundColor: primaryColor,
					label: 'Orders',
					barPercentage: 1,
					categoryPercentage: 1,
					maxBarThickness: 13,
					barThickness: 13
				}
			]
		},
		{
			id: 2,
			total: '$72,482',
			label: 'Total Revenue',
			growthStatus: 'up',
			growthRate: '17%',
			chartData: [
				{
					data: [34, 64, 52, 80, 44, 58, 53],
					backgroundColor: `rgba(${secondaryColorRGB},0.1)`,
					hoverBackgroundColor: secondaryColor,
					label: 'Total Revenue',
					barPercentage: 1,
					categoryPercentage: 1,
					maxBarThickness: 13,
					barThickness: 13
				}
			]
		},
		{
			id: 3,
			total: '1,341',
			label: 'Product Sold',
			growthStatus: 'down',
			growthRate: '16%',
			chartData: [
				{
					data: [65, 44, 36, 55, 48, 78, 42],
					backgroundColor: `rgba(${successColorRGB},0.1)`,
					hoverBackgroundColor: successColor,
					label: 'Product Sold',
					barPercentage: 1,
					categoryPercentage: 1,
					maxBarThickness: 13,
					barThickness: 13
				}
			]
		}
	];

	const tooltip = {
		callbacks: {
			label(t) {
				const dstLabel = t.dataset.label;
				const { formattedValue } = t;
				return `  ${formattedValue} ${dstLabel}`;
			},
			labelColor(t) {
				return {
					backgroundColor: t.dataset.hoverBackgroundColor,
					borderColor: 'transparent'
				};
			}
		}
	};

	const data = [35, 55, 25, 60, 42, 80, 35];
	const labels = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

	$: scales = {
		y: {
			grid: {
				drawTicks: false,
				drawBorder: false,
				borderWidth: 0,
				display: false
			},
			ticks: {
				display: false
			}
		},

		x: {
			grid: {
				drawTicks: false,
				drawBorder: false,
				borderWidth: 0,
				display: false
			},
			ticks: {
				display: false
			}
		}
	};
</script>

<Row>
	{#each contents as item}
		<Col xxl={4} md={6} class="mb-25">
			<div class="ap-po-details radius-xl d-flex justify-content-between">
				<div>
					<div class="overview-content">
						<h1>{item.total}</h1>
						<p>{item.label}</p>
						<div class="ap-po-details-time">
							<span class="color-{item.growthStatus === 'up' ? 'success' : 'danger'}">
								<i class="uil uil-arrow-{item.growthStatus === 'up' ? 'up' : 'down'}" />
								<strong>{item.growthRate}</strong>
							</span>
							<small>Since last week</small>
						</div>
					</div>
				</div>
				<div class="ap-po-timeChart">
					<div class="overview-single__chart d-md-flex align-items-end">
						<div class="parentContainer">
							<Chartjs
								className="overviewChart"
								id={`overviewChart-${item.id}`}
								{labels}
								datasets={item.chartData}
								type="bar"
								{tooltip}
								{scales}
								height={innerWidth <= 1399 ? 60 : 94}
							/>
						</div>
					</div>
				</div>
			</div>
		</Col>
	{/each}
</Row>

<style lang="scss">
	:global {
		.overviewChart {
			width: 130px;
		}
	}
</style>
