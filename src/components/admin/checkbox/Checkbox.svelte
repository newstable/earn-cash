<script>
	export let type, id, value, onChange;
</script>

<div class="checkbox-theme-{type} custom-checkbox">
	<input type="checkbox" {id} checked={value} {onChange} />
	<label for={id}>
		<span class="checkbox-text"><slot /></span>
	</label>
</div>

<style lang="scss">
	@import '../../../assets/sass/mixins/mixins.scss';
	.custom-checkbox {
		input {
			display: none;
		}
		input[type='checkbox'] + label {
			min-width: 18px;
			min-height: 18px;
			font-size: 14px;
			display: flex;
			flex-flow: column;
			position: relative;
			padding-left: 28px;
			margin-bottom: 0;
			line-height: 1.2;
			font-weight: 400;
			color: var(--color-light);
			&:before {
				position: absolute;
				font-size: 16px;
				left: 9px;
				top: 9.5px;
				font-weight: 400;
				font-family: unicons-line;
				content: '\e9c3';
				display: block;
				opacity: 0;
				-webkit-transition: all 0.3s ease 0s;
				-o-transition: all 0.3s ease 0s;
				transition: all 0.3s ease 0s;
				z-index: 2;
				color: var(--color-primary);
			}
			&:after {
				position: absolute;
				left: 0;
				top: 0;
				width: 18px;
				height: 18px;
				-webkit-border-radius: 4px;
				border-radius: 4px;
				content: '';
				background-color: var(--color-white);
				border-width: 1px;
				border-style: solid;
				border: 1px solid var(--border-light);
			}
		}
		input[type='checkbox'] {
			&:checked + label {
				&:before {
					opacity: 1;
					color: var(--color-white);
				}
				&:after {
					background-color: var(--color-primary);
					border: 1px solid var(--color-primary);
				}
			}
		}
	}
</style>
