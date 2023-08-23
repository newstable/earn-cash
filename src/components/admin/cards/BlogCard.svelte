<script>
	export let content;
</script>

<div class="blog-card">
	<div class="blog-card__thumbnail">
		<a href={'#'}>
			<img src={content.thumbnail} alt="" />
		</a>
	</div>
	<div class="blog-card__details">
		<div class="blog-card__content">
			<div class="blog-card__title--top">{content.postedOn}</div>
			<h4 class="blog-card__title">
				<a href={'#'} class="entry-title" rel="bookmark">{content.title}</a>
			</h4>
			<p>{content.excerpt}</p>
		</div>
		<div class="blog-card__meta">
			<div class="blog-card__meta-profile">
				<img src={content.authorImg} alt="" />
				<span>{content.authorName}</span>
			</div>
			<div class="blog-card__meta-count">
				<ul>
					<li>
						<div class="blog-card__meta-reaction">
							<img class="svg" alt="" src={'/img/svg/heart.svg'} />
							<span class="blog-card__meta-reaction-like">{content.likes}</span>
						</div>
					</li>
					<li>
						<div class="blog-card__meta-doc-wrapper">
							<img class="svg" alt="" src={'/img/svg/file-text.svg'} />
							<span class="blog-card__meta-doc">{content.comments}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import '../../../assets/sass/mixins/media-queries';
	:global {
		.blog-card {
			box-shadow: 0 5px 20px rgba(var(--light-gray-rgba), 0.05);
			background-color: var(--color-white);
			border-radius: 10px;
			padding: 25px 25px 30px 25px;

			&__thumbnail {
				width: 100%;
				height: 220px;
				overflow: hidden;
				position: relative;
				border-radius: 10px;

				&:after {
					content: '';
					position: absolute;
					width: 100%;
					height: 100%;
					background-color: rgba(var(--color-dark-rgba), 0.1);
					left: 0;
					top: 0;
				}

				img {
					border-radius: 10px;
					width: 100%;
					height: 220px;
					object-fit: cover;
				}
			}

			&__title--top {
				font-size: 15px;
				font-weight: 400;
				color: var(--color-light);
				margin-top: 11px;
			}

			&__title {
				margin-top: 13px;
				margin-bottom: 8px;

				a {
					font-weight: 600;
					color: var(--color-dark);
					font-size: 20px;

					&:hover {
						color: var(--color-primary);
					}
				}
			}

			&__content {
				p {
					font-size: 15px;
					font-weight: 400;
					line-height: calc(25px / 15px);
					color: var(--color-gray);
					margin-bottom: 15px;
				}
			}

			&__meta {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: -5px;
				> div {
					margin: 5px;
					display: flex;
					align-items: center;
				}
			}

			&__meta-count {
				ul {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					justify-content: flex-end;
					gap: 20px;
				}
			}

			&__meta-reaction {
				display: flex;
				align-items: center;
				font-size: 13px;
				color: var(--color-light);
				svg {
					width: 12px;
					height: 12px;
					color: var(--color-light);
				}
			}

			&__meta-reaction-like {
				font-size: 13px;
				font-weight: 400;
				color: var(--color-light);
				margin-left: 5px;
			}

			&__meta-doc-wrapper {
				display: flex;
				align-items: center;
				font-size: 13px;
				color: var(--color-light);
				svg {
					width: 12px;
					height: 12px;
					color: var(--color-light);
				}

				.blog-card__meta-doc {
					font-size: 13px;
					font-weight: 400;
					color: var(--color-light);
					margin-left: 5px;
				}
			}

			&__meta-profile {
				img {
					width: 32px;
					height: 32px;
					margin-right: 10px;
					border-radius: 50%;
				}

				span {
					font-size: 15px;
					font-weight: 400;
					color: var(--color-light);
					text-transform: capitalize;
				}
			}
		}
	}
</style>
