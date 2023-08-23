<script>
	export let dataPeriod;
</script>

<div class="project-task table-responsive">
	<table class="table table-borderless">
		<tbody>
			{#each dataPeriod as data}
				<tr class="project-task-list">
					<td>
						<div class="event-Wrapper">
							<div class="event-Wrapper__left">
								<div class="event-wrapper-item bg-{data.type}">
									<span>{data.date}</span>
									<span>{data.month}</span>
								</div>
							</div>
							<div class="event-Wrapper__right">
								<h6>{data.title}</h6>
								<span>{data.time}</span>
							</div>
						</div>
					</td>
					<td>
						<div class="project-task-list__right">
							<ul class="d-flex align-content-center justify-content-end">
								<li>
									<a href={'#'} class="edit">
										<i class="uil uil-edit" />
									</a>
								</li>
								<li>
									<a href={'#'} class="cross">
										<i class="uil uil-times" />
									</a>
								</li>
							</ul>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	@import '../../../assets/sass/mixins/media-queries';
	.project-task-list {
		.event-Wrapper {
			display: flex;
			align-items: center;
			@include ssm {
				padding-right: 10px;
			}
			.event-wrapper-item {
				width: 60px;
				height: 60px;
				border-radius: 6px;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				text-align: center;
				color: var(--color-white);
				margin-right: 15px;
				font-size: 15px;
				padding: 0 5px;
				span{

					+span{
						color: rgba(var(--color-white-rgba), .70 );
						font-size: 15px;
						font-weight: 500;
					}
				}
			}
			.event-Wrapper__right {
				h6 {
					font-size: 15px;
					font-weight: 500;
					color: var(--color-dark);
				}
				span {
					font-size: 14px;
					font-weight: 400;
					color: var(--color-light);
					display: block;
					margin-top: 4px;
				}
			}
		}
	}
	.project-task-list--event {
		tbody {
			tr {
				td {
					vertical-align: middle;
					padding: 10px 0;
					white-space: nowrap;
				}
			}
		}
		.project-task-list__right {
			ul {
				li {
					&:not(:last-child) {
						margin-right: 20px;
					}
					a {
						i {
							width: 18px;
							color: var(--color-lighten);
							font-size: 18px;
						}
						&:hover {
							&.edit {
								i {
									color: var(--color-info);
								}
							}
							&.cross {
								i {
									color: var(--color-danger);
								}
							}
						}
					}
				}
			}
		}
	}
</style>
