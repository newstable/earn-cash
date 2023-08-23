<script>
    import Icon from "@iconify/svelte";

    export let data;
</script>

<div class="wallNav">
    <a href="/earn">
        <Icon icon="material-symbols:arrow-back" color="#ff5a5c" width="32" height="32" />
        <img src="/favicon.png" alt="Favicon"/>
        <img src="/logo.png" alt="Logo"/>
    </a>
</div>

<div class="container">
    <iframe src={data.wallUrl} title="{data.wallName} wall"/>
</div>

<style lang="scss">
    div.wallNav {
        padding: 20px 41px;
        position: fixed;
        top: 0;
        width: 100%;
        background-color: #222121;

        & > a {
            display: inline-flex;
            align-items: center;

            & > * {
                margin-left: 20px;
            }
            & > :last-child {
                margin-left: 0;
            }
        }
    }

    div.container {
        margin-top: 79px;
        height: calc(100vh - 79px);
        overflow: hidden;

        & > iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    }
</style>