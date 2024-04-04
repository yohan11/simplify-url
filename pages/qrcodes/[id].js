import Head from "next/head";
import QRCodeForm, { QRCodeFormType } from "@/components/QRCodeForm";
import styles from "@/styles/QRCodeEditPage.module.css";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import dbConnect from "@/db/dbConnect";
import QRCode from "@/db/models/QRCode";

export async function getServerSideProps(context) {
  const { id } = context.query;

  await dbConnect();
  const qrcodeItem = await QRCode.findById(id);

  if (qrcodeItem)
    return {
      props: {
        qrcodeItem: JSON.parse(JSON.stringify(qrcodeItem)),
      },
    };
  return {
    notFound: true,
  };
}

export default function QRCodeEditPage({ qrcodeItem }) {
  const router = useRouter();
  const { id } = router.query;

  async function handleSubmit(values) {
    await axios.patch(`/qrcodes/${id}`, values);
    router.push("/qrcodes");
  }

  return (
    <>
      <Head>
        <title>QRCode 수정하기 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>QRCode 수정하기</h1>
        <QRCodeForm
          type={QRCodeFormType.Edit}
          onSubmit={handleSubmit}
          initialValues={qrcodeItem}
        />
      </div>
    </>
  );
}
