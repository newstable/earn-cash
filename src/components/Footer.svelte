<script>
  import "../app.scss";
  import FooterIcon from "./icons/FooterIcon.svelte";
  // Function to show the chatbox
</script>

<footer class="bg-hi">
  <div class='footer-container'>
    <div class='links-section'>
        <div class='logo'>
            <img src='/treasurechest.png' height='118' width='158' class="scale-150" alt=''/>
            <img src='/logo1.png' width='188' height='29' alt=''/>
        </div>

        <div class='links'>
            <div class='link-section'>
                <p class="text-[#f5f5f5] font-extrabold">ABOUT US</p>
               
                <a class='footer-link' href='/privacy'>Privacy Policy</a>
                <a class='footer-link' href='/terms'>Terms of Service</a>
                <a class='footer-link' href='/faq'>Frequently Asked</a>
            </div>

            <div class='link-section flex flex-col gap-5 text-[#0e0c1d] font-extrabold'>
  <p class="text-[#f5f5f5] font-extrabold">COMMUNITY</p>
  <a class='footer-link flex items-center' href='https://discord.gg/justearn' target='_blank'>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M13.5447 0.994743C12.5249 0.53434 11.4314 0.195118 10.288 0.000815247C10.2672 -0.00293612 10.2463 0.00644229 10.2356 0.0251684C10.095 0.271314 9.93919 0.592394 9.8301 0.844781C8.60032 0.663608 7.37681 0.663608 6.17225 0.844781C6.06312 0.586797 5.90169 0.271314 5.76041 0.0251684C5.74969 0.00705727 5.72887 -0.00232114 5.70806 0.000815247C4.56531 0.194472 3.47175 0.533694 2.45131 0.994743C2.44246 0.998495 2.4349 1.00474 2.42987 1.01285C0.355618 4.06207 -0.212633 7.03635 0.0661174 9.97374C0.0673674 9.9881 0.0755861 10.0018 0.0869299 10.0106C1.45546 10.9995 2.78115 11.5999 4.08218 11.9978C4.103 12.0041 4.12506 11.9966 4.13831 11.9797C4.44606 11.5662 4.7204 11.1301 4.95562 10.6716C4.9695 10.6447 4.95625 10.6128 4.92787 10.6022C4.49272 10.4398 4.07837 10.2417 3.67978 10.0169C3.64825 9.99877 3.64572 9.95439 3.67475 9.93315C3.75862 9.87131 3.84253 9.80695 3.92262 9.74198C3.93712 9.73011 3.95731 9.72762 3.97434 9.73509C6.59284 10.9115 9.42769 10.9115 12.0153 9.73509C12.0323 9.72698 12.0525 9.7295 12.0676 9.74134C12.1478 9.80631 12.2316 9.87128 12.3161 9.93312C12.3451 9.95436 12.3432 9.99874 12.3117 10.0168C11.9131 10.2461 11.4988 10.4398 11.063 10.6016C11.0346 10.6122 11.022 10.6447 11.0359 10.6715C11.2762 11.1294 11.5505 11.5655 11.8526 11.9791C11.8652 11.9966 11.8879 12.0041 11.9087 11.9978C13.2161 11.5999 14.5418 10.9995 15.9103 10.0106C15.9223 10.0018 15.9299 9.98871 15.9311 9.97435C16.2647 6.57841 15.3723 3.62851 13.5655 1.01347C13.5611 1.00474 13.5535 0.998495 13.5447 0.994743ZM5.34672 8.18516C4.55837 8.18516 3.90878 7.47302 3.90878 6.5984C3.90878 5.7238 4.54575 5.01163 5.34672 5.01163C6.15394 5.01163 6.79725 5.73005 6.78463 6.5984C6.78463 7.47302 6.14762 8.18516 5.34672 8.18516ZM10.6632 8.18516C9.87488 8.18516 9.22529 7.47302 9.22529 6.5984C9.22529 5.7238 9.86226 5.01163 10.6632 5.01163C11.4704 5.01163 12.1137 5.73005 12.1011 6.5984C12.1011 7.47302 11.4705 8.18516 10.6632 8.18516Z" fill="#5865F2"/>
  </svg>
    <span class="ml-2">Discord</span>
  </a>
  <a class='footer-link flex items-center' href='https://twitter.com/justearngg' target='_blank'>
   <svg viewBox="328 355 335 276" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
  <path d="
    M 630, 425
    A 195, 195 0 0 1 331, 600
    A 142, 142 0 0 0 428, 570
    A  70,  70 0 0 1 370, 523
    A  70,  70 0 0 0 401, 521
    A  70,  70 0 0 1 344, 455
    A  70,  70 0 0 0 372, 460
    A  70,  70 0 0 1 354, 370
    A 195, 195 0 0 0 495, 442
    A  67,  67 0 0 1 611, 380
    A 117, 117 0 0 0 654, 363
    A  65,  65 0 0 1 623, 401
    A 117, 117 0 0 0 662, 390
    A  65,  65 0 0 1 630, 425
    Z"
    style="fill:#3BA9EE;"/>
