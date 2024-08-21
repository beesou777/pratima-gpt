<script lang="ts">
  import { promptStore, errorStore, generateContent, isLoading, chatHistry } from './store/generative';
  import Prompt from './lib/Prompt.svelte';
  import Output from './lib/Output.svelte';
  import { afterUpdate } from 'svelte';

  let prompt = '';

  $: promptStore.set(prompt);

  $: isLoading.set(false);

  const handleGenerate = () => {
    try {
      generateContent();
    } catch (error) {
      console.error(error);
    } finally {
      prompt = '';
    }
  };

  const handleInputData = (value: string) => {
    prompt = value;
  };

  afterUpdate(() => {
    const container = document.getElementById('app-container');
    if (container) {
      container.scrollTo({
        top: container.scrollHeight + 100,
        behavior: 'smooth',
      });
    }
  });
</script>

<main
  class="flex flex-col items-center justify-center min-h-screen h-full p-4 bg-primary text-white"
>
 <div id="app-container" class="max-h-[calc(100vh-95px)] appearance-none overflow-y-auto min-w-full"> 
  <Output {errorStore} {isLoading} {chatHistry} />
 </div>
  <Prompt {prompt} onGenerate={handleGenerate} {handleInputData} />
</main>

<style>
  #app-container::-webkit-scrollbar {
    display: none;
  }
</style>