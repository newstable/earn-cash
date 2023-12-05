<script>
  export let url = "";
  export let background = "";
  export let imageUrl = "";
  export let imageWidth = false;
</script>

<a href={"/cashout/" + url} style="background: {background}">
  <img
    src={imageUrl}
    alt="logo"
    style={imageWidth ? "width: " + imageWidth.toString() + "px" : ""}
  />
</a>

<style lang="scss">
  a {
    display: grid;
    place-items: center;
    width: 212px;
    height: 102px;
    border-radius: 5px;
    box-shadow: 0 10px 15px rgb(0 0 0 / 15%);
    margin-right: 10px;
    margin-bottom: 10px;
  }

  img {
    height: 50%;
    width: 50%;
    aspect-ratio: 1;
    object-fit: contain;
  }

  @media only screen and (max-width: 700px) {
    a {
      width: 47%;
      height: auto;
    }
  }
</style>
