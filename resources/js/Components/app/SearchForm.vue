<template>
  <div>
    <form class="w-[600px] h-[80px] flex items-center">
      <TextInput
        class="block w-full mr-2"
        type="text"
        v-model="form.search"
        autocomplete
        placeholder="Search for files and folders"
      />
    </form>
  </div>
</template>

<script setup>
import { useForm } from "@inertiajs/vue3";
import TextInput from "@/Components/TextInput.vue";

const form = useForm({
  search: "",
});
</script>
