<script>
    export let id;
    export let picture;
    export let height;

    const levelToColor = (level) => {
        switch (level) {
            case level < 2:
                return "";
            case level < 26:
                return "green";
            case level < 51:
                return "blue";
            case level < 76:
                return "pink";
            case level < 100:
                return "gem";
            default:
                return "";
        }
    };
</script>

<div
    class={"avatar " + levelToColor(30)}
    style={{
        width: height + "px",
        height: height + "px",
        "min-width": height + "px",
    }}
>
    {#if id === "?"}
        <svg
            class="empty"
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="14"
            viewBox="0 0 10 14"
            fill="none"
        >
            <path
                d="M2.75362 9.55652V8.4C2.75362 8.08889 2.78986 7.82512 2.86232 7.6087C2.93478 7.37874 3.06763 7.17585 3.26087 7C3.46618 6.82415 3.62319 6.70242 3.73188 6.63478C3.85266 6.55362 4.07609 6.42512 4.40217 6.24928L6.08696 5.33623C6.26812 5.24155 6.39493 5.16715 6.46739 5.11304C6.55193 5.04541 6.63043 4.94396 6.7029 4.8087C6.78744 4.67343 6.82971 4.50435 6.82971 4.30145V4.03768C6.82971 3.22609 6.20773 2.82029 4.96377 2.82029C3.74396 2.82029 3.13406 3.26667 3.13406 4.15942V4.76812C3.13406 5.17391 2.95894 5.37681 2.6087 5.37681H0.507246C0.169082 5.37681 0 5.17391 0 4.76812V3.63188C0 2.59034 0.398551 1.72464 1.19565 1.03478C1.99275 0.344928 3.24879 0 4.96377 0C6.71498 0 7.98913 0.338164 8.78623 1.01449C9.59541 1.6773 10 2.52271 10 3.55072V4.22029C10 5.1942 9.80072 5.93816 9.40217 6.45217C9.0157 6.96618 
            ... (rest of the SVG path data)
            "
                fill="#9296D6"
            />
        </svg>
    {:else}
        <img
            src={picture}
            alt=""
            style="height: {id ? height - 2 + 'px' : '16px'}"
        />
    {/if}
</div>
