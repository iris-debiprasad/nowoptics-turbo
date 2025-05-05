import Blog from "@/components/static/blogs/blog";
import { BLOGS_PAGES, IBlog_Page } from "@/constants/blogConstants";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  pageData: IBlog_Page;
}

const BlogDetail = ({ pageData }: Props) => {
  if (pageData) {
    return (
      <>
        <Head>
          <title>{pageData.meta.title}</title>
          <meta name="description" content={pageData.meta.description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <main>
          <Blog data={pageData} />
        </main>
      </>
    );
  } else {
    return null;
  }
};

export const getStaticPaths = (() => ({
  paths: Object.keys(BLOGS_PAGES).map((slug) => ({
    params: { slug },
  })),
  fallback: false,
})) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const slug = (params?.slug as string) || "";
  const response: IBlog_Page | undefined = BLOGS_PAGES[slug];

  if (!response) return { notFound: true };

  return { props: { pageData: response } };
}) satisfies GetStaticProps<Props>;

export default BlogDetail;
