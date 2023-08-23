<script>
	export let counter = '21k';
	export let text = 'Total Products';
	export let icon = 'briefcase-alt';
	export let type = 'primary';
</script>

<div class="overview-content overview-content4 text-center radius-xl rony">
	<div class="d-inline-flex flex-column align-items-center justify-content-center">
		<div class="revenue-chart-box__Icon order-bg-opacity-{type}">
			<i class="uil uil-{icon}" />
		</div>
		<div class="d-flex align-items-start flex-wrap">
			<div class="mt-3">
				<p class="mb-1 mb-0 color-gray fs-15">{text}</p>
				<h1>{counter}</h1>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.overview-content {
		background-color: var(--color-white);
	}
	.overview-content4 {
		padding: 22px 0;
		box-shadow: 0 5px 20px rgba(var(--light-gray-rgba), 0.05);
		.revenue-chart-box__Icon {
			i {
				font-size: 30px;
			}
		}
	}
	.revenue-chart-box__Icon {
		width: 60px;
		height: 60px;
		min-width: 60px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 8px;
		&.order-bg-opacity-primary {
			svg,
			i {
				color: var(--color-primary);
			}
		}
		&.order-bg-opacity-info {
			svg,
			i {
				color: var(--color-info);
			}
		}
	}
</style>
