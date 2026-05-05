<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();

function handleClearError() {
  clearError({
    redirect: "/",
  });
}
</script>

<template>
  <main class="error-page">
    <p class="eyebrow">{{ error.status }}</p>
    <h1>{{ error.status === 404 ? "页面不存在" : "出错了" }}</h1>
    <p>
      {{ error.statusText || "请求处理时遇到问题" }}
    </p>

    <button class="button" type="button" @click="handleClearError">
      返回首页
    </button>
  </main>
</template>
