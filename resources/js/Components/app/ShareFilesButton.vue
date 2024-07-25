<template>
  <button
    @click="onClick"
    class="px-4 py-2 inline-flex border border-gray-200 bg-white text-sm items-center rounded-lg hover:bg-gray-100 font-medium hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:text-white dark:focus:ring-blue-500 dark:hover:text-white dark:hover:bg-gray-600 mr-3"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-5 mr-2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
      />
    </svg>
    Share
  </button>

  <ShareFilesModal
    v-model="showEmailsModal"
    :all-selected="allSelected"
    :selected-ids="selectedIds"
  />
</template>

<script setup>
import { ref } from "vue";
import { useForm } from "@inertiajs/vue3";
import { showErrorDialog } from "@/event-bus.js";
import ShareFilesModal from "./ShareFilesModal.vue";

const showEmailsModal = ref(false);

const form = useForm({
  all: null,
  ids: [],
  parent_id: null,
});

const props = defineProps({
  allSelected: {
    type: Boolean,
    required: false,
    default: false,
  },
  selectedIds: {
    type: Array,
    required: false,
  },
});

function onClick() {
  if (!props.allSelected && !props.selectedIds.length) {
    showErrorDialog("Please select at least one file to share");
    return;
  }
  showEmailsModal.value = true;
}
</script>
