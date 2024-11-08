<script>
    import { onMount, onDestroy } from 'svelte';
    import { page } from '$app/stores';
    import tokenStore from '../../../stores/token.store';
    import { get } from 'svelte/store';


    let selectedGiveaway = {};
    let countdownInterval;
    let discordUsername = '';
    let entryMessage = '';
    let entryMessageColor = 'text-white'; 
	let totalJoined = null;
    let recentWinners = [];
    let isLoading = true; // Add isLoading state variable

    async function fetchRecentWinners() {
        try {
            const response = await fetch(`/api/recent-winners?id=${selectedGiveaway.id}`);
            const data = await response.json();
            if (data.success) {
                recentWinners = data.recentWinners;
                // Fetch usernames for recent winners
                recentWinners = await Promise.all(recentWinners.map(async winner => {
                    const userResponse = await fetch(`/api/user/find?id=${winner.userId.userId}`);
                    const userData = await userResponse.json();
                    if (userData.success) {
                        winner.username = userData.username;
                    } else {
                        winner.username = "Unknown";
                    }
                    return winner;
                }));
            } else {
                console.error('Failed to fetch recent winners');
            }
        } catch (error) {
            console.error('Error fetching recent winners:', error);
        }
    }
async function fetchWinnerUsername(winnerId) {
    try {
        const response = await fetch(`/api/user/find?id=${winnerId}`);
        const data = await response.json();
        if (data.success) {
            selectedGiveaway.winnerUsername = data.username;
        } else {
            selectedGiveaway.winnerUsername = "Unknown";
        }
    } catch (error) {
        console.error('Error fetching winner username:', error);
    }
}
	
async function fetchGiveawayDetails() {
    try {
        const response = await fetch(`/api/current-giveaway?id=${$page.params.id}`);
        const data = await response.json();
        if (data.success) {
            selectedGiveaway = data.giveaway;
            selectedGiveaway.id = $page.params.id; // Set the giveawayId here
            if (!selectedGiveaway.start_time) {
                selectedGiveaway.start_time = '00:00';
            }
            if (!selectedGiveaway.end_time) {
                selectedGiveaway.end_time = '00:00';
            }
            selectedGiveaway.card_title = selectedGiveaway.card_name;
            startCountdown();
            // Fetch total joined users when giveaway details are loaded
            await fetchTotalJoined();
            // Fetch recent winners
            await fetchRecentWinners();
            // Fetch winner's username if giveaway has ended
            if (selectedGiveaway.countdown === 'Giveaway ended') {
                await fetchWinnerUsername(selectedGiveaway.winner);
            }
        } else {
            console.error('Failed to fetch giveaway details');
        }
    } catch (error) {
        console.error('Error fetching giveaway details:', error);
    }
}



    async function fetchTotalJoined() {
        try {
            const response = await fetch('/api/total-joined', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    giveawayId: selectedGiveaway.id
                })
            });
            const data = await response.json();
            if (data.success) {
                totalJoined = data.totalJoined;
            } else {
                console.error('Failed to fetch total joined users:', data.error);
            }
        } catch (error) {
            console.error('Error fetching total joined users:', error);
        }
    }
	
    function startCountdown() {
        clearInterval(countdownInterval);
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    function updateCountdown() {
        const endTime = new Date(selectedGiveaway.end_time).getTime();
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance <= 0) {
            clearInterval(countdownInterval);
            selectedGiveaway.countdown = 'Giveaway ended';
            // Disable the Enter Giveaway button
            document.getElementById('enterGiveawayBtn').disabled = true;
        } else {
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            selectedGiveaway.countdown = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    

       
        
    onMount(fetchGiveawayDetails);

    onDestroy(() => {
        clearInterval(countdownInterval);
    });

    async function handleJoinGiveaway() {
        // If the giveaway has ended, display a message and return
        if (selectedGiveaway.countdown === 'Giveaway ended') {
            entryMessageColor= 'text-red-500';
            entryMessage = 'Giveaway has ended. You cannot join.';
            return;
        }
        
        // Otherwise, proceed with joining the giveaway
        if (discordUsername.trim() === '') {
            entryMessageColor= 'text-red-500';
            entryMessage = 'Please enter your Discord username.';
            return;
        }
        
        try {
            const response = await fetch('/api/join-giveaway', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    join: true,
                    giveawayId: selectedGiveaway.id,
                    discordUsername: discordUsername.trim()
                })
            });
            const data = await response.json();
            if (data.success) {
                entryMessageColor= 'text-green-500';
                entryMessage = 'You have successfully joined the giveaway!';
                
            } else {
                entryMessageColor= 'text-red-500';
                entryMessage = data.message;
            }
        } catch (error) {
            console.error('Error joining giveaway:', error);
            entryMessageColor= 'text-red-500';
            entryMessage = 'An error occurred while joining the giveaway. Please try again later.';
        }
    }
	
	    onMount(async () => {
        await fetchGiveawayDetails();
        isLoading = false; // Set isLoading to false after data has loaded
    });

