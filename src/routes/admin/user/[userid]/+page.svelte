<script>
  import dateFormatter from "./../../../../lib/dateFormatter.js";
  import getCountryName from "./../../../../services/iso2country.js";
  import date2readable from "./../../../../services/date2readable.js";
  import {
    Button,
    Card,
    CardBody,
    Input,
    CardHeader,
    Col,
    Container,
    Row,
  } from "sveltestrap";
  import BreadcrumbOne from "../../../../components/admin/breadcrumbs/BreadcrumbOne.svelte";

  export var data;

  var breadcrumbData = {
    pageTitle: "User",
    bcItem2: "User Search",
    bcItem2Url: "/admin/search",
    bcItemActive: "User",
  };

  let points = 0;
  let rate = 0;
  let totalPoints =
    data.user.points + data.user.addedPoints + data.user.pointsByRef;
  let currentPoints =
    data.user.points +
    data.user.addedPoints +
    data.user.pointsByRef -
    data.user.cashedOut -
    data.user.removedPoints;
  let isBanned = data.user.banned !== 0;
  let currentRate = data.user.customCommissionRate;

  let isPointUpdating = false;
  let isRateUpdating = false;

  const addOrRemovePoints = async () => {
    isPointUpdating = true;
    const response = await fetch("/api/admin/userUpdate/updatePoints", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        points,
        userId: data.user._id,
      }),
    });
    const body = await response.json();
    if (body.success) {
      isPointUpdating = false;
      totalPoints += points;
      currentPoints += points;
    }
  };

  const changeRate = async () => {
    isRateUpdating = true;
    const response = await fetch("/api/admin/userUpdate/updateRate", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rate,
        userId: data.user._id,
      }),
    });
    const body = await response.json();
    if (body.success) {
      currentRate = rate;
      isRateUpdating = false;
    }
  };

  let isBanningAccount = false;
  const banAccount = async (banned) => {
    isBanningAccount = true;
    const response = await fetch("/api/admin/userUpdate/banStatus", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ban: banned ? 0 : 1,
        userId: data.user._id,
      }),
    });
    const body = await response.json();
    if (body.success) {
      isBanningAccount = false;
      isBanned = banned;
    }
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
            <div class="buttonHolder">
              <Input
                class="valueInput"
                type="number"
                name="number"
                id="points"
                placeholder="points"
                bind:value={points}
              />
              <Button
                primary
                class="btn-default btn-squared radius-xs fs-15 fw-400 text-capitalize"
                on:click={addOrRemovePoints}
                disabled={isPointUpdating}
              >
                Add or Remove points
              </Button>
              <Input
                class="valueInput"
                type="number"
                name="number"
                id="ratechange"
                placeholder="rate"
                bind:value={rate}
              />
              <Button
                primary
                class="btn-default btn-squared radius-xs fs-15 fw-400 text-capitalize"
                on:click={changeRate}
                disabled={isRateUpdating}
              >
                Change rates
              </Button>
              <Button
                danger
                class="btn-default btn-squared radius-xs fs-15 fw-400 text-capitalize"
                on:click={() => banAccount(!isBanned)}
                disabled={isBanningAccount}
              >
                {isBanned ? "Approve" : "Ban"} account
              </Button>
              <Button
                success
                class="btn-default btn-squared radius-xs fs-15 fw-400 text-capitalize"
                href="/admin/user/{data.user._id}/holds"
              >
                View holds
              </Button>
              <Button
                primary
                class="btn-default btn-squared radius-xs fs-15 fw-400 text-capitalize"
                href="/admin/user/{data.user._id}/rewards"
              >
                View rewards
              </Button>

              <Button
                primary
                class="btn-default btn-squared radius-xs fs-15 fw-400 text-capitalize"
                href="/admin/user/{data.user._id}/earnings"
              >
                View Earnings
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col lg={12}>
        <Card class="card-default card-md mb-4">
          <CardBody>
            {#if !data.user}
              Can't find user
            {:else}
              <Row>
                <Col>Username</Col>
                <Col>
                  {data.user.username}
                </Col>
              </Row>

              <Row>
                <Col>Email verified?</Col>
                <Col>
                  {data.user.rank >= 1}
                </Col>
              </Row>

              <Row>
                <Col>Rank</Col>
                <Col>
                  {#if data.user.rank <= 1}
                    User
                  {:else if data.user.rank == 2}
                    Moderator
                  {:else if data.user.rank == 3}
                    Admin
                  {/if}
                </Col>
              </Row>

              <Row>
                <Col>Banned?</Col>
                <Col>
                  {isBanned}
                </Col>
              </Row>

              <Row>
                <Col>OAuthProvider</Col>
                <Col>
                  {#if typeof data.user.OAuthProvider !== "undefined"}
                    {#if data.user.OAuthProvider !== null}
                      {data.user.OAuthProvider}
                    {:else}
                      N/A
                    {/if}
                  {:else}
                    N/A
                  {/if}
                </Col>
              </Row>

              <Row>
                <Col>Join date</Col>
                <Col>
                  {date2readable(data.user.joinDate)} ({dateFormatter(
                    data.user.joinDate
                  )})
                </Col>
              </Row>

              <Row>
                <Col>Last active</Col>
                <Col>
                  {date2readable(data.user.lastActive)} ({dateFormatter(
                    data.user.lastActive
                  )})
                </Col>
              </Row>

              <Row>
                <Col>Total points</Col>
                <Col>
                  {totalPoints.toLocaleString()} (${(
                    totalPoints / 100
                  ).toLocaleString()})
                </Col>
              </Row>

              <Row>
                <Col>Current points</Col>
                <Col>
                  {currentPoints.toLocaleString()} (${(
                    currentPoints / 100
                  ).toLocaleString()})
                </Col>
              </Row>

              <Row>
                <Col>Completed Offers</Col>
                <Col>
                  {data.user.paidSurveyCount}
                </Col>
              </Row>

              <Row>
                <Col>Profit Counter</Col>
                <Col>
                  ${currentPoints / 100}
                </Col>
              </Row>

              <Row>
                <Col>Last offer done</Col>
                <Col>
                  {#if typeof data.user.lastPaidSurvey !== "undefined"}
                    {date2readable(data.user.lastPaidSurvey)} ({dateFormatter(
                      data.user.lastPaidSurvey
                    )})
                  {:else}
                    N/A
                  {/if}
                </Col>
              </Row>

              <Row>
                <Col>Withdrawn</Col>
                <Col>
                  {data.user.cashedOut.toLocaleString()} (${data.user.cashedOut.toLocaleString()})
                </Col>
              </Row>

              <Row>
                <Col>Points earned by referrals</Col>
                <Col>
                  {data.user.pointsByRef.toLocaleString()}
                </Col>
              </Row>

              <Row>
                <Col>Custom Commission Rate</Col>
                <Col>
                  {currentRate.toLocaleString()}
                </Col>
              </Row>

              <Row>
                <Col>Referrer</Col>
                <Col>
                  {#if typeof data.user.refBy === "undefined"}
                    None
                  {:else}
                    <a href="/admin/user/{data.user.refBy}">Click</a>
                  {/if}
                </Col>
              </Row>

              <Row>
                <Col>Country</Col>
                <Col>
                  {getCountryName(data.user.country)}
                </Col>
              </Row>

              <Row>
                <Col>Current IP</Col>
                <Col>
                  {data.user.ip}
                </Col>
              </Row>

              <Row>
                <Col>Register IP</Col>
                <Col>
                  {data.user.registerIp}
                </Col>
              </Row>
            {/if}
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
</div>

<style lang="scss">
  :global(.row) {
    margin: 0.6rem 0;
  }

  :global(.col) {
    padding: 16px;

    &:first-child {
      font-weight: 600;
    }
  }
  :global(.valueInput) {
    max-width: 80px;
  }

  div.buttonHolder {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
</style>
