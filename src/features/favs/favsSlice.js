import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllFavsApi,
  getFavByIdAPI,
  AddFavAPI,
  updateFavAPI,
  deleteFavAPI,
} from "../../services/favs";

const initialState = {
  favs: [],
  loading: false,
};

export const getAllFavs = createAsyncThunk("favs/getAllFavs", async (token) => {
  const data = await getAllFavsApi(token);
  return data;
});

export const getFavById = createAsyncThunk(
  "favs/getFavById",
  async ({ token, favid }) => {
    const data = await getFavByIdAPI(token, favid);
    return data;
  }
);

export const CreateFav = createAsyncThunk("favs/create", async (favs) => {
  const data = await AddFavAPI(favs);
  return data;
});

export const updateFav = createAsyncThunk("favs/update", async (favs) => {
  const data = await updateFavAPI(favs);
  return data;
});

export const deleteFav = createAsyncThunk(
  "favs/delete",
  async ({ token, favid }) => {
    const data = await deleteFavAPI(token, favid);
    return data;
  }
);

export const FavSlice = createSlice({
  name: "favs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFavs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllFavs.fulfilled, (state, action) => {
        state.loading = false;
        state.favs = action.payload;
      })
      .addCase(CreateFav.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateFav.fulfilled, (state, action) => {
        state.loading = false;
        state.favs = action.payload;
        state.favs.status = action.payload.status;
      })
      .addCase(deleteFav.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFav.fulfilled, (state, action) => {
        state.loading = false;
        state.favs = action.payload;
      })
      .addCase(updateFav.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFav.fulfilled, (state, action) => {
        state.loading = false;
        state.favs = action.payload;
      })
      .addCase(getFavById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFavById.fulfilled, (state, action) => {
        state.loading = false;
        state.favs = action.payload;
      });
  },
});

export const selectFavState = (state) => state.favs;
export const selectFavHttpStatus = (state) => state.favs;
export const selectFavDeleteStatus = (state) => state.favs;
export const selectFavUpdateStatus = (state) => state.favs;
export default FavSlice.reducer;
