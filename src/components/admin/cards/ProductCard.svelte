<script>
	export let type;
	export let name;
	export let image;
	export let rating;
</script>

<div class={type === 'card' ? 'card product product--grid' : 'card product product--list'}>
	{#if type === 'card'}
			<div class="product-item">
				<div class="product-item__image">
					<span class="like-icon">
						<button class="content-center" type="button">
							<i class="lar la-heart icon" />
						</button>
					</span>
					<img class="card-img-top img-fluid" src={image} alt="Digital Chair" />
				</div>
				<div class="card-body px-20 pb-25 pt-25">
					<div class="product-item__body text-capitalize">
						<a href="/">
							<h6 class="card-title">{name}</h6>
						</a>
						<div class="stars-rating d-flex align-items-center flex-wrap mb-10">
							<span class="star-icon las la-star active" />
							<span class="star-icon las la-star active" />
							<span class="star-icon las la-star active" />
							<span class="star-icon las la-star active" />
							<span class="star-icon las la-star-half-alt active" />
							<span class="stars-rating__point">{rating}</span>
							<span class="stars-rating__review">
								<span>778</span> Reviews
							</span>
						</div>
					</div>
					<div class="product-item__footer">
						<div class="d-flex align-items-center flex-wrap">
							<span class="product-desc-price">$2000.00</span>
							<span class="product-price">$100.00</span>
							<span class="product-discount">50% Off</span>
						</div>
					</div>
					<div class="product-item__button d-flex mt-20 flex-wrap">
						<button class="btn btn-default btn-squared color-light btn-outline-light px-20">
							<i class="las la-shopping-cart" /> Add to Cart
						</button>
						<button class="btn btn-primary btn-default btn-squared border-0 px-20"> buy now </button>
					</div>
				</div>
			</div>
		{:else}
			<div class="product-item">
				<div class="product-item__image">
					<img class="card-img-top img-fluid" src={image} alt="Digital Chair" />
				</div>
				<div class="product-item__body mt-xl-20 mt-0 position-relative">
					<span class="like-icon">
						<button type="button" class="content-center">
							<i class="lar la-heart icon" />
						</button>
					</span>
					<div class="product-item__title">
						<a href="/">
							<h6 class="card-title">{name}</h6>
						</a>
						<p class="mb-0">
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
							invidunt ut labore et dolore magna.
						</p>
					</div>
					<div class="product-item__content text-capitalize">
						<div class="d-flex align-items-center flex-wrap">
							<span class="product-desc-price">$2000.00</span>
							<span class="product-price">$100.00</span>
							<span class="product-discount">50% Off</span>
						</div>
						<div class="stars-rating d-flex align-items-center flex-wrap mb-10">
							<span class="star-icon las la-star active" />
							<span class="star-icon las la-star active" />
							<span class="star-icon las la-star active" />
							<span class="star-icon las la-star active" />
							<span class="star-icon las la-star-half-alt active" />
							<span class="stars-rating__point">{rating}</span>
							<span class="stars-rating__review">
								<span>778</span> Reviews
							</span>
						</div>
						<div class="product-item__button d-flex mt-20 flex-wrap">
							<button class="btn btn-default btn-squared color-light btn-outline-light px-20">
								<i class="las la-shopping-cart" /> Add to Cart
							</button>
							<button class="btn btn-primary btn-default btn-squared border-0 px-20">
								buy now
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}
</div>

<style lang="scss">
</style>