</script>
<div class="bg-bye">
{#if isLoading} <!-- Show loader while data is loading -->
  <center>  <div class="loader"></div></center>
{:else}
     {#if selectedGiveaway}
    <br />
    
    <div class="page-content">
        <h1 class="redeem-page-header" style="margin-top:0;background:linear-gradient(to right, #03a9f4, #9c27b0);">{selectedGiveaway.card_name}</h1>
        <br />
        <div class="row" style="text-align:center;">
            {#if selectedGiveaway.countdown}
            <div class="col-lg-3 col-md-6 d-flex align-items-center justify-content-center">
                <div class="card">
                    <div class="card-body countdown-modal text-center" style="">
                        <h5 class="card-title">Countdown</h5>
                        <div>
                            <span class="badge badge-secondary" style="margin-bottom:5px; ">Timer</span>
                            <h2 style="font-weight:700;font-family:montserrat,sans-serif;margin-bottom:0;" id="time" class="display-4 pt-4">{selectedGiveaway.countdown}</h2>
                            <br>
                            <span class="badge badge-secondary" style="margin-bottom:5px;">Prize Item</span>
                            {#if selectedGiveaway.prizes && selectedGiveaway.prizes.length > 0}
                                <p style="font-weight:700;font-family:montserrat,sans-serif;margin-bottom:0;" class="display-4 pt-4">
                                <span style="position:relative; display:inline-block; vertical-align:middle; margin-right: 5px;">
                                    <!-- svelte-ignore a11y-img-redundant-alt -->
                                    <img src="{selectedGiveaway.prizes[0].image_link}" alt="Prize Image" style="width: 100px; height: 100px; border-radius: 100%;">
                                </span>
                                {selectedGiveaway.prizes[0].prize_name}
                            </p> 
                            {:else}
                                <p>Prize information unavailable</p>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
            {/if}

        <div class="col-lg-5 col-md-6 d-flex align-items-center justify-content-center">
            <div class="card">
                <div class="card-body hourly-giveaway-modal text-center" style="">
                    <h5 class="card-title">Enter {selectedGiveaway.card_name}</h5>
                    <div style="padding-top:20px;">
                        <input type="text" bind:value="{discordUsername}" placeholder="Enter Discord Username" style="margin-bottom: 20px; text-align: center;">
                        <button class="btn btn-primary" on:click="{handleJoinGiveaway}">Enter Giveaway</button>
                        <p class="entry-message pt-2 {entryMessageColor}">{entryMessage}</p>
                            {#if selectedGiveaway.countdown === 'Giveaway ended'}
                                <p>{selectedGiveaway.winnerUsername} has won</p>
                            {:else}
                                {#if totalJoined !== null}
                                    <div class="pt-2 bucky">
                                    <p>There are <span  style="color:#00000;font-weight:600;">{totalJoined}</span> users currently entered in this round.</p>
                                    </div>
                                {/if}
                            {/if}

                    </div>
                </div>
            </div>
        </div>

            <div class="col-lg-4 col-md-6 d-flex align-items-center justify-content-center">
<div class="card">
    <div class="card-body recent-winners-modal text-center" style="">
        <h5 class="card-title">Recent Winners</h5>
        {#each recentWinners as winner}
            <p style="margin-bottom:2px;">
                <a class="clear-a" href={`https://justearn.gg/user/${winner.userId.userId}`}>
                    <span class="feed-username-span">{winner.username}</span>
                </a>
                won <span>{winner.userId.prize_name}</span>
            </p>
        {/each}
    </div>
</div>


            </div>
        </div>

        <div class="row" style="display: flex; align-items: stretch; overflow: hidden;">
            <div class="col-lg-12 col-md-6">
              <div class="card">
                <div class="card-body information-modal text-center" style="min-height:200px;">
                  <h5 class="card-title">Information</h5>
                  <ul style="text-align: left;" class="ducky"> 
                    <li>• Press the Enter Giveaway button to enter!</li>
                    <br>
                    <li>• Entry is completely free, and you're able to enter once.</li>
                    <br>
                    <li>• Participants must be signed up to justearn and be in the <a href="https://discord.gg/justearn" class="text-gray-300 hover:text-blue-500"  target="_blank">JustEarn.GG</a> Official Discord Server.</li>
                    <br>
                    <li>• The winner will be contacted to receive the prize.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          
              </div>
              
    {/if}


{/if}
</div>


<style>
.bucky {
    font-size: medium;
}

.ducky {
   font-size:medium; 
}

.page-content .main-wrapper {
    font-size: 14px;
    padding-top: 0px !important;
}

.redeem-page-header {
    font-size: 16px;
    
    text-transform: none;
    font-weight: 300;
    color: #f1f1f1;
    margin-bottom: 20px;
    margin-top: -38px;
    text-align: center;
    background: #2f333b;
    border-radius: 8px;
    padding: 8px;
}
.page-content {
    padding: 0 100px;
}
/* Grid layout */
.row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
	
}



.col-lg-3, .col-lg-5, .col-lg-4, .col-md-6 {
    padding: 0 15px; /* Add horizontal padding to columns */
}

/* Set width of cards for different screen sizes */
@media (max-width: 576px) {
    .col-lg-3, .col-lg-5, .col-lg-4, .col-md-6 {
        flex-basis: 100%;
        max-width: 100%;
    
	}
    .ducky {
        font-size: 12px;
    }
    .bucky {
        font-size: 12px;
    
    }
}
@media (max-width: 768px) {
   
    .ducky {
        font-size: 11px;
    }

}



/* Card styling */
.card {
    box-shadow: 0 0 1.25rem rgba(31,45,61,.08);
    margin-bottom: 20px;
    border: 0 !important;
  
    border-radius: 10px;
	background-color: rgba(0, 0, 0, 0.1); /* Set background color */
    -webkit-transition: background .2s ease-in-out;
    -moz-transition: background .2s ease-in-out;
    -o-transition: background .2s ease-in-out;
    transition: background .2s ease-in-out;
        flex: 1 0 0; /* Set flex-grow to 1 to equally distribute the space */
        max-width: calc(300.3333% - 100px); /* Adjust width for three cards and margin */
		height: 300px;
}

/* Card body styling */
.card-body {
    padding: 20px; /* Add padding to card body */
    
}
.card .card-body {
    padding: 25px;
}

/* Adjust badge padding */
.badge {
    padding: 7px 12px;
    font-weight: 700;
    font-size: 75% !important;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
}

/* Adjust badge border radius */
.badge:not(.badge-pill) {
    border-radius: 7px;
}






/* Adjust card body padding */
.countdown-modal .card-body,
.hourly-giveaway-modal .card-body,
.recent-winners-modal .card-body {
    padding: 20px;
}

/* Adjust card title margin */
.countdown-modal .card-title,
.hourly-giveaway-modal .card-title,
.recent-winners-modal .card-title {
    margin-bottom: 15px;
    font-size: 1.25rem;
    font-weight: 700;
    text-transform: uppercase;
    font-family: montserrat, sans-serif;
    color: #5c6662;
}



/* Adjust badge border radius */
.badge:not(.badge-pill) {
    border-radius: 7px;
}


.card .card-title {
    margin-bottom: 25px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    font-family: montserrat, sans-serif;
    color: #fff;
}

/* Card title styling */
.card-title {
    margin-bottom: 15px; /* Add gap below card title */
    font-size: 1.25rem;
    font-weight: 700;
}




.badge-secondary {
    color: #fff;
    background-color: #0f0c1d;
}

/* Button styling */
.btn {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    text-decoration: none;
    cursor: pointer;
}

.btn-primary {
    color: #fff;
    background-color: #521119;
    border-color: #521119;
   
}

.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: #FF3D00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}



</style>
