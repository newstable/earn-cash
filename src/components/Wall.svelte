<script>
    import { onMount, onDestroy } from 'svelte';
    import { get } from "svelte/store"; 
    export let wallUrl = "ayetstudio";
    export let wallName = "Ayet Studios";
    export let logoUrl = "/ayetLogo.webp";
    export let backgroundUrl = "/wall-ayetstudios-card-bg.png";
    export let hasBonus = false;

    // Define the minimum level required for each wall
    const wallLevels = {
        adgate: 0,
        lootably: 0,
        notik: 0,
        monlix: 0,
        offertoro: 0,
        revu: 0,
        adscend: 0,
        timewall: 0,
        cpxresearch: 4, // Example for survey walls
        bitlabs: 0,
        inbrain: 0,
		mmwall: 0,
    };

    let user = {};
    let errorMessage = null; // Add a variable to store the error message
    let pollingInterval; // Variable to store the polling interval

    // Function to fetch user details from the API and update the user and error message
    function fetchUserDetails() {
        fetch("/api/user/details")
            .then((response) => response.json())
            .then((data) => {
                // Check if the response contains an error
                if (data.error === "Authentication failed") {
                    errorMessage = "Please Login To Continue";
                    user = {}; // Clear user data when authentication fails
                } else {
                    user = data;
                    errorMessage = null; // Clear the error message if authentication is successful
                }
            });
    }

    // Initial fetch of user details on component mount
    onMount(() => {
        fetchUserDetails();

        // Start polling for user details every 10 seconds
        pollingInterval = setInterval(fetchUserDetails, 10000);
    });

    // Clear the polling interval when the component is destroyed
    onDestroy(() => {
        clearInterval(pollingInterval);
    });
</script>

<!-- Update the component to display the error message or lock message based on errorMessage -->
<a href="/earn/{wallUrl}" class:disabled={errorMessage !== null || user.level < wallLevels[wallUrl]}>
    <div class="wall">
        <div style="background-image: url({backgroundUrl});">
            {#if errorMessage !== null}
                <!-- Display the padlock icon and error message for login -->
                <div class="lock-container">
                    <div class="padlock">
                        <img src="./padlock.svg" alt="Padlock"/>
                    </div>
                    <p class="lock-text">{errorMessage}</p>
                </div>
            {:else}
                {#if user.level >= wallLevels[wallUrl]} <!-- Check if user's level is sufficient -->
                    <div class="overlay"/>
                    <div class="action">
                        <div class="earn-box-play-button disabled">
                            <img src="/play-offer.svg" alt="Play button"/>
                        </div>
                        <p class="earn-box-cover-action-text">View offers</p>
                    </div>
                {:else}
                    <!-- Display centered lock icon and text if user's level is not sufficient -->
                    <div class="lock-container">
                        <div class="padlock">
                            <img src="./padlock.svg" alt="Padlock"/>
                        </div>
                        <p class="lock-text">You need to reach level {wallLevels[wallUrl]} to unlock</p>
                    </div>
                {/if}
            {/if}
            <a href="/earn/{wallUrl}" class:disabled={errorMessage !== null || user.level < wallLevels[wallUrl]}>
                <div class="below"/>
                <div class="above">
                    {#if hasBonus}
                        <div class="bonus">BONUS</div>
                    {/if}
                </div>
                <div class="offerWall">
                    <img src={logoUrl} alt="{wallName} logo"/>
                </div>
            </a>
            <p class="wallName">{wallName}</p>
        </div>
    </div>
</a>


<style lang="scss">
    div.wall {
        text-decoration: none;
        cursor: pointer;

        &:hover > div {
            & > div.overlay {
                opacity: 1;
            }
            & > div.action {
                opacity: 1;
            }
        }

        & > div {
            min-width: 20px;
            min-height: 50px;
            background: #222121;
            border-radius: 5px;
            position: relative;
            width: 100%;

            background-size: 100% 100%;

            & > div.overlay {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                display: flex;
                opacity: 0;
                transition: all .3s cubic-bezier(0.4,0,0.2,1);
                backdrop-filter: blur(20px);
                z-index: 2;
            }

            & > div.action {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                display: flex;
                opacity: 0;
                transition: all .3s cubic-bezier(0.4,0,0.2,1);
                align-items: center;
                justify-content: center;
                flex-direction: column;
                z-index: 3;

                & > div.earn-box-play-button {
                    width: 40px;
                    height: 40px;
                    background: rgba(255,90,92,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 10px;
                    border-radius: 50%;
                }

                & > p.earn-box-cover-action-text {
                    margin: 0;
                    color: white;
                    font-size: 12px;
                    font-weight: 500;
                }
            }

            & > a {
                display: flex;
                transition: all .3s cubic-bezier(0.4,0,0.2,1);
                text-decoration: none;

                & > div.offerWall {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    & > img {
                        width: 80%;
                        max-height: 60px;
                        object-fit: contain;
                        vertical-align: bottom;
                    }
                }

                & > div.below {
                    flex: 1;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: end;
                    min-height: 230px;
                }

                & > div.above {
                    background: #292c46;

                    & > div.bonus {
                        position: absolute;
                        top: 12px;
                        right: 12px;
                        background: rgba(255,90,92,0.2);
                        border-radius: 12px;
                        padding: 2px 10px;
                        font-weight: 500;
                        font-size: 12px;
                        color: #ff5a5c;
                    }
                }
            }

            & > p.wallName {
                font-size: 14px;
                font-weight: 500;
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                bottom: 16px;
                color: #fff;
                text-align: center;
                z-index: 2;
            }
        }
    }

    .lock-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 4;
        color: white;
		backdrop-filter: blur(20px);
		border-radius: 50px;

        & > .padlock {
            /* Style your padlock icon as needed */
            img {
                width: 40px;
                height: 40px;
            }
        }

        & > .lock-text {
            font-size: 14px;
            font-weight: 500;
            margin-top: 10px;
            text-align: center;
        }
    }

    .earn-box-play-button.disabled {
        /* Style your disabled play button as needed */
        pointer-events: none; /* Disable interaction */
        opacity: 0.5; /* Adjust opacity to visually indicate it's disabled */
    }
	
	a.disabled {
    pointer-events: none; /* Disable interaction */
    opacity: 1; /* Adjust opacity to visually indicate it's disabled */
    cursor: not-allowed; /* Change cursor to indicate it's disabled */
}
</style>
