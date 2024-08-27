<template>
    <div>
        <nav>
            <ul class="flex h-12 w-full">
                <li class="w-3/5"
                    @click="$router.push({ path: `article/${id}`, query: { isViewOnly: '1' } })">
                    <h1 class="text-2xl truncate h-full leading-[3rem] hover:cursor-pointer">{{ title }}</h1>
                </li>
                <li class="w-1/5 text-center flex items-center px-2">
                    <CustomLabel class="hover:cursor-pointer" :name="'released-' + id" :value="isReleased"
                        @update:modelValue="handleRelease(id, $event)" v-if="!isLoadingRelease" />
                    <Spinner v-else />
                </li>
                <li class="ml-auto w-1/5 flex items-center justify-end gap-4">
                    <button type="button" class="std-icon-hover">
                        <UIcon name="i-heroicons-pencil-solid"
                        @click="$router.push({ path: `article/${id}` })" />
                    </button>
                    <button type="button" class="std-icon-hover hover:text-red-500" @click="handleDelete(id)">
                        <UIcon name="i-heroicons-trash-solid" />
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        default: 'Título',
        required: true
    },
    isReleased: {
        type: Boolean,
        default: false,
        required: true
    },
    id: {
        type: Number,
        default: '',
        required: true
    }
})

const emit = defineEmits<{
    release: [payload: number | null],
    delete: [payload: number]
}>()

const isLoadingRelease = ref(false)
async function handleRelease(id: number, release: boolean) {
    isLoadingRelease.value = true
    const data = await $fetch< null | number | Error >(`/api/article/release/${id}`, {
        method: 'PATCH',
        query: {
            release: release
        },
        headers: {
            Authorization: useCookie<string>('token').value
        }
    })
    if (!(data instanceof Error)) {
        emit('release', data)
    }
    isLoadingRelease.value = false
}

async function handleDelete(id: number) {
   await $fetch(`/api/article/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: useCookie<string>('token').value
        }
    }).then((res) => {
        if (res === true) {
            emit('delete', id)
        }
    })
}
</script>
