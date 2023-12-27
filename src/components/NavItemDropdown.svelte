<script>
  import Icon from "@iconify/svelte";

  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  export let icon = "";
  export let active = false;
  let hovering = false;

  import "../app.scss";
  import NavItemDropdownItem from "./NavItemDropdownItem.svelte";
  import { onMount } from "svelte";
  import { createQuery } from "@tanstack/svelte-query";
  import { offerStore } from "$stores/offer.store";

  const mouseEnter = () => {
    hovering = true;
  };

  const mouseLeave = () => {
    hovering = false;
  };

  const hasBeenClick = () => {
    if (!active) {
      active = true;
    } else {
      goto("/offers/");
      active = !active;
    }
  };

  let categories = [];
  let total = 0;

  // each category for our available offers with their respective count
  // const OfferCategories = {
  //   "Sign Up": 0,
  //   Game: 0,
  //   App: 0,
  //   Deposit: 0,
  //   Crypto: 0,
  //   Purchase: 0,
  //   "Free Trial": 0,
  //   Quiz: 0,
  //   Casino: 0,
  //   Surveys: 0,
  //   Other: 0,
  // };

  // each category name that comes from our db that will be added to the
  // fixed categories that we have above, else its count is added to other categories
  // actual category in db : static category to show in ui
  // const CategoryNameToOfferCategory = {
  //   "Email Signup": "Sign Up",
  //   "Create Account": "Sign Up",
  //   "Sign Up": "Sign Up",
  //   App: "App",
  //   App: "App",
  //   Game: "Game",
  //   Deposit: "Deposit",
  //   Crypto: "Crypto",
  //   Purchase: "Purchase",
  //   "Free Trial": "Free Trial",
  //   Quiz: "Quiz",
  //   Casino: "Casino",
  //   Surveys: "Surveys",
  //   Other: "Other",
  // };

  const getCategories = async () => {
    const response = await fetch("/api/offers/categories");
    const data = await response.json();

    if (!data.success) {
      // TODO: handle error if no categories
      return;
    }

    // alphabetically sort categories
    categories = data.categories.sort((a, b) => a.name.localeCompare(b.name));

    // iterate over the categories that is returned from our db
    // data.categories.forEach((category) => {
    //   const { name, count } = category;

    //   // if the category name is in our fixed categories, add the count to it
    //   if (name in CategoryNameToOfferCategory) {
    //     // the count for that respective category is added
    //     OfferCategories[CategoryNameToOfferCategory[name]] += count;
    //   } else {
    //     // else, add the count to the other category
    //     // OfferCategories.Other += count;
    //   }
    // });

    total = data.total;

    handleActiveCategory();
    return data;
  };

  const handleClick = async (category) => {
    // console.log(category, "category");
    const searchCategory = category.toLowerCase().split(" ").join("-");
    // console.log(searchCategory, "searchCategory");

    // set the data for current category to empty so user see loading screen
    offerStore.set({
      ...$offerStore,
      [searchCategory]: {
        data: [],
        loading: true,
        apiResponse: {},
      },
    });
    // this category is static category
    // we need to get all categoryName that fall under this static category
    // FOR EX: Static category: Purchase may have db categories: "Purchase", "Credit Card", "CC";

    // if our static category is compose of multiple db categories, we can send them all at once
    // TODO: can be remove later after checking all distinct categories for offers
    // Object.keys(CategoryNameToOfferCategory).forEach((key) => {
    //   // console.log(CategoryNameToOfferCategory[key], category);
    //   if (CategoryNameToOfferCategory[key] === category) {
    //     // OfferCategories[category] += OfferCategories[key];
    //     searchCategory.push(key);
    //   }
    // });

    // console.log(searchCategory);

    const response = await fetch(
      "/api/offers?page=1&limit=40&categoryName=" + searchCategory
    );

    const responseData = await response.json();

    if (!responseData.success) {
      // TODO: handle error
      return;
    }

    offerStore.set({
      ...$offerStore,
      [searchCategory]: {
        data: responseData.offers.docs,
        loading: false,
        apiResponse: responseData,
      },
    });
  };

  const handleActiveCategory = () => {
    if ($page.params.type) {
      handleClick($page.params.type);
    }
    //
  };

  // $: console.log($page, "daata");
  onMount(() => {
    getCategories();
  });

  // $: console.log($offerStore, "$offerStore");
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="item">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <a
    on:click={hasBeenClick}
    on:mouseenter={mouseEnter}
    on:mouseleave={mouseLeave}
    class={(active ? "active " : "") +
      ($page.url.pathname.includes("offers") ? " here" : "")}
  >
    <span class="icon">
      {#if $page.url.pathname.includes("offers")}
        <Icon {icon} color="#ffff" width="20" height="20" />
      {:else if hovering}
        <Icon {icon} color="#ffff" width="20" height="20" />
      {:else if active}
        <Icon {icon} color="#ff5a5c" width="20" height="20" />
      {:else}
        <Icon {icon} color="#ffff" width="20" height="20" />
      {/if}
    </span>
    <span class="text">
      <slot />
    </span>
    <span class="toggle_icon">
      {#if active}
        <Icon
          icon="material-symbols:arrow-back-ios-new"
          color="#ffff"
          width="12"
          height="12"
          rotate={1}
        />
      {:else if $page.url.pathname.includes("offers")}
        <Icon
          icon="material-symbols:arrow-back-ios-new"
          color="#ffff"
          width="12"
          height="12"
          rotate={3}
        />
      {:else}
        <Icon
          icon="material-symbols:arrow-back-ios-new"
          color="#000000"
          width="12"
          height="12"
          rotate={3}
        />
      {/if}
    </span>
  </a>

  <div class="dropdown" class:active>
    <div class="inner">
      <NavItemDropdownItem name="all" amount={total} />
      {#each categories as category}
        <!-- {#if category.count > 0} -->
        <NavItemDropdownItem
          name={category.name}
          amount={category.count}
          onClick={() => handleClick(category.name)}
        />
        <!-- {/if} -->
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @import "../variables.scss";

  div.dropdown {
    border-left: 2px solid #0E0C1D;
    overflow: hidden;
    transition: height 200ms;
    height: 0;
    margin: 0;
    transition: 200ms;
    width: 100%;

    &.active {
      margin: 20px 0 0 9px;
      height: auto;
    }

    & > .inner {
      width: 100%;
      height: 100%;
    }
  }

  div.item {
    padding-bottom: 20px;
  }

  a {
    cursor: pointer;
    padding: 9px;
    font-style: normal;
    font-size: 12px;
    line-height: 160%;
    color: #ffff;
    display: flex;
    align-items: center;
    border-radius: 6px;
    text-decoration: none;

    &:hover {
      color: #ff6668 !important;
    }

    &.active {
      background: #0E0C1D;
      color: #ffff;
    }

    &.here {
      background: #0E0C1D;
      color: #ffff;
    }

    span.icon {
      width: 20px;
      height: 20px;
      margin-right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    span.text {
      flex: 1;
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: medium ;
    }

    span.toggle_icon {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 160%;
    }
  }
</style>
