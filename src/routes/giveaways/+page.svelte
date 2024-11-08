<script>
    import { onMount, onDestroy } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    let giveawayItems = [];
    let selectedGiveaway = null;
    let joinedGiveaways = []; // Array to store joined giveaways for the current user
    let isGiveawayDataLoaded = false; // Flag to track if giveaway data is loaded
    let isJoining = false; // Flag to track if user is currently joining a giveaway
    let joinButtonMessage = 'Enter Giveaway'; // Default message for the join button
    let successMessage = ''; // Success message displayed below the button

    const dispatch = createEventDispatcher();

    async function fetchGiveawayData() {
        try {
            const response = await fetch('/api/admin/giveaway', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fetch: true })
            });
            const responseData = await response.json();
            if (responseData.success) {
                giveawayItems = responseData.cards.map(item => ({
                    ...item,
                    joined: false, // Set joined property initially to false for each giveaway item
                    countdown: calculateCountdown(item.start_time, item.end_time) // Calculate countdown for each giveaway item
                }));
                isGiveawayDataLoaded = true; // Set the flag to true when giveaway data is loaded
            } else {
                console.error('Failed to fetch giveaway data');
            }
        } catch (error) {
            console.error('Error fetching giveaway data:', error);
        }
    }

    async function handleGiveawayClick(giveaway) {
        selectedGiveaway = giveaway;
        selectedGiveaway.joined = joinedGiveaways.includes(selectedGiveaway._id);
        window.location.href = `/giveaways/${selectedGiveaway._id}`; // Navigate to the current URL with the selected giveaway ID
    }

    function calculateCountdown(startTime, endTime) {
        // Your existing code for calculating countdown
    }

    onMount(fetchGiveawayData);

    onDestroy(() => {
        // Clear any ongoing countdown intervals when component is destroyed
        giveawayItems.forEach(item => {
            if (item.countdownIntervalId) {
                clearInterval(item.countdownIntervalId);
            }
        });
    });
</script>

<svelte:head>
    <title>Giveaways - Justearn.GG</title>
</svelte:head>
<div class="bg-bye">
<div class="container">
    <h1 class="giveaway-title">Giveaways</h1>
    <div class="giveaway-grid">
        {#each giveawayItems as item}
            <div class="giveaway-card" on:click={() => handleGiveawayClick(item)} on:keydown={(e) => e.key === 'Enter' && handleGiveawayClick(item)} tabindex="0">
                <div class="giveaway-content">
                    <img src={item.image_link} alt={item.card_name}/>
                    <h3>{item.card_name}</h3>
                </div>
            </div>
        {/each}
    </div>
</div>
</div>





<style>
.container {
    padding: 20px;
    text-align: center; /* Center the contents horizontally */
}

.giveaway-title {
    margin-bottom: 20px; /* Add some space below the title */
}

.giveaway-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Create a 3-column layout */
    gap: 20px; /* Add space between grid items */
}

.giveaway-card {
    border: 1px solid #3f2175;
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
    background: linear-gradient(135deg, #6e4bb6, #1b2d7c);
    transition: transform 0.3s ease; /* Add transition for hover effect */
    cursor: pointer; /* Change cursor on hover */
}

.giveaway-card:hover {
    transform: translateY(-5px); /* Move card up slightly on hover */
}

.giveaway-content {
    padding: 20px;
}

.giveaway-content img {
    max-width: 100%;
    max-height: 150px; /* Adjust the maximum height as needed */
    border-radius: 8px;
}

/* Add the styles for the modal */
.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5); /* Dark background color */
}

.modal-content {
    background-color: #1a1a1a; /* Dark background color */
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 600px;
    border-radius: 8px;
    position: relative;
    color: white; /* White text color */
}

.close-button {
    color: white; /* White close button color */
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close-button:hover,
.close-button:focus {
    color: #ddd; /* Lighter close button color on hover */
    text-decoration: none;
    cursor: pointer;
}

.enter-giveaway-button {
    background-color: #4a00e0; /* Purple background color */
    color: white; /* White text color */
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
    display: block;
    margin: 0 auto; /* Center the button */
}

.enter-giveaway-button:hover {
    background-color: #8e2de2; /* Darker purple background color on hover */
}

*:not(.popup-content) {
border-color: black;
}

.already-joined-button {
    background-color: #4a00e0; /* Purple background color */
    color: white; /* White text color */
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
    display: block;
    margin: 0 auto; /* Center the button */
}

.already-joined-button:hover {
    background-color: #8e2de2; /* Darker purple background color on hover */
}

</style>