<template>
    <div>
        <form
            class="shadow-sm shadow-strong-green font-josefin-sans w-[320px] mt-[112px] flex flex-col items-center h-[270px] m-auto rounded-md"
            @submit.prevent="logUser">
            <input class="w-[276px] h-[30px] mt-[44px] mb-[11px] dark:bg-[#3b3b3b] bg-[#D2D2D2] rounded-md px-2"
                id="email" name="email" type="text" aria-placeholder="e-mail" placeholder="e-mail" required>
            <input class="w-[276px] h-[30px] mb-[16px] dark:bg-[#3b3b3b] bg-[#D2D2D2] rounded-md px-2" id="senha"
                type="password" name="psswd" aria-placeholder="senha" placeholder="senha" required>
            <button v-if="!isLoadingData" type="submit" class="confirmation-btn std-btn-shape text-base">Entrar</button>
            <Spinner v-else class="mt-32" />
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isLoadingData = ref(false)
async function logUser(ev: Event) {
    isLoadingData.value = true;

    const fd = new FormData(ev.target as HTMLFormElement)
    const res = await $fetch<{ token: string }>('/api/login', {
        method: 'POST',
        body: fd
    })
    if (res && res.token) {
        const token = useCookie<string>('token')
        token.value = res.token
        const router = useRouter()
        router.push({ path: '/author/article' })
    }

    isLoadingData.value = false;
}
</script>
