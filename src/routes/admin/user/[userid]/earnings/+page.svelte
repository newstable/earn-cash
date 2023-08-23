<script>
    import { Button, Col, Column, Container, Row, Table } from "sveltestrap";
    import BreadcrumbOne from "../../../../../components/admin/breadcrumbs/BreadcrumbOne.svelte";
    import date2readable from "../../../../../services/date2readable";
    import { offerWalls } from "../../../../../lib/offerWalls";

    export var data;

    var breadcrumbData = {
        pageTitle: "Earnings",
        bcItem2: "User Search",
        bcItem2Url: "/admin/search",
        bcItem3: "User",
        bcItem3Url: "/admin/user/" + data.user._id,
        bcItemActive: "Earnings"
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
                    <Button primary class="btn-default btn-squared radius-xs fs-15 fw-400 text-capitalize" href="/admin/user/{data.user._id}">
                        Back to user
                    </Button>
                </div>
            </Col>
            <Col lg={12}>
                <Table striped hover responsive rows={data.offersDone} let:row>
                    <Column header="Offerwall">
                        {#each offerWalls as offerwall}
                            {#if offerwall.wallId == row.wall}
                                {offerwall.wallName}
                            {/if}
                        {/each}
                    </Column>

                    <Column header="Offer id">
                        {row.offerId}
                    </Column>

                    <Column header="Offer name">
                        {row.offerName}
                    </Column>

                    <Column header="Payout">
                        {row.payout.toLocaleString(undefined, { style: "currency", currency: "USD" })}
                    </Column>

                    <Column header="Tokens">
                        {row.tokens.toLocaleString()}
                    </Column>

                    <Column header="Date">
                        {date2readable(row.date)}
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