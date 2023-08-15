import base from "lib/base";
import { getIdNews } from "lib/getFetchers";

export async function generateMetadata({ params }) {
  const { news } = await getIdNews(params.id);
  let title = "Гермон Дентал” шүдний эмнэлэг";

  if (news) {
    title = news.name + " - " + title;
  }

  let openGraph = {
    images:
      news && news.pictures && news.pictures[0] !== ""
        ? `${base.cdnUrl}/${news.pictures[0]}`
        : `${base.baseUrl}/images/breadcrumbs.jpg`,
  };

  return {
    title,
    openGraph,
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
