<script>
    export let labelList;
</script>

<ul class="dm-mail-label-list mt-0">
    {#each labelList as {text}, i}
        <li>
            <a href="/"><i class="uil uil-list-ul"></i>{text}</a>
        </li>
    {/each}
    <li></li>
</ul>
