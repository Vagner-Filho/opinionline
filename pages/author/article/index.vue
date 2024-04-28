<template>
    <div class="max-w-4xl m-auto">
        <h2 v-if="$route.query.isViewOnly && $route.query.isViewOnly === '1'" class="text-center text-xl">
            Visualização
        </h2>
        <AuthorArticleForm v-if="!isLoadingData" :titlePlaceholder="'Título'"
            :isViewOnly="$route.query.isViewOnly === '1'" :coverPlaceholder="'Adicionar Capa'"
            :articleTextPlaceholder="'Texto'" :existing-article="existingArticle" :cover-url="coverUrl"
            @article="handleSubmit" />
        <Spinner class="mt-32 mx-auto" v-if="isLoadingData" />
    </div>
</template>

<script setup lang="ts">
import type { User } from "firebase/auth";
import { ref as fbRef, update, Database, push } from "firebase/database";
import { getStorage, ref as fbStorageRef, getDownloadURL } from "firebase/storage";
import type { ArticleData } from "~/components/author/article/types";
import { saveCover } from "~/server/data/article/cover";
import { Article } from "~/server/entities";

function handleSubmit(articleData: ArticleData) {
    const db = getDb()
    const route = useRoute()
    const articleId = route.query.articleId;
    if (!articleId) {
        createArticle(db, articleData)
    } else {
        updateArticle(db, articleData, articleId.toString())
    }
}
async function createArticle(db: Database, articleData: ArticleData) {
    push(fbRef(db, 'articles/'), {
        releaseDate: new Date().getTime(),
        text: articleData.text,
        title: articleData.title,
        authorId: useState<User>('author').value.uid
    }).then((onfulfilled) => {
        const key = onfulfilled.key;
        if (key && articleData.cover) {
            saveCover(articleData.cover, key);
        }
        alert('Artigo criado com sucesso!')
    }).catch((error) => {
        console.error(error);
    })
}

function updateArticle(db: Database, articleData: ArticleData, articleId: string) {
    if (existingArticle.value) {
        const newText = articleData.text === existingArticle.value.text ? undefined : articleData.text;
        const newTitle = articleData.title === existingArticle.value.title ? undefined : articleData.title;

        const handleResponse = (status: "success" | "error") => {
            alert(status === "success" ? "Artigo atualizado!" : "Falha ao atualizar Artigo");
        }

        if (newText) {
            update(fbRef(db, `articles/${articleId}`), {
                text: newText,
            }).then(() => handleResponse("success"))
                .catch(() => handleResponse("error"))
        }
        if (newTitle) {
            update(fbRef(db, `articles/${articleId}`), {
                title: newTitle,
            }).then(() => handleResponse("success"))
                .catch(() => handleResponse("error"))
        }

        if (articleData.cover) {
            saveCover(articleData.cover, articleId);
        }
    }
}

const isLoadingData = ref(false)
const existingArticle = ref<Article>();
const coverUrl = ref<string>();

onMounted(async () => {
    const route = useRoute()
    const articleId = route.query.articleId;
    if (articleId) {
        isLoadingData.value = true
        existingArticle.value = await getArticleFromId(articleId.toString())
        if (existingArticle.value) {
            const storage = getStorage();
            getDownloadURL(fbStorageRef(storage, `article/${articleId.toString()}`))
                .then((res) => {
                    coverUrl.value = res;
                })
                .finally(() => {
                    isLoadingData.value = false
                })
            return;
        }
        // TODO: handle article not found
    }
})
</script>
