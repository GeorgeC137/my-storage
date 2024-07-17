<template>
  <MenuItem v-slot="{ active }">
    <a class="text-gray-700 py-2 px-4 block relative text-sm" href="#">
      Upload Files
      <input
        type="file"
        @change="onChange"
        multiple
        class="top-0 right-0 left-0 absolute cursor-pointer opacity-0 bottom-0"
      />
    </a>
  </MenuItem>
</template>

<script setup>
import { MenuItem } from "@headlessui/vue";
import { emitter, FILE_UPLOAD_STARTED } from "@/event-bus.js";

function onChange(e) {
  emitter.emit(FILE_UPLOAD_STARTED, e.target.files);
}
</script>
