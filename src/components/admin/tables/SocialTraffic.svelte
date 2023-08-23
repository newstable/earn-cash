<script>
	export let trafficData;
</script>

<div
	class="selling-table-wrap selling-table-wrap--source selling-table-wrap--traffic table-responsive"
>
	<table class="table table--default table-borderless">
		<thead>
			<tr>
				<th>Social Media</th>
				<th>User</th>
				<th>Session</th>
				<th>Bounce Rate</th>
				<th>Avg. Session Duration</th>
			</tr>
		</thead>
		<tbody>
			{#each trafficData as data}
				<tr>
					<td>
						<div class="selling-product-img  d-flex align-items-center">
							<span class="selling-product-img__img bg-{data.type}-10 color-{data.type}"><i class="uil uil-{data.icon}" /></span>
							<span class="selling-product-img__title">{data.channel}</span>
						</div>
					</td>
					<td>{data.traffic}</td>
					<td>{data.session}</td>
					<td>{data.bounceRate}</td>
					<td>{data.duration}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	@import '../../../assets/sass/mixins/media-queries';
	@import '../../../assets/sass/components/table';

	:global{
		.social-media-traffic{
			.card-body{
				padding: 10px 25px 7px 25px;
				.table--default {
					th{
						font-size: 12px;
						font-weight: 500;
						color: var(--color-light);
						text-transform: uppercase;
					}
				}
				.selling-product-img{
					.selling-product-img__img{
						width: 32px;
						height: 32px;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 6px;
						margin-right: 14px;
						background-color: rgba(var(--color-dark-rgba), .10);
						padding: 0 !important;
						&.bg-primary-10{
							background-color: rgba(var(--color-primary-rgba), .10);
						}
						&.bg-secondary-10{
							background-color: rgba(var(--color-secondary-rgba), .10);
						}	
						&.bg-info-10{
							background-color: rgba(var(--color-info-rgba), .10);
						}
						&.bg-warning-10{
							background-color: rgba(var(--color-warning-rgba), .10);
						}
						&.bg-danger-10{
							background-color: rgba(var(--color-danger-rgba), .10);
						}
						i{
							font-size: 16px;
						}
					}
					.selling-product-img__title{
						color: var(--color-dark);
						font-weight: 500;
						font-size: 15px;
					}
				}
			}
		}
	};
	.selling-table-wrap {
		.table--default tbody tr:last-child {
			border-bottom: none;
		}

		.table--default tr td {
			&:first-child {
				padding-left: 0;
			}

			&:last-child {
				padding-right: 15px;
			}
		}
		@include lg {
			padding-bottom: 0;
		}

		table {
			thead {
				border-radius: 6px;
				tr {
					border-radius: 6px;
					background: var(--bg-normal);
					th {
						padding-top: 10px;
						padding-bottom: 10px;
						&:first-child {
							border-radius: 6px 0 0 6px;
						}
						&:last-child {
							border-radius: 0 6px 6px 0;
						}
					}
				}
			}
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

		&--traffic {
			margin-top: -13px;
			margin-bottom: 2px;
			table tbody td {
				font-size: 14px;
				font-weight: 400;
				color: var(--color-dark);
			}

			.selling-product-img{
				span {
				text-transform: capitalize;
				}
			}
			&.selling-table-wrap{
				table {
					tbody {
						tr{
							&:first-child{
								td{
									padding-top: 20px;
								}
							}
						}
					}
					thead {
						tr {
							th{
								padding-top: 11px;
   								padding-bottom: 11px;
							}
						}
					}
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
</style>
