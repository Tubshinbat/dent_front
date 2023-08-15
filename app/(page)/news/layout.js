import { Suspense } from "react";
import Loader from "components/Generals/Loader";

export const metadata = {
  title: `Зөвлөгөө, мэдээлэл - Гермон Дентал” шүдний эмнэлэг `,
  description: "Зөвлөгөө, мэдээлэл - Гермон Дентал” шүдний эмнэлэг",
};

export default function RootLayout({ children }) {
  return (
    <div className="main">
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
}
