<template>
<div class="w-full my-12 mx-8 bg-white shadow-lg pt-4 pl-4" >
  <back-button hasText />

    <div class="w-full h-screen">
      <iframe loading="eager" ref="iframega" width="100%" height="100%" src="https://datastudio.google.com/embed/reporting/f5c855a3-7e2a-424a-8de2-77cbe8549bd4/page/XKkeC" frameborder="0" style="border:0" allowfullscreen></iframe>
    </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import BackButton from '../components/BackButton.vue';
import { onMounted } from '@vue/runtime-core';

export default {
  components: { BackButton },
  setup() {
    const iframega = ref(null);
    onMounted(()=>{
      console.log(iframega.value);
    })
    return {iframega}

  }
};
</script>
