<script>
	import { NavbarBrand } from 'sveltestrap';
</script>

<div class="logo-area">
	<NavbarBrand href={'#'}>
		<img class="dark" src="/img/logo-dark.svg" alt="svg" />
		<img class="light" src="/img/logo-white.svg" alt="img" />
	</NavbarBrand>
	<a href={'#'} class="sidebar-toggle">
		<img class="svg" alt="" src={'/img/svg/align-center-alt.svg'} />
	</a>
</div>

<style lang="scss">
	:global {
		@import '../../../../src/assets/sass/mixins/media-queries';
		@import '../../../../src/assets/sass/mixins/functions';

		// Navbar Type
		body.top-menu {
			.navbar-left {
				.top-menu {
					margin-left: 30px;
				}
			}
		}

		.top-menu {
			.search-form {
				display: none;
			}

			.navbar-right {
				@include e(menu) {
					.nav-search {
						display: block !important;
					}
				}
			}

			.sidebar-toggle {
				display: none;

				@include md {
					display: flex !important;
				}
			}

			.sidebar {
				display: none;

				@include md {
					display: block;
				}
			}

			.contents {
				padding-left: 15px;

				@include md {
					padding: 73px 15px 64px 16px;
				}

				@include sm {
					padding: 56px 0 85px 0;
				}
			}

			.footer-wrapper {
				padding-left: 10px;
			}
		}

		.side-menu {
			.top-menu {
				display: none;
			}
		}
	}
</style>
