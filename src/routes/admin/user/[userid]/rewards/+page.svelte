<script>
    import { Button, Col, Column, Container, Row, Table } from "sveltestrap";
    import BreadcrumbOne from "../../../../../components/admin/breadcrumbs/BreadcrumbOne.svelte";
    import date2readable from "../../../../../services/date2readable";

    export var data;

    var breadcrumbData = {
        pageTitle: "Rewards",
        bcItem2: "User Search",
        bcItem2Url: "/admin/search",
        bcItem3: "User",
        bcItem3Url: "/admin/user/" + data.user._id,
        bcItemActive: "Rewards"
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
                <Table striped hover responsive rows={data.rewards} let:row>
                    <Column header="Code">
                        {#if typeof row.sent === "undefined"}
                            Not sent yet
                        {:else}
                            {row.code}
                        {/if}
                    </Column>

                    <Column header="Price">
                        {row.price ? row.price.toLocaleString() : 0} points
                    </Column>

                    <Column header="Reward">
                        {row.reward}
                    </Column>

                    <Column header="Purchased">
                        {date2readable(row.purchased)}
                    </Column>

                    <Column header="Sent">
                        {#if typeof row.sent === "undefined"}
                            Not sent yet
                        {:else}
                            {date2readable(row.purchased)}
                        {/if}
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