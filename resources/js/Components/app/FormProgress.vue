<template>
  <div
    v-if="form.progress"
    class="absolute border right-8 bg-white p-2 flex flex-col w-[240px] border-gray-900 bottom-4 shadow-lg rounded"
  >
    <div class="text-xs mb-2">Uploading {{ form.files.length }} files</div>
    <div class="h-3 bg-gray-100 rounded-md">
      <div
        class="rounded-md bg-gray-900 h-full transition-all"
        :style="{ width: form.progress.percentage + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  form: Object,
});
</script>
