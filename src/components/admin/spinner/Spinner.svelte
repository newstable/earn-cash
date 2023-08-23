<script>
	export let type, size;
</script>

<div class="spin-container text-center">
	<div class="ninjadashspin-dots spin-{size}">
		<span class="spin-dot badge-dot dot-{type}" />
		<span class="spin-dot badge-dot dot-{type}" />
		<span class="spin-dot badge-dot dot-{type}" />
		<span class="spin-dot badge-dot dot-{type}" />
	</div>
</div>

<style lang="scss">
	@import '../../../assets/sass/mixins/mixins.scss';
	// Spin Css
	.spin-list {
		.ninjadashspin-dots {
			&:not(:last-child) {
				margin-right: 20px;
			}
		}
	}
	.ninjadashspin-dots {
		position: relative;
		display: inline-block;
		width: 1em;
		height: 1em;
		transform: rotate(45deg);
		animation: rotate 1.2s infinite linear;
		.spin-dot {
			transform: scale(0.75);
			position: absolute;
			opacity: 0.3;
			animation: spinMove 1s infinite linear alternate;
			&:nth-child(1) {
				left: 0;
				top: 0;
			}
			&:nth-child(2) {
				right: 0;
				top: 0;
				animation-delay: 0.3s;
			}
			&:nth-child(3) {
				left: 0;
				bottom: 0;
				animation-delay: 0.5s;
			}
			&:nth-child(4) {
				right: 0;
				bottom: 0;
				animation-delay: 0.7s;
			}
		}
	}

	// Spin Embadded
	.spin-embadded {
		position: relative;
		.alert {
			border-radius: 5px;
			transition: 0.35s ease;
		}
		.alert-content {
			padding: 10px 2px;
			transition: 0.35s ease;
		}
		.alert-heading {
			font-weight: 400;
			font-size: 16px;
			margin-bottom: 15px;
			color: var(--color-gray);
		}
		p {
			color: var(--color-light);
		}
		.loaded-spin {
			display: none;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
		&.spin-active {
			.alert-primary {
				background: rgba(var(--color-primary-rgba), 0.06);
				border-color: #e7e8fd06;
			}
			.alert-content {
				opacity: 0.4;
			}
			.loaded-spin {
				display: inline-block;
			}
		}
		.embadden-spin-control {
			margin-top: 10px;
			span {
				display: inline-block;
				margin-right: 6px;
				font-size: 14px;
				color: var(--color-gray);
			}
		}
	}

	// Spin Size
	.ninjadashspin-dots {
		&.spin-md {
			@include rfs(24px);
			.spin-dot {
				width: 8px;
				height: 8px;
			}
		}
		&.spin-lg {
			@include rfs(30px);
			.spin-dot {
				width: 10px;
				height: 10px;
			}
		}
	}
</style>
