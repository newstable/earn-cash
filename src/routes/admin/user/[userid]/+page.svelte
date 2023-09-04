<script>
	import dateFormatter from './../../../../lib/dateFormatter.js';
	import getCountryName from './../../../../services/iso2country.js';
	import date2readable from './../../../../services/date2readable.js';
    import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "sveltestrap";
    import BreadcrumbOne from "../../../../components/admin/breadcrumbs/BreadcrumbOne.svelte";

    export var data;

    var breadcrumbData = {
        pageTitle: "User",
        bcItem2: "User Search",
        bcItem2Url: "/admin/search",
        bcItemActive: "User"
    }
</script>

<div class="component-page mb-25">
	<Container fluid>
		<Row>
			<Col lg={12}>
				<BreadcrumbOne {...breadcrumbData} />
			</Col>
            <Col lg={12}>
                <div class="buttonHolder">
                    <Button primary class="btn-default btn-squared radius-xs fs-15 fw-400 text-capitalize" href="/admin/user/{data.user._id}/rewards">
                        View rewards
                    </Button>

                    <Button primary class="btn-default btn-squared radius-xs fs-15 fw-400 text-capitalize" href="/admin/user/{data.user._id}/earnings">
                        View Earnings
                    </Button>
                </div>
            </Col>
			<Col lg={12}>
				<Card class="card-default card-md mb-4">
                    <CardBody>
                        {#if !data.user}
                            Can't find user
                        {:else}
                            <Row>
                                <Col>
                                    Username
                                </Col>
                                <Col>
                                    {data.user.username}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    Email verified?
                                </Col>
                                <Col>
                                    {data.user.rank >= 1}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    Rank
                                </Col>
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
                                <Col>
                                    Banned?
                                </Col>
                                <Col>
                                    {data.user.banned !== 0}
                                </Col>
                            </Row>


                            <Row>
                                <Col>
                                    OAuthProvider
                                </Col>
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
                                <Col>
                                    Join date
                                </Col>
                                <Col>
                                    {date2readable(data.user.joinDate)} ({dateFormatter(data.user.joinDate)})
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    Last active
                                </Col>
                                <Col>
                                    {date2readable(data.user.lastActive)} ({dateFormatter(data.user.lastActive)})
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    Total points
                                </Col>
                                <Col>
                                    {(data.user.points + data.user.addedPoints + data.user.pointsByRef).toLocaleString()}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    Current points
                                </Col>
                                <Col>
                                    {(data.user.points + data.user.addedPoints + data.user.pointsByRef - data.user.cashedOut - data.user.removedPoints).toLocaleString()}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    Completed Offers
                                </Col>
                                <Col>
                                    {data.user.paidSurveyCount}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    Last offer done
                                </Col>
                                <Col>
                                    {#if typeof data.user.lastPaidSurvey !== "undefined" }
                                        {date2readable(data.user.lastPaidSurvey)} ({dateFormatter(data.user.lastPaidSurvey)})
                                    {:else}
                                        N/A
                                    {/if}
                                 </Col>
                            </Row>

                            <Row>
                                <Col>
                                    Withdrawn
                                </Col>
                                <Col>
                                    {data.user.cashedOut.toLocaleString()}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    Points earned by referrals
                                </Col>
                                <Col>
                                    {data.user.pointsByRef.toLocaleString()}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    Referrer
                                </Col>
                                <Col>
                                    {#if typeof data.user.refBy === "undefined"}
                                        None
                                    {:else}
                                        <a href="/admin/user/{data.user.refBy}">Click</a>
                                    {/if}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    Country
                                </Col>
                                <Col>
                                    {getCountryName(data.user.country)}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    Current IP
                                </Col>
                                <Col>
                                    {data.user.ip}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    Register IP
                                </Col>
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
        margin: .6rem 0;
    }

    :global(.col) {
        padding: 16px;

        &:first-child {
            font-weight: 600;
        }
    }

    div.buttonHolder {
        width: 100%;
        display: flex;
        justify-content: center;
        padding-bottom: 1.6rem;
        gap: 1rem;
    }
</style>