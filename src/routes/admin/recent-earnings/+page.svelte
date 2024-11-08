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

  const onPageChange = (e) => {
    getPage(e.detail.page);
    currentPage = e.detail.page;
  };

  const getPage = async (page = 1) => {
    const response = await fetch(
      "/api/admin/earningsSearch?page=" + page.toString()
    );
    const data = await response.json();
    if (data.success) {
      totalItems = data.total;
      items = data.data;
    }
  };

  onMount(() => {
    getPage(currentPage);
  });

  var breadcrumbData = {
    pageTitle: "Recent earnings",
    bcItemActive: "Recent earnings",
  };
</script>

<div class="component-page mb-25">
  <Container fluid>
    <Row>
      <Col lg={12}>
        <BreadcrumbOne {...breadcrumbData} />
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
                  <th>Username</th>
                  <th>Country</th>
                  <th>Offer ID</th>
                  <th>Offer wall</th>
                  <th>Offer name</th>
                  <th>Points</th>
                  <th>Payout</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {#each items as item}
                  <tr>
                    <td>
                      <a href="/admin/user/{item.user._id}">
                        {#if item.user.username}
                          {item.user.username}
                        {:else}
                          {item.user.firstName}
                        {/if}
                      </a>
                    </td>
                    <td>
                      {getCountryName(item.offerDone.country)}
                    </td>
                    <td>
                      <a href="/admin/offer/{item.offerDone.offerId}"
                        >{item.offerDone.offerId}</a
                      >
                    </td>
                    <td>
                      {item.offerDone.wall === 1
                        ? "Ayet Studios"
                        : item.offerDone.wall === 2
                          ? "Lootably"
                          : item.offerDone.wall === 3
                            ? "OfferToro"
                            : item.offerDone.wall === 4
                              ? "AdGem"
                              : item.offerDone.wall === 5
                                ? "Revenue Universe"
                                : item.offerDone.wall === 6
                                  ? "AdGate"
                                  : item.offerDone.wall === 7
                                    ? "Adscend"
                                    : item.offerDone.wall === 8
                                      ? "CPX Research"
                                      : item.offerDone.wall === 9
                                        ? "BitLabs"
                                        : item.offerDone.wall === 10
                                          ? "Inbrain"
                                          : item.offerDone.wall === 11
                                            ? "Monlix"
                                            : item.offerDone.wall === 12
                                              ? "Notik"
                                              : item.offerDone.wall === 13
                                                ? "Timewall"
                                                : item.offerDone.wall === 14
                                                  ? "MM WALL"
                                                  : item.offerDone.wall === 15
                                                  ? "adtowall"
                                                    : item.offerDone.wall === 16
                                                    ? "mychips"
                                                      : " WHICH OFFERWALL MAN :(((("}
                    </td>
                    <td>
                      {item.offerDone.offerName}
                    </td>
                    <td>
                      {item.offerDone.tokens}
                    </td>
                    <td>
                      {item.offerDone.payout.toLocaleString(undefined, {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td>
                      {date2readable(item.offerDone.date)} ({dateFormatter(
                        item.offerDone.date
                      )})
                    </td>
                    <td>
                      {#if item.offerDone.status == 1}
                        <span class="custom-tag tag-success tag-transparented"
                          >Successful</span
                        >
                      {:else if item.offerDone.status == 0}
                        <span class="custom-tag tag-danger tag-transparented"
                          >Chargeback</span
                        >
                      {:else}
                        <span class="custom-tag tag-info tag-transparented"
                          >Other?</span
                        >
                      {/if}
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
