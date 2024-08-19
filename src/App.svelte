<script lang="ts">
  import axios from "axios";
  import { writable } from "svelte/store";

  const prompt = writable<string>("");
  const response = writable<string | null>(null);
  const error = writable<string | null>(null);
  const typingSpeed = 50; // Speed in milliseconds

  const typewriterEffect = (
    text: string,
    callback: (typedText: string) => void,
  ) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        callback(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);
  };

  const generateContent = async () => {
    error.set(null);
    response.set(null);

    let promptValue: string;
    prompt.subscribe((value) => (promptValue = value));

    if (!promptValue.trim()) {
      error.set("Prompt is required");
      return;
    }

    try {
      const result = await axios.post(
        "https://google-ai-api.vercel.app/generate-content",
        {
          prompt: promptValue,
        },
      );

      if (result.data.text) {
        typewriterEffect(result.data.text, (typedText) => {
          response.set(typedText);
        });
      } else {
        error.set("Unexpected result structure");
      }
    } catch (err: any) {
      error.set(`Error generating content: ${err.message}`);
    }
  };
</script>

<main
  class="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100"
>
  <h1 class="text-2xl font-bold mb-4">Pratima AI Prompt Application</h1>

  <div
    class="fixed bottom-0 left-0 py-10 px-10 flex w-full justify-around items-center"
    id="msgs-box"
  >
    <input
      type="text"
      placeholder="Enter your prompt here..."
      bind:value={$prompt}
      class="w-[90%] py-6 px-5"
    />
    <button
      on:click={generateContent}
      class="w-[10%] px-4 py-6 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Generate
    </button>
  </div>

  {#if $response}
    <div
      class="mt-4 p-4 bg-white border border-gray-300 rounded max-w-[1550px] w-full"
      id="response"
    >
      <h2 class="text-lg font-semibold">Response:</h2>
      <p>{$response}</p>
    </div>
  {/if}

  {#if $error}
    <div class="mt-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
      <h2 class="text-lg font-semibold">Error:</h2>
      <p>{$error}</p>
    </div>
  {/if}
</main>

<style>
  main {
    height: 100vh;
  }
  input,
  button {
    border-radius: 0.8rem;
  }

  input {
    margin-right: 0.5rem;
    height: 4rem;
  }

  input:focus {
    outline: none;
  }

  button {
    min-width: 5rem;
    height: 4rem;
    width: 9rem;
  }

  #msgs-box {
    padding-bottom: 1.5rem;
    bottom: 0;
    z-index: 1;
    height: 7rem;
  }

  #response {
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 60px;
  }
  @media only screen and (max-width: 440px) {
    input::placeholder {
      font-size: 3.75vw;
    }

    #msgs-box {
      padding-left: 1.25rem;
      padding-right: 1.25rem;
      margin: 5px 0;
    }
  }
</style>
