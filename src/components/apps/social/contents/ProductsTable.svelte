<script>
	import { Card, CardHeader, CardBody } from 'sveltestrap';
	import topSaleData from '@data/dashboardChartContent.json';
	import TopSellingProduct from '@components/tables/TopSellingProduct.svelte';
	import CardExtra from '@components/cards/CardExtra.svelte';
	const topSales = topSaleData.topSale;
	let period = 'today';
	let currentTab = 'today';
	let dataPeriod = topSales[period];
	let extraStyle = '';
	let defaultTable = '';
</script>

<Card class="mt-25 mb-40">
	<CardHeader class="text-capitalize px-md-25 px-3">
		<h6>Top Selling Products</h6>
		<CardExtra />
	</CardHeader>
	<CardBody class="p-0">
		<div class="ap-product">
			<TopSellingProduct {dataPeriod} {extraStyle} {defaultTable} />
		</div>
	</CardBody>
</Card>
