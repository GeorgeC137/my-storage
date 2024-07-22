<template>
  <PrimaryButton @click="download">
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
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </svg>
    Download
  </PrimaryButton>
</template>

<script setup>
import { usePage, useForm } from "@inertiajs/vue3";
import { httpGet } from "@/Helper/http-helper.js";
import { showErrorDialog } from '@/event-bus.js';
import PrimaryButton from "@/Components/PrimaryButton.vue";

const page = usePage();

const props = defineProps({
  all: {
    type: Boolean,
    required: false,
    default: false,
  },
  ids: {
    type: Array,
    required: false,
  },
});

function download() {
  if (!props.all && props.ids.length == 0) {
    showErrorDialog('Please select at least one file to download')
    return;
  }

  const p = new URLSearchParams();
  p.append("parent_id", page.props.folder.id);

  if (props.all) {
    p.append("all", props.all ? 1 : 0);
  } else {
    for (let id of props.ids) {
      p.append("ids[]", id);
    }
  }

  httpGet(route("file.download") + "?" + p.toString()).then((res) => {
    if (!res.url) return;
    const a = document.createElement("a");

    a.download = res.filename;
    a.href = res.url;
    a.click();
    console.log(res);
  });

  // console.log("Download");
}
</script>
