<script>
	import {
		Chart,
		ArcElement,
		LineElement,
		BarElement,
		PointElement,
		BarController,
		BubbleController,
		DoughnutController,
		LineController,
		PieController,
		PolarAreaController,
		RadarController,
		ScatterController,
		CategoryScale,
		LinearScale,
		LogarithmicScale,
		RadialLinearScale,
		TimeScale,
		TimeSeriesScale,
		Decimation,
		Filler,
		Legend,
		Title,
		Tooltip,
		SubTitle
	} from 'chart.js';

	import { onMount } from 'svelte';
	import { customTooltips } from './utilities';

	export let type = 'bar';
	export let className = 'line';
	export let id = 'bar';
	export let style = 'margin-bottom: "20px"';
	export let labels = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	export let height = 479;
	export let scales = {
		y: {
			beginAtZero: true,
			grid: {
				color: '#485e9029',
				borderDash: [3, 3],
				zeroLineColor: '#485e9029',
				zeroLineWidth: 1,
				drawTicks: false,
				drawBorder: false,
				borderWidth: 0
			},
			ticks: {
				beginAtZero: true,
				font: {
					size: 14,
					family:"'Jost', sans-serif",
				},
				color: '#747474',
				max: 80,
				stepStartValue: 5,
				stepSize: 20,
				padding: 10,
				callback(label) {
					return `${label}k`;
				}
			}
		},
		x: {
			grid: {
				display: false,
				zeroLineWidth: 0,
				drawTicks: true,
				drawBorder: false,
				color: 'transparent',
				z: 1
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
	export let datasets = [
		{
			data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
			backgroundColor: '#001737',
			barPercentage: 0.6,
			label: 'Profit'
		},
		{
			data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
			backgroundColor: '#1ce1ac',
			barPercentage: 0.6,
			label: 'Lose'
		}
	];
	export let layout = {};
	export let legend = {
		display: false,
		labels: {
			display: false,
			position: 'center'
		}
	};
	export let elements = {
		line: {
			tension: 0.4,
			borderCapStyle: 'round',
			borderJoinStyle: 'round',
			capBezierPoints: true
		},
		point: {
			radius: 0,
			z: 5
		}
	};
	export let options = {};
	export let tooltip = {
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

	onMount(async () => {
		Chart.register(
			ArcElement,
			LineElement,
			BarElement,
			PointElement,
			BarController,
			BubbleController,
			DoughnutController,
			LineController,
			PieController,
			PolarAreaController,
			RadarController,
			ScatterController,
			CategoryScale,
			LinearScale,
			LogarithmicScale,
			RadialLinearScale,
			TimeScale,
			TimeSeriesScale,
			Decimation,
			Filler,
			Legend,
			Title,
			Tooltip,
			SubTitle
		);
		//let type, datasets, options, labels, id, tooltip, scales, elements, legend, layout;
		setTimeout(() => {
			const chartElement = document.getElementById(`${id}`);
			new Chart(chartElement, {
				type,
				data: {
					labels,
					datasets
				},
				options: {
					responsive: true,
					maintainAspectRatio: true,
					layout,
					hover: {
						mode: 'index',
						intersect: false
					},
					plugins: {
						legend,
						tooltip: {
							yAlign: 'bottom',
							mode: 'index',
							intersect: false,
							backgroundColor: '#ffffff',
							boxShadow: '0 8px 5px #A0A0A015',
							position: 'average',
							titleColor: '#A0A0A0',
							color: '#A0A0A0',
							titleFontSize: 12,
							titleSpacing: 10,
							bodyColor: '#404040',
							bodyFontSize: 11,
							bodyFontStyle: 'normal',
							bodyFontFamily: "'Jost', sans-serif",
							borderColor: '#F1F2F6',
							usePointStyle: true,
							borderWidth: 1,
							bodySpacing: 10,
							padding: {
								x: 10,
								y: 8
							},
							z: 999999,
							enabled: false,
							external: customTooltips,
							...tooltip
						}
					},
					elements,
					scales,
					...options
				}
			});
		}, 20);
	});
</script>

<canvas class={className} {id} {style} {height} />
