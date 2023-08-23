<script>
	import { onMount } from 'svelte';
	let radialbarChart;

	const labels = ['Target', 'Completed', 'In Progress'];
	const radialbarConfig = {
		series: [90],
		colors: ['#8231D3', '#00AAFF', '#FA8B0C'],
		chart: {
			width: '100%',
			height: 245,
			type: 'radialBar',
		},
		legend: {
			show: false
		},
		plotOptions: {
            radialBar: {
                hollow: {
                    margin: 15,
                    size: "70%",
                },

                dataLabels: {
                    showOn: "always",
                    style: {
                        fontFamily: 'Jost, sans-serif',
                    },
                    name: {
                        show: false,
                    },
                    value: {
                        color: "currentColor",
                        fontSize: "45px",
                        fontWeight: "600",
                        offsetY: 20,
                        show: true,
                        formatter: function (val) {
                            return val + '%'
                        }
                    },
                    track: {
                        background: "rgba(130,49,211, .10)",
                    },
                }
            }
        },
		colors: ["currentColor"],
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                gradientToColors: ["currentColor"],
                stops: [0, 100]
            }
        },
		grid: {
			padding: {
				to: 0,
				right: 0,
				bottom: 0,
				left: 0
			}
		},
		stroke: {
            lineCap: "round",
        },
	};
	onMount(async () => {
		const ApexCharts = (await import('apexcharts')).default;

		const chartRadialbar = new ApexCharts(radialbarChart, radialbarConfig);
		
		chartRadialbar.render();
	});
</script>

<div>
	<div class="storage color-primary">
		<div class="storage">
			<div bind:this={radialbarChart} />
		</div>
	  </div>
</div>

<style lang="scss">
</style>