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
import { Link, useHistory } from "react-router-dom";
import "./index.scss";
import Modal from "../../components/Modal";

const Home = () => {
  const items = useSelector((state) => state.items);
  const filterItems = useSelector((state) => state.filterData);
  const dispatch = useDispatch();
  const duplicateID = localStorage.getItem("post--not-modified");
  const params = window.location.pathname;
  const history = useHistory();

  const [modal, setModal] = useState(false);

  const { publishState, editorMode, duplicateData, deleteData } =
    bindActionCreators(actions, dispatch);

  useEffect(() => {
    publishState(false);
    editorMode(false);
  }, [publishState, editorMode, params]);

  const closeModal = (e) => {
    if (e === DELETE_DATA) {
      deleteData(items);
    }
    setModal(!modal);
  };

  const editClickHandler = (id, type = null) => {
    if (type === UPDATE_DATABASE) {
      filterItems[id].key = id;
      localStorage.setItem("react-slider", JSON.stringify(filterItems[id]));
      sessionStorage.setItem("edit-id", items[id].id);
      editorMode(true);
    } else if (type === DUPLICATE_DATA) {
      const data = { ...items[id] };
      localStorage.setItem("react-slider", JSON.stringify(filterItems[id]));
      duplicateData(items, data);
      editorMode(true);
      history.push(process.env.REACT_APP_EDIT_SLIDER + filterItems[id]?.id);
    } else if (type === DELETE_DATA) {
      setModal(!modal);
      sessionStorage.setItem("deleteKey", filterItems[id]?.id);
    }
  };

  return (
    <>
      <Modal show={modal} close={closeModal} />
      {Object.entries(filterItems)?.length === 0 ? (
        <div className="empty-state-ui">
          <div>
            <img height="300" src="/assets/empty-state.svg" alt="empty-state" />
          </div>
          <div>
            <h2>There are no items to display.</h2>
          </div>
        </div>
      ) : (
        Object.entries(filterItems)?.map(([key, it]) => (
          <div className="ma-comm-promo-carousel--inner" key={it?.id}>
            {duplicateID && duplicateID === it?.id ? (
              <div className="ma-duplicate-post">NEW DUPLICATE</div>
            ) : (
              ""
            )}
            <div className="ma-comm-promo-carousel--edit">
              <div className="flex">
                <Link to={process.env.REACT_APP_EDIT_SLIDER + it?.id}>
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
                  src={it?.i}
                  alt="communication-banner"
                />
                <div
                  className="ma-comm-promo-carousel--content"
                  dangerouslySetInnerHTML={{ __html: it?.c }}
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
