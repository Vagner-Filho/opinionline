export interface IArticle {
    title: string;
    text: string;
    id?: number;
    authorId: number;
    releaseDate?: number;
    cover: string;
}
export interface ReleasedArticle extends Required<IArticle> {}

export abstract class ArticlePayload {
    authorId: number
    text: string
    title: string
    cover: File | undefined

    constructor(article: ArticlePayload) {
        this.authorId = article.authorId
        this.text = article.text
        this.title = article.title
        this.cover = article.cover
    }
}

export abstract class Article {
    title: string;
    text: string;
    id?: number;
    authorId: number;
    releaseDate?: number;
    cover: string;

    constructor(article: Article) {
        this.authorId = article.authorId;
        this.id = article.id;
        this.title = article.title;
        this.text = article.text;
        this.cover = article.cover;
        this.releaseDate = article.releaseDate;
    }
}

export interface IAuthor {
    name: string;
    email: string;
    id: string;
    picture: string;
    bio: string;
    contact: string;
}

export interface IArticleCover {
    articleId: string;
    coverId: string;
}

export interface ICover {
    cover: File;
    id: string;
}

export interface IAbout {
    opinionline: string;
}
