<script lang="ts">
	import Career from './lib/Career.svelte';
  import { Router, Route, Link } from "svelte-routing";
  import Home from "./route/Home.svelte";
  import Navbar from "./lib/Navbar.svelte";
  export let url = "";
</script>

<main>
  <Router {url}>
    <Navbar />
    <main class="md:pt-[95px] pt-[65px]">
      <div class="pt-3">
        <Route path="/" component={Home} />
        <Route path="career" component={Career} />
      </div>
    </main>
  </Router>
</main>
