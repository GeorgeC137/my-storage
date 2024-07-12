<template>
  <AuthenticatedLayout>
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
          class="border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100"
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
  </AuthenticatedLayout>
</template>

<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";

const { files } = defineProps({
  files: Object,
});
</script>
