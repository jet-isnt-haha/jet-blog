<script setup lang="ts">
defineProps<{
    tags: string[],
    hasFilters: boolean
}>()

const keyword = defineModel<string>('keyword', { required: true });

const selectedTag = defineModel<string>('selectedTag', { required: true });

defineEmits<{ reset: [] }>()
</script>

<template>
    <div class="filter-panel">
        <label class="search-box">
            搜索文章
            <input v-model="keyword" type="search" placeholder="输入标题、描述或标签">
        </label>
        <button v-if="hasFilters" class="text-button" type="button" @click="$emit('reset')">
            清空筛选
        </button>

        <div class="tag-row" aria-label="Filter posts by tag">
            <button v-for="tag in tags" :key="tag" class="tag-button" :class="{ active: selectedTag === tag }"
                type="button" @click="selectedTag = tag">
                {{ tag }}
            </button>
        </div>
    </div>
</template>
