<script>
	import Slider from '@bulatdashiev/svelte-slider';
	import { Card, CardBody, Button, Input } from 'sveltestrap';

	let range2 = [30, 90];
</script>

<aside class="dm-product-sidebar mb-lg-30">
	<div class="dm-product-sidebar__header">
		<h6 class="d-flex align-content-center fw-500"><i class="uil uil-sliders-v-alt"></i>Filters</h6>
	</div>
	<div class="dm-product-sidebar__content">
		<div class="dm-product-sidebar__widget mb-30">
			<div class="dm-product-sidebar__widget--title no-collapse">
				<h6>Distance</h6>
				<p class="price-range-text fs-15">Within 30 miles of <strong>New York, NY</strong></p>
			</div>
			<div class="dm-product-sidebar__widget-card border-0 shadow-none mt-10">
				<div class="dm-product-price-ranges">
					<div class="custom-range-slider dm-price-range mb-0">
						<div class="section price">
							<Slider max="200" step="10" bind:value={range2} range order />
							<p class="price-range-value fs-15">
								<span>{range2[0]} miles</span>
								<span>{range2[1]} miles</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="dm-product-sidebar__widget mb-30">
			<div class="dm-product-sidebar__widget--title no-collapse mb-20">
				<h6>Job Types</h6>
			</div>
			<div class="dm-product-sidebar__widget-card border-0 shadow-none mt-10">
				<ul class="product-brands limit-list-item">
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-1" label="Freelance" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-2" label="Full Time" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-3" label="Part Time" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-4" label="Internship" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-5" label="Contract" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-6" label="Temporary" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li class="mt-2 more">See more</li>
				</ul>
			</div>
		</div>
		<div class="dm-product-sidebar__widget mb-30">
			<div class="dm-product-sidebar__widget--title no-collapse mb-20">
				<h6>Industry</h6>
			</div>
			<div class="dm-product-sidebar__widget-card border-0 shadow-none mt-10">
				<ul class="product-brands limit-list-item">
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-7" label="Designer Graphics" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-8" label="Development" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-9" label="Management" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-10" label="Finance" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-11" label="Banking" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-12" label="Customer Support" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li class="mt-2 more">See more</li>
				</ul>
			</div>
		</div>
		<div class="dm-product-sidebar__widget mb-30">
			<div class="dm-product-sidebar__widget--title no-collapse mb-20">
				<h6>Salary</h6>
			</div>
			<div class="dm-product-sidebar__widget-card border-0 shadow-none mt-10">
				<ul class="product-brands limit-list-item">
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-13" label="Hourly" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-14" label="Weekly" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-15" label="Monthly" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-16" label="Yearly" />
						</div>
						<span class="item-numbers">25</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="dm-product-sidebar__widget mb-30">
			<div class="dm-product-sidebar__widget--title no-collapse mb-20">
				<h6>Date Posted</h6>
			</div>
			<div class="dm-product-sidebar__widget-card border-0 shadow-none mt-10">
				<ul class="product-brands limit-list-item">
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-17" label="Last Hour" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-18" label="Last 24 hours" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-19" label="7 days" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-20" label="14 days" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-21" label="30 days" />
						</div>
						<span class="item-numbers">25</span>
					</li>
					<li>
						<div class="checkbox-theme-default custom-checkbox">
							<Input class="checkbox" type="checkbox" id="check-21" label="ALL" />
						</div>
						<span class="item-numbers">25</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</aside>
