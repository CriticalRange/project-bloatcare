import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="flex flex-row justify-around mt-0 p-10">
        <section>
          <h1 className="text-3xl leading-normal p-0 ml-10">
            A website that has blogs in it
          </h1>
          <p className="text-base m-10">
            {`A very "never thought of before" idea right?`}{" "}
          </p>
        </section>
        <section
          className={`${utilStyles.headingMd} p-7 border-2 border-black rounded-xl`}
        >
          <h2 className={utilStyles.headingLg}>Favorites</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
        <div></div>
      </div>
    </Layout>
  );
}
