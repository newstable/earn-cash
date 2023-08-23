<script>
    import "../../../app.scss";
</script>

<head>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap"
    />
  <script src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"></script>

	<script>
	  // Function to fetch review count
  function fetchReviewCount() {
    // Replace with your Trustpilot widget template ID and business unit ID
    var templateId = '5419b6a8b0d04a076446a9ad';
    var businessUnitId = '60f18e2ca146c900018e9c66';

    var apiUrl = `https://widget.trustpilot.com/data/jsonld/business-unit/${businessUnitId}/location/all`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        var reviewCount = data.aggregateRating ? data.aggregateRating.reviewCount : 0;
        updateReviewCount(reviewCount);
      })
      .catch(error => {
        console.error('Error fetching review count:', error);
      });
  }

  // Function to update review count in HTML
  function updateReviewCount(count) {
    var reviewsElement = document.querySelector('.reviews');
    if (reviewsElement) {
      reviewsElement.textContent = `${count} reviews`;
    }
  }

  // Call the fetchReviewCount function when the page loads
  window.addEventListener('load', fetchReviewCount);
  </script>
</head>

<div class="testimonals">
    <h2>What do our users say?</h2>
        <section class="frame-child"></section>
		 <a href="https://www.trustpilot.com/review/justearn.gg" target="_blank" rel="noopener noreferrer">
        <div class="shape-parent">
          <img class="shape-icon" alt="" src="./shape.svg" />

          <b class="trustpilot">Trustpilot</b>
        </div>
        <div class="based-on-456-container">
          <span class="based-on">Based on</span>
          <b class="reviews"> 456 reviews</b>
        </div>
        <div class="stars-5-1-wrapper">
          <div class="stars-5-1">
            <img class="stars-5-1-child" alt="" src="./group-5.svg" />

            <img class="stars-5-1-child" alt="" src="./group-4.svg" />

            <img class="stars-5-1-child" alt="" src="./group-3.svg" />

            <img class="stars-5-1-child" alt="" src="./group-2.svg" />

            <img class="stars-5-1-child" alt="" src="./group-2.svg" />
          </div>
        </div>
        <div class="excellent">Excellent</div>
      </div>

<style lang="scss">
  body {
    margin: 0;
    line-height: normal;
  }

  :root {
    /* fonts */
    --font-poppins: Poppins;
    --font-roboto: Roboto;

    /* font sizes */
    --font-size-lg: 18px;
    --font-size-sm: 14px;
    --font-size-base: 16px;

    /* Colors */
    --color-silver-100: #d8c1c1;
    --color-silver-200: #cebfbf;
    --color-mistyrose: #ffe2e2;
    --color-gray: #2e2727;

    /* Gaps */
    --gap-9xs: 4px;

    /* border radiuses */
    --br-lg: 18px;
  }

  .frame-child {
    position: relative;
    border-radius: var(--br-lg);
    background-color: var(--color-gray);
    width: 280px;
    height: 220px;
    transform: translate(-50%, -3%);
    left: 50%;
    top: 50%;
  }

  .shape-icon {
    position: relative;
    width: 25.36px;
    height: 24px;
  }

  .trustpilot {
    position: relative;
    line-height: 26px;
  }

  .shape-parent {
    position: absolute;
    top: 298px;
    left: 70.32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--gap-9xs);
    text-align: left;
  }

  .based-on {
    font-weight: 300;
  }

  .reviews {
    text-decoration: underline;
  }

  .based-on-456-container {
    position: absolute;
    top: 265px;
    left: 0;
    font-size: var(--font-size-sm);
    line-height: 22px;
    color: var(--color-silver-100);
    display: inline-block;
    width: 240px;
  }

  .stars-5-1-child {
    position: relative;
    width: 40px;
    height: 40px;
  }

  .stars-5-1 {
    align-self: stretch;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }

  .excellent,
  .stars-5-1-wrapper {
    position: absolute;
    left: 0;
    width: 240px;
  }

  .stars-5-1-wrapper {
    top: 211px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .excellent {
    bottom: 221px;
    font-size: var(--font-size-lg);
    line-height: 26px;
    font-weight: 500;
    font-family: var(--font-poppins);
    color: var(--color-silver-200);
    display: inline-block;
  }

  .rectangle-parent {
    position: absolute;
    top: 277px;
    left: 237px;
    width: 240px;
    height: 138px;
  }


.testimonals {
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 15px 0 60px 0;
  position: relative; /* Add this to establish positioning context */
  }

  h2 {
    font-weight: 600;
    font-size: 30px;
    margin-bottom: 36px;
    max-width: 1060px;
    margin: 40px auto;
    padding: 0;
    text-align: center;
    color: #fff;
  }
  
  
  .shape-parent,
.based-on-456-container,
.stars-5-1-wrapper,
.excellent {
  position: absolute; /* Set all these elements to position: absolute; */
  left: 50%;
  transform: translateX(-50%);
  }
</style>