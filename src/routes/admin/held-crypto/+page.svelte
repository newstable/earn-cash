<script>
	import string2date from './../../../services/string2date.js';
	import days4date from './../../../services/days4date.js';
    import { onMount } from 'svelte';
	import { PaginationNav } from 'svelte-paginate';
    import { Button, Card, CardBody, Col, Container, Row, Table } from 'sveltestrap';
    import getCountryName from '../../../services/iso2country';
    import date2readable from '../../../services/date2readable';
    import dateFormatter from '../../../lib/dateFormatter';
    import BreadcrumbOne from '../../../components/admin/breadcrumbs/BreadcrumbOne.svelte';

    var items = []
    let currentPage = 1;
    let pageSize = 32;
    var totalItems = 7;

    const onPageChange = e => {
        getPage(e.detail.page);
        currentPage = e.detail.page;
    }

    const getPage = async (page = 1) => {
        const response = await fetch("/api/admin/rewards?type=crypto&hold=1&page=" + page.toString());
        const data = await response.json();

        if (data.success) {
            totalItems = data.total;
            items = data.data;
        }
    }

    const unhold = item => fetch("/api/admin/rewards/hold", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            rewardId: item.reward._id,
            changes: [
                {
                    hold: 0
                }
            ]
        })
    });

    const sent = item => fetch("/api/admin/rewards/hold", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            rewardId: item.reward._id,
            changes: [
                {
                    hold: 0
                },
                {
                    sentDate: new Date()
                }, {
                    processing: 1
                },
            ]
        })
    });

    onMount(() => {
        getPage(currentPage);
    });

    var breadcrumbData = {
        pageTitle: "Held crypto requests",
        bcItemActive: "Held crypto requests"
    }
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
                                totalItems={totalItems}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                limit={1}
                                showStepOptions={true}
                                on:setPage={e => onPageChange(e)}
                            />
                        </div>

                        <Table>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Reward</th>
                                    <th>Address</th>
                                    <th>Date Purchased</th>
                                    <th>Days Waited</th>
                                    <th>Was Held?</th>
                                    <th>&nbsp;</th>
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
                                            {item.reward.reward}
                                        </td>
                                        <td>
                                            {item.reward.info}
                                        </td>
                                        <td>
                                            {date2readable(item.reward.date)} ({dateFormatter(item.reward.date)})
                                        </td>
                                        <td>
                                            {days4date(new Date(), string2date(item.reward.date))} days
                                        </td>
                                        <td>
                                            {#if item.reward.hold == 1}
                                                <span class="custom-tag tag-success tag-transparented">Yes</span>
                                            {:else}
                                                <span class="custom-tag tag-danger tag-transparented">No</span>
                                            {/if}
                                        </td>
                                        <td class="cheese">
                                            <Button success class="btn-success btn-squared radius-xs fs-12 fw-200 text-capitalize" on:click={e => {
                                                sent(item);
                                                e.target.parentNode.parentNode.remove();
                                            }}>
                                                Mark as sent
                                            </Button>

                                            <Button warning class="btn-warning btn-squared radius-xs fs-12 fw-200 text-capitalize" on:click={e => {
                                                unhold(item);
                                                e.target.parentNode.parentNode.remove();
                                            }}>
                                                Release
                                            </Button>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </Table>

                        <div class="light-pagination-nav">
                            <PaginationNav
                                totalItems={totalItems}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                limit={1}
                                showStepOptions={true}
                                on:setPage={e => onPageChange(e)}
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
        background: #FFF;
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

    td.cheese {
        display: flex;
        gap: 1rem;
    }
</style>