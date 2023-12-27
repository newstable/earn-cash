<div class="papa">
  <div class="offers-page-content">
    <slot />
  </div>
</div>

<style lang="scss">
  div.papa {
    display: block;
    width: 100%;
    max-width: 100vw;
    padding: 24px;
    background: linear-gradient(to top, #5f141e, #0E0C1D 70%);
    box-sizing: border-box;
  }

  div.offers-page-content {
    padding-top: 22px;
    display: inline-grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    width: 100%;
    border-top: 1px solid #1e1e2e;
    height: 100%;
    // min-height: 200px;

    @media only screen and (min-width: 701px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media only screen and (min-width: 800px) {
      grid-template-columns: repeat(5, 1fr);
    }

    @media only screen and (min-width: 999px) {
      grid-template-columns: repeat(6, 1fr);
    }

    @media only screen and (min-width: 1200px) {
      grid-template-columns: repeat(8, 1fr);
    }

    @media only screen and (min-width: 1600px) {
      grid-template-columns: repeat(10, 1fr);
    }

    @media only screen and (min-width: 1800px) {
      grid-template-columns: repeat(11, 1fr);
    }

    @media only screen and (min-width: 2000px) {
      grid-template-columns: repeat(12, 1fr);
    }

    @media only screen and (min-width: 2200px) {
      grid-template-columns: repeat(13, 1fr);
    }

    @media only screen and (min-width: 2400px) {
      grid-template-columns: repeat(14, 1fr);
    }

    @media only screen and (min-width: 2600px) {
      grid-template-columns: repeat(15, 1fr);
    }

    @media only screen and (min-width: 2800px) {
      grid-template-columns: repeat(16, 1fr);
    }

    @media only screen and (min-width: 2000px) {
      grid-template-columns: repeat(17, 1fr);
    }
  }
</style>
