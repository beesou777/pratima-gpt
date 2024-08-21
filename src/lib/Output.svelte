<script lang="ts">
  export let errorStore;
  export let isLoading;
  export let chatHistry;

  let chatContainer : HTMLDivElement;

  const scrollToBottom = () => {
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  $: chatHistry, scrollToBottom();
</script>

<main class="max-w-[1450px] mx-auto w-full bg-secondary {$chatHistry.length > 0 ? 'mb-[95px]' : ''}">
  {#if $isLoading || (Array.isArray($chatHistry) && $chatHistry.length >= 0)}
    <div class="p-4 rounded max-w-[1550px] w-full" id="response">
      <h2 class="text-lg font-semibold text-center">Write your prompt</h2>
    </div>
  {/if}

  <div 
    class="rounded max-w-[1440px] w-full {$chatHistry.length > 0 ? 'p-4' : ''}" 
    bind:this={chatContainer}
  >
    {#if Array.isArray($chatHistry) && $chatHistry.length > 0}
      {#each $chatHistry as value, index (index)}
        <div class="md:max-w-[40%] md:ml-auto max-w-full w-full">
          <span class="text-white flex justify-end font-bold">You</span>
          <div class="user-response bg-gray-950 text-white px-10 rounded my-2">
            <p>{value.prompt}</p>
          </div>
        </div>
        <div class="md:max-w-[45%] max-w-full w-full">
          <span class="text-gray-950 text-white font-bold">Pratima AI</span>
          {#if !value.response}
            <div class="bg-gray-950 px-10 rounded my-2">
              <p>Generating response ....</p>
            </div>
          {/if}

          <div class="bg-gray-950 px-10 rounded my-2">
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
