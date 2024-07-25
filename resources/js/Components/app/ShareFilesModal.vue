<template>
  <Modal :show="props.modelValue" @show="onShow" max-width="sm">
    <div class="p-6">
      <h2 class="text-gray-900 text-lg font-medium">Share Files</h2>
      <div class="mt-6">
        <InputLabel for="shareEmail" value="Enter Email Address" class="sr-only" />
        <TextInput
          type="text"
          :class="
            form.errors.email
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : ''
          "
          ref="emailInput"
          v-model="form.email"
          class="w-full block mt-1"
          id="shareEmail"
          placeholder="Enter Email Address"
          @keyup.enter="share"
        />

        <InputError :message="form.errors.email" class="mt-2" />
      </div>

      <div class="mt-6 flex justify-end">
        <SecondaryButton @click="closeModal">Cancel</SecondaryButton>
        <PrimaryButton
          class="ml-3"
          :disabled="form.processing"
          :class="{ 'opacity-25': form.processing }"
          @click="share"
          >Submit</PrimaryButton
        >
      </div>
    </div>
  </Modal>
</template>

<script setup>
import Modal from "@/Components/Modal.vue";
import TextInput from "@/Components/TextInput.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import { useForm, usePage } from "@inertiajs/vue3";
import { showSuccessNotification } from "@/event-bus.js";
import { ref, nextTick } from "vue";

const props = defineProps({
  modelValue: Boolean,
  allSelected: Boolean,
  selectedIds: Array,
});

const form = useForm({
  email: null,
  ids: [],
  all: false,
  parent_id: null,
});

const page = usePage();

const emailInput = ref(null);

const emit = defineEmits(["update:modelValue"]);

function onShow(params) {
  nextTick(() => emailInput.value.focus());
}

function share(params) {
  if (props.allSelected) {
    form.all = true;
    form.ids = [];
  } else {
    form.ids = props.selectedIds;
  }

  const email = form.email;
  form.parent_id = page.props.folder.id;
  form.post(route("file.share"), {
    preserveScroll: true,
    onSuccess: () => {
      closeModal();
      form.reset();
      // Show Success Message
      showSuccessNotification(
        `Selected files will be shared to "${email}" if the email exists in the system`
      );
    },
    onError: () => emailInput.value.focus(),
  });
}

function closeModal(params) {
  emit("update:modelValue");
  form.clearErrors();
  form.reset();
}
</script>
