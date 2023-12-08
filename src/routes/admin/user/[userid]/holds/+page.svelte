<script>
  import { Button, Col, Column, Container, Row, Table } from "sveltestrap";
  import BreadcrumbOne from "../../../../../components/admin/breadcrumbs/BreadcrumbOne.svelte";

  export let data;

  // $: console.log({ data });

  let breadcrumbData = {
    pageTitle: "Holds",
    bcItem2: "User Search",
    bcItem2Url: "/admin/search",
    bcItem3: "User",
    bcItem3Url: "/admin/user/" + data.user._id,
    bcItemActive: "Holds",
  };
</script>

<div class="component-page mb-25">
  <Container fluid>
    <Row>
      <Col lg={12}>
        <BreadcrumbOne {...breadcrumbData} />
      </Col>
      <Col lg={12}>
        <div class="buttonHolder">
          <Button
            primary
            class="btn-default btn-squared radius-xs fs-15 fw-400 text-capitalize"
            href="/admin/user/{data.user._id}"
          >
            Back to user
          </Button>
        </div>
      </Col>
      <Col lg={12}>
        <Table striped hover responsive rows={data.holds} let:row>
          <Column header="Price">
            {row?.price}
          </Column>
          <Column header="Reward">
            {row?.reward}
          </Column>

          <Column header="Country/Email/Address">
            {row?.info}
          </Column>

          <Column header="Date Purchased">
            {row?.date.toLocaleString()}
          </Column>

          <Column header="Cashout Status">
            {row?.hold}
          </Column>
        </Table>
      </Col>
    </Row>
  </Container>
</div>

<style lang="scss">
  div.buttonHolder {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 1.6rem;
  }
</style>
