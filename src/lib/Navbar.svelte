
    <main
      class="lg:h-[95px] h-[65px] z-10 w-full fixed smooth-transition"
      :class={isActive ? 'bg-white' : ''}
    >
      <header
        :class={isOpen ? 'menu_bar' : ''}
        class="lg:flex grid grid-flow-col grid-cols-8 gap-2 lg:justify-between lg:items-center lg:px-4 sm:py-3 main lg:h-[95px] h-[65px] px-[10px] items-center max-w-[1440px] mx-auto"
      >
        <div
          class="flex items-center justify-between px-4 py-3 sm:p-0 order-1 lg:order-2 col-span-4 sm:col-span-5"
        >
          <img
            class="lg:h-[48px] lg:w-[170px] w-fit h-[28px] object-contain"
            src="https://www.detech.com.np/assets/images/icons/detech-logo.png"
            alt="logo"
            height="48"
            width="170"
          />
        </div>
        <div class="lg:hidden order-3 flex justify-end col-span-1">
          <button
            on:click={isOpen = !isOpen}
            class="grid box-content grid-cols-[1fr] w-[20px] m-0 p-2 rounded-full border-[none] bg-none cursor-pointer gap-[5px] menu-control"
            aria-label="Toggle mobile menu"
          >
            <span
              :class={isOpen ? 'rotate-45' : 'rotate-0'}
              class="w-full h-[2px] origin-[0%_50%] [transition:0.2s_cubic-bezier(0.34,_1.56,_0.64,_1)] rounded-full bg-gray-900"
            ></span>
            <span
              :class="isOpen ? 'opacity-0' : 'opacity-100'"
              class="w-[75%] h-[2px] origin-[0%_50%] [transition:0.2s_cubic-bezier(0.34,_1.56,_0.64,_1)] rounded-full bg-gray-900"
            ></span>
            <span
              :class="isOpen ? '-rotate-45 !w-full' : 'rotate-0'"
              class="w-[50%] h-[2px] origin-[0%_50%] [transition:0.2s_cubic-bezier(0.34,_1.56,_0.64,_1)] rounded-full bg-gray-900"
            ></span>
          </button>
        </div>
        <div
          class="backdrop-filter rounded-[.75rem] order-2 col-span-2 menubar"
          class:{menubar__wrapper={isOpen}}
          class:{menubar--closed={!isOpen}}
          class={'backdrop-blur-[5px] bg-[rgba(42,42,42,0.05)]' : !isActive}
        >
          <nav
            class="flex justify-center items-center h-[3rem] px-[2rem] gap-x-[3rem] gap-y-[3rem] menubar__wrapper"
          >
           <router-link
              v-for="(link, index) in nav_links"
              :key="index"
              @click.native="isOpen = false"
              :to="link.link"
              :class="link.link === $route.hash ? 'relative text-primary after:content-[\'\'] after:absolute after:h-[2px] after:!w-full after:bottom-[-2px] after:bg-primary after:left-0' : ''"
              class="flex decoration-none leading-[1] text-[18px] pb-[1px] mb-[-3px] items-stretch text-gray-900 gap-x-[2px] gap-y-[2px] max-w-[100%] hover:text-primary font-medium relative lg:after:content-[''] lg:after:absolute lg:after:h-[2px] lg:after:w-0 lg:after:bottom-[-2px] lg:hover:after:w-full lg:after:bg-primary lg:after:duration-500 lg:after:ease-in-out lg:after:transition-all menubar__link"
            >
              <div class="[transform:translate3d(0px,_0%,_0px)_scale3d(1,_1,_1)_rotateX(0deg)_rotateY(0deg)_rotateZ(0deg)_skew(0deg,_0deg)] [transform-style:preserve-3d]">
                {{ link.name }}
              </div>
            </router-link>
          </nav>
        </div>
        <a
          href="tel:+9779818000015"
          class="primary-btn text-white md:px-6 px-3 py-3  order-2 lg:order-3 sm:col-span-3 col-span-4 text-[14px]"
        >
          <span class="font-medium">Call Us Now</span>
        </a>
      </header>
    </main>
  <script lang="ts">
  import { computed, onMounted, ref, onBeforeUnmount } from "vue";
  const isOpen = ref(false);
  
  const nav_links = computed(() => {
    return [
      { name: 'Home', link: '/' },
      { name: 'Service', link: '/#service' },
      { name: 'Products', link: '/#product' },
      { name: 'Reviews', link: '/#reviews' },
      { name: 'FAQs', link: '/#faqs' },
      { name: 'Career', link: '/career' },
    ];
  });
  
  const isActive = ref(false);
  const threshold = 95;
  
  const handleScroll = () => {
    const currentScrollTop = window.scrollY;
    isActive.value = currentScrollTop >= threshold;
  };
  
  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
  });
  </script>
  
  <style lang="scss" scoped>
  .smooth-transition {
    transition: background-color 0.3s ease;
  }
  .menubar {
    @media (max-width: 1023px) {
      position: absolute;
      top: 4rem;
      bottom: auto;
      right: 0;
      left: auto;
      overflow: hidden;
      transition: max-height 0.5s ease-in-out, padding 0.5s ease-in-out,
        width 0.5s ease-in-out;
      width: 100vw;
      max-width: 420px;
      max-height: 0;
      height: 100vh;
      @apply bg-slate-100;
      &.menubar--closed {
        max-height: 0;
        padding: 0;
      }
  
      &.menubar--open {
        max-height: 900px;
        height: 100vh;
        width: 100vw;
        padding: 2rem;
      }
      .menubar__wrapper {
        position: static;
        display: grid;
        padding: 1rem;
        height: auto;
        justify-items: flex-start;
        align-items: start;
        justify-content: flex-start;
        grid-auto-columns: 1fr;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        gap: 2rem;
        @media (max-width: 768px) {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        .menubar__link {
          font-size: 1.5rem;
          overflow: hidden;
        }
      }
    }
  }
  </style>