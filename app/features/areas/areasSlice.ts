// (Caminho provável: @/app/features/areas/areaSlice.ts)

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/app/api/api"; // Ajuste o caminho se necessário

// --- Interfaces ---

/**
 * Interface para os modelos de checkpad
 * (ex: "Mesa", "Barraca")
 */
export interface CheckpadModel {
  id: number;
  icon: string;
  name: string;
}

/**
 * Interface principal da Área
 * (ex: "Bares", "Com mesa e flexivel")
 */
export interface Area {
  id: string; // No seu JSON, o ID é uma string (ex: "32")
  name: string;
  sheetLabel: string;
  description: string;
  maxIdleTime: number;
  serviceModel: string;
  operationType: string;
  checkpadModels: CheckpadModel[]; // Array de modelos
  checkpadQuantity: number;
  sheetLabelPlural: string;
  maxIdleTimeEnabled: number;
  checkpadModelQuantity: number;
  defaultVizualizationList: string;
}

/**
 * Interface para o estado do slice
 */
interface AreasState {
  data: Area[];
  loading: boolean;
  error: string | null;
}

// --- Estado Inicial ---

const initialState: AreasState = {
  data: [],
  loading: false,
  error: null,
};

// --- Thunk Async ---

/**
 * Busca todas as áreas da API
 */
export const fetchAreas = createAsyncThunk("areas/fetchAreas", async () => {
  const response = await api.get("/areas");
  
  // O endpoint "/areas" já retorna o array de áreas diretamente,
  // então não é necessária nenhuma transformação.
  return response.data as Area[];
});

// --- Slice ---

export const areasSlice = createSlice({
  name: "areas",
  initialState,
  reducers: {
    // Aqui você pode adicionar reducers para filtrar ou selecionar uma área
    // ex: setFiltro: (state, action) => { ... }
  },
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
      .addCase(fetchAreas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao buscar áreas";
      });
  },
});

// Exporta os reducers (se houver)
// export const { } = areasSlice.actions;

// Exporta o reducer principal
export default areasSlice.reducer;