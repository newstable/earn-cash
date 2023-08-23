<script>
	export let dataPeriod;
</script>

<div class="selling-table-wrap selling-table-wrap--source table-responsive">
	<table class="table--default table-borderless">
		<thead>
			<tr>
				<th>Name</th>
				<th>Price</th>
			</tr>
		</thead>
		<tbody>
			{#each dataPeriod as data}
				<tr>
					<td>
						<div class="selling-product-img d-flex align-items-center">
							<div class="selling-product-img-wrapper order-bg-opacity-primary align-items-end">
								<img class="img-fluid" src="/img/products/electronics/{data.img}" alt="img" />
							</div>
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
	@import '../../../assets/sass/mixins/functions';
	:global {
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

				&.table--default {
					thead,
					tbody {
						tr {
							th:not(:first-child),
							td:not(:first-child) {
								text-align: right;
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
			}

			&--source {
				.selling-product-img-wrapper {
					margin-right: 12px;
					width: 32px;
					height: 32px;
					border-radius: 8px;
					display: flex;
					align-items: center;
					justify-content: center;

					img {
						width: auto;
						height: auto;
						margin-right: 0;
						border-radius: 0;
					}

					i {
						font-size: 18px;
					}
				}

				.progress {
					min-width: 120px;
					height: 4px;
				}
				&.selling-table-wrap {
					table {
						tbody {
							td {
								width: 20%;
							}
						}
					}
				}

				.table--default {
					tr td:last-child {
						padding-right: 0;
					}

					tbody tr {
						&:hover {
							background-color: transparent;
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
	}
</style>
