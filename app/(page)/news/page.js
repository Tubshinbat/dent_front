import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewsList from "components/News/NewsList";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="page_breadcrumbs">
        <div className="container">
          <div className="breads">
            <div className="bread-list">
              <li>
                <Link href="/">
                  <FontAwesomeIcon icon={faHouse} />
                </Link>
              </li>
              <span> / </span>
              <li> Зөвлөгөө, мэдээлэл </li>
            </div>
            <h4>Зөвлөгөө, мэдээлэл</h4>
          </div>
        </div>
      </div>
      <section>
        <div className="container">
          <div className="row">
            <NewsList />
          </div>
        </div>
      </section>
    </>
  );
}
