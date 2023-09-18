import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";

const initialState = {
  shachrit: [],
  mincha: [],
  maariv: [],
  shuls: [],
};

// Create firestore query for fetching shuls
export const fetchShuls = createAsyncThunk("minyan/fetchShuls", async () => {
  const querySnapshot = await firestore().collection("shuls").get();
  const shulsData = [];

  querySnapshot.forEach((documentSnapshot) => {
    const data = documentSnapshot.data();
    shulsData.push({
      id: documentSnapshot.id,
      name: data.name,
      location: data.location,
      zip: data.zip,
    });
  });

  return shulsData;
});

export const minyanSlice = createSlice({
  name: "minyan",
  initialState: initialState,
  reducers: {
    addShachrit: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShuls.fulfilled, (state, action) => {
      // Ensure only unique shuls are added
      action.payload.forEach((newShul) => {
        if (!state.shuls.some((shul) => shul.id === newShul.id)) {
          state.shuls.push(newShul);
        }
      });
    });
  },
});

export const selectShachrit = (state) => state.minyan.shachrit;
export const selectMincha = (state) => state.minyan.mincha;
export const selectMaariv = (state) => state.minyan.maariv;
export const selectShuls = (state) => state.minyan.shuls;

export const { addShachrit } = minyanSlice.actions;

export default minyanSlice.reducer;
