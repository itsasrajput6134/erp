import axios from "axios";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";



// Action Types
const FETCH_CLAIMS_REQUEST = "FETCH_CLAIMS_REQUEST";
const FETCH_CLAIMS_SUCCESS = "FETCH_CLAIMS_SUCCESS";
const FETCH_CLAIMS_FAILURE = "FETCH_CLAIMS_FAILURE";

const ADD_CLAIM_SUCCESS = "ADD_CLAIM_SUCCESS";

const UPDATE_CLAIM_SUCCESS = "UPDATE_CLAIM_SUCCESS";

const DELETE_CLAIM_SUCCESS = "DELETE_CLAIM_SUCCESS";


// Fetch All Claims
export const fetchClaimsRequest = () => {
  return { type: FETCH_CLAIMS_REQUEST };
};

export const fetchClaimsSuccess = (claims) => {
  return { type: FETCH_CLAIMS_SUCCESS, payload: claims };
};

export const fetchClaimsFailure = (error) => {
  return { type: FETCH_CLAIMS_FAILURE, payload: error };
};

export const fetchClaimsRdx = () => {
  return async (dispatch) => {
    dispatch(fetchClaimsRequest());
    try {
      const response = await axios.get(endpoints.getAllClaim, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      dispatch(fetchClaimsSuccess(data));
    } catch (error) {
      dispatch(fetchClaimsFailure(error.message));
    }
  };
};

// Add Claims
export const addClaimSuccess = (claim) => {
  return { type: ADD_CLAIM_SUCCESS, payload: claim };
};

export const addClaimRdx = (newClaim) => {
  return async (dispatch) => {    
    try {
      console.log(endpoints.addClaim);
      newClaim.forEach((value, key) => {
        console.log(key, value);
      });
      const response = await axios.post(endpoints.addClaim, newClaim, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      const data = await response.data;
      dispatch(addClaimSuccess(data));
      toast.success("Claim added successfully!");
    } catch (error) {
      dispatch(fetchClaimsFailure(error.message));
      toast.error("Failed to add Claim.");
    }
  };
};
// Update Claims
export const updateClaimSuccess = (claim) => {
  return { type: UPDATE_CLAIM_SUCCESS, payload: claim };
};

export const updateClaimRdx = (updatedClaim) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${endpoints.updateClaims}/${updatedClaim.claimId}`,
        updatedClaim,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      dispatch(updateClaimSuccess(data));
      dispatch(fetchClaimsRdx());
      toast.success("Claim updated successfully!");
    } catch (error) {
      dispatch(fetchClaimsFailure(error.message));
      toast.error("Failed to update Claim.");
    }
  };
};

// Delete Claim
export const deleteClaimSuccess = (claimId) => {
  return { type: DELETE_CLAIM_SUCCESS, payload: claimId };
};

export const deleteClaimRdx = (claimId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${endpoints.deleteClaims}/${claimId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(deleteClaimSuccess(claimId));
      dispatch(fetchClaimsRdx());
      toast.success("Claims deleted successfully!");
    } catch (error) {
      dispatch(fetchClaimsFailure(error.message));
      toast.error("Failed to delete Claims.");
    }
  };
};