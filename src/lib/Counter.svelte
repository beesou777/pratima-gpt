<script lang="ts">
  import { useCounterStore } from '../store/counter';

  const counter = useCounterStore();

  // Create a reactive variable for the count
  let count: number;
  counter.subscribe((value) => {
    count = value;
  });

  // Create a function to increment the count
  function increment() {
    counter.increment();
  }

  // Create a function to decrement the count
  function decrement() {
    if (count > 0) {
      counter.decrement();
    }
  }
</script>

<main class="flex justify-center h-screen items-center flex-col gap-3">
  <h1 class="text-5xl font-bold ">Counter</h1>
  <div class="flex gap-2">
    <button on:click={increment} class="px-5 py-3 bg-red-500 rounded-md">Increment</button>
    <p class="px-5 py-3 font-bold text-[30px]">{count}</p>
    <button on:click={decrement} class="px-5 py-3 bg-red-500 rounded-md">Decrement</button>
  </div>
</main>
