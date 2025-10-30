import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/app/api/api";

export interface Mesa {
  id: number;
  model: string;
  activity: string;
  hasOrder: number;
  idleTime: number | null;
  subtotal: number | null;
  authorName: string | null;
  identifier: string;
  modelIcon: string;
  customerIdentifier: string | null;
  numberOfCustomers: string | null;
}

interface MesasState {
  data: Mesa[];
  filtro: string;
  loading: boolean;
  error: string | null;
}

const initialState: MesasState = {
  data: [],
  filtro: "all",
  loading: false,
  error: null,
};

export const fetchMesas = createAsyncThunk("mesas/fetchMesas", async () => {
  const response = await api.get("/checkpads");
  const data = response.data;

  const mesasRaw = data[0];

  const mesas = Object.keys(mesasRaw)
  .filter((key) => key !== "id" && key !== "activity")
  .map((key) => mesasRaw[key]);

  return mesas;
});

export const updateMesaApi = createAsyncThunk(
  "mesas/updateMesaApi",
  async ({ id, changes }: { id: number; changes: Partial<Mesa> }) => {
    const response = await api.patch<Mesa>(`/checkpads/${id}`, changes);
    return response.data;
  }
);

export const mesasSlice = createSlice({
  name: "mesas",
  initialState,
  reducers: {
    setFiltro: (state, action: PayloadAction<string>) => {
      state.filtro = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Quando começa a carregar
      .addCase(fetchMesas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Quando termina com sucesso
      .addCase(fetchMesas.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      // Quando dá erro
      .addCase(fetchMesas.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao buscar mesas";
      })
      // Quando uma mesa é atualizada com sucesso
      .addCase(updateMesaApi.fulfilled, (state, action) => {
        const updatedMesa = action.payload;
        const index = state.data.findIndex((m) => m.id === updatedMesa.id);
        if (index !== -1) {
          state.data[index] = updatedMesa;
        }
      });
  },
});

export const { setFiltro } = mesasSlice.actions;
export default mesasSlice.reducer;
