import React, { useEffect, useState, useMemo } from "react";
import "./index.scss";
import { entities } from "../../data/utils";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../store/actions";

const SideNavigation = (props) => {
  const editMode = useSelector((state) => state.editMode);
  const items = useSelector((state) => state.items);
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const params = window.location.pathname;
  const [activeMenu, setActiveMenu] = useState("all");

  const { filterData, editorMode, menuState } = bindActionCreators(
    actions,
    dispatch
  );

  const entitiesItem = useMemo(
    () => [
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
      ...entities,
    ],
    []
  );

  useEffect(() => {
    //eslint-disable-next-line
    entitiesItem.map((entity) => {
      entitiesItem.count = { ...entitiesItem.count, [entity?.name]: 0 };
      if (entity.name !== "all" && entity.name !== "drafts") {
        items.map((item) => {
          return (entitiesItem.count[entity?.name] =
            entitiesItem.count[entity?.name] + item?.d[entity.name]);
        });
      }
    });
    //eslint-disable-next-line
    items.map((draft) => {
      let draftCount = 0;
      //eslint-disable-next-line
      Object.values(draft.d).map((value) => {
        if (value === 0) return draftCount++;
      });
      if (draftCount === entities.length) {
        return (entitiesItem.count["drafts"] =
          entitiesItem.count["drafts"] + 1);
      }
    });
    entitiesItem.count["all"] = items?.length;
  }, [items, entitiesItem]);

  const filterDataHandler = (data) => {
    filterData(data);
    setActiveMenu(data);
    menuState(data);
  };

  useEffect(() => {
    const edit = params.split("/").indexOf("edit");
    if (edit === -1) editorMode(false);
    setActiveMenu(menu);
  }, [params, editorMode, menu]);

  const createNewSlider = () => {
    localStorage.removeItem("react-slider");
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
                      <span className="slider-counter">
                        <span>
                          {entitiesItem?.count?.[it.name] !== 0 &&
                            entitiesItem?.count?.[it.name]}
                        </span>
                      </span>
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
              <div className="crete-slider">Create New</div>
            </Link>
          </div>
        </aside>
        <section className="flex-1 m-5">{props.children}</section>
      </section>
    </main>
  );
};

export default SideNavigation;
