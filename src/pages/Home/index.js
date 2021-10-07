import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { publishState, editorMode } from "../../store/actions/index";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./index.scss";

const Home = () => {
  const items = useSelector((state) => state.filterData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(publishState(false));
  }, [dispatch]);

  const editClickHandler = (id) => {
    items[id].key = id;
    localStorage.setItem("react-slider", JSON.stringify(items[id]));
    dispatch(editorMode(true));
  };

  return (
    <>
      {Object.entries(items).map(([key, { i, c }]) => (
        <div className="ma-comm-promo-carousel--inner" key={key}>
          <Link to={"/slider/edit/" + key}>
            <div
              className="ma-comm-promo-carousel--edit"
              onClick={() => editClickHandler(key)}
            >
              <BiEdit />
            </div>
          </Link>
          <div className="ma-comm-promo-carousel--item">
            <div className="ma-comm-promo-carousel--box">
              <img
                className="ma-comm-promo-carousel--img"
                src={i}
                alt="communication-banner"
              />
              <div
                className="ma-comm-promo-carousel--content"
                dangerouslySetInnerHTML={{ __html: c }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
