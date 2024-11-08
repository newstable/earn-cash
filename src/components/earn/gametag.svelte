<script>
    export let tag;
</script>

<div class={"tag-container " + tag}>
    <p>{tag}</p>
</div>

<style>
    .tag-container {
        width: 36px;
        height: 17px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 3px;

        color: #fff;
        font-family: "Geogrotesque Wide";
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
    }

    .hot {
        background: #f97339;
        box-shadow:
            0px 1px 0px 0px #b9562b,
            0px -1px 0px 0px #ffa57d;
    }

    .new {
        color: #59e878;
        background: rgba(89, 232, 120, 0.43);
    }

    p {
        margin-top: -2px;
    }
</style>
