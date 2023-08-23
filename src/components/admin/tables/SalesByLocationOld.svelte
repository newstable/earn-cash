<script>
	let salesData;
	let period = 'today';
	export let dataPeriod = salesData[period];
</script>

<div class="table-responsive table-top-regions">
	<table class="table table--default table-borderless">
		<thead>
			<tr>
				<th>Top region</th>
				<th>order</th>
				<th>Revenue</th>
			</tr>
		</thead>
		<tbody>
			{#each dataPeriod as data}
				<tr>
					<td>{data.location}</td>
					<td>{data.order}</td>
					<td>{data.revenue}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	@import '../../../assets/sass/mixins/media-queries';
	@import '../../../assets/sass/mixins/functions';

	:global{
		.sales-location{
			.card-body{
				padding: 30px 25px 52px 25px;
			}
			.table-top-regions{
				min-height: 278px !important;
			}
			table{
				td{
					padding: 7px 20px !important;
				}
			}
		}
	};
	.table-top-regions {
		border: 1px solid var(--border-color);
		max-height: 280px;
		max-width: 466px;
		overflow-y: auto;

		&::-webkit-scrollbar {
			width: 12px;
			background-color: var(--bg-white);
		}

		&::-webkit-scrollbar-thumb {
			border: 4px solid var(--bg-white);
			background-clip: padding-box;
			border-radius: 9999px;
			background-color: #ccc;
		}

		@include xxl {
			max-width: 400px;
		}

		@include sm {
			margin: 0 auto 25px;
		}

		table {
			margin-bottom: 0;

			thead {
				background: var(--bg-normal);
			}

			th {
				padding: 11px 20px;
				color: var(--color-light);
				font-size: 12px;
				font-weight: 500;
				line-height: 19px;
				text-transform: uppercase;
				border-bottom: 1px solid var(--border-color);
				&:nth-last-child(2),
				&:last-child{
					text-align: end;
				}
				@include xs{
                    padding: 10px;
                }
			}

			td {
				padding:12px 20px;
				font-size: 14px;
				line-height: lh(14px, 28px);
				font-weight: 400;
				color: var(--color-dark);
				@include xs{
                    padding: 10px;
                }
				&:nth-last-child(2n),
				&:last-child{
					text-align: end;
				}
			}

			tbody {
				tr {
					&:first-child {
						td {
							padding-top: 20px;
						}
					}

					&:last-child {
						td {
							padding-bottom: 20px;
						}
					}

					td:first-child {
						font-size: 15px;
						font-weight: 500;
						color: var(--color-dark);
					}
				}
			}
		}
	}
</style>
