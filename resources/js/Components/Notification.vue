<template>
  <transition
    enter-active-class="ease-out duration-300"
    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
    leave-active-class="ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  >
    <div
      v-if="show"
      :class="{ 'bg-emerald-500': type === 'success', 'bg-red-500': type === 'error' }"
      class="bottom-4 fixed left-4 px-4 py-2 text-white rounded-lg shadow-md w-[200px]"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { emitter, SHOW_NOTIFICATION } from "@/event-bus.js";

const show = ref(false);
const message = ref("");
const type = ref("success");

function close() {
  show.value = false;
  message.value = "";
  type.value = "";
}

onMounted(() => {
  let timeout;
  emitter.on(SHOW_NOTIFICATION, ({ type: t, message: msg }) => {
    show.value = true;
    message.value = msg;
    type.value = t;

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      close();
    }, 5000);
  });
});
</script>
