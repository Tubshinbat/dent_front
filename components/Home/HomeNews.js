"use client";
import NewsRow from "components/Generals/NewsRow";
import { getNews } from "lib/getFetchers";
import Link from "next/link";
import { useEffect, useState } from "react";

const HomeNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { news } = await getNews(`status=true&limit=3`);
      news && setNews(news);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  return (
    <section className="gray">
      <div className="container">
        <h4 className="seaction-title">
          Зөвлөгөө <span className="yellow-text"> мэдээлэл </span>
        </h4>

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
        <div className="section-more">
          <Link href="/news">
            <button className="section-more-btn">
              Бүх зөвлөгөө, мэдээллийг харах
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeNews;
