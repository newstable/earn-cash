<script>
    export let type;
    export let max;
</script>

<div class={"loader-container " + (type === "small" ? "small" : "")}>
    <div class="loader" style={{ "max-height": max || "unset" }} />
</div>

<style>
    .loader-container {
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding: 15px 0;
    }

    .loader {
        height: 8rem;
        aspect-ratio: 1;
        animation: spin 1s linear infinite;
        border-radius: 50%;

        border-top: 2px solid #ff9900;
        border-bottom: 2px solid #ff9900;
    }

    .small {
        height: 100%;
        width: unset;
        aspect-ratio: 1;
        padding: unset;
        padding: 10px;
    }

    .small .loader {
        aspect-ratio: 1;
        height: 100%;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
