<script lang="ts">
export let responseStore;
export let errorStore;
</script>
<main>
    {#if $responseStore}
    <div class="mt-4 p-4 bg-white border border-gray-300 rounded max-w-[1550px] w-full" id="response">
      <h2 class="text-lg font-semibold">Response:</h2>
      <p>{$responseStore}</p>
    </div>
  {/if}

  {#if $errorStore}
    <div class="mt-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
      <h2 class="text-lg font-semibold">Error:</h2>
      <p>{$errorStore}</p>
    </div>
  {/if}
</main>