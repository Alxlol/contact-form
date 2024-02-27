<script lang="ts">
	import { enhance } from "$app/forms";

    export let form: any;
</script>


<div class="flex-1 flex flex-col items-center justify-center">
    <h1 class="font-bold text-3xl mb-6">Leave a message 😎</h1>
    <form 
    class="flex flex-col gap-3"
    method="POST" 
    action="?/submit"
    use:enhance 
    >
        <div class="field">
            <label for="Name">Name</label>
            <input  name="name" value={form?.name ?? ''} type="text">
        </div>
        <div class="field">
            <label for="Email">Email</label>
            <input name="email" value={form?.email ?? ''} type="text">
        </div>
        <div class="field">
            <label for="Company">Company <span class="text-sm italic">(optional)</span></label>
            <input name="company" value={form?.company ?? ''} type="text">
        </div>
        <div class="field">
            <label for="Message">Message</label>
            <textarea name="message" value={form?.message ?? ''} id="" cols="35" rows="8"></textarea>
            
        </div>

        <div class="">
            <button disabled={form?.success} class=" py-2 px-6 rounded-md w-full {form?.success ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-400'}" type="submit">{form?.success ? 'Thank you! 🤗' : 'Submit 🤝'}</button>
        </div>
        {#if form?.error}
            <p class="text-red-500 text-sm">Error: {form.errorMessage}</p>
        {/if}
        
    </form>
</div>

<style>
    .field {
        display: flex;
        flex-direction: column;
    }

    input, textarea {
        background-color: #222222;
        border-radius: 0.375rem;
        padding: 0.375rem;
        padding-inline: .8rem;
        outline: none;
    }
</style>