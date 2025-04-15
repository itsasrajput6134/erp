import axios from "axios";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";

// Action Types
const FETCH_ASSETS_REQUEST = "FETCH_ASSETS_REQUEST";
const FETCH_ASSETS_SUCCESS = "FETCH_ASSETS_SUCCESS";
const FETCH_ASSETS_FAILURE = "FETCH_ASSETS_FAILURE";

const ADD_ASSET_SUCCESS = "ADD_ASSET_SUCCESS";

const UPDATE_ASSET_SUCCESS = "UPDATE_ASSET_SUCCESS";

const DELETE_ASSET_SUCCESS = "DELETE_ASSET_SUCCESS";

// Fetch Countries
export const fetchAssetsRequest = () => {
  return { type: FETCH_ASSETS_REQUEST };
};

export const fetchAssetsSuccess = (assets) => {
  return { type: FETCH_ASSETS_SUCCESS, payload: assets };
};

export const fetchAssetsFailure = (error) => {
  return { type: FETCH_ASSETS_FAILURE, payload: error };
};

export const fetchAssetsRdx = () => {
  return async (dispatch) => {
    dispatch(fetchAssetsRequest());
    try {
      const response = await axios.get(endpoints.getAllAssets, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      dispatch(fetchAssetsSuccess(data));
    } catch (error) {
      dispatch(fetchAssetsFailure(error.message));
    }
  };
};

// Add Country

export const addAssetSuccess = (Asset) => {
  return { type: ADD_ASSET_SUCCESS, payload: Asset };
};

export const addAssetRdx = (newAsset) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoints.addAssets, newAsset, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = response.data;
      dispatch(addAssetSuccess(data));
      dispatch(fetchAssetsRdx());
      toast.success("Asset added successfully!");
    } catch (error) {
      dispatch(fetchAssetsFailure(error.message));
      toast.error("Failed to add Asset.");
    }
  };
};

// Update Country

export const updateAssetSuccess = (Asset) => {
  return { type: UPDATE_ASSET_SUCCESS, payload: Asset };
};

export const updateAssetRdx = (updatedAsset) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${endpoints.updateAssets}/${updatedAsset.assetId}`,
        updatedAsset,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      dispatch(updateAssetSuccess(data));
      dispatch(fetchAssetsRdx());
      toast.success("Asset updated successfully!");
    } catch (error) {
      dispatch(fetchAssetsFailure(error.message));
      toast.error("Failed to update Asset.");
    }
  };
};

//Delete Asset
export const deleteAssetSuccess = (AssetId) => {
  return { type: DELETE_ASSET_SUCCESS, payload: AssetId };
};

export const deleteAssetRdx = (AssetId) => {
    console.log(AssetId);
  return async (dispatch) => {
    try {
      await axios.delete(`${endpoints.deleteAssets}/${AssetId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(deleteAssetSuccess(AssetId));
      dispatch(fetchAssetsRdx());
      toast.success("Asset deleted successfully!");
    } catch (error) {
      dispatch(fetchAssetsFailure(error.message));
      toast.error("Failed to delete Asset.");
    }
  };
};
