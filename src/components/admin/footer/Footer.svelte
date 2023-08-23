<footer class="footer-wrapper">
	<div class="footer-wrapper__inside">
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-6">
					<div class="footer-copyright">
						<p><span>© 2023</span><a href={'#'}>Sovware</a></p>
					</div>
				</div>
				<div class="col-md-6">
					<div class="footer-menu text-end">
						<ul>
							<li>
								<a href={'#'}>About</a>
							</li>
							<li>
								<a href={'#'}>Team</a>
							</li>
							<li>
								<a href={'#'}>Contact</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>

<style lang="scss">
	@import '../.././../assets/sass/mixins/media-queries';

	:global {
		.top-menu {
			.contents {
				&.expanded {
					&+.footer-wrapper {
						padding-left: 0;
					}
				}
			}
		}

		.footer-wrapper {
			position: absolute;
			left: 0;
			bottom: 0;
			padding: 24px 0 24px 280px;
			width: 100%;
			background: var(--color-white);
			transition: var(--transition);
			z-index: 1;
			box-shadow: rgba(146, 153, 184, 0.05) 0 -5px 10px;

			@include md {
				padding: 14px 0 14px 8px;
			}

			@include md {
				padding: 20px 0 20px 0 !important;
			}

			@include sm {
				padding: 15px 0 15px 0 !important;
			}

			p {
				margin: 0;
			}

		}

		.contents.expanded+.footer-wrapper {
			padding-left: 93px;
			@include cms2(1150px){
				padding-left: 0;
			}
		}

		// footer Copyright
		.footer-copyright {
			padding-left: 12px;

			@include sm {
				text-align: center;
				padding-left: 0;
			}

			p {
				font-size: 14px;
				color: var(--color-gray);
				font-weight: 500;
				display: flex;
				align-items: center;

				@include sm {
					justify-content: center;
				}

				a {
					margin-left: 4px;
					color: var(--color-primary);

					&:hover {
						color: var(--color-secondary);
					}
				}
			}
		}
	}


	// footer Menu
	.footer-menu {
		padding-right: 12px;

		&.text-end {
			@include sm {
				margin-top: 10px;
				text-align: center !important;
				padding-right: 0;
			}
		}

		ul {
			li {
				display: inline-block;

				&:not(:last-child) {
					margin-right: 18px;
				}

				a {
					font-size: 14px;
					color: var(--color-light);

					&:hover {
						color: var(--color-primary);
					}
				}
			}
		}
	}
</style>