import Head from "next/head";
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
    <div>
      <Head>
        <title>BloatCare</title>
      </Head>
      <div className="flex flex-row justify-around mt-0 p-10">
        <section>
          <h1 className="text-6xl leading-normal text-blue-800 font-bold p-0 ml-10">
            A website that has blogs in it
          </h1>
          <p className="text-3xl text-black m-10">
            {`A very "never thought of before" idea right?`}{" "}
          </p>
        </section>
        <section className="p-7 border-2 border-black rounded-xl">
          <h2>Favorites</h2>
          <ul>
            {allPostsData.map(({ id, date, title }) => (
              <li key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
