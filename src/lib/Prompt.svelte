<script lang="ts">
  export let prompt: string;
  export let onGenerate: () => void;
  export let handleInputData: (value: string) => void;

  const handleInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    prompt = target.value;
    handleInputData(prompt);

    adjustTextareaHeight(target);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLTextAreaElement;

    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      const cursorPosition = target.selectionStart;
      prompt = prompt.slice(0, cursorPosition) + '\n' + prompt.slice(cursorPosition);
      target.value = prompt;
      target.selectionEnd = cursorPosition + 1;
      handleInputData(prompt);
      adjustTextareaHeight(target);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      onGenerate();
    }
  };

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = '60px';
    textarea.style.height = `${textarea.scrollHeight + 2}px`;
  };

  const message_box = document.getElementById('message');
  message_box?.addEventListener('keyup', () => {
    adjustTextareaHeight(message_box as HTMLTextAreaElement);
  });
</script>

<div
  class="fixed bottom-0 left-[50%] translate-x-[-50%] py-10 px-4 flex max-w-[1024px] w-full justify-around items-center"
  id="msgs-box"
>
  <div
    class="relative flex items-center gap-1.5 md:gap-2 w-full bg-gray-800 rounded-[26px]"
    id="prompt-box"
  >
    <div class="flex flex-1 flex-col justify-center" id="parent-div">
      <textarea
        id="message"
        placeholder="Enter your prompt here..."
        bind:value={prompt}
        on:input={handleInput}
        on:keydown={handleKeyDown}
        class="!text-white placeholder-gray-100 m-0 resize-none border-0 bg-transparent text-token-text-primary focus:ring-0 focus-visible:ring-0 outline-none h-[60px]"
        style="max-height: 40vh;"
      ></textarea>
    </div>
    <div class="pt-1">
      <button
        class="mb-2 me-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white"
      >
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
</div>

<style lang="scss">
  #prompt-box {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 0.85rem;
    padding-left: 0.85rem;
  }
  textarea{
    padding:1.1rem .75rem;
  }

  textarea::-webkit-scrollbar {
    display: none;
  }

  #message {
    max-height: 40vh;
  }
</style>
