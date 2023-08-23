<script>
	export let type;
	export let img;
	export let name;
	export let subName;
	export let deadline;
	export let jobTime;
	export let salary;
</script>

<div class={type === 'card' ? 'card product product--grid' : 'card product product--list'}>
	{#if type === 'card'}
		<div class="card job job--grid">
			<div class="h-100">
			<div class="job-item px-25 pt-30 pb-25">
				<div class="card-body p-0  d-flex align-items-sm-center align-items-start  flex-sm-row flex-column flex-wrap">
				<div class="job-item__body text-capitalize">
					<div class="job-item__image d-flex align-items-center">
					<a href="/">
						<img class="job-item__image-img img-fluid" src="{img}" alt="digital-chair">
					</a>
					<div class="job-item__title">
						<a href="jobDetails.html">
						<h6 class="card-title">{name}</h6>
						</a>
						<span>{subName}</span>
					</div>
					</div>
					<div class="job-item__content d-inline-flex flex-column">
					<div class="job-deadline">
						<h6>Deadline:</h6>
						<span>{deadline}</span>
					</div>
					<div class="job-type">
						<h6>Job Type:</h6>
						<span>{jobTime}</span>
					</div>
					<div class="job-salery">
						<h6>Salary:</h6>
						<span>{salary}</span>
					</div>
					</div>
				</div>
				<div class="job-item__button d-flex flex-wrap my-sm-0 my-10">
					<button class="btn btn-default btn-squared color-none btn-outline-none px-20">View details </button>
				</div>
				</div>
			</div>
			</div>
		</div>
		{:else}
		<div class="card job job--list">
			<div class="h-100">
			  <div class="job-item px-25 py-30">
				<div class="card-body p-0  d-flex align-items-sm-center align-items-start flex-wrap">
				  <div class="job-item__body text-capitalize d-flex flex-wrap">
					<div class="job-item__image d-flex align-items-center">
					  <a href="/">
						<img class="job-item__image-img img-fluid" src="{img}" alt="digital-chair">
					  </a>
					  <div class="job-item__title">
						<a href="jobDetails.html">
						  <h6 class="card-title">{name}</h6>
						</a>
						<span>{subName}</span>
					  </div>
					</div>
					<div class="job-item__content d-flex">
					  <div class="job-deadline">
						<span>Deadline</span>
						<h6>{deadline}</h6>
					  </div>
					  <div class="job-type">
						<span>Job Type</span>
						<h6>{jobTime}</h6>
					  </div>
					  <div class="job-salery">
						<span>Salary</span>
						<h6>{salary}</h6>
					  </div>
					</div>
				  </div>
				  <div class="job-item__button d-flex flex-wrap my-sm-0 my-10">
					<button class="btn btn-default btn-squared color-none btn-outline-none px-20">View details </button>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		{/if}
</div>

<style lang="scss">
</style>
