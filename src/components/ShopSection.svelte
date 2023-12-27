<script>
    export let name = "";
</script>

<div class="section">
    <h2>{name}</h2>

    <div class="items">
        <slot/>
    </div>
</div>

<style lang="scss">
    div.section {
        h2 {
            color: white;
            
            font-size: 14px;
            font-weight: 700;
            margin-top: 18px;
            margin-bottom: 21px;
            text-transform: uppercase;
            line-height: 110%;
            margin: 2.3733333333rem 0 1.424rem 0;
        }

        div.items {
            display: flex;
            flex-wrap: wrap;
            margin-right: -10px;
        }
    }
</style>