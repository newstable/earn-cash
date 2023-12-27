<script>
  import { Card, CardBody, Col, Container, Row } from "sveltestrap";

  let info;
  export let data;
  $: data ? (info = data.info) : null;
</script>

<div class="component-page my-50">
  <Container fluid>
    <Row>
      <Col lg={3}>
        <Card class="card-default card-md h-100" color="success">
          <CardBody>
            <Col>
              <Row>Today's Profit</Row>
              <Row>{info ? info.todaysProfit : 0}</Row>
            </Col>
          </CardBody>
        </Card>
      </Col>
      <Col lg={3}>
        <Card class="card-default card-md h-100" color="success">
          <CardBody>
            <Col>
              <Row>Most Popular Offerwall</Row>
              <Row>
                <div class="list-item">
                  <span>{data.popular.wall.quantity.name}</span>
                  <span>{data.popular.wall.quantity.amount} Leads</span>
                </div>
              </Row>
              <Row>
                <div class="list-item">
                  <span>{data.popular.wall.grossing.name}</span>
                  <span> ${data.popular.wall.grossing.amount}</span>
                </div>
              </Row>
            </Col>
          </CardBody>
        </Card>
      </Col>
      <Col lg={3}>
        <Card class="card-default card-md h-100" color="success">
          <CardBody>
            <Col>
              <Row>Most Popular Offer</Row>
              <Row>
                <div class="list-item">
                  <span>{data.popular.offer.quantity.name}</span>
                  <span>{data.popular.offer.quantity.amount} Leads</span>
                </div>
              </Row>
              <Row>
                <div class="list-item">
                  <span>{data.popular.offer.grossing.name}</span>
                  <span> ${data.popular.offer.grossing.amount}</span>
                </div>
              </Row>
            </Col>
          </CardBody>
        </Card>
      </Col>
      <Col lg={3}>
        <Card class="card-default card-md h-100" color="success">
          <CardBody>
            <Col>
              <Row>Most Sign Ups</Row>
              <Row>
                <div class="list-item">
                  <span>Country</span>
                  <span>{data.sign.country}</span>
                </div>
              </Row>
              <Row>
                <div class="list-item">
                  <span>Amount</span>
                  <span>{data.sign.count}</span>
                </div>
              </Row>
            </Col>
          </CardBody>
        </Card>
      </Col>
    </Row>
    <div class="container mt-30">
      <Col lg={12}>
        <Row>Earning Statistics</Row>
        <Row>
          <div class="list-item px-20">
            <span>Todays Earnings</span>
            <span>${info ? info.earnings.todaysEarning : 0}</span>
          </div>
        </Row>
        <Row>
          <div class="list-item px-20">
            <span>Yesterdays Earnings</span>
            <span>${info ? info.earnings.yesterdaysEarning : 0}</span>
          </div>
        </Row>
        <Row>
          <div class="list-item px-20">
            <span>Weeks Earnings</span>
            <span>${info ? info.earnings.weeksEarning : 0}</span>
          </div>
        </Row>
        <Row>
          <div class="list-item px-20">
            <span>Months Earnings</span>
            <span>${info ? info.earnings.monthsEarning : 0}</span>
          </div>
        </Row>
        <Row>
          <div class="list-item px-20">
            <span>Last Months Earnings</span>
            <span>${info ? info.earnings.lastMonthsEarning : 0}</span>
          </div>
        </Row>
      </Col>
      <Col lg={12}>
        <Row>Offer Statistics</Row>
        <Row>
          <div class="list-item px-20">
            <span>Offers Done Today</span>
            <span>{info ? info.offers.todaysOffer : 0}</span>
          </div>
        </Row>
        <Row>
          <div class="list-item px-20">
            <span>Offers Done This Week</span>
            <span>{info ? info.offers.weeksOffer : 0}</span>
          </div>
        </Row>
        <Row>
          <div class="list-item px-20">
            <span>Offers Done This Month</span>
            <span>{info ? info.offers.monthsOffer : 0}</span>
          </div>
        </Row>
        <Row>
          <div class="list-item px-20">
            <span>Offers Done Last Month</span>
            <span>{info ? info.offers.lastMonthsOffer : 0}</span>
          </div>
        </Row>
      </Col>
      <Col lg={12}>
        <Row>RPS Game Status</Row>
        <Row>
          <div class="list-item px-20">
            <span>Game Played</span>
            <span>{info ? info.game.round : 0}</span>
          </div>
        </Row>
        <Row>
          <div class="list-item px-20">
            <span>Total Circulation</span>
            <span>{info ? info.game.circulation : 0}</span>
          </div>
        </Row>
        <Row>
          <div class="list-item px-20">
            <span>Tax Gained</span>
            <span>{info ? info.game.tax : 0}</span>
          </div>
        </Row>
      </Col>

      <Col lg={12}>
        <Row>User Statistics</Row>
        <Row>
          <div class="list-item px-20">
            <span>Total Users</span>
            <span>{info ? info.user.total : 0}</span>
          </div>
        </Row>
        <Row>
          <div class="list-item px-20">
            <span>Total Email Verifications</span>
            <span>{info ? info.user.email : 0}</span>
          </div>
        </Row>
        <Row>
          <div class="list-item px-20">
            <span>Registrations Today</span>
            <span>{info ? info.user.today : 0}</span>
          </div>
        </Row>
        <Row>
          <div class="list-item px-20">
            <span>Registrations Yesterday</span>
            <span>{info ? info.user.yesterday : 0}</span>
          </div>
        </Row>
        <Row>
          <div class="list-item px-20">
            <span>Registrations This Week</span>
            <span>{info ? info.user.week : 0}</span>
          </div>
        </Row>
        <Row>
          <div class="list-item px-20">
            <span>Registrations This Month</span>
            <span>{info ? info.user.month : 0}</span>
          </div>
        </Row>
        <Row>
          <div class="list-item px-20">
            <span>Registrations Last Month</span>
            <span>{info ? info.user.lastMonth : 0}</span>
          </div>
        </Row>
      </Col>
    </div>
  </Container>
</div>

<style lang="scss">
  :global(.row) {
    margin: 0.6rem 0;
    font-weight: 400;
    &:first-child {
      font-weight: 600;
    }
  }

  :global(.col) {
    padding: 16px;
  }
  .list-item {
    display: flex;
    justify-content: space-between;
  }
</style>
