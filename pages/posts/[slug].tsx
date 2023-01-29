import styles from "@/styles/Home.module.css";

export const config = {
  runtime: "experimental-edge",
  region: ["iad1"],
};

interface IStaticProps {
  params: {
    slug: string;
  };
  locales?: string;
  locale?: string;
  defaultLocale?: string;
}

export async function getStaticProps({ params }: IStaticProps) {
  const url = `${process.env.CONTENTFUL_BASES_URL}${process.env.SPACE_ID}/environments/${process.env.ENV_ID}/entries?access_token=${process.env.ACCESS_TOKEN}`;
  const res = await fetch(url);
  const posts = await res.json();
  const post = posts.items.find((post: { fields: { slug: string } }) =>
    post.fields.slug.match(params.slug)
  );

  if (!post) return { notFound: true };

  return {
    props: { post },
  };
}

export async function getStaticPaths() {
  const url = `${process.env.CONTENTFUL_BASES_URL}${process.env.SPACE_ID}/environments/${process.env.ENV_ID}/entries?access_token=${process.env.ACCESS_TOKEN}`;
  const res = await fetch(url);
  const posts = await res.json();

  const paths = posts.items.map((post: any) => ({
    params: { slug: post.fields.slug },
  }));

  return { paths, fallback: "blocking" };
}

export default function Post({ post }: any) {
  return (
    <main className={styles.main}>
      <h1>{post.fields.title}</h1>
      <p>{post.fields.author}</p>
    </main>
  );
}
