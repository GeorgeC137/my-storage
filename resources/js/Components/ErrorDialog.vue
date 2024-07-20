<template>
  <Modal :show="show" max-width="md">
    <div class="p-6">
      <h2 class="text-2xl mb-2 font-semibold text-red-600">Error</h2>
      <p>{{ message }}</p>
      <div class="flex mt-6 justify-end">
        <PrimaryButton @click="close">OK</PrimaryButton>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Modal from "./Modal.vue";
import PrimaryButton from "./PrimaryButton.vue";
import { SHOW_ERROR_DIALOG, emitter } from "@/event-bus.js";

const show = ref(false);
const message = ref("");

const emit = defineEmits(["close"]);

function close() {
  show.value = false;
  message.value = "";
}

onMounted(() => {
  emitter.on(SHOW_ERROR_DIALOG, ({ message: msg }) => {
    show.value = true;
    message.value = msg;
  });
});
</script>
