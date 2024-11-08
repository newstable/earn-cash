<script>
    import { onMount } from 'svelte';
    import { Button, Card, CardBody, Col, Container, Row, Table } from 'sveltestrap';
    import response from "$lib/response";

    let newCard = {
        card_name: "",
        image_link: "",
        start_time: "",
        end_time: "",
        hourly_giveaway: "false" // Initialize as a string
    };

    let newPrize = {
        prize_name: "",
        quantity: 0,
        image_link: "",
        prizeKey: ""
    };

    let cardSubmissionStatus = "";
    let prizeSubmissionStatus = "";

    let cards = [];
    let prizes = [];
    let selectedCard = ""; // Variable to store the selected card ID
    let selectedPrizes = []; // Array to store the selected prize IDs

    // Function to fetch cards and prizes
    const fetchCardsAndPrizes = async () => {
        try {
            // Send request to fetch cards and prizes
            const res = await fetch('/api/admin/giveaway', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fetch: true }) // Set fetch to true to indicate fetching cards and prizes
            });
            const data = await res.json();
            if (data.success) {
                // Update cards and prizes arrays
                cards = data.cards;
                prizes = data.prizes;
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching cards and prizes:', error);
        }
    };

    onMount(fetchCardsAndPrizes); // Fetch cards and prizes on component mount and page reload
	
    const createItem = async (requestBody) => {
        try {
            // Send request to create item
            const res = await fetch('/api/admin/giveaway', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            const data = await res.json();
            if (data.success) {
                // Clear the form after successful creation
                if (requestBody.creation === 1) {
                    newCard = {
                        card_name: "",
                        image_link: "",
                        start_time: "",
                        end_time: "",
                        hourly_giveaway: "false" // Initialize as a string
                    };
                } else if (requestBody.creation === 2) {
                    newPrize = {
                        prize_name: "",
                        quantity: 0,
                        image_link: "",
                        prizeKey: ""
                    };
                }
            } else {
                // Handle error
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

const createCard = async () => {
    try {
        // Construct request body for creating a card
        const requestBody = {
            creation: 1, // Indicates creation of a card
            card_name: newCard.card_name,
            image_link: newCard.image_link, // Use provided image link
            start_time: newCard.start_time,
            end_time: newCard.end_time,
            hourly_giveaway: newCard.hourly_giveaway === "true" // Convert to boolean
        };

        // Send request to create card
        await createItem(requestBody);
        cardSubmissionStatus = "Successfully submitted";
        prizeSubmissionStatus = ""; // Clear prize submission status
    } catch (error) {
        console.error('Error creating card:', error);
    }
};

const createPrize = async () => {
    try {
        // Construct request body for creating a prize
        const requestBody = {
            creation: 2, // Indicates creation of a prize
            prize_name: newPrize.prize_name,
            quantity: newPrize.quantity,
            image_link: newPrize.image_link, // Use provided image link
            prizeKey: newPrize.prizeKey
        };

        // Send request to create prize
        await createItem(requestBody);
        prizeSubmissionStatus = "Successfully submitted";
        cardSubmissionStatus = ""; // Clear card submission status
    } catch (error) {
        console.error('Error creating prize:', error);
    }
};

    const handleHourlyGiveawayChange = (event) => {
        newCard.hourly_giveaway = event.target.value;
    };


const assignPrizes = async () => {
    try {
        // Get the selected card
        const selectedCardData = cards.find(card => card._id === selectedCard);
        if (!selectedCardData) {
            console.error('Selected card not found');
            return;
        }

        // Get the selected prize IDs
        const selectedPrizeIds = selectedPrizes.map(prizeId => {
            const prize = prizes.find(prize => prize._id === prizeId);
            return prize ? prize._id : null;
        }).filter(Boolean);

        if (selectedPrizeIds.length === 0) {
            console.error('No selected prizes');
            return;
        }

        // Send request to assign prizes to the selected card
        const res = await fetch('/api/admin/giveaway', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                assign: true,
                card_id: selectedCard,
                prizes: selectedPrizeIds,
                start_time: newCard.start_time,
                end_time: newCard.end_time
            })
        });
        const data = await res.json();
        if (data.success) {
            alert("Prizes assigned to the card successfully");
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error assigning prizes:', error);
    }
};


    // Define function to display card information
    const displayCardInfo = (cardId) => {
        const selectedCard = cards.find(card => card._id === cardId);
        if (selectedCard) {
            alert(`Card Name: ${selectedCard.card_name}\nImage Link: ${selectedCard.image_link}\nStart Time: ${selectedCard.start_time}\nEnd Time: ${selectedCard.end_time}\nHourly Giveaway: ${selectedCard.hourly_giveaway}`);
        }
    };

    // Define function to display prize information
// Define function to display prize information
const displayPrizeInfo = (selectedPrizeIds) => {
    selectedPrizeIds.forEach(prizeId => {
        const selectedPrize = prizes.find(prize => prize._id === prizeId);
        if (selectedPrize) {
            alert(`Prize Name: ${selectedPrize.prize_name}\nQuantity: ${selectedPrize.quantity}\nImage Link: ${selectedPrize.image_link}\nPrize Key: ${selectedPrize.prizeKey}`);
        }
    });
};

</script>

<Container fluid>
    <Row>
        <Col lg={6}>
            <Card class="card-default card-md mb-4">
                <CardBody>
                    <h3>Create New Card</h3>
                    <form on:submit|preventDefault={createCard}>
                        <div class="form-group">
                            <label for="cardName">Card Name</label>
                            <input type="text" class="form-control" id="cardName" bind:value={newCard.card_name}>
                        </div>
<div class="form-group">
    <label for="cardImage"><b>Card Image Link</b></label>
    <input type="text" class="form-control" id="cardImage" bind:value={newCard.image_link}>
</div>
                        <br />
                        <div class="form-group">
                            <label for="hourlyGiveaway">Hourly Giveaway</label>
                            <select class="form-control" id="hourlyGiveaway" bind:value={newCard.hourly_giveaway} on:change={handleHourlyGiveawayChange}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <br />
                        {#if newCard.hourly_giveaway === "false"}
                            <div class="form-group">
                                <label for="startTime">Start Time</label>
                                <input type="datetime-local" class="form-control" id="startTime" bind:value={newCard.start_time}>
                            </div>
                            <div class="form-group">
                                <label for="endTime">End Time</label>
                                <input type="datetime-local" class="form-control" id="endTime" bind:value={newCard.end_time}>
                            </div>
                        {/if}
                        <button type="submit" class="btn btn-primary">Create Card</button>
                        {#if cardSubmissionStatus}
                            <p>{cardSubmissionStatus}</p>
                        {/if}
                    </form>
                </CardBody>
            </Card>
        </Col>
        <Col lg={6}>
            <Card class="card-default card-md mb-4">
                <CardBody>
                    <h3>Create New Prize</h3>
                    <form on:submit|preventDefault={createPrize}>
                        <div class="form-group">
                            <label for="prizeName">Prize Name</label>
                            <input type="text" class="form-control" id="prizeName" bind:value={newPrize.prize_name}>
                        </div>
                        <div class="form-group">
                            <label for="prizeQuantity">Quantity</label>
                            <input type="number" class="form-control" id="prizeQuantity" bind:value={newPrize.quantity}>
                        </div>
<div class="form-group">
    <label for="prizeImage"><b>Prize Image Link</b></label>
    <input type="text" class="form-control" id="prizeImage" bind:value={newPrize.image_link}>
</div>
                        <div class="form-group">
                            <label for="prizeKey">Prize Key</label>
                            <input type="text" class="form-control" id="prizeKey" bind:value={newPrize.prizeKey}>
                        </div>
                        <button type="submit" class="btn btn-primary">Create Prize</button>
                        {#if prizeSubmissionStatus}
                            <p>{prizeSubmissionStatus}</p>
                        {/if}
                    </form>
                </CardBody>
            </Card>
        </Col>
    </Row>
	
<Row>
    <Col lg={12}>
        <Card class="card-default card-md mb-4">
            <CardBody>
                <h3>Assign Prizes to Cards</h3>
                <form>
                    <div class="form-group">
                        <label for="cardSelect">Select Card</label>
                        <select class="form-control" id="cardSelect" bind:value={selectedCard}>
                            {#each cards as card}
                                <option value={card._id}>{card.card_name}</option>
                            {/each}
                        </select>
                        <br>
                        <Button color="info" size="sm" on:click={() => displayCardInfo(selectedCard)}>Check Card Info</Button>
                    </div>
                    <br>
                    <div class="form-group">
                        <label for="prizesSelect">Select Prizes</label>
                        <select multiple class="form-control" id="prizesSelect" bind:value={selectedPrizes}>
                            {#each prizes as prize}
                                <option value={prize._id}>{prize.prize_name}</option>
                            {/each}
                        </select>
                        <br>
                        <Button color="info" size="sm" on:click={() => displayPrizeInfo(selectedPrizes)}>Check Prize Info</Button>
                    </div>
                    <div class="form-group">
                        <label for="startTime">Start Time</label>
                        <input type="datetime-local" class="form-control" id="startTime" bind:value={newCard.start_time}>
                    </div>
                    <div class="form-group">
                        <label for="endTime">End Time</label>
                        <input type="datetime-local" class="form-control" id="endTime" bind:value={newCard.end_time}>
                    </div>
                    <br />
                    <button type="button" class="btn btn-primary" on:click={assignPrizes}>Assign Prizes</button>
                </form>
            </CardBody>
        </Card>
    </Col>
</Row>

	
</Container>
