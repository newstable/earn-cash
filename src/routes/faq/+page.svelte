<script>
    let faqCategories = [
      {
        category: "General",
        faqs: [
          {
            question: "What is JustEarn?",
            answer: "JustEarn is a platform which pays users for completing various different offers from a wide variety of offer walls. Simply register and head over to the earn tab. You can watch videos, fill out surveys, install apps or just click on things in exchange for points. You can use the points on our huge selection of reward methods to cash out to real world currency. It couldn't be simpler!",
            open: false
          },
          // Add more questions here if needed
          {
            question: "How does JustEarn work?",
            answer: "JustEarn works by offering external offer walls to be displayed on our site. When a user completes an offer they earn points on our site, while we also earn some money for that offer. We use this money to pay our users real world currency & keep the service well maintained and online.",
            open: false
          },
        ]
      },
      {
        category: "Earning",
        faqs: [
          {
            question: "How much is 100 points worth?",
            answer: "100 points is equal to $1.00 (USD) real world currency.",
            open: false
          },
          // Add more questions here if needed
          {
            question: "Can I only earn from offer walls?",
            answer: "No, you can join our StatusEarn program; participate in giveaways or look out for PromoCodes! Users can only make steady income from inviting friends through our referrals page",
            open: false
          },
          {
            question: "I didn't receive my points. What can I do?",
            answer: "Before doing anything, make sure you did not break any of our rules. If you completed the same offer on another site, the ad company might not credit you. If you feel you did not break any rules, you can contact the adwall directly for support. You can do this by opening the offer wall tab & clicking the SUPPORT option usually located top right. Because we do not own the offer walls, we don't decide whether you get points or not, so we cannot help you if you do not receive your points.",
            open: false
          },
        ]
      },
      {
        category: "Referrals",
        faqs: [
          {
            question: "How does the referral system work??",
            answer: "When a user clicks your referral link & signs up with it, they will be bound to you for life. This means that everything they withdraw on Chequity, you will receive a 5% cut from the overall amount. All referral earnings are automatically added to your balance, meaning you don't have to do anything in order to redeem your points.",
            open: false
          },
          // Add more questions here if needed
          {
            question: "Can I change my referral to someone else?",
            answer: "Unfortunately, we do not allow this process to happen. Your account will only be able to be binded to one person without the ability to change at a later date. However, in the rare case something you think went wrong, contact our support team where they can investigate the problem & possibly change it for you.",
            open: false
          },
        ]
      },
      {
        category: "Rewards",
        faqs: [
          {
            question: "How long does reward delivery take?",
            answer: "Reward delivery usually takes between 12-24 hours depending on reward type. We currently do not offer instant delivery on all rewards due to security reasons & stock counts. We take fraud very seriously, so a member of staff ensures your request is valid before allowing your request to go through our system.",
            open: false
          },
          // Add more questions here if needed
          {
            question: "What is the minimum withdraw amount?",
            answer: "This minimum withdraw for all rewards is $5, apart from PayPal & Cryptocurrencies, which are for any amounts (including a fee). This can vary based on the reward type as certain rewards only come in a higher minimum value. As we only deal with whole numbers, this means you will need a minimum balance of 500 points to be able to withdraw a reward from our site.",
            open: false
          },
          {
            question: "You don't have a reward I want, can I get another?",
            answer: "We're always aiming to add more rewards to cater to everyone. If for some reason you want another reward which we dont current offer, you can contact us with your request & we will get back to you with whether or not we can supply it. Please keep in mind that this might come with an extra cost.",
            open: false
          },
        ]
      },
      {
        category: "StatusEarn",
        faqs: [
          {
            question: "What is StatusEarn??",
            answer: "StatusEarn is a system which allows you to automatically earn points periodically by promoting JustEarn in your Discord status. To get started, join our server, put Earn Cash &amp; R$ @ justearn.gg in your status and click the start earning button to earn points 24/7.",
            open: false
          },
          // Add more questions here if needed
          {
            question: "What are the requirement to be credited?",
            answer: "You must be online in Discord, either online, busy or do not disturb status qualify for receiving a reward. Secondly, your custom status must contain the correct phrase in order to receive your reward.",
            open: false
          },
          {
            question: "How much can I earn?",
            answer: "We are currently crediting 1 point every hour for all users, however those with higher levels will unlock a higher earning rate.",
            open: false
          },
          {
            question: "Will I stop earning if I change my status?",
            answer: "Yes! Sadly we can only credit you points if you have the message in your Discord status. Our systems periodically check your status and if we determine your status has changed you will automatically be removed from the AutoEarn system.",
            open: false
          },
          {
            question: "What happens if I go offline?",
            answer: "Earnings within that hour are cancelled - and you must restart (by being online ofcourse)!",
            open: false
          },
        ]
      },
    ];
  
    function toggleFAQ(categoryIndex, faqIndex) {
      faqCategories[categoryIndex].faqs[faqIndex].open = !faqCategories[categoryIndex].faqs[faqIndex].open;
    }
  </script>
  
  <div class="bg-bye py-10">
    <div class="mx-auto max-w-4xl divide-y divide-white/10">
      <h2 class="text-2xl font-bold leading-10 tracking-tight text-white">Frequently asked questions</h2>
      
      {#each faqCategories as category, categoryIndex}
        <div class="mt-10">
          <h3 class="text-xl font-semibold" style="color: #58111A;">{category.category}</h3>
          <dl class="mt-6 space-y-6 divide-y divide-white/10">
            {#each category.faqs as faq, faqIndex}
              <div class="pt-6">
                <dt>
                  <button type="button" class="flex w-full items-start justify-between text-left text-gray-100" on:click={() => toggleFAQ(categoryIndex, faqIndex)} aria-expanded={faq.open}>
                    <span class="text-base font-semibold leading-7">{faq.question}</span>
                    <span class="ml-6 flex h-7 items-center">
                      <svg class:hidden={faq.open} class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                      </svg>
                      <svg class:hidden={!faq.open} class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                      </svg>
                    </span>
                  </button>
                </dt>
                <dd class="mt-2 pr-12" class:hidden={!faq.open}>
                  <p class="text-base leading-7 text-white">{faq.answer}</p>
                </dd>
              </div>
            {/each}
          </dl>
        </div>
      {/each}
    </div>
  </div>
  