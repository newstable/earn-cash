<script>
  import "../app.scss";
  import FooterIcon from "./icons/FooterIcon.svelte";
  // Function to show the chatbox
</script>

<footer>
  <div class="bg-hi text-black h-[468px] px-[50px] pt-[50px] pb-[25px]">
    <div
      class="h-[181px]  rounded-md bg-glass flex flex-col sm:flex-row mx-10 justify-between pr-20 break-words overflow-hidden"
    >
      <div class="flex flex-col align-middle gap-[0px]">
        <img
          class="h-[210px] w-[250px] -mt-6 hidden sm:block"
          src="/treasurechest.png"
          alt="treasurechest"
        />
      </div>
      <div
        id="links"
        class="flex flex-col sm:flex-row sm:w-auto flex-wrap gap-x-[70px] gap-y-[70px]"
      >
        <div class="w-full sm:w-auto h-[181px] flex flex-col gap-y-[20px] order-3 sm:order-2">
          <p class="text-white text-lg font-bold whitespace-nowrap">ABOUT US</p>
          <a
            href="/faq"
            class="text-gray-100 flex gap-x-[8px] font-semibold gap-y-[8px] whitespace-nowrap text-sm sm:text-xs md:text-sm lg:text-md"
            >Frequently Asked</a
          >
          <a
            href="/terms"
            class="text-gray-100 flex gap-x-[8px] font-semibold gap-y-[8px] whitespace-nowrap text-sm sm:text-xs md:text-sm lg:text-md"
            >Terms of Service</a
          >
          <a
            href="/privacy"
            class="text-gray-100 flex gap-x-[8px] font-semibold gap-y-[8px] whitespace-nowrap text-sm sm:text-xs md:text-sm lg:text-md"
            >Privacy Policy</a
          >
        </div>

        <div class="w-full sm:w-auto h-[181px] flex flex-col gap-y-[10px] order-2 sm:order-3">
          <p class="text-white text-lg font-bold whitespace-nowrap">
            COMMUNITY
          </p>
          <a
            href="https://discord.gg/justearn"
            class="text-gray-100 flex gap-x-[8px] font-semibold gap-y-[8px] whitespace-nowrap text-sm sm:text-xs md:text-sm lg:text-md break-words"
            >Discord</a
          >
          <a
            href="https://twitter.com/justearngg"
            class="text-gray-100 flex gap-x-[8px] font-semibold gap-y-[8px] whitespace-nowrap text-sm sm:text-xs md:text-sm lg:text-md"
            >Twitter</a
          >
          <a
            href="https://www.youtube.com/@JustEarnGG"
            class="text-gray-100 flex gap-x-[8px] font-semibold gap-y-[8px] whitespace-nowrap text-sm sm:text-xs md:text-sm lg:text-md"
            >Youtube</a
          >
          <a
            href="https://www.instagram.com/justearngg/"
            class="text-gray-100 flex gap-x-[8px] font-semibold gap-y-[8px] whitespace-nowrap text-sm sm:text-xs md:text-sm lg:text-md"
            >Instagram</a
          >
        </div>

        <div class="w-full sm:w-auto h-[181px] flex flex-col gap-y-[10px] order-1">
          <p class="text-white text-lg font-bold whitespace-nowrap">SUPPORT</p>
          <button
          on:click={showChatbox}
            class="text-gray-100 flex gap-x-[8px] font-semibold gap-y-[8px] whitespace-nowrap text-sm sm:text-xs md:text-sm lg:text-md"
            >Live Chat</button>

          <a
            href="mailto:daniel@justearn.gg"
            class="text-gray-100 flex gap-x-[8px] font-semibold gap-y-[8px] whitespace-nowrap text-sm sm:text-xs md:text-sm lg:text-md"
            >daniel@justearn.gg</a
          >
          <a
            href="https://discord.gg/justearn"
            class="items-center scale-150 justify-self-center ml-8 mt-4 text-[#5865f2] flex gap-x-[8px] font-semibold gap-y-[8px] whitespace-nowrap text-sm sm:text-xs md:text-sm lg:text-md"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              s:my-prefix-c5b4cad9-0=""
              ><path
                d="M13.5447 0.994743C12.5249 0.53434 11.4314 0.195118 10.288 0.000815247C10.2672 -0.00293612 10.2463 0.00644229 10.2356 0.0251684C10.095 0.271314 9.93919 0.592394 9.8301 0.844781C8.60032 0.663608 7.37681 0.663608 6.17225 0.844781C6.06312 0.586797 5.90169 0.271314 5.76041 0.0251684C5.74969 0.00705727 5.72887 -0.00232114 5.70806 0.000815247C4.56531 0.194472 3.47175 0.533694 2.45131 0.994743C2.44246 0.998495 2.4349 1.00474 2.42987 1.01285C0.355618 4.06207 -0.212633 7.03635 0.0661174 9.97374C0.0673674 9.9881 0.0755861 10.0018 0.0869299 10.0106C1.45546 10.9995 2.78115 11.5999 4.08218 11.9978C4.103 12.0041 4.12506 11.9966 4.13831 11.9797C4.44606 11.5662 4.7204 11.1301 4.95562 10.6716C4.9695 10.6447 4.95625 10.6128 4.92787 10.6022C4.49272 10.4398 4.07837 10.2417 3.67978 10.0169C3.64825 9.99877 3.64572 9.95439 3.67475 9.93315C3.75862 9.87131 3.84253 9.80695 3.92262 9.74198C3.93712 9.73011 3.95731 9.72762 3.97434 9.73509C6.59284 10.9115 9.42769 10.9115 12.0153 9.73509C12.0323 9.72698 12.0525 9.7295 12.0676 9.74134C12.1478 9.80631 12.2316 9.87128 12.3161 9.93312C12.3451 9.95436 12.3432 9.99874 12.3117 10.0168C11.9131 10.2461 11.4988 10.4398 11.063 10.6016C11.0346 10.6122 11.022 10.6447 11.0359 10.6715C11.2762 11.1294 11.5505 11.5655 11.8526 11.9791C11.8652 11.9966 11.8879 12.0041 11.9087 11.9978C13.2161 11.5999 14.5418 10.9995 15.9103 10.0106C15.9223 10.0018 15.9299 9.98871 15.9311 9.97435C16.2647 6.57841 15.3723 3.62851 13.5655 1.01347C13.5611 1.00474 13.5535 0.998495 13.5447 0.994743ZM5.34672 8.18516C4.55837 8.18516 3.90878 7.47302 3.90878 6.5984C3.90878 5.7238 4.54575 5.01163 5.34672 5.01163C6.15394 5.01163 6.79725 5.73005 6.78463 6.5984C6.78463 7.47302 6.14762 8.18516 5.34672 8.18516ZM10.6632 8.18516C9.87488 8.18516 9.22529 7.47302 9.22529 6.5984C9.22529 5.7238 9.86226 5.01163 10.6632 5.01163C11.4704 5.01163 12.1137 5.73005 12.1011 6.5984C12.1011 7.47302 11.4705 8.18516 10.6632 8.18516Z"
                fill="#5865F2"
                s:my-prefix-c5b4cad9-0=""
              ></path></svg
            >Discord</a
          >
        </div>
      </div>
    </div>
    <div
      class="w-auto border-b-2 border-black rounded-md h-[137px] bg-glass px-[20px] py-[15px] mt-[45px] align-middle mx-auto flex justify-center items-center overflow-hidden"
    >
      <p class="w-[547px] h-[107px] text-sm mb-3 text-white hidden sm:block">
        JustEarn is an easy way to earn money online from anywhere in the world.
        <br />
        <br />

        Earn simply by filling out surveys, testing mobile apps, using your
        discord as a human billboard, or watching videos!
        <br />
        <br />
        Copyright © JustEarn. VPNs are strictly prohibited -
        <span class="opacity-20">daniel was here &lt;3.</span>
      </p>
      <div class="divider w-[2px] h-[60px] bg-divider ml-10"></div>
      <div class="rate w-[305px] h-[60px] align-middle flex  justify-center bg-[#6F1521] rounded-lg border-r-8 border-r-black ml-[40px]"><img class="scale-150 mr-6" src="/coin3.svg" alt="coin"/><span class="text-white font-extrabold text-2xl whitespace-nowrap mr-20 flex mt-3">100 Coins = 1 $</span></div>
    </div>
   
  </div>
</footer>
