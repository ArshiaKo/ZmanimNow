import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";

const initialState = {
  shuls: [],
  minyanim: [],
};

// Firestory Query
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

export const fetchMinyanim = createAsyncThunk("minyan/fetchMinyanim", async () => {
  const querySnapshot = await firestore().collection("minyans").get();
  const minyanimData = [];

  querySnapshot.forEach((documentSnapshot) => {
    const data = documentSnapshot.data();
    const milliseconds = data.time.seconds * 1000 + data.time.nanoseconds / 1e6;
    const minyanTime = new Date(milliseconds);
    minyanimData.push({
      id: documentSnapshot.id,
      // Gets Shul ID as string or you get error: circular reference in serialization
      shulId: data.shul._documentPath._parts[1],
      type: data.type,
      datetime: minyanTime,
    });
  });

  return minyanimData;
});

export const minyanSlice = createSlice({
  name: "minyan",
  initialState: initialState,
  reducers: {
    addShachrit: (state, action) => {},
    reset: () => initialState,
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
    builder.addCase(fetchMinyanim.fulfilled, (state, action) => {
      action.payload.forEach((newMinyan) => {
        if (!state.minyanim.some((minyan) => minyan.id === newMinyan.id)) {
          state.minyanim.push(newMinyan);
        }
      });
    });
  },
});

export const selectShuls = (state) => state.minyan.shuls;
export const selectMinyanim = (state) => state.minyan.minyanim;

export const { addShachrit, reset } = minyanSlice.actions;

export default minyanSlice.reducer;
