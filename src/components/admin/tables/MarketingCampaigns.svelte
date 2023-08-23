<script>
	export let dataPeriod;
</script>

<div class="selling-table-wrap selling-table-wrap--2 table-responsive">
	<table class="table-borderless w-100">
		<tbody>
			{#each dataPeriod as data}
				<tr>
					<td>
						<div class="selling-product-img selling-product-img--2 d-flex align-items-center">
							<img class="radius-xs img-fluid" src="/img/browser/{data.icon}" alt="img" />
							<span>{data.title}</span>
						</div>
					</td>
					<td>${data.amount}</td>
					<td>{data.percent}%</td>
					<td>
						<div class="progress-cicle-wrap" style="--data-percent:{data.percent}%">
							<div class="progress-circle" />
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	@import '../../../assets/sass/mixins/media-queries';
	@import '../../../assets/sass/mixins/functions';


	:global{
		.merketing-campaigns{
			.card-body{
				padding: 5px 0 20px 0;
			}
		}
	};
	.selling-table-wrap {
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
							@include cms2(1368px){
								padding: 24px 15px 10px 0;
							}
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

		.progress-cicle-wrap {
			position: relative;
			width: 24px;
			height: 24px;
			border-radius: 50%;
			background: conic-gradient(
				var(--color-primary) var(--data-percent),
				rgba(var(--color-primary-rgba), 0.2) var(--data-percent)
			);
			.progress-circle {
				width: calc(100% - 5px);
				height: calc(100% - 5px);
				background-color: var(--bg-white);
				position: absolute;
				left: 50%;
				top: 50%;
				border-radius: 50%;
				transform: translate(-50%, -50%);
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
