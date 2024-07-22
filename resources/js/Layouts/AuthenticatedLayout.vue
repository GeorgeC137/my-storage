<template>
  <div class="h-screen bg-gray-50 w-full flex gap-4">
    <Navigation />

    <main
      class="flex flex-col overflow-hidden px-4 flex-1"
      :class="dragOver ? 'dropzone' : ''"
      @drop.prevent="onDrop"
      @dragover.prevent="OnDragOver"
      @dragleave.prevent="OnDragLeave"
    >
      <template v-if="dragOver" class="text-sm py-8 text-gray-500 text-center"
        >Drop files here to upload</template
      >
      <template v-else>
        <div class="flex items-center justify-between w-full">
          <SearchForm />
          <UserSettingsDropdown />
        </div>
        <div class="flex flex-1 flex-col overflow-hidden">
          <slot />
        </div>
      </template>
    </main>
  </div>
  <FormProgress :form="fileUploadForm" />
  <ErrorDialog />
  <Notification />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useForm, usePage } from "@inertiajs/vue3";
import {
  emitter,
  FILE_UPLOAD_STARTED,
  showErrorDialog,
  showSuccessNotification,
} from "@/event-bus.js";
import Navigation from "@/Components/app/Navigation.vue";
import Notification from "@/Components/Notification.vue";
import FormProgress from "@/Components/app/FormProgress.vue";
import SearchForm from "@/Components/app/SearchForm.vue";
import ErrorDialog from "@/Components/ErrorDialog.vue";
import UserSettingsDropdown from "@/Components/app/UserSettingsDropdown.vue";

const showingNavigationDropdown = ref(false);

const dragOver = ref(false);

const page = usePage();

const fileUploadForm = useForm({
  files: [],
  relative_paths: [],
  parent_id: null,
});

function uploadFiles(files) {
  fileUploadForm.parent_id = page.props.folder.id;
  fileUploadForm.files = files;
  fileUploadForm.relative_paths = [...files].map((f) => f.webkitRelativePath);
  fileUploadForm.post(route("file.store"), {
    onSuccess: () => {
      showSuccessNotification(`${files.length} files have been uploaded`);
    },
    onError: (errors) => {
      let message = "";

      if (Object.keys(errors).length > 0) {
        message = errors[Object.keys(errors)[0]];
      } else {
        message = "Error during file upload. Please try again later.";
      }

      showErrorDialog(message);
    },
    onFinish: () => {
      fileUploadForm.clearErrors();
      fileUploadForm.reset();
    },
  });
}

function onDrop(ev) {
  dragOver.value = false;
  const files = ev.dataTransfer.files;

  console.log(files);

  if (!files.length) {
    return;
  }

  uploadFiles(files);
}

function OnDragOver() {
  dragOver.value = true;
}

function OnDragLeave() {
  dragOver.value = false;
}

onMounted(() => {
  emitter.on(FILE_UPLOAD_STARTED, uploadFiles);
});
</script>

<style scoped>
.dropzone {
  width: 100%;
  height: 100%;
  color: #8d8d8d;
  display: flex;
  justify-content: center;
  border: 2px dashed gray;
  align-items: center;
}
</style>
