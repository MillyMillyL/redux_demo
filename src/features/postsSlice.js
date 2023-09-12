import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
  "https://jsonplaceholder.typicode.com/posts",
  // Declare the type your function argument here:
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    // Inferred return type: Promise<MyData>
    return await response.json();
  }
);

const initialState = {
  data: [],
  status: "idle",
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      console.log(action);
      state.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getPosts.pending, (state, action) => {
        // Add user to the state array
        state.status = "pending";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        // Add user to the state array
        console.log(action);
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        // Add user to the state array
        state.status = "rejected";
      });
  },
});

// Action creators are generated for each case reducer function
export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;
