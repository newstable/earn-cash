<script>
  import Sidebar from "../../components/admin/sidebar/Sidebar.svelte";
</script>

<svelte:head>
  <link
    rel="stylesheet"
    id="bootstrap-css-link"
    href="/css/bootstrap.min.css"
  />
  <link rel="stylesheet" href="/css/unicons.min.css" />
  <link rel="stylesheet" href="/css/line-awesome.min.css" />
  <link rel="stylesheet" href="/css/variables.css" />
  <link rel="stylesheet" href="/css/custom-colors.css" />
  <link rel="stylesheet" href="/css/utility-classes.css" />
  <link rel="stylesheet" href="/css/button-colors.css" />
  <link rel="stylesheet" href="/css/animations.css" />
  <link rel="stylesheet" href="/css/style.css" />
</svelte:head>

<main class="main-content">
  <Sidebar />
  <div class="contents" style="padding-top: 1rem; color: #000;">
    <slot />
  </div>
</main>

<style lang="scss">
  @import "../../assets/sass/style.scss";
</style>
