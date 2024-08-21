<script lang="ts">
  export let responseStore;
  export let errorStore;
  export let isLoading;
  export let chatHistry;
</script>

<main class="w-full">
  {#if $isLoading}
    <div
      class="mt-4 p-4 bg-white border border-gray-300 rounded max-w-[1550px] w-full"
      id="response"
    >
      <h2 class="text-lg font-semibold">Loading...</h2>
    </div>
  {/if}

  {#if Array.isArray($chatHistry) && $chatHistry.length > 0}
    {#each $chatHistry as value,index (index)}
      <div
        class="mt-4 p-4 bg-white border border-gray-300 rounded max-w-[1550px] w-full"
        id="response"
      >
        <h2 class="text-lg font-semibold">Prompt:</h2>
        <p>{value.prompt}</p>
        <h2 class="text-lg font-semibold mt-4">Response:</h2>
        {@html value.response}
      </div>
    {/each}
  {/if}

  <!-- {#if $responseStore}
    <div
      class="mt-4 p-4 mb-[90px] bg-white border border-gray-300 rounded max-w-[1550px] w-full"
      id="response"
    >
      <h2 class="text-lg font-semibold">Response:</h2>
      {@html $responseStore}
    </div>
  {/if} -->

  {#if $errorStore}
    <div class="mt-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
      <h2 class="text-lg font-semibold">Error:</h2>
      <p>{$errorStore}</p>
    </div>
  {/if}
</main>
