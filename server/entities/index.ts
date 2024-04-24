export interface IArticle {
  title: string;
  text: string;
  id: string;
  authorId: string;
  publishingDate: number;
  isPublished: boolean;
}

export abstract class Article {
  title: string;
  text: string;
  id: string;
  authorId: string;
  releaseDate: number;
  isPublished: boolean;

  constructor(article: Article) {
    this.authorId = article.authorId;
    this.id = article.id;
    this.isPublished = article.isPublished;
    this.title = article.title;
    this.text = article.text;
    this.releaseDate= article.releaseDate;
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
