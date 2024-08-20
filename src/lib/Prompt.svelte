<script lang="ts">
  export let prompt: string;
  export let onGenerate: () => void;
  export let handleInputData: (value: string) => void;

  const handleInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    prompt = target.value;
    handleInputData(prompt);
    adjustHeight(target);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const textarea = event.target as HTMLTextAreaElement;

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      textarea.style.height = `${textarea.scrollHeight + 40}px`; // Increase height by 40px
    }
  };

  const adjustHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  import { onMount } from "svelte";
  onMount(() => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    if (textarea) adjustHeight(textarea);
  });
</script>

<div
  class="fixed bottom-0 left-0 py-10 px-4 flex w-full justify-around items-center"
  id="msgs-box"
>
  <div class="relative flex items-end gap-1.5 md:gap-2 w-full bg-gray-200 rounded-[26px]">
    <div class="flex min-w-0 flex-1 flex-col">
      <textarea
        placeholder="Enter your prompt here..."
        bind:value={prompt}
        on:input={handleInput}
        on:keydown={handleKeyDown}
        class="bg-gray-200 m-0 resize-none border-0 bg-transparent  text-token-text-primary focus:ring-0 focus-visible:ring-0 max-h-[25dvh] max-h-52 outline-none "
      ></textarea>
    </div>
    <button class="mb-2 me-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
      <svg
        on:click={onGenerate}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 32 32"
        class="icon-2xl relative bg-gray-600 rounded-full cursor-pointer"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  </div>
</div>

<style lang="scss">
  textarea {
    appearance: none;
    -webkit-scrollbar: none; 
    scrollbar-width: none; 
    line-height: 1.5;  
    padding: 10px 20px;  
    resize: none; 
    border: 0;
    background-color: transparent;
    color: #333;  
    outline: none;
  }

  textarea::-webkit-scrollbar {
    display: none;
  }
</style>

