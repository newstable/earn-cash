<script>
	import UserList from './../../../components/apps/users/UserList.svelte';
	import PaginationBasic from './../../../components/admin/pagination/PaginationBasic.svelte';
	import BreadcrumbOne from './../../../components/admin/breadcrumbs/BreadcrumbOne.svelte';

    import { Col, Container, Row } from "sveltestrap";

    const breadcrumbData = {
		pageTitle: 'User Search',
		bcItem: 'Dashboard',
		bcItemActive: 'User Search',
        bcItemUrl: "/admin"
	};

    var searchQuery = "";
    var users = [];

    const search = async e => {
        e.preventDefault();

        const response = await fetch("/api/admin/userSearch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: searchQuery
            })
        });
        const data = await response.json();

        if (data.success) {
            users = data.users;
        }
    }

</script>
<div class="products_page product_page--grid mb-30">
	<Container fluid>
		<Row class="justify-content-center">
			<Col lg={12}>
				<BreadcrumbOne {...breadcrumbData} />
			</Col>
			<Col lg={12}>
				<Row class="justify-content-center">
					<Col lg={8} md={10} sm={12} class="mb-50">
						<div class="search-style-2 global-shadow ">
							<form on:submit={e => search(e)} class="d-flex align-items-center">
								<div class="job-search">
									<i class="uil uil-search"></i>
									<input class="form-control border-0 box-shadow-none" type="search" placeholder="Username, email or Discord ID" aria-label="Search" style="margin-bottom: 0;" bind:value={searchQuery}>
								</div>
								
                                <button class="btn btn-primary"><i class="uil uil-search"></i>search</button>
							</form>
						</div>
					</Col>
				</Row>
			</Col>
		</Row>

        <Row>
			<UserList users={users}/>
		</Row>
	</Container>
</div>

<style lang="scss">
    @import '../../../assets/sass/mixins/functions';
		@import '../../../assets/sass/mixins/rfs';
		@import '../../../assets/sass/mixins/media-queries';
		@import '../../../assets/sass/components/users';
		@import '../../../assets/sass/components/shop';
		@import '../../../assets/sass/components/job';
		@import '../../../assets/sass/components/ecommerce';

    /* :global {
		@import '../../../assets/sass/mixins/functions';
		@import '../../../assets/sass/mixins/rfs';
		@import '../../../assets/sass/mixins/media-queries';
		@import '../../../assets/sass/components/users';
		@import '../../../assets/sass/components/shop';
		@import '../../../assets/sass/components/job';
		@import '../../../assets/sass/components/ecommerce';
	} */
</style>