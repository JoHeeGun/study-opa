<script setup>
import { useRoute } from 'vue-router';

import TopBar from "@/views/Layout/TopBar.vue";
import SideBar from "@/views/Layout/SideBar.vue";

const route = useRoute();

</script>

<template>
	<div v-if="route.meta.fullLayout">
		<TopBar />
		<SideBar />
		<router-view />
	</div>
	<div v-else>
		<router-view />
	</div>
</template>

