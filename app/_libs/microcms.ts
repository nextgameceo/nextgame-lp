import { createClient } from 'microcms-js-sdk';
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
  MicroCMSContentId,
} from 'microcms-js-sdk';
import { notFound } from 'next/navigation';

/* ===============================
   型定義
================================ */

export type Category = {
  name: string;
} & MicroCMSContentId &
  MicroCMSDate;

export type News = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
} & MicroCMSContentId &
  MicroCMSDate;

export type Article = News;

export type Member = {
  name: string;
  position: string;
  profile: string;
  image?: MicroCMSImage;
} & MicroCMSContentId &
  MicroCMSDate;

export type Recruit = {
  role: string;
  job_description?: string;
  salary?: string;
  capacity?: string;
  working_hours?: string;
} & MicroCMSContentId &
  MicroCMSDate;

export type Business = {
  logo?: MicroCMSImage;
  description: string;
  image?: MicroCMSImage;
  link: string;
  content: string;
} & MicroCMSContentId &
  MicroCMSDate;

export type Meta = {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: MicroCMSImage;
  canonical?: string;
};

/* ===============================
   環境変数チェック
================================ */

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

/* ===============================
   Client初期化
================================ */

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

/* ===============================
   News
================================ */

export const getNewsList = async (queries?: MicroCMSQueries) => {
  return await client
    .getList<News>({
      endpoint: 'news',
      queries,
    })
    .catch(notFound);
};

export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client
    .getListDetail<News>({
      endpoint: 'news',
      contentId,
      queries,
    })
    .catch(notFound);
};

/* ===============================
   Category
================================ */

export const getCategoryList = async (queries?: MicroCMSQueries) => {
  return await client
    .getList<Category>({
      endpoint: 'categories',
      queries,
    })
    .catch(notFound);
};

export const getCategoryDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client
    .getListDetail<Category>({
      endpoint: 'categories',
      contentId,
      queries,
    })
    .catch(notFound);
};

/* ===============================
   Member
================================ */

export const getMembersList = async (queries?: MicroCMSQueries) => {
  return await client
    .getList<Member>({
      endpoint: 'members',
      queries,
    })
    .catch(notFound);
};

/* ===============================
   Recruit（✅ cache: 'no-store' 追加）
================================ */

export const getRecruitList = async (queries?: MicroCMSQueries) => {
  return await client
    .getList<Recruit>({
      endpoint: 'recruit',
      queries,
      customRequestInit: {
        cache: 'no-store', // ✅ 追加
      },
    })
    .catch(notFound);
};

/* ===============================
   Business
================================ */

export const getBusinessList = async (queries?: MicroCMSQueries) => {
  return await client
    .getList<Business>({
      endpoint: 'business',
      queries,
    })
    .catch(notFound);
};

export const getBusinessDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client
    .getListDetail<Business>({
      endpoint: 'business',
      contentId,
      queries,
    })
    .catch(notFound);
};

/* ===============================
   Meta
================================ */

export const getMeta = async (queries?: MicroCMSQueries) => {
  return await client
    .getObject<Meta>({
      endpoint: 'meta',
      queries,
    })
    .catch(() => null);
};

