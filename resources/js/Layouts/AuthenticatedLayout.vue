<template>
  <div class="h-screen bg-gray-50 w-full flex gap-4">
    <Navigation />

    <main class="flex flex-col overflow-hidden px-4 flex-1">
      <div class="flex items-center justify-between w-full">
        <SearchForm />
        <UserSettingsDropdown />
      </div>

      <div class="flex flex-1 flex-col overflow-hidden">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Navigation from "@/Components/app/Navigation.vue";
import SearchForm from "@/Components/app/SearchForm.vue";
import UserSettingsDropdown from "@/Components/app/UserSettingsDropdown.vue";

const showingNavigationDropdown = ref(false);
</script>
