<script>
	import { Card } from 'sveltestrap';
</script>

<Card class="knowledge-base border-0 h-100">
	<img src="/img/book-open.png" alt="book" />
	<h1>Knowledge Base</h1>
	<p>
		There are many variations of passages of Lorem Ipsum available but the majority have suffered
		alteration
	</p>
	<button type="button" class="btn btn-primary"> Browse Article </button>
</Card>

<style lang="scss">
	:global {
		@import '../../../../src/assets/sass/mixins/media-queries';
		.knowledge-base {
			align-items: center;
			text-align: center;
			padding: 33px 30px 40px 30px;

			img {
				width: 80px;
				height: 70px;
				@include minLg{
					margin-top: 35px;
				}
			}

			h1 {
				margin-top: 23px;
    			margin-bottom: 15px;
			}

			p {
				margin-bottom: 30px;
				font-size: 15px;
				font-weight: 400;
				line-height: calc(25px / 15px);
				color: var(--color-gray);
			}

			button {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				border-radius: 6px;
				height: 38px;
			}
		}
	}
</style>
