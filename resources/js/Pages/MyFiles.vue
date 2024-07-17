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
    </nav>
    <table class="m-w-full">
      <thead class="bg-gray-100 border-b">
        <tr>
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
          v-for="file in files.data"
          :key="file.id"
          class="border-b bg-white transition duration-300 cursor-pointer ease-in-out hover:bg-gray-100"
          @dblclick="openFolder(file)"
        >
          <td class="font-medium whitespace-nowrap text-sm px-6 py-4 text-gray-900">
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

    <div v-if="!files.data.length" class="py-8 text-center text-sm text-gray-400">
      There is no data in this folder
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { router, Link } from "@inertiajs/vue3";
import { HomeIcon } from "@heroicons/vue/20/solid";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";

const { files } = defineProps({
  files: Object,
  folder: Object,
  ancestors: Object,
});

function openFolder(file) {
  if (!file.is_folder) {
    return;
  }

  router.visit(route("myFiles", { folder: file.path }));
}
</script>
