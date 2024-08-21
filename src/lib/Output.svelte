<script lang="ts">
  import { onMount } from 'svelte';

  export let errorStore;
  export let isLoading;
  export let chatHistry;

  // let copyToClipboard = (text: string) => {
  //   if(text.includes('<code>')) {
  //     navigator.clipboard.writeText(text).then(() => {
  //       alert('Copied to clipboard!');
  //     }).catch(err => {
  //       console.error('Failed to copy text: ', err);
  //     });
  //   }
  // };
</script>

<main id="response-container" class="max-w-[1024px] mx-auto w-full {$chatHistry.length > 0 ? 'mb-[95px]' : ''} h-full">
  <h1 class="text-2xl font-bold py-4 px-1 text-center">Pratima AI Prompt Application</h1>

  {#if $isLoading || (Array.isArray($chatHistry) && $chatHistry.length >= 0)}
    <div class="p-4 rounded max-w-[1550px] w-full" id="response">
      <h2 class="text-lg font-semibold text-center">Write your prompt</h2>
    </div>
  {/if}

  <div class="rounded max-w-[1440px] w-full {$chatHistry.length > 0 ? 'p-4' : ''}">
    {#if Array.isArray($chatHistry) && $chatHistry.length > 0}
      {#each $chatHistry as value, index (index)}
        <div class="md:max-w-[50%] md:ml-auto max-w-full w-full">
          <span class="text-white flex justify-end font-bold">You</span>
          <div class="user-response bg-gray-950 text-white px-10 rounded my-2">
            <p>{value.prompt}</p>
          </div>
        </div>
        <div class="md:max-w-[60%] max-w-full w-full text-balance">
          <span class="text-white font-bold">Pratima AI</span>
          {#if !value.response}
            <div class="bg-gray-950 text-white px-10 rounded my-2">
              <p>Generating response ....</p>
            </div>
          {/if}

          <div class="bg-gray-950 px-10 rounded {value.response ? 'py-4' : ''} relative">
            <!-- {#if value.response.includes('<code>')}
              <button
                class="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded"
                on:click={() => copyToClipboard(value.response)}
              >
                Copy
              </button>
            {/if} -->
            {@html value.response}
          </div>
        </div>
      {/each}
    {/if}
  </div>

  {#if $errorStore}
    <div class="mt-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
      <h2 class="text-lg font-semibold">Error:</h2>
      <p>{$errorStore}</p>
    </div>
  {/if}
</main>

<style scoped lang="scss">
  #response-container::-webkit-scrollbar {
    display: none;
  }

  .relative {
    position: relative;
  }
</style>
