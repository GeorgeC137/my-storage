<template>
  <div>
    <div class="w-[600px] h-[80px] flex items-center">
      <TextInput
        class="block w-full mr-2"
        type="text"
        v-model="search"
        autocomplete
        placeholder="Search for files and folders"
        @keyup.enter.prevent="onSearch"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { router } from "@inertiajs/vue3";
import { searchResults } from "@/event-bus.js";
import TextInput from "@/Components/TextInput.vue";

const search = ref("");

let params = new URLSearchParams(window.location.search);

function onSearch() {
  console.log(search.value);
  params.set("search", search.value);
  router.get(window.location.pathname + "?" + params.toString());
}

onMounted(() => {
  params = new URLSearchParams(window.location.search);

  search.value = params.get("search");

  searchResults(search.value);
});
</script>
