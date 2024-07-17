<template>
  <Modal :show="modelValue" @show="onShow" max-width="sm">
    <div class="p-6">
      <h2 class="text-gray-900 text-lg font-medium">Create New Folder</h2>
      <div class="mt-6">
        <InputLabel for="folderName" value="Folder Name" class="sr-only" />
        <TextInput
          type="text"
          ref="folderNameInput"
          v-model="form.name"
          class="w-full block mt-1"
          id="folderName"
          :class="
            form.errors.name
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : ''
          "
          placeholder="Folder Name"
          @keyup.enter="createFolder"
        />

        <InputError :message="form.errors.name" class="mt-2" />
      </div>

      <div class="mt-6 flex justify-end">
        <SecondaryButton @click="closeModal">Cancel</SecondaryButton>
        <PrimaryButton
          class="ml-3"
          :disabled="form.processing"
          :class="{ 'opacity-25': form.processing }"
          @click="createFolder"
          >Submit</PrimaryButton
        >
      </div>
    </div>
  </Modal>
</template>

<script setup>
import Modal from "@/Components/Modal.vue";
import InputError from "@/Components/InputError.vue";
import TextInput from "@/Components/TextInput.vue";
import InputLabel from "@/Components/InputLabel.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import { useForm, usePage } from "@inertiajs/vue3";
import { ref, nextTick } from "vue";

const { modelValue } = defineProps({
  modelValue: Boolean,
});

const form = useForm({
  name: "",
  parent_id: null,
});

const page = usePage();

const folderNameInput = ref(null);

const emit = defineEmits(["update:modelValue"]);

function onShow(params) {
  nextTick(() => folderNameInput.value.focus());
}

function createFolder(params) {
  form.parent_id = page.props.folder.id;
  form.post(route("folder.create"), {
    preserveScroll: true,
    onSuccess: () => {
      closeModal();
      form.reset();
      // Show Success Message
    },
    onError: () => folderNameInput.value.focus(),
  });
}

function closeModal(params) {
  emit("update:modelValue");
  form.clearErrors();
  form.reset();
}
</script>
