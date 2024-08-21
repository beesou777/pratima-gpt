<script lang="ts">
  import { promptStore, errorStore, generateContent, isLoading, chatHistry } from "./store/generative";
  import Prompt from "./lib/Prompt.svelte";
  import Output from "./lib/Output.svelte";

  let prompt = "";

  $: promptStore.set(prompt);

  $: isLoading.set(false);

  const handleGenerate = () => {
    generateContent();
    
  };

  const handleInputData = (value: string) => {
    prompt = value;
  };


</script>

<main class="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
  <h1 class="text-2xl font-bold mb-4">Pratima AI Prompt Application</h1>
  <Output {errorStore} {isLoading}  {chatHistry} />
  <Prompt {prompt} onGenerate={handleGenerate} handleInputData={handleInputData}  />
</main>
