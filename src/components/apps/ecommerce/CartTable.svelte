<script>
	import { Table } from 'sveltestrap';
	import Carts from '@data/cart.json';

	function quantityDec() {
		const qtyInput = this.closest('.product-cart__quantity').querySelector('.qty');
		let qtyInputVal = qtyInput.value;
		if (qtyInputVal > 0) {
			qtyInput.value = qtyInputVal -= 1;
		}
	}
	function quantityInc() {
		const qtyInput = this.closest('.product-cart__quantity').querySelector('.qty');
		let qtyInputVal = qtyInput.value;
		if (qtyInputVal >= 0) {
			qtyInputVal++;
			qtyInput.value = qtyInputVal;
		}
	}
</script>

<div class="product-cart mb-sm-0 mb-20">
	<div class="table-responsive">
		<Table borderless class="table-hover">
			<thead>
				<tr class="product-cart__header">
					<th>Product</th>
					<th>Price</th>
					<th>Quantity</th>
					<th>total</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each Carts as { name, size, color, price, quantity, img, total }, i}
					<tr>
						<td class="Product-cart-title">
							<div class="media align-items-center">
								<img src={img} alt="" class="me-3 wh-80 align-self-center radius-xl" />
								<div class="media-body">
									<h5 class="mt-0">{name}</h5>
									<div class="d-flex">
										<p>Size: <span>{size}</span></p>
										<p>color: <span>{color}</span></p>
									</div>
								</div>
							</div>
						</td>
						<td class="price">{price}</td>
						<td>
							<div class="quantity product-cart__quantity">
								<input
									type="button"
									value="-"
									class="qty-minus bttn bttn-left wh-36"
									on:click={quantityDec}
								/>
								<input type="number" value={quantity} class="qty qh-36 input" />
								<input
									type="button"
									value="+"
									class="qty-plus bttn bttn-right wh-36"
									on:click={quantityInc}
								/>
							</div>
						</td>
						<td>
							<span class="text-center subtotal">$5.11</span>
						</td>
						<td class="actions">
							<button class="action-btn float-end"><i class="las la-trash-alt" /></button>
						</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	</div>
</div>
