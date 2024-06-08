<template>
    <section>
        <main v-if="!pending && !error && !!data">
            <AuthorPic class="mb-2" :author-pic="data.picture" />
            <dl>
                <dt>Autora</dt>
                <dd>
                    {{ data.name }}
                </dd>
                <dt>E-mail</dt>
                <dd>
                    {{ data.name }}
                </dd>
                <dt>Quem sou eu</dt>
                <dd>
                    {{ data.bio }} 
                </dd>
                <dt>Sobre o Opinionline</dt>
                <dd>
                    {{ data.opinionline }}
                </dd>
                <dt>Informações de Contato</dt>
                <dd>
                    {{ data.contact }}
                </dd>
            </dl>
        </main>
        <Spinner v-show="pending" />
    </section>
</template>

<script setup lang="ts">
import type { AboutSys } from '~/server/core/entities';
const { data, pending, error } = await useFetch<AboutSys>('/api/author')
</script>

<style scoped>
dt {
    font-size: 1.5rem;
}

dd {
    margin-bottom: 10px;
}
</style>
