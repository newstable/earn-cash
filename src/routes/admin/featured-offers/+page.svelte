<script>
    import { Button, Card, CardBody, Col, Container, FormGroup, Input, Label, Row } from 'sveltestrap';
    import BreadcrumbOne from '../../../components/admin/breadcrumbs/BreadcrumbOne.svelte';


    var breadcrumbData = {
        pageTitle: "Featured offers",
        bcItemActive: "Featured offers"
    }


    var offerId = "";
    var offerWall = "";
    var tutorial = "";
    var isAddingOffer = false

    const submit = async() => {
        isAddingOffer = true
        fetch("/api/admin/featuredOffers", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                offerId,
                offerWall,
                tutorial
            })
        })
            .then(res=>res.json())
            .then(data=>{
                isAddingOffer = false
                if(data.success)
                    alert("Success adding offer.")
                else
                    alert(data.message)
            })
            .catch(e=>{
                isAddingOffer = false
            })
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
                        <h4>Add featured offer</h4>

                        <div>
                            <FormGroup class="mb-25 form-group">
                                <Label class="color-dark fw-500">Offer ID</Label>
                                <Input
                                    class="form-control ih-medium ip-gray radius-xs b-light px-15 border-box"
                                    type="text"
                                    style="box-sizing: border-box"
                                    bind:value={offerId}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label
                                    class="color-dark fw-500">Wall</Label
                                >
                                <div class="dm-select">
                                    <select class="form-control px-15 ih-medium" bind:value={offerWall}>
                                        <option value="ayet">Ayet studios</option>
                                        <option value="lootably">Lootably</option>
                                        <option value="offertoro">OfferToro</option>
                                        <option value="adgem">AdGem</option>
                                        <option value="adgate">AdGate</option>
                                        <option value="adscend">Adscend</option>
                                    </select>
                                </div>
                            </FormGroup>

                            <FormGroup class="mb-25 form-group">
                                <Label class="color-dark fw-500" for="">Tutorial link (Youtube Embed or Image or None)</Label>
                                <Input
                                    class="form-control ih-medium ip-gray radius-xs b-light px-15 border-box"
                                    type="text"
                                    style="box-sizing: border-box"
                                    placeholder="https://www.youtube.com/embed/AAAA"
                                    bind:value={tutorial}
                                />
                            </FormGroup>

                            <Button on:click={() => submit()} disabled={isAddingOffer}>{isAddingOffer? "Adding offer...": "Add offer"}</Button>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
</div>

<style lang="scss">
    :global() {
        @import "../../../assets/sass/mixins/mixins";
        @import "../../../assets/sass/components/form-layouts";
        @import "../../../assets/sass/components/select";
    }
</style>