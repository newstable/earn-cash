<script>
	export let type, icon, total, prefix, suffix, label, growth, growthRate, dataPeriod;
	export let cardStyle;
</script>

<div
	class={`ap-po-details ap-po-details--2 radius-xl d-flex justify-content-between ${cardStyle} ${
		cardStyle !== 'overview-card-shape' ? '' : ''
	}`}
>
	{#if cardStyle === 'overview-card-shape'}
		<div class="overview-content w-100">
			<div class="overview-content__left">
				<p>{label}</p>
				{#if prefix}
					<h1>{prefix + total}</h1>
				{:else if suffix}
					<h1>{total + suffix}</h1>
				{:else}
					<h1>{total}</h1>
				{/if}
				<span class="growth-status {growth === 'upward' ? 'color-success' : 'color-danger'}">
					{#if growth === 'upward'}
						<span class="uil uil-arrow-up" />
					{:else}
						<span class="uil uil-arrow-down" />
					{/if}
					<strong>{growthRate}%</strong>
					<small>{dataPeriod}</small>
				</span>
			</div>
			<div class={'overview-content__right ' + 'color-' + type}>
				<div class={'overview-content__icon'}>
					<i class={'uil uil-' + icon} />
				</div>
			</div>
		</div>
	{:else}
		<div class="overview-content w-100">
			<div class=" ap-po-details-content d-flex flex-wrap justify-content-between">
				<div class="ap-po-details__icon-area">
					<div class={'svg-icon order-bg-opacity-' + type + ' color-' + type}>
						<i class={'uil uil-' + icon} />
					</div>
				</div>
				<div class="ap-po-details__titlebar">
					{#if prefix}
						<h1>{prefix + total}</h1>
					{:else if suffix}
						<h1>{total + suffix}</h1>
					{:else}
						<h1>{total}</h1>
					{/if}

					<p>{label}</p>
				</div>
			</div>
			<div class="ap-po-details-time">
				<span class="growth-status {growth === 'upward' ? 'color-success' : 'color-danger'}">
					{#if growth === 'upward'}
						<span class="uil uil-arrow-up" />
					{:else}
						<span class="uil uil-arrow-down" />
					{/if}
					<strong>{growthRate}%</strong>
				</span>
				<small>{dataPeriod}</small>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	@import '../../../assets/sass/mixins/mixins.scss';
	:global{
		.contents{
			&.expanded{
				.ap-po-details{
					@include minXl{
						padding:40px 25px 25px 25px !important;
					}
				}
			}
		}
		body.top-menu{
			.contents{
				.ap-po-details{
					@include minXl{
						padding:42px 25px 27px 25px !important;
					}
				}
			}
		}
	}
	.ap-po-details {
		box-shadow: 0 5px 20px rgba(var(--light-gray-rgba), 0.05);
		padding: 25px 25px 25px 25px;
		background-color: var(--color-white);
		&.ap-po-details--overview-bg-none {
			.overview-content {
				background-color: transparent;
			}
		}
		&__icon-area {
			.svg-icon {
				width: 58px;
				height: 58px;
				border-radius: 14px;
				@extend .content-center;
				i {
					@include rfs(32px);
				}
			}
		}
		.overview-content {
			p {
				margin: 2px 0 18px;
				color: var(--color-gray);
				@include ofs(16px, lh(16px, 25px), 400);
				text-transform: capitalize;
			}
		}

		&--2 {
			&.ap-po-details{
				.overview-content {
					p{
						margin: 2px 0 14px;
					}
				}
			}
			.ap-po-details-time {
				border-radius: 8px;
				padding: 10px 15px;
				background: var(--bg-lighter);
				small{
					color:var(--color-light);
				}
			}
		}
		&--two {
			.ap-po-details-content {
				.ap-po-details__icon-area {
					order: 1;
				}
				.ap-po-details__titlebar {
					order: 0;
				}
			}
		}
		&--3 {
			flex-wrap: wrap;
			padding: 15px 25px;
			justify-content: space-between;
			.ap-po-details {
				padding: 0;
			}
			.overview-content3 {
				box-shadow: none;
			}
			> div {
				padding: 0;
				flex: 0 auto;
				margin: 10px 0;
				&:not(:last-child) {
					border-right: 1px solid var(--border-color);
					padding-right: 83px;
					@include xxl {
						border-right: none;
						padding-right: 0;
					}
				}
				@include xxl {
					flex: 50%;
				}
				@include sm {
					flex: 100%;
				}
			}
			.ap-po-details {
				strong {
					font-weight: 500;
				}
			}
			.revenue-chart-box__Icon {
				width: 70px;
				height: 70px;
			}
		}
	}
	.ap-po-details-time {
		display: flex;
		align-items: center;
		.growth-status {
			display: inline-flex;
			align-items: center;
			margin-right: 5px;
			flex-wrap: wrap;
		}
		i {
			@include ofs(15px, null, null);
		}

		strong {
			@include ofs(14px, lh(14px, 20px), 500);
		}
		span {
			@include lg {
				display: block;
			}
		}

		small {
			color: var(--color-gray);
			white-space: nowrap;
			@include ofs(14px, lh(14px, 22px), 400);
			margin-left: 5px;
		}
	}

	.overview-card-shape {
		padding: 0;
		overflow: hidden;
		.overview-content {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.overview-content__left {
			padding: 20px 25px;
			p {
				margin-bottom: 8px;
				font-size: 15px;
				color: var(--color-gray);
			}
			.growth-status {
				display: inline-flex;
				align-items: center;
				margin-right: 5px;
				margin-top: 5px;
				margin-top: 13px;
				flex-wrap: wrap;
				strong {
					font-weight: 500;
					font-size: 14px;
					margin-right: 10px;
				}
				small {
					font-size: 14px;
					color: var(--color-light);
				}
			}
		}
		.overview-content__right {
			position: relative;
			width: 88px;
			height: 100%;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
			&::before {
				content: '';
				position: absolute;
				width: 230px;
				height: 168px;
				left: 0;
				height: 110%;
				left: 5px;
				background: #00000015;
				top: 50%;
				transform: translateY(-50%);
				border-radius: 50%;
			}
			i {
				font-size: 40px;
			}
			&.color-primary {
				&::before {
					background: rgba(var(--color-primary-rgba), 0.1);
				}
			}
			&.color-secondary {
				&::before {
					background: rgba(var(--color-secondary-rgba), 0.1);
				}
			}
			&.color-success {
				&::before {
					background: rgba(var(--color-success-rgba), 0.1);
				}
			}
			&.color-warning {
				&::before {
					background: rgba(var(--color-warning-rgba), 0.1);
				}
			}
			&.color-info {
				&::before {
					background: rgba(var(--color-info-rgba), 0.1);
				}
			}
		}
	}
</style>
