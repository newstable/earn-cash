<script>
	import { Progress } from 'sveltestrap';
	export let dataPeriod;
</script>

<div
	class="selling-table-wrap selling-table-wrap--source selling-table-wrap--member table-responsive"
>
	<table class="table table--default table-borderless">
		<tbody>
			{#each dataPeriod as data}
				<tr>
					<td>
						<div class="selling-product-img d-flex align-items-center">
							<div class="selling-product-img-wrapper order-bg-opacity-{data.progress}">
								<img class="img-fluid" src="/img/author/{data.userImg}" alt="img" />
							</div>
							<span>{data.title}</span>
						</div>
					</td>
					<td>${data.salary}</td>
					<td>
						<div class="status">
							<ul>
								<li>{data.workOn}</li>
							</ul>
						</div>
					</td>
					<td>
						<div class="d-flex align-center justify-content-end">
							<div class="progress-wrap mb-0 me-15">
								<div class="progress">
									<Progress bar color={data.progress} value={data.status} />
								</div>
							</div>
							<div class="ratio-percentage">{data.status}%</div>
						</div>
					</td>
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

		&--source {
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

		&--member {
			table {
				tbody {
					td {
						color: var(--color-gray);

						.status {
							ul {
								display: flex;
								align-items: center;

								li {
									color: var(--color-gray);
									white-space: nowrap;

									&:not(:last-child):after {
										content: ', ';
										margin-right: 4px;
									}
								}
							}
						}

						.ratio-percentage {
							font-size: 14px;
							font-weight: 400;
							color: var(--color-dark);
						}
					}
				}
			}
			.table--default {
				tbody {
					tr {
						td {
							&:not(:first-child) {
								text-align: left;
							}
							&:nth-child(2){
								font-weight: 500;
							}
							&:nth-child(3){
								ul {
									li{
										color: var(--color-light);
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
