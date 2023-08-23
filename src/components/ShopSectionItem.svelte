<script>
    export let url = "";
    export let background = "";
    export let imageUrl = "";
    export let imageWidth = false;
</script>

<a href={"/cashout/" + url} style="background: {background}">
    <img src={imageUrl} alt="logo" style={imageWidth ? "width: " + imageWidth.toString() + "px" : ""}/>
</a>

<style lang="scss">
    a {
        display: block;
        position: relative;
        width: 212px;
        height: 102px;
        border-radius: 5px;
        box-shadow: 0 10px 15px rgb(0 0 0 / 15%);
        margin-right: 10px;
        margin-bottom: 10px;
    }

    img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        max-width: -webkit-fill-available;
    }

    @media only screen and (max-width: 700px) {
        a {
            width: 47%;
        }
    }
</style>