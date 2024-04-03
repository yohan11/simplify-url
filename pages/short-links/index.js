import Head from 'next/head';
import ShortLinkList from '@/components/ShortLinkList';
import Button from '@/components/Button';
import Link from '@/components/Link';
import styles from '@/styles/ShortLinkListPage.module.css';
import dbConnect from "@/db/dbConnect";
import ShortLink from "@/db/models/ShortLink";

export async function getServerSideProps(){
  await dbConnect();
  const shortLinks = await ShortLink.find();

  return{
    props:{
      shortLinks: JSON.parse(JSON.stringify(shortLinks)), // 기본적으로 mongoose에서 내려주는건 QUery 형이기 때문에 JSON 형태로 변환해주어야 한다.
    }
  }
}
export default function ShortLinkListPage({shortLinks}) {

  return (
    <>
      <Head>
        <title>주소 줄이기 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>주소 줄이기</h1>
          <Button as={Link} href="/short-links/new">
            새로 만들기
          </Button>
        </header>
        <ShortLinkList items={shortLinks} />
      </div>
    </>
  );
}
