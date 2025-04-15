// src/store/reducers/countryReducer.js
const initialState = {
  claims: [],
  claimsLoading: false,
  claimsError: null,
};

export const claimReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CLAIMS_REQUEST":
      return { ...state, claimsLoading: true };
    case "FETCH_CLAIMS_SUCCESS":
      return { ...state, claimsLoading: false, claims: action.payload };
    case "FETCH_CLAIMS_FAILURE":
      return { ...state, claimsLoading: false, claimsError: action.payload };
    case "ADD_CLAIM_SUCCESS":
      return { ...state, claims: [...state.claims, action.payload] };
    case "UPDATE_CLAIM_SUCCESS":
      return {
        ...state,
        claims: state.claims.map((claim) =>
          claim.claimId === action.payload.claimId ? action.payload : claim
        ),
      };
    case "DELETE_CLAIM_SUCCESS":
      return {
        ...state,
        claims: state.claims.filter(
          (claim) => claim.claimId !== action.payload
        ),
      };
    default:
      return state;
  }
};
