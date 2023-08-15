import base from "lib/base";
import { getService } from "lib/getFetchers";

export async function generateMetadata({ params }) {
  const { service } = await getService(params.id);
  let title = "Гермон Дентал” шүдний эмнэлэг";

  if (service) {
    title = service.name + " - " + title;
  }

  let openGraph = {
    images:
      service && service.pictures && service.pictures[1] !== ""
        ? `${base.cdnUrl}/${service.pictures[1]}`
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
