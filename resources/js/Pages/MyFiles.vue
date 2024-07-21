<template>
  <AuthenticatedLayout>
    <nav class="p-1 mb-3 flex items-center justify-between">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li v-for="ans in ancestors.data" :key="ans.id" class="inline-flex items-center">
          <Link
            v-if="!ans.parent_id"
            :href="route('myFiles')"
            class="items-center inline-flex dark:text-gray-400 dark:hover:text-white font-medium text-sm ml-1 text-gray-700 hover:text-blue-600"
          >
            <HomeIcon class="mr-2 w-4 h-4" />

            MyFiles</Link
          >
          <div v-else class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-4 h-4 text-gray-400"
            >
              <path
                fill-rule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clip-rule="evenodd"
              />
            </svg>

            <Link
              :href="route('myFiles', { folder: ans.path })"
              class="md:ml-2 dark:text-gray-400 dark:hover:text-white font-medium text-sm ml-1 text-gray-700 hover:text-blue-600"
            >
              {{ ans.name }}</Link
            >
          </div>
        </li>
      </ol>

      <div>
        <DownloadFilesButton :all="allSelected" :ids="selectedIds" class="mr-2" />
        <DeleteFilesButton
          :delete-all="allSelected"
          :delete-ids="selectedIds"
          @delete="onDelete"
        />
      </div>
    </nav>
    <div class="flex-1 overflow-auto">
      <table class="min-w-full">
        <thead class="bg-gray-100 border-b">
          <tr>
            <th
              class="text-sm font-medium text-gray-900 px-6 text-left py-4 w-[30px] max-w-[30px] pr-0"
            >
              <Checkbox @change="onAllSelectedChange" v-model:checked="allSelected" />
            </th>
            <th class="text-sm font-medium text-gray-900 px-6 text-left py-4">Name</th>
            <th class="text-sm font-medium text-gray-900 px-6 text-left py-4">Owner</th>
            <th class="text-sm font-medium text-gray-900 px-6 text-left py-4">
              Last Modified
            </th>
            <th class="text-sm font-medium text-gray-900 px-6 text-left py-4">Size</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="file in allFiles.data"
            :key="file.id"
            :class="selected[file.id] || allSelected ? 'bg-blue-50' : 'bg-white'"
            class="border-b transition duration-300 cursor-pointer ease-in-out hover:bg-blue-100"
            @dblclick="openFolder(file)"
            @click="($event) => toggleFileSelect(file)"
          >
            <td
              class="font-medium whitespace-nowrap text-sm px-6 py-4 text-gray-900 w-[30px] max-w-[30px] pr-0"
            >
              <Checkbox
                v-model="selected[file.id]"
                :checked="selected[file.id] || allSelected"
                @change="($event) => onSelectCheckboxChange(file)"
              />
            </td>
            <td
              class="font-medium whitespace-nowrap text-sm px-6 py-4 text-gray-900 flex items-center"
            >
              <FileIcon :file="file" />
              {{ file.name }}
            </td>
            <td class="font-medium whitespace-nowrap text-sm px-6 py-4 text-gray-900">
              {{ file.owner }}
            </td>
            <td class="font-medium whitespace-nowrap text-sm px-6 py-4 text-gray-900">
              {{ file.updated_at }}
            </td>
            <td class="font-medium whitespace-nowrap text-sm px-6 py-4 text-gray-900">
              {{ file.size }}
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="!allFiles.data.length" class="py-8 text-center text-sm text-gray-400">
        There is no data in this folder
      </div>

      <div ref="loadMoreIntersect"></div>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { router, Link } from "@inertiajs/vue3";
import { httpGet } from "@/Helper/http-helper.js";
import { onMounted, ref, onUpdated, computed } from "vue";
import { HomeIcon } from "@heroicons/vue/20/solid";
import FileIcon from "@/Components/app/FileIcon.vue";
import Checkbox from "@/Components/Checkbox.vue";
import DeleteFilesButton from "@/Components/app/DeleteFilesButton.vue";
import DownloadFilesButton from "@/Components/app/DownloadFilesButton.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";

const loadMoreIntersect = ref(null);

const selected = ref({});
const allSelected = ref(false);

const selectedIds = computed(() =>
  Object.entries(selected.value)
    .filter((a) => a[1])
    .map((a) => a[0])
);

const props = defineProps({
  files: Object,
  folder: Object,
  ancestors: Object,
});

const allFiles = ref({
  data: props.files.data,
  next: props.files.links.next,
});

function openFolder(file) {
  if (!file.is_folder) {
    return;
  }

  router.visit(route("myFiles", { folder: file.path }));
}

function loadMore() {
  console.log("LOAD MORE!!!");
  //   console.log(allFiles.value.next);

  if (allFiles.value.next === null) {
    return;
  }

  httpGet(allFiles.value.next).then((res) => {
    allFiles.value.data = [...allFiles.value.data, ...res.data];
    allFiles.value.next = res.links.next;
  });
}

function onAllSelectedChange() {
  allFiles.value.data.forEach((f) => {
    selected.value[f.id] = allSelected.value;
  });
}

function toggleFileSelect(file) {
  selected.value[file.id] = !selected.value[file.id];
  onSelectCheckboxChange(file);
}

function onSelectCheckboxChange(file) {
  if (!selected.value[file.id]) {
    allSelected.value = false;
  } else {
    let checked = true;

    for (let file of allFiles.value.data) {
      if (!selected.value[file.id]) {
        checked = false;
        break;
      }
    }

    allSelected.value = checked;
  }
}

function onDelete() {
  selected.value = {};
  allSelected.value = false;
}

onUpdated(() => {
  console.log("onUpdated triggered");
  allFiles.value = {
    data: props.files.data,
    next: props.files.links.next,
  };
});

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && loadMore()),
    {
      rootMargin: "-250px 0px 0px 0px",
    }
  );

  observer.observe(loadMoreIntersect.value);
});
</script>
