export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
};

export interface Articles {
  articles: Article[];
  articlesCount: number;
}

export interface ArticleCreateData {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

export interface ArticleReadData {
  article: Article;
}