</svg>
    <span class="ml-2">Twitter</span>
  </a>
  <a class='footer-link flex items-center' href='https://youtube.com/@justearn0' target='_blank'>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
      <rect width="18" height="13" rx="3" fill="#ff0000"/>
      <path d="M11.8869 6.4453C12.0377 6.52091 12.0377 6.72909 11.8869 6.8047L7.30655 9.10192C7.16688 9.17197 7 9.07414 7 8.92222L7 4.32778C7 4.17586 7.16688 4.07803 7.30655 4.14808L11.8869 6.4453Z" fill="#1F1D3A"/>
    </svg>
    <span class="ml-2">Youtube</span>
  </a>
  <a class='footer-link flex items-center' href='https://www.instagram.com/justearngg/' target='_blank'>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fe0175" class="bi bi-instagram" viewBox="0 0 16 16">
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
    </svg>
    <span class="ml-2">Instagram</span>
  </a>
</div>


<div class='link-section flex flex-col gap-5 text-[#0e0c1d] font-extrabold'>
  <p class="text-[#f5f5f5] font-extrabold">SUPPORT</p>
  <button
  on:click={showChatbox}
    class="footer-link flex items-center"
    >Live Chat</button>
  <a class='footer-link flex items-center' href='mailto:daniel@justearn.gg' target='_blank'>
    <span>daniel@justearn.gg</span>
  </a>
  <a class='footer-link purple flex items-center' href='https://discord.gg/justearn' target='_blank'>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M13.5447 0.994743C12.5249 0.53434 11.4314 0.195118 10.288 0.000815247C10.2672 -0.00293612 10.2463 0.00644229 10.2356 0.0251684C10.095 0.271314 9.93919 0.592394 9.8301 0.844781C8.60032 0.663608 7.37681 0.663608 6.17225 0.844781C6.06312 0.586797 5.90169 0.271314 5.76041 0.0251684C5.74969 0.00705727 5.72887 -0.00232114 5.70806 0.000815247C4.56531 0.194472 3.47175 0.533694 2.45131 0.994743C2.44246 0.998495 2.4349 1.00474 2.42987 1.01285C0.355618 4.06207 -0.212633 7.03635 0.0661174 9.97374C0.0673674 9.9881 0.0755861 10.0018 0.0869299 10.0106C1.45546 10.9995 2.78115 11.5999 4.08218 11.9978C4.103 12.0041 4.12506 11.9966 4.13831 11.9797C4.44606 11.5662 4.7204 11.1301 4.95562 10.6716C4.9695 10.6447 4.95625 10.6128 4.92787 10.6022C4.49272 10.4398 4.07837 10.2417 3.67978 10.0169C3.64825 9.99877 3.64572 9.95439 3.67475 9.93315C3.75862 9.87131 3.84253 9.80695 3.92262 9.74198C3.93712 9.73011 3.95731 9.72762 3.97434 9.73509C6.59284 10.9115 9.42769 10.9115 12.0153 9.73509C12.0323 9.72698 12.0525 9.7295 12.0676 9.74134C12.1478 9.80631 12.2316 9.87128 12.3161 9.93312C12.3451 9.95436 12.3432 9.99874 12.3117 10.0168C11.9131 10.2461 11.4988 10.4398 11.063 10.6016C11.0346 10.6122 11.022 10.6447 11.0359 10.6715C11.2762 11.1294 11.5505 11.5655 11.8526 11.9791C11.8652 11.9966 11.8879 12.0041 11.9087 11.9978C13.2161 11.5999 14.5418 10.9995 15.9103 10.0106C15.9223 10.0018 15.9299 9.98871 15.9311 9.97435C16.2647 6.57841 15.3723 3.62851 13.5655 1.01347C13.5611 1.00474 13.5535 0.998495 13.5447 0.994743ZM5.34672 8.18516C4.55837 8.18516 3.90878 7.47302 3.90878 6.5984C3.90878 5.7238 4.54575 5.01163 5.34672 5.01163C6.15394 5.01163 6.79725 5.73005 6.78463 6.5984C6.78463 7.47302 6.14762 8.18516 5.34672 8.18516ZM10.6632 8.18516C9.87488 8.18516 9.22529 7.47302 9.22529 6.5984C9.22529 5.7238 9.86226 5.01163 10.6632 5.01163C11.4704 5.01163 12.1137 5.73005 12.1011 6.5984C12.1011 7.47302 11.4705 8.18516 10.6632 8.18516Z" fill="#5865F2"/>
  </svg>
    <span class="ml-2">Discord</span>
  </a>
