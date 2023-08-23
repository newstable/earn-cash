<script>
	export let dataPeriod;
</script>

<div class="selling-table-wrap selling-table-wrap__top-product table-responsive">
	<table class="table-borderless w-100">
		<thead>
			<tr>
				<th>Prducts Name</th>
				<th>Deals</th>
				<th>Amount</th>
			</tr>
		</thead>
		<tbody>
			{#each dataPeriod as data}
				<tr>
					<td>
						<div class="selling-product-img d-flex align-items-center">
							<img
								class="radius-xs img-fluid order-bg-opacity-primary"
								src="/img/products/electronics/{data.img}"
								alt="img"
							/>
							<span>{data.name}</span>
						</div>
					</td>
					<td>{data.deals}</td>
					<td>${data.amount}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	@import '../../../assets/sass/mixins/media-queries';
	@import '../../../assets/sass/mixins/functions';
	.selling-table-wrap {
		table {
			thead {
				tr {
					background: var(--bg-normal);
				}
			}
		}
		@include lg {
			padding-bottom: 0;
		}

		table {
			tbody {
				td {
					white-space: nowrap;
					padding: 10px 15px 10px 0;
					color: var(--color-dark);
				}

				tr {
					&:first-child {
						td {
							padding-top: 15px;
						}
					}
				}
			}

			thead {
				tr {
					th {
						font-size: 12px;
						font-weight: 500;
						line-height: 18px;
						color: var(--color-light);
						text-transform: uppercase;
						padding: 11px 15px;
					}
				}
			}

			tr th {
				&:first-child {
					border-radius: 6px 0 0 6px;
				}

				&:last-child {
					border-radius: 0 6px 6px 0;
				}
			}
		}

		.selling-product-img {
			img {
				margin-right: 12px;
				width: 32px;
				height: 32px;
				border-radius: 5px;
			}

			span {
				color: var(--color-dark);
				font-size: 15px;
				font-weight: 500;
				line-height: lh(15px, 20px);
				@include ssm {
					padding-right: 15px;
				}
			}
		}

		&__top-product {
			table {
				thead {
					tr {
						th{
							&:last-child{
								@include cms2(1368px){
									text-align: right;
								}
							}
						}
					}
				}
				tbody {
					tr {
						td{
							font-size: 14px;
							&:not(:first-child) {
								padding-left: 15px;
							}
							&:last-child{
								@include cms2(1368px){
									text-align: right;
								}
							}
						}
					}
				}
			}
		}
	}
	.table-borderless {
		tr {
			&:last-child {
				border-bottom: 0 none !important;
			}
		}
	}
</style>
