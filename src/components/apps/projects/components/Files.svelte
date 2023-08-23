<script>
	import {
		Card,
		CardHeader,
		CardBody,
		Dropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem
	} from 'sveltestrap';

	const files = [
		{
			icon: 'zip@2x.png',
			name: 'Main-Admin-Design.Zip',
			size: '7.09 MB'
		},
		{
			icon: 'pdf@2x.png',
			name: 'Product-Guidelines.Pdf',
			size: '1.29 MB'
		},
		{
			icon: 'psd@2x.png',
			name: 'Admin-Wireframe.Psd',
			size: '7.01 MB'
		},
		{
			icon: 'jpg@2x.png',
			name: 'Wirefram-Escreenshots.Jpg',
			size: '1.67 MB'
		},
		{
			icon: 'png@2x.png',
			name: 'Logo.Png',
			size: '145 KB'
		}
	];
</script>

<Card class="pb-10 border-0 h-100">
	<CardHeader class="py-20 px-sm-25 px-3 ">
		<h6>Files</h6>
	</CardHeader>
	<CardBody>
		{#each files as file}
			<div class="mb-20">
				<div class="files-area d-flex justify-content-between align-items-center">
					<div class="files-area__left d-flex align-items-center">
						<div class="files-area__img">
							<img src="/img/{file.icon}" alt="img" class="wh-42" />
						</div>
						<div class="files-area__title">
							<p class="mb-0 fs-14 fw-500 color-dark text-capitalize">
								{file.name}
							</p>
							<span class="color-light fs-12 d-flex ">{file.size}</span>
							<div class="d-flex text-capitalize">
								<a href={'#'} class="fs-12 fw-500 color-primary ">View</a>
								<a href={'#'} class="fs-12 fw-500 color-primary ms-10">Download</a>
							</div>
						</div>
					</div>
					<div class="files-area__right">
						<Dropdown>
							<DropdownToggle color="white m-0 p-0 shadow-none bg-transparent"
								><img
									data-inlinesvg
									class="m-0"
									src={'/img/svg/more-horizontal.svg'}
								/></DropdownToggle
							>
							<DropdownMenu>
								<DropdownItem>View</DropdownItem>
								<DropdownItem>Edit</DropdownItem>
								<DropdownItem>Delete</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				</div>
			</div>
		{/each}
	</CardBody>
</Card>
