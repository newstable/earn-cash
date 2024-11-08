<script>
  import { onMount } from "svelte";
  import { PaginationNav } from "svelte-paginate";
  import { Card, CardBody, Col, Container, Row, Table } from "sveltestrap";
  import getCountryName from "../../../services/iso2country";
  import date2readable from "../../../services/date2readable";
  import dateFormatter from "../../../lib/dateFormatter";
  import BreadcrumbOne from "../../../components/admin/breadcrumbs/BreadcrumbOne.svelte";

  var items = [];
  let currentPage = 1;
  let pageSize = 32;
  var totalItems = 7;
  var searchQuery = "";

  const onPageChange = (e) => {
    getPage(e.detail.page);
    currentPage = e.detail.page;
  };

  const getPage = async (page = 1) => {
    if (searchQuery !== "") {
      const response = await fetch(
        "/api/admin/offersdone?page=" + page.toString() + "&searchText=" + searchQuery.toString()
      );
      const data = await response.json();

      if (data.success) {
        totalItems = data.total;
        items = data.data;
      }
    } else {
      const response = await fetch(
        "/api/admin/offersdone?page=" + page.toString()
      );
      const data = await response.json();

      if (data.success) {
        totalItems = data.total;
        items = data.data;
      }
    }
  };

  const search = async (e, page) => {
      e.preventDefault();

      const response = await fetch(
        "/api/admin/offersdone?page=" + page.toString() + "&searchText=" + searchQuery.toString()
      );
      const data = await response.json();

      if (data.success) {
        totalItems = data.total;
        items = data.data;
      }
  }

  onMount(() => {
    getPage(currentPage);
  });

  var breadcrumbData = {
    pageTitle: "Offers",
    bcItemActive: "Offers",
  };
</script>

<div class="component-page mb-25">
  <Container fluid>
    <Row>
      <Col lg={12}>
        <BreadcrumbOne {...breadcrumbData} />
      </Col>
      <Col lg={12}>
				<Row class="justify-content-center">
					<Col lg={8} md={10} sm={12} class="mb-50">
						<div class="search-style-2 global-shadow ">
							<form on:submit={e => search(e, currentPage)} class="d-flex align-items-center">
								<div class="job-search">
									<i class="uil uil-search"></i>
									<input class="form-control border-0 box-shadow-none" type="search" placeholder="OfferID, OfferName, OfferWall, Country" aria-label="Search" style="margin-bottom: 0;" bind:value={searchQuery}>
								</div>
								
                <button class="btn btn-primary"><i class="uil uil-search"></i>search</button>
							</form>
						</div>
					</Col>
				</Row>
			</Col>
      <Col lg={12}>
        <Card class="card-default card-md mb-4">
          <CardBody>
            <div class="light-pagination-nav">
              <PaginationNav
                {totalItems}
                {pageSize}
                {currentPage}
                limit={1}
                showStepOptions={true}
                on:setPage={(e) => onPageChange(e)}
              />
            </div>

            <Table>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Offer ID</th>
                  <th>Offer wall</th>
                  <th>Offer name</th>
                  <th>Points</th>
                  <th>Total</th>
                  <th>Completions</th>
                  <th>Chargebacks</th>
                  <th>CB Rate</th>
                </tr>
              </thead>
              <tbody>
                {#each items as item}
                  <tr>
                    <td>
                      {getCountryName(item.country)}
                    </td>
                    <td>
                      {item.offer_id}
                    </td>
                    <td>
                      {item.offer_wall}
                    </td>
                    <td>
                      {item.offer_name}
                    </td>
                    <td>
                      ~${(item.average_points / 100).toFixed(2)}
                    </td>
                    <td>
                      ${(item.total_tokens / 100).toFixed(2)}
                    </td>
                    <td>
                      {item.completions}
                    </td>
                    <td>
                      {item.chargebacks}
                    </td>
                    <td>
                      {item.chargeback_rate}%
                    </td>
                    
                    
                    
                    
                  </tr>
                {/each}
              </tbody>
            </Table>

            <div class="light-pagination-nav">
              <PaginationNav
                {totalItems}
                {pageSize}
                {currentPage}
                limit={1}
                showStepOptions={true}
                on:setPage={(e) => onPageChange(e)}
              />
            </div>
          </CardBody>
        </Card>
      </Col>
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
  .light-pagination-nav :global(.pagination-nav) {
    display: flex;
    justify-content: center;
    background: #fff;
    border-radius: 3px;
  }

  .light-pagination-nav :global(.option) {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s all ease-out;
    user-select: none;
    color: hsl(200, 90%, 10%);
  }

  .light-pagination-nav :global(.option.number),
  .light-pagination-nav :global(.option.ellipsis) {
    padding: 10px 15px;
  }

  .light-pagination-nav :global(.option:hover) {
    background: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .light-pagination-nav :global(.option.active) {
    color: hsl(200, 70%, 50%);
  }
</style>
