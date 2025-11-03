import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/app/api/api";

export interface Comanda {
  id: number;
  customerName: string | null;
  customerIdentifier?: string | null; 
  mainIdentifier?: string | null;
  identifier?: string | null;
  contact: string | null;
  subtotal: number | null;
  status?: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  idleTime?: number | null;

  author?: {
    id: number;
    name: string;
    type: string; // "seller"
  } | null;


  checkpad?: {
    id: number;
    hash: string;
    model: string;       // Mesa, Barraca, Apartamento
    modelIcon: string;
    identifier: string;  // Número da mesa
  } | null;
}

interface ComandasState {
  data: Comanda[];
  loading: boolean;
  error: string | null;
}

const initialState: ComandasState = {
  data: [],
  loading: false,
  error: null,
};

// Busca todas as comandas da API
export const fetchComandas = createAsyncThunk("comandas/fetchComandas", async () => {
  const response = await api.get("/ordersheets"); // endpoint equivalente ao checkpads
  const data = response.data;

  // supondo estrutura parecida com mesas (primeiro objeto, chaves numéricas)
  const raw = data[0];
  const comandas = Object.keys(raw)
    .filter((key) => !isNaN(Number(key)))
    .map((key) => raw[key]);

  return comandas;
});

// Atualiza uma comanda específica
export const updateComandaApi = createAsyncThunk(
  "comandas/updateComandaApi",
  async ({ id, changes }: { id: number; changes: Partial<Comanda> }) => {
    const response = await api.patch<Comanda>(`/ordersheets/${id}`, changes);
    return response.data;
  }
);

export const comandasSlice = createSlice({
  name: "comandas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComandas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComandas.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchComandas.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao buscar comandas";
      })
      .addCase(updateComandaApi.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.data.findIndex((c) => c.id === updated.id);
        if (index !== -1) {
          state.data[index] = updated;
        }
      });
  },
});

export default comandasSlice.reducer;