</div>

        </div>
    </div>

    <div class='disclaimer'>
        <p>
          JustEarn is an easy way to earn money online from anywhere in the world.

            <br/><br/>
            Earn simply by filling out surveys, testing mobile apps, using your discord as a human billboard, or watching videos!

            <br/><br/>
            Copyright © JustEarn. VPNs are strictly prohibited. <span class="hidden">hi im daniel</span>
        </p>

        <div class='divider'/>

        <div class="rate w-[305px] h-[60px] align-middle flex  justify-center bg-[#6f1521] rounded-lg border-r-8 border-r-black ml-[40px]"><img class="h-30 w-20 mr-6" src="/coin3.svg" alt="coin"/><span class="text-white font-extrabold text-2xl whitespace-nowrap mr-20 flex mt-1">100 Coins = 1 $</span></div>
    </div>
</div>
</footer>

<style >
  .footer-container {
    width: 100%;
    min-height: 50px;
    height: fit-content;

    box-sizing: border-box;
    padding: 50px 50px 25px 50px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    
   
  }
  
  .links-section, .disclaimer {
    width: 100%;
    max-width: 1175px;
    
    display: flex;
    justify-content: space-between;
    gap: 40px;
  }
  
  .disclaimer {
    margin-top: 45px;
    
    border-radius: 7px;
    background: linear-gradient(277deg, rgba(97, 89, 176, 0.10) -69.8%, rgba(67, 55, 141, 0.10) 144.89%);
    
    padding: 15px 20px;
    
    color: #ffff;
   
    font-size: 14px;
    font-weight: 400;
    
    align-items: center;
  }
  
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    gap: 30px;
  }
  
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 75px;
    font-size: 16px;
    
  }
  
  .link-section {
    display: flex;
    flex-direction: column;
    
    gap: 20px;
    
    color: #FFF;
    
    font-size: 16px;
    font-weight: 400;
  }
  
  .divider {
    min-width: 1px;
    height: 60px;

    background: linear-gradient(0deg, rgba(90, 84, 153, 0.00) 0%, rgba(90, 84, 153, 0.27) 49.47%, rgba(90, 84, 153, 0.00) 100%);
  }

  .rate {
    min-width: 305px;
    height: 60px;

    border-radius: 7px;
    
    margin-left: 40px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    color: #FFF;
    font-size: 16px;
    font-weight: 700;
    
    position: relative;
  }

  .swords {
    width: 100%;
    height: 100%;

    position: absolute !important;
    z-index: 0;

    opacity: 0.1;
    background-image: url("/assets/art/rainswords.png");
    background-position: center;
    background-size: cover;
    border-radius: 8px;
  }

  .rate .coin {
    position: absolute;
    left: -40px;
    z-index: 10;
  }

  @media only screen and (max-width: 1000px) {
    .links, .disclaimer, .links-section {
      flex-direction: column;
    }
    
    .logo {
      align-items: flex-start;
    }
    
    .divider {
      width: 60px;
      height: 1px;
    }
  }

  @media only screen and (max-width: 600px) {

    .rate {
      width: 100%;
      min-width: unset;
      margin-left: unset;
    }

    .coin {
      display: none;
    }
  }
</style>
