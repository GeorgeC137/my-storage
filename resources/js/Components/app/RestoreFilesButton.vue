<template>
  <button
    @click="onClick"
    class="px-4 py-2 inline-flex border border-gray-200 bg-white text-sm items-center rounded-lg hover:bg-gray-100 font-medium hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:text-white dark:focus:ring-blue-500 dark:hover:text-white dark:hover:bg-gray-600"
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
        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
      />
    </svg>
    Restore
  </button>

  <ConfirmationDialog
    :show="showRestoreDialog"
    message="Are you sure you want to restore selected files?"
    @cancel="onRestoreCancel"
    @confirm="onRestoreConfirm"
  ></ConfirmationDialog>
</template>

<script setup>
import { ref } from "vue";
import { usePage, useForm } from "@inertiajs/vue3";
import { showErrorDialog, showSuccessNotification } from "@/event-bus.js";
import ConfirmationDialog from "@/Components/ConfirmationDialog.vue";

const emit = defineEmits(["restore"]);

const showRestoreDialog = ref(false);

const page = usePage();

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
    showErrorDialog("Please select at least one file to restore");
    return;
  }
  showRestoreDialog.value = true;
}

function onRestoreConfirm() {
  if (props.allSelected) {
    form.all = true;
  } else {
    form.ids = props.selectedIds;
  }

  form.post(route("file.restore"), {
    onSuccess: () => {
      showRestoreDialog.value = false;
      emit("restore");
      showSuccessNotification("Selected files have been restored");
    },
  });
  console.log("Restore", props.allSelected, props.selectedIds);
}

function onRestoreCancel() {
  showRestoreDialog.value = false;
}
</script>
