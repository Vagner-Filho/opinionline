<template>
    <label :for="name">
        <div class="rounded-3xl w-12 px-[4px] h-6 relative" :class="[value ? 'bg-strong-green' : 'bg-slate-300']"
            @click="$emit('update:modelValue', !value)">
            <div class="h-4 w-4 rounded-full border-[1px] border-slate-200 bg-white absolute top-0 bottom-0 my-auto"
                :class="[value ? 'left-1' : 'right-1']" />
        </div>
    </label>
</template>

<script setup lang="ts">
defineProps({
    name: {
        type: String,
        default: '',
        required: true
    },
    value: {
        type: Boolean,
        default: false,
        required: true
    }
})

defineEmits(['update:modelValue'])
</script>
