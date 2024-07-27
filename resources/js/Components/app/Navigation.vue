<template>
  <nav class="min-w-[200px]">
    <Link :href="route('myFiles')" class="px-3 flex h-[80px] items-center gap-3">
      <ApplicationLogo class="block h-9 w-auto fill-current text-gray-800" />
      MyStorage
    </Link>

    <div class="px-3">
      <CreateNewDropdown />

      <div class="py-3">
        <NavLink :href="route('myFiles')" :active="$page.url === '/my-files'"
          >My Files</NavLink
        >
        <NavLink :href="route('sharedWithMe')" :active="$page.url === '/shared-with-me'"
          >Shared with me</NavLink
        >
        <NavLink :href="route('sharedByMe')" :active="$page.url === '/shared-by-me'"
          >Shared by me</NavLink
        >
        <NavLink :href="route('trash')" :active="$page.url === '/trash'">Trash</NavLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import CreateNewDropdown from "@/Components/app/CreateNewDropdown.vue";
import NavLink from "@/Components/NavLink.vue";
</script>
