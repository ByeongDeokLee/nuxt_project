<template>
  <div>
    <h2>부제목: 너내 누군지 아니?</h2>
    <div>{{ testStore.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { useTestName } from "@/Store/test";

const testStore = useTestName();
</script>

<style></style>
