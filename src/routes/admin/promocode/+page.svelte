<script>
    import { onMount, createEventDispatcher, onDestroy } from 'svelte';
    import { Button, Card, CardBody, Col, Container, Row, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'sveltestrap';
    import response from "$lib/response";
	
    let promocodes = []; // Svelte variable to hold promocodes
    let promocodeValue = ''; // Svelte variable to hold promocode value
    let rewardPointsValue = ''; // Svelte variable to hold reward points value

    // Add your script logic here

    const dispatch = createEventDispatcher();
    let modal = { isOpen: false, success: false, message: '' };

    // Function to handle adding a promocode
    const addPromocode = async () => {
        // Call the API to add a promocode
        try {
            const response = await fetch('/api/admin/promocode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ promocode: promocodeValue, rewardPoints: rewardPointsValue })
            });

            const data = await response.json();
            showModal(data.success, data.message);
        } catch (error) {
            console.error('Error:', error.message);
            showModal(false, 'An error occurred while adding the promocode.');
        }
    };


    // Function to fetch promocodes
    const fetchPromocodes = async () => {
        try {
            const response = await fetch('/api/admin/promocodemanage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fetch: true })
            });
            const data = await response.json();
            promocodes = data.promocodes;
        } catch (error) {
            console.error('Error:', error.message);
            showModal(false, 'An error occurred while fetching promocodes.');
        }
    };
	onMount(fetchPromocodes);


    // Function to handle deleting a promocode
    const deletePromocode = async (id) => {
        try {
            const response = await fetch('/api/admin/promocodemanage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ delete: true, id })
            });
            const data = await response.json();
            if (data.success) {
                // Remove the deleted promocode from the list
                promocodes = promocodes.filter(promocode => promocode._id !== id);
            }
            showModal(data.success, data.message);
        } catch (error) {
            console.error('Error:', error.message);
            showModal(false, 'An error occurred while deleting the promocode.');
        }
    };

    // Function to handle displaying the modal
    const showModal = (success, message) => {
        modal = { isOpen: true, success, message };
    };

    // Function to handle closing the modal
    const closeModal = () => {
        modal = { isOpen: false, success: false, message: '' };
    };
	

    onDestroy(() => {
        modal = { isOpen: false, success: false, message: '' };
    });
</script>

<Container class="d-flex justify-content-center align-items-center">
    <div class="custom-card d-flex flex-column justify-content-center align-items-center">
        <h1 class="mb-4">Manage Promocodes</h1>
        <div class="mb-3">
            <input type="text" placeholder="Enter Promocode" class="form-control" bind:value={promocodeValue}>
        </div>
        <div class="mb-3">
            <input type="number" placeholder="Enter Reward Points" class="form-control" bind:value={rewardPointsValue}>
        </div>
        <Button color="purple" class="rounded-pill btn-hover mb-3" on:click={addPromocode}>
            Add Promocode
        </Button>
    </div>
</Container>


<br />
<Container>
    <center><h2>Manage Promocodes</h2></center>
    <br />
    <Table>
        <thead>
            <tr>
                <th>Promocode</th>
                <th>Reward Points</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {#each promocodes as promocode}
            <tr>
                <td>{promocode.promocode}</td>
                <td>{promocode.rewardPoints}</td>
                <td><Button color="danger" on:click={() => deletePromocode(promocode._id)}>Delete</Button></td>
            </tr>
            {/each}
        </tbody>
    </Table>
</Container>


<!-- Modal Component -->
<Modal bind:isOpen={modal.isOpen} on:closed={closeModal}>
    <ModalHeader>
        {#if modal.success}
            <h5 class="modal-title">Success</h5>
        {:else}
            <h5 class="modal-title">Error</h5>
        {/if}
        <button type="button" class="close" on:click={closeModal}>
            <span aria-hidden="true" class="close-icon">&times;</span>
        </button>
    </ModalHeader>
    <ModalBody style="color:black;">
        {#if modal.success}
            <p>{modal.message}</p>
        {:else}
            <p>{modal.message}</p>
        {/if}
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" on:click={closeModal}>
            Close
        </Button>
    </ModalFooter>
</Modal>

<style>
    .custom-card {
        background-color: white;
        border-radius: 20px; /* Adjust the border-radius value to change the curve */
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional: Add box shadow for depth */
    }

    .btn-hover:hover {
        /* Add hover effect styles here */
        /* For example: */
        background-color: #6a1b9a; /* Change to desired hover background color */
        color: white; /* Change to desired hover text color */
    }

    .close-icon {
        color: red; /* Set the close icon color to red */
    }

    .modal-header {
        justify-content: space-between; /* Align items to the ends */
    }
</style>
