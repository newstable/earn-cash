<script>
	export let dataPeriod;
</script>

<div class="selling-table-wrap table-responsive">
	<table class="table table--default table-borderless">
		<thead>
			<tr>
				<th>Products Name</th>
				<th>Price</th>
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
					<td>{data.price}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	@import '../../../assets/sass/mixins/media-queries';
	@import '../../../assets/sass/components/table';
	@import '../../../assets/sass/mixins/functions';
	.selling-table-wrap {
		.table--default tbody tr:last-child {
			border-bottom: none;
		}
		.table--default tr th {
			&:first-child {
				padding-left: 15px;
			}

			&:last-child {
				padding-right: 15px;
			}
		}

		.table--default tr td {
			&:first-child {
				padding-left: 0;
			}

			&:last-child {
				padding-right: 15px;
			}
		}
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

		&.selling-table-wrap--2 {
			table {
				tbody {
					tr {
						&:first-child {
							td {
								padding-top: 3px;
							}
						}

						td {
							&:not(:first-child) {
								font-size: 14px;
							}

							&:last-child {
								padding-right: 0;
							}
						}
					}
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

			&--2 {
				img {
					width: 25px;
					height: 25px;
					border-radius: 0;
					object-fit: contain;
				}
			}
		}
	}
</style>
