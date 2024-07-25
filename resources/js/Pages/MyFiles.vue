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

      <div class="flex">
        <label class="flex items-center mr-3">
          Only Favorites
          <Checkbox
            @change="showOnlyFavorites"
            v-model:checked="onlyFavorites"
            class="ml-2"
          />
        </label>
        <ShareFilesButton :all-selected="allSelected" :selected-ids="selectedIds" />
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
            <td class="font-medium text-yellow-500 text-sm px-6 py-4 max-w-[40px]">
              <div @click.stop.prevent="addRemoveFavorite(file)">
                <svg
                  v-if="file.is_favorite"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </div>
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
import { httpGet, httpPost } from "@/Helper/http-helper.js";
import { showSuccessNotification } from "@/event-bus.js";
import { onMounted, ref, onUpdated, computed } from "vue";
import { HomeIcon } from "@heroicons/vue/20/solid";
import FileIcon from "@/Components/app/FileIcon.vue";
import Checkbox from "@/Components/Checkbox.vue";
import DeleteFilesButton from "@/Components/app/DeleteFilesButton.vue";
import DownloadFilesButton from "@/Components/app/DownloadFilesButton.vue";
import ShareFilesButton from "@/Components/app/ShareFilesButton.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";

const loadMoreIntersect = ref(null);

const selected = ref({});
const allSelected = ref(false);
const onlyFavorites = ref(false);

let params = null;

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

function addRemoveFavorite(file) {
  httpPost(route("file.addToFavorites"), { id: file.id })
    .then(() => {
      file.is_favorite = !file.is_favorite;
      showSuccessNotification("Selected files have been added to favorites");
    })
    .catch(async (er) => {
      console.log(er.error.message);
    });
}

function showOnlyFavorites() {
  if (onlyFavorites.value) {
    params.set("favorites", 1);
  } else {
    params.delete("favorites");
  }

  router.get(window.location.pathname + "?" + params.toString());
}

onUpdated(() => {
  console.log("onUpdated triggered");
  allFiles.value = {
    data: props.files.data,
    next: props.files.links.next,
  };
});

onMounted(() => {
  params = new URLSearchParams(window.location.search);
  onlyFavorites.value = params.get("favorites") === "1";
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && loadMore()),
    {
      rootMargin: "-250px 0px 0px 0px",
    }
  );

  observer.observe(loadMoreIntersect.value);
});
</script>
