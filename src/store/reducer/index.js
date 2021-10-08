import * as __ from "../actions/action_types";

const initialState = {
  items: [],
  filterData: [],
  checkBoxEvent: {},
  published: false,
  editMode: false,
};

export const appRootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case __.FETCH_DATA:
      return {
        ...state,
        items: payload,
        filterData: payload,
      };

    case __.PUBLISH_IN_CHECK:
      return {
        ...state,
        checkBoxEvent: {
          ...state.checkBoxEvent,
          [payload.target.name]: payload.target.checked,
        },
      };

    case __.PUSH_DATA_TO_DB:
      return {
        ...state,
        published: payload,
      };

    case __.FILTER_DATA:
      let filter = [];
      Object.entries(state?.items).filter(([key, value]) => {
        const entityLength = Object.values(value?.d).length;
        let items = 0;
        return Object.entries(value?.d).filter(([entKey, entValue]) => {
          if (payload === "all") {
            filter[key] = value;
          } else if (payload === "drafts") {
            if (!entValue) items++;
            if (entityLength === items) filter[key] = value;
          } else if (entKey === payload && entValue === 1) {
            filter[key] = value;
          }
          return filter;
        });
      });
      return {
        ...state,
        filterData: filter,
        editMode: false,
      };

    case __.DATA_PUBLISHED: {
      return {
        ...state,
        filterData: payload.items,
        published: payload.status,
      };
    }

    case __.EDIT_MODE:
      const checkboxState = JSON.parse(localStorage.getItem("react-slider"));

      return {
        ...state,
        editMode: payload.editMode,
        checkBoxEvent: checkboxState?.d,
      };

    case __.UPDATE_DATABASE:
      return {
        ...state,
        filterData: payload.items,
        published: payload.status,
        editMode: false,
      };

    default:
      return state;
  }
};
