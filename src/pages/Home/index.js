import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../store/actions/index";
import {
  DUPLICATE_DATA,
  DELETE_DATA,
  UPDATE_DATABASE,
} from "../../store/actions/action_types";
import { BiEdit } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./index.scss";
import Modal from "../../components/Modal";

const Home = () => {
  const items = useSelector((state) => state.filterData);
  const dispatch = useDispatch();
  const duplicateID = localStorage.getItem("post--not-modified");

  const [modal, setModal] = useState(false);

  const { publishState, editorMode, duplicateData } = bindActionCreators(
    actions,
    dispatch
  );

  useEffect(() => {
    publishState(false);
    editorMode(false);
  }, [publishState, editorMode]);

  const closeModal = (e) => {
    if (e === DELETE_DATA) {
      const data = [...items];
      const key = sessionStorage.getItem("deleteKey");
      const deleteItem = data.filter((it) => it.id !== key);
      console.log(deleteItem);
    }
    setModal(!modal);
  };

  const editClickHandler = (id, type = null) => {
    if (type === UPDATE_DATABASE) {
      items[id].key = id;
      localStorage.setItem("react-slider", JSON.stringify(items[id]));
      editorMode(true);
    } else if (type === DUPLICATE_DATA) {
      const data = { ...items[id] };
      duplicateData(items, data);
    } else if (type === DELETE_DATA) {
      setModal(!modal);
      sessionStorage.setItem("deleteKey", items[id]?.id);
      console.log(items);
    }
  };

  return (
    <>
      <Modal show={modal} close={closeModal} />
      {Object.entries(items)?.length === 0 ? (
        <div className="empty-state-ui">
          <div>
            <img height="300" src="/assets/empty-state.svg" alt="empty-state" />
          </div>
          <div>
            <h2>There are no items to display.</h2>
          </div>
        </div>
      ) : (
        Object.entries(items)?.map(([key, { i, c, id }]) => (
          <div className="ma-comm-promo-carousel--inner" key={id}>
            {duplicateID && duplicateID === id ? (
              <div className="ma-duplicate-post">NEW DUPLICATE</div>
            ) : (
              ""
            )}
            <div className="ma-comm-promo-carousel--edit">
              <div className="flex">
                <Link to={"/slider/edit/" + id}>
                  <div
                    className="ma-comm-prom-icon-wrapper icon-wrapper--edit"
                    onClick={() => editClickHandler(key, UPDATE_DATABASE)}
                  >
                    <BiEdit />
                  </div>
                </Link>
                <div
                  className="ma-comm-prom-icon-wrapper icon-wrapper--copy"
                  onClick={() => editClickHandler(key, DUPLICATE_DATA)}
                >
                  <MdContentCopy />
                </div>
                <div
                  className="ma-comm-prom-icon-wrapper icon-wrapper--delete"
                  onClick={() => editClickHandler(key, DELETE_DATA)}
                >
                  <RiDeleteBin6Line />
                </div>
              </div>
            </div>

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
        ))
      )}
    </>
  );
};

export default Home;
