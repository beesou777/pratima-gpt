<script lang="ts">
  import { promptStore, errorStore, generateContent, isLoading, chatHistry } from "./store/generative";
  import Prompt from "./lib/Prompt.svelte";
  import Output from "./lib/Output.svelte";

  let prompt = "";

  $: promptStore.set(prompt);

  $: isLoading.set(false);

  const handleGenerate = () => {
    try {
      generateContent();
    } catch (error) {
      console.error(error);
    }finally{
      prompt = "";
    }
    
  };

  const handleInputData = (value: string) => {
    prompt = value;
  };


</script>

<main class="flex flex-col items-center justify-center min-h-screen p-4 bg-primary text-white">
  <h1 class="text-2xl font-bold py-4 px-1">Pratima AI Prompt Application</h1>
  <Output {errorStore} {isLoading}  {chatHistry} />
  <Prompt {prompt} onGenerate={handleGenerate} handleInputData={handleInputData}  />
</main>
