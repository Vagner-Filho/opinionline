<template>
    <img class="w-20 h-20 rounded-full object-cover" id="author-pic" :src="!authorPic ? fallback : authorPic" alt="foto da autora">
</template>

<script setup lang="ts">
defineProps({
    authorPic: {
        type: String,
    },
    fallback: {
        type: String,
        required: false,
        default: '/author/default_author.png'
    }
})
</script>
