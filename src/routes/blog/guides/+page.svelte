<div class="bg-bye">
    <div class="container">
        <h1 class="giveaway-title">Guides</h1>
        <div class="flex">
            <a href="/blog/guides/merge" class="w-2/7">
                <div class="giveaway-card">
                    <div class="giveaway-content">
                        <img src="https://i.imgur.com/Ksnx56M_d.webp?maxwidth=760&fidelity=grand" class="w-full h-full " alt="merge">
                        <h3>Merge Dragons 🟢 - 906 Pts </h3>
                    </div>
                </div>
            </a>
            <a href="/blog/guides/merge" class="w-2/7">
                <div class="giveaway-card">
                    <div class="giveaway-content">
                        <img src="https://i.imgur.com/Ksnx56M_d.webp?maxwidth=760&fidelity=grand" class="w-full h-full " alt="merge">
                        <h3>Merge Dragons 🟢 - 906 Pts </h3>
                    </div>
                </div>
            </a>
        </div>
    </div>
</div>

    <style>
        .container {
            padding: 20px;
            text-align: left; /* Center the contents horizontally */
            font-weight: 700;
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
            width: 70%;
            border-radius: 8px;
            overflow: hidden;
            text-align: center;
            background: linear-gradient(135deg, #0e0c14, #58131d);
            transition: transform 0.3s ease; /* Add transition for hover effect */
            cursor: pointer; /* Change cursor on hover */
        }
        
        .giveaway-card:hover {
            transform: translateY(-5px); /* Move card up slightly on hover */
        }
        
        .giveaway-content {
            padding: 0px;
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