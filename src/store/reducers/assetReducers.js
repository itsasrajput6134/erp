// src/store/reducers/countryReducer.js
const initialState = {
    assets: [],
    assetLoading: false,
    assetError: null,
  };
  
  export const assetReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_ASSETS_REQUEST":
        return { ...state, assetLoading: true };
      case "FETCH_ASSETS_SUCCESS":
        return { ...state, assetLoading: false, assets: action.payload };
      case "FETCH_ASSETS_FAILURE":
        return { ...state, assetLoading: false, assetError: action.payload };
      case "ADD_ASSET_SUCCESS":
        return { ...state, assets: [...state.assets, action.payload] };
      case "UPDATE_ASSET_SUCCESS":
        return {
          ...state,
          assets: state.assets.map((asset) =>
            asset.assetId === action.payload.assetId
              ? action.payload
              : asset
          ),
        };
      case "DELETE_ASSET_SUCCESS":
        return {
          ...state,
          assets: state.assets.filter(
            (asset) => asset.assetId !== action.payload
          ),
        };
      default:
        return state;
    }
  };
  