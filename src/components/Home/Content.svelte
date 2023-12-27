<script>
    import "../../app.scss";
    import Banners from "./Content/Banners.svelte";

    import Faq from "./Content/Faq.svelte";
    import GetStarted from "./Content/GetStarted.svelte";
    import Statistics from './Content/Statistics.svelte';
    import Testimonals from "./Content/Testimonals.svelte";
    import Why from "./Content/Why.svelte";

    export let totalEarned = 0;
</script>

<div class="content">
   
</div>



<style lang="scss">
    div.content {
        position: relative;
        width: 60%;
        padding-bottom: 66px;
        max-width: 1150.8px;
        margin: 0 auto;

        @media only screen and (min-width: 701px) and (max-width: 1199px) {
            margin-left: 10%;
            width: 80%;
        }

        @media only screen and (max-width: 700px) {
            margin-left: 0;
            padding-left: 15px;
            padding-right: 15px;
            padding-bottom: 46px;
            width: 100%;
        }
    }
</style>