<script>
    import { onMount, onDestroy } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    let promocode = '';
    let successModalVisible = false;
    let errorModalVisible = false;
    let errorMessage = '';

    const dispatch = createEventDispatcher();

    const redeemPromocode = async () => {
        try {
            const response = await fetch('./api/promocode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ promocode })
            });

            const data = await response.json();

            if (response.ok) {
                successModalVisible = true;
                errorModalVisible = false;
                setTimeout(() => {
                    location.reload();
                }, 2000);
            } else {
                successModalVisible = false;
                errorModalVisible = true;
                errorMessage = data.message || data.error || 'An error occurred';

                // Check for specific error messages
                if (errorMessage === 'Promocode not found') {
                    errorMessage = 'Promocode not found. Please check and try again.';
                } else if (errorMessage === 'Promocode already redeemed by this user') {
                    errorMessage = 'Promocode has already been redeemed by you.';
                }
            }
        } catch (error) {
            console.error('Error:', error.message);
            successModalVisible = false;
            errorModalVisible = true;
            errorMessage = 'An error occurred';
        }
    };


    const closeModal = () => {
        successModalVisible = false;
        errorModalVisible = false;
    };
    
</script>

<svelte:head>
    <title>Promo codes - Justearn.GG</title>
</svelte:head>

<body class="bg-bye">
    <div class="container">
        <center><img src="./logoicontext.png" alt="Promotion" class="promo-image"></center>

        <h1>⭐Redeem Promocode⭐</h1>
      
        <div class="input-box">
            <input type="text" placeholder="Enter your promocode..." bind:value={promocode}>
        </div>
        <button class="redeem-button" on:click={redeemPromocode}>Click Here To Redeem</button>
    </div>

    {#if successModalVisible}
    <!-- Success Modal -->
    <div class="modal-overlay">
        <div class="modal">
            <div class="modal-content success">
                <h2>Success!</h2>
                <p>Promocode redeemed successfully.</p>
                <button class="close-button" on:click={closeModal}>Close</button>
            </div>
        </div>
    </div>
    {/if}

    {#if errorModalVisible}
    <!-- Error Modal -->
    <div class="modal-overlay">
        <div class="modal">
            <div class="modal-content error">
                <h2>Error!</h2>
                <p>{errorMessage}</p>
                <button class="close-button" on:click={closeModal}>Close</button>
            </div>
        </div>
    </div>
    {/if}
</body>


<style>
     /* Modal overlay */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8); /* Dark grayish-black background */
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease;
    }

    /* Modal */
    .modal {
        background-color: #121212;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        animation: slideIn 0.3s ease;
    }

    /* Modal content */
    .modal-content {
        text-align: center;
    }

    /* Success modal */
    .success {
        color: #28a745;
    }

    /* Error modal */
    .error {
        color: #dc3545;
    }

    /* Close button */
    .close-button {
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 8px 20px;
        cursor: pointer;
        margin-top: 10px;
    }

    .close-button:hover {
        background-color: #0056b3;
    }


    /* Container styles */
    .container {
        width: 400px;
        position: relative;
        margin: 20px auto; /* Centering the container horizontally and adding 20px gap from top and bottom */
        background-color: #121212;
        border-radius: 20px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    h1 {
        color: #fff;
        text-align: center;
        margin-bottom: 20px;
    }

    .input-box {
        margin-bottom: 20px;
    }

    .promo-image {
        width: 150px;
        margin-bottom: 25px;
        animation: floatUpDown 3s ease-in-out infinite alternate; /* Animation for floating effect */
    }

    @keyframes floatUpDown {
        0% {
            transform: translateY(14px);
        }
        100% {
            transform: translateY(20px);
        }
    }

    input[type="text"] {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 10px;
        outline: none;
        color: white;
    }

    .redeem-button {
        background-color: #28a745;
        color: #fff;
        border: none;
        border-radius: 10px;
        padding: 10px 0;
        width: 100%;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .redeem-button:hover {
        background-color: #218838;
    }
</style>
