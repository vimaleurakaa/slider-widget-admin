import React, { useEffect } from "react";
import "./index.scss";
import { entities } from "../../data/utils";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { filterData, editorMode } from "../../store/actions";

const SideNavigation = (props) => {
  //const state = useSelector((state) => state.filterData);
  const editMode = useSelector((state) => state.editMode);

  const dispatch = useDispatch();
  const params = window.location.pathname.split("/").indexOf("edit");

  const filterDataHandler = (data) => {
    dispatch(filterData(data));
  };

  useEffect(() => {
    if (params === -1) dispatch(editorMode(false));
  }, [params, dispatch]);

  const createNewSlider = () => {
    localStorage.removeItem("react-slider");
  };

  return (
    <main>
      <section className="flex">
        <aside className="side-drawer flex-1">
          <div className="min-h-screen flex flex-col bg-white overflow-hidden">
            <div className="flex brand-logo items-center justify-center h-20 my-6">
              <img className="w-20" src="/assets/logo.png" alt="brand-logo" />
            </div>
            <ul className="side-drawer-items flex flex-col my-6">
              <Link
                className={editMode ? "slider-btn--disabled" : ""}
                to={process.env.REACT_APP_NEW_SLIDER}
                onClick={createNewSlider}
              >
                <li className="crete-slider btn btn--primary">+ Create</li>
              </Link>

              <Link to="/" onClick={() => filterDataHandler("all")}>
                <li>All</li>
              </Link>
              {entities.map((it) => (
                <Link
                  onClick={() => filterDataHandler(it.name)}
                  to="/"
                  key={it.id}
                >
                  <li>{it.title}</li>
                </Link>
              ))}
              <Link to="/" onClick={() => filterDataHandler("drafts")}>
                <li>Drafts</li>
              </Link>
            </ul>
          </div>
        </aside>
        <section className="flex-1 m-5">{props.children}</section>
      </section>
    </main>
  );
};

export default SideNavigation;
