export interface IArticle {
  title: string;
  text: string;
  releaseDate: string;
  id: string;
  authorId: string;
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