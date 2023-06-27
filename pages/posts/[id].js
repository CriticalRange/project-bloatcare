import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import CustomBackButton from "../../components/CustomBackButton";

export default function Post({ postData }) {
  return (
    <div>
      <Head>
        <title>{`${postData.title} ← BloatCare`}</title>
      </Head>
      <article className="flex flex-col ml-72 mr-72 mt-16">
        <h1 className="ml-12 text-4xl font-extrabold mb-4">
          <CustomBackButton />
          {postData.title}
        </h1>
        <div className="text-[#666] text-base">
          <Date dateString={postData.date} />
        </div>
        <div
          className="mt-5 text-gray-950 dark:text-gray-600 first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
