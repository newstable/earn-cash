<script>
	import Slider from '@bulatdashiev/svelte-slider';
	import { Card, CardBody, Button, Input } from 'sveltestrap';

	let range2 = [30, 90];
</script>

<aside class="dm-product-sidebar mb-lg-30">
	<div class="dm-product-sidebar__header">
		<h6 class="d-flex align-content-center fw-500">Filters</h6>
	</div>
	<div class="dm-product-sidebar__content">
		<div class="dm-product-sidebar__widget mb-30">
			<div class="dm-product-sidebar__widget--title no-collapse">
				<h6>Price Range</h6>
			</div>
			<div class="dm-product-sidebar__widget-card border-0 shadow-none mt-10">
				<div class="dm-product-price-ranges">
					<div class="custom-range-slider dm-price-range mb-0">
						<div class="section price">
							<Slider max="200" step="10" bind:value={range2} range order />
							<p class="price-value">
								<span>{range2[0]}</span>
								-
								<span>{range2[1]}</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="dm-product-sidebar__widget mb-30">
			<div class="dm-product-sidebar__widget--title no-collapse">
				<h6>Category</h6>
			</div>
			<div class="dm-product-sidebar__widget-card border-0 shadow-none mt-10">
				<ul class="product-category limit-list-item">
					<li>
						<span class="fs-14 color-gray">Accessories</span>
						<span class="item-number">25</span>
					</li>
					<li>
						<span class="fs-14 color-gray">Appliances</span>
						<span class="item-number">25</span>
					</li>
					<li>
						<span class="fs-14 color-gray">Electronic</span>
						<span class="item-number">25</span>
					</li>
					<li>
						<span class="fs-14 color-gray">Entertainment</span>
						<span class="item-number">25</span>
					</li>
					<li class="mt-2 more">See more</li>
				</ul>
			</div>
		</div>
		<div class="dm-product-sidebar__widget mb-30">
			<div class="dm-product-sidebar__widget--title no-collapse">
				<h6>Brands</h6>
			</div>
			<div class="dm-product-sidebar__widget-card border-0 shadow-none mt-10">
				<ul class="product-brands limit-list-item">
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-1" label="Cup" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-2" label="Plate" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-3" label="Coffee" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-4" label="Burger" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-5" label="Rice" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li class="mt-2 more">See more</li>
				</ul>
			</div>
		</div>
		<div class="dm-product-sidebar__widget">
			<div class="dm-product-sidebar__widget--title no-collapse">
				<h6>Ratings</h6>
			</div>
			<div class="dm-product-sidebar__widget-card border-0 shadow-none mt-10">
				<ul class="product-ratings">
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<input type="checkbox" class="checkbox" id="rating-1" />
							<label for="rating-1">
								<span class="stars-rating d-flex align-items-center">
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="checkbox-text">
										and up
										<span class="item-numbers">42</span>
									</span>
								</span>
							</label>
						</div>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<input type="checkbox" class="checkbox" id="rating-2" />
							<label for="rating-2">
								<span class="stars-rating d-flex align-items-center">
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="checkbox-text">
										and up
										<span class="item-numbers">12</span>
									</span>
								</span>
							</label>
						</div>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<input type="checkbox" class="checkbox" id="rating-3" />
							<label for="rating-3">
								<span class="stars-rating d-flex align-items-center">
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="checkbox-text">
										and up
										<span class="item-numbers">20</span>
									</span>
								</span>
							</label>
						</div>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<input type="checkbox" class="checkbox" id="rating-4" />
							<label for="rating-4">
								<span class="stars-rating d-flex align-items-center">
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="checkbox-text">
										and up
										<span class="item-numbers">42</span>
									</span>
								</span>
							</label>
						</div>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<input type="checkbox" class="checkbox" id="rating-5" />
							<label for="rating-5">
								<span class="stars-rating d-flex align-items-center">
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="star-icon las la-star active" />
									<span class="checkbox-text">
										and up
										<span class="item-numbers">35</span>
									</span>
								</span>
							</label>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</aside>
