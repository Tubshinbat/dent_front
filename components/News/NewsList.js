"use client";
import BlockLoad from "components/Generals/BlockLoad";
import Loader from "components/Generals/Loader";
import NewsRow from "components/Generals/NewsRow";
import NotFound from "components/Generals/Notfound";
import { getNews, getNewsCategories } from "lib/getFetchers";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const NewsList = () => {
  const [newsCategories, setNewsCategories] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginate, setPaginate] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const queryBuild = (name, value, isSame = false) => {
    let query = "?";
    let params = "";
    if (isSame === false) {
      params = createQueryString(name, value);
    } else {
      params = removeQuery(name, value);
    }
    router.push(pathname + query + params);
  };

  const nextPage = async (nPage) => {
    const category = searchParams.get("category");
    const { news } = await getNews(
      `status=true&category=${category}&page=${nPage}`
    );
    setNews((bn) => [...bn, ...news]);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const category = searchParams.get("category");
      const page = searchParams.get("page");

      const { news, pagination } = await getNews(
        `status=true&category=${category}&page=${page}`
      );

      const { newsCategories } = await getNewsCategories();
      setPaginate(pagination);

      setNewsCategories(newsCategories);
      setNews(news);
      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const category = searchParams.get("category");
      const page = searchParams.get("page") || 1;

      const { news, pagination } = await getNews(
        `status=true&category=${category}&page=${page}`
      );
      setPaginate(pagination);
      setNews(news);
      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, [searchParams]);

  if (loading === true && news.length === 0) {
    return <Loader />;
  }

  return (
    <>
      <div className="news-categories">
        <li>
          <Link href="/news"> Бүгд </Link>
        </li>
        {newsCategories &&
          newsCategories.map((cat) => (
            <li>
              <a onClick={() => queryBuild("category", cat.name)}>
                {" "}
                {cat.name}
              </a>
            </li>
          ))}
      </div>
      {loading === false && news.length <= 0 && <NotFound />}

      <div className="row home-news gy-4">
        {news &&
          news.map((el) => (
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-down"
              data-aos-duration={800}
              key={el._id}
            >
              <NewsRow data={el} />
            </div>
          ))}
      </div>
      {loading === true && <BlockLoad />}
      {paginate &&
        paginate.nextPage &&
        paginate.total !== news.length &&
        news.length !== 0 && (
          <div className="pagination">
            <button
              className="more-page"
              onClick={() => nextPage(paginate.nextPage)}
            >
              Дараагийн хуудас
            </button>
          </div>
        )}
    </>
  );
};

export default NewsList;
