<script>
  import { page } from "$app/stores";

  export let name;
  export let amount;
  export let onClick;

  let link = "offers/" + name?.toLowerCase?.()?.replace(" ", "-");
  if (link === "offers/all") {
    link = "offers";
  }
</script>

<a
  href="/{link}"
  class:active={$page.url.pathname == "/" + link}
  on:click={onClick}
>
  <span>
    {name}
    <span>{amount}</span>
  </span>
</a>

<style lang="scss">
  a {
    cursor: pointer;
    margin-bottom: 8px;
    padding-left: 9px;
    border-radius: 0;
    border-left: 1px solid transparent;
    padding: 9px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 160%;
    color: #ffff;
    display: flex;
    align-items: center;
    text-decoration: none;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      color: #ff6668 !important;
    }

    &.active {
      background: #2c2727;
      color: #2c2727;
      background: linear-gradient(
        90deg,
        rgba(255, 90, 92, 0.1) 0,
        rgba(255, 90, 92, 0) 100%
      ) !important;
      border-left: 1px solid #ffff;

      & > span > span {
        background-color: #ffff;
      }
    }

    & > span {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      flex: 1;
      display: flex;
      align-items: center;
      font-family: Poppins, sans-serif;
      transform: translateY(2px);
      text-transform: capitalize;

      & > span {
        border-radius: 12px;
        background: #000000;
        padding: 2px 8px;
        height: 24px;
        align-items: center;
        justify-content: center;
        margin-left: 8px;
        line-height: 12px;
        font-size: 12px;
        display: flex;
      }
    }
  }
</style>
