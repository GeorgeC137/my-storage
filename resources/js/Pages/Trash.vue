<template>
  <AuthenticatedLayout>
    <nav class="p-1 mb-3 flex items-center justify-end">
      <div>
        <RestoreFilesButton
          :all-selected="allSelected"
          :selected-ids="selectedIds"
          @restore="resetForm"
        />
        <DeleteForeverButton
          :all-selected="allSelected"
          :selected-ids="selectedIds"
          @delete="resetForm"
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
            <th class="text-sm font-medium text-gray-900 px-6 text-left py-4">Path</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="file in allFiles.data"
            :key="file.id"
            :class="selected[file.id] || allSelected ? 'bg-blue-50' : 'bg-white'"
            class="border-b transition duration-300 cursor-pointer ease-in-out hover:bg-blue-100"
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
              {{ file.path }}
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
import { httpGet } from "@/Helper/http-helper.js";
import { onMounted, ref, onUpdated, computed } from "vue";
import FileIcon from "@/Components/app/FileIcon.vue";
import Checkbox from "@/Components/Checkbox.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import RestoreFilesButton from "@/Components/app/RestoreFilesButton.vue";
import DeleteForeverButton from "@/Components/app/DeleteForeverButton.vue";

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

function resetForm() {
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
