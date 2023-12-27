<script>
    import "../app.scss";
    import Content from "../components/Home/Content.svelte";
    import Heading from "../components/Home/Heading.svelte";

    export var data;
</script>

<svelte:head>
    <title>Earn Cash & R$ | justearn.gg </title>
</svelte:head>

<div class="home">
    <Heading count={data.count} highest={data.highest}/>
    <Content totalEarned={data.totalEarned}/>
</div>

<style lang="scss">
    div.home {
        position: relative;
        letter-spacing: -0.03em;
        padding-top: 57px;
        margin: 0 auto 67px auto;
        

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            /* background-image: url(/coin.svg); TODO: give different image */
            background-repeat: no-repeat;
            z-index: -1;
        }
    }
</style>