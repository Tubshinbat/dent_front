import { Suspense } from "react";
import Loader from "components/Generals/Loader";

export const metadata = {
  title: `Бидний тухай - Гермон Дентал” шүдний эмнэлэг `,
  description: "Бидний тухай - Гермон Дентал” шүдний эмнэлэг",
};

export default function RootLayout({ children }) {
  return (
    <div className="main">
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
}
