import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/app/api/api";

export interface Area {
  id: number;
  name: string;
  description?: string;
}

interface AreasState {
  data: Area[];
  loading: boolean;
  error: string | null;
}

const initialState: AreasState = {
  data: [],
  loading: false,
  error: null,
};

// Busca todas as áreas da API
export const fetchAreas = createAsyncThunk("areas/fetchAreas", async () => {
  const response = await api.get("/areas");
  return response.data;
});

export const areasSlice = createSlice({
  name: "areas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAreas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchAreas.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao buscar áreas";
      });
  },
});

export default areasSlice.reducer;
