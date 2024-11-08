<script>
  export let url = "";
  export let background = ""; // For color
  export let imageUrl = "";
  export let imageWidth = "";
  export let imageHeight = "";
  
</script>

<a href={"/cashout/" + url} style="background: {background};">
  <div class="background-layer"></div>
  <img src={imageUrl} alt="logo" style={imageWidth ? "min-width: " + imageWidth.toString() + "%; min-height: " + imageHeight.toString() + "%; max-height: " + imageHeight.toString() + "%" : "min-height: " + imageHeight.toString() + "%; max-height: " + imageHeight.toString() + "%"}/>
</a>
<style lang="scss">
a {
    display: block;
    position: relative;
    width: 212px;
    height: 102px; 
    border-radius: 10px;
    box-shadow: 0 10px 15px rgb(0 0 0 / 15%);
    margin-right: 10px;
    margin-bottom: 10px;
    overflow: hidden; // To respect border-radius for the background layer
}

.background-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://cdn.discordapp.com/attachments/1151426232534175764/1190038757471178803/backdrop.png?ex=65a058f5&is=658de3f5&hm=f0777ed02ea83f70bf44722f83f59a90f293b9d424b67cf252fb2402fc7b4849');
    background-size: cover; // Cover the entire area
    background-position: center; // Center the background image
    z-index: 1; // Ensure it's below the image
}

img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    max-width: -webkit-fill-available;
    z-index: 2; // Ensure it's above the background layer
}

@media only screen and (max-width: 700px) {
    a {
        width: 47%;
    }
}


</style>