import Head from 'next/head';
export interface IPrimaryLayout {
  title: string;
  children: React.ReactNode;
}

export default function PrimaryLayout({ title, children }: IPrimaryLayout) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {/* Navbar here */}
      <main>{children}</main>
      <div className="m-auto" />
      {/* Footer here */}
    </>
  );
}
