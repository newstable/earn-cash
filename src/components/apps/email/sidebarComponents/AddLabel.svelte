<script>
    import { Button } from 'sveltestrap'; 
    
    let addForm = false;

    /* Handle Label Add Form */
    const handleAddForm = e=>{
        e.preventDefault();
        addForm = !addForm;
    }

    /* Handle Close Add Form */
    const hanldeCloseForm = ()=>{
        addForm = false;
    }
</script>

<div class="btn-add-label">
    <a href="/" class="btn-add-label__text" on:click={e=>handleAddForm(e)}>
        <i class="uil uil-plus"></i>
        <span>Add New</span>
    </a>
    {#if addForm }
        <div class="btn-add-label__form">
            <h6>Add New Label</h6>
            <input type="text" class="form-control" name="label" placeholder="Enter Label">
            <div class="label-action d-flex button-group">
                <Button color="primary" class="btn-sm label-action-add">Add Label</Button>
                <Button color="white" class="btn-sm label-action-close" on:click={hanldeCloseForm}>Cancel</Button>
            </div>
        </div>
    {/if}
</div>
