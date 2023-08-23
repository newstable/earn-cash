<script>
	export let pageTitle = 'Dashboard';
	export let bcItem = 'Dashboard';
    export let bcItemUrl = "/admin";
	export let bcItem2 = '';
    export let bcItem2Url = "";
    export let bcItem3 = '';
    export let bcItem3Url = "";
	export let bcItemActive = 'Demo One';
</script>

<div class="breadcrumb-main">
	<h3 class="text-capitalize breadcrumb-title">{pageTitle}</h3>
	<div class="breadcrumb-action justify-content-center flex-wrap">
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href={bcItemUrl}><i class="uil uil-estate" />{bcItem}</a></li>
				{#if bcItem2 !== ''}
					<li class="breadcrumb-item"><a href={bcItem2Url}>{bcItem2}</a></li>
				{/if}
                {#if bcItem3 !== ''}
					<li class="breadcrumb-item"><a href={bcItem3Url}>{bcItem3}</a></li>
				{/if}
				<li class="breadcrumb-item active" aria-current="page">{bcItemActive}</li>
			</ol>
		</nav>
	</div>
</div>

<style lang="scss">
    @import '../../../../src/assets/sass/components/breadcrumb';

	/* :global {
		@import '../../../../src/assets/sass/components/breadcrumb';
	} */
</style>
