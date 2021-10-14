import React, { useEffect, useState } from "react";
import "./index.scss";
import { entities } from "../../data/utils";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { filterData, editorMode } from "../../store/actions";

const SideNavigation = (props) => {
  const editMode = useSelector((state) => state.editMode);
  const dispatch = useDispatch();

  const params = window.location.pathname.split("/").indexOf("edit");

  const [activeMenu, setActiveMenu] = useState("all");

  const newEntities = [
    {
      id: "b644c3b71c6all",
      title: "All",
      name: "all",
      priority: 0,
    },
    {
      id: "b644c3b71c6draft",
      title: "Drafts",
      name: "drafts",
    },
  ];

  const entitiesItem = [...newEntities, ...entities];

  const filterDataHandler = (data) => {
    dispatch(filterData(data));
    setActiveMenu(data);
  };

  useEffect(() => {
    if (params === -1) dispatch(editorMode(false));
    else setActiveMenu("");
  }, [params, dispatch]);

  const createNewSlider = () => {
    localStorage.removeItem("react-slider");
    setActiveMenu("");
  };

  return (
    <main>
      <section className="flex">
        <aside className="side-drawer flex-1">
          <div className="min-h-screen flex flex-col bg-white overflow-hidden fixed">
            <div className="flex brand-logo items-center justify-center h-20 my-6">
              <img className="w-20" src="/assets/logo.png" alt="brand-logo" />
            </div>
            <ul className="side-drawer-items flex flex-col my-6">
              {entitiesItem
                //eslint-disable-next-line
                ?.sort((x, y) => {
                  if (x?.priority !== 0 && y?.priority !== 0) {
                    return x.name.localeCompare(y.name);
                  }
                })
                ?.map((it) => (
                  <Link
                    onClick={() => filterDataHandler(it.name)}
                    to="/"
                    key={it.id}
                  >
                    <li
                      {...(activeMenu === it.name && {
                        className: "active",
                      })}
                    >
                      {it.title}
                    </li>
                  </Link>
                ))}
            </ul>

            <Link
              className={`create-slider-fab ${
                editMode ? "crete-slider--disabled" : ""
              }`}
              to={process.env.REACT_APP_NEW_SLIDER}
              onClick={createNewSlider}
            >
              <div className="crete-slider">
                Create New{/* <AiFillPlusCircle /> */}
              </div>
            </Link>
          </div>
        </aside>
        <section className="flex-1 m-5">{props.children}</section>
      </section>
    </main>
  );
};

export default SideNavigation;
