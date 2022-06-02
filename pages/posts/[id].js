import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
    return (
    //   <Layout>
    //     {postData.title}
    //     <br />
    //     {postData.id}
    //     <br />
    //     {postData.date}
    //   </Layout>
    <Layout>
      <Head>
      {postData.title}
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
      <Date dateString={postData.date}/>
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
    );
  }
// export default function Post() {
//   return <Layout>...</Layout>;
// }
// import { getAllPostIds } from '../../lib/posts';

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