import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface State {
  currentUser: string;
  loading: boolean;
  err: {};
}
const userSlice: any = createSlice({
  name: "user",
  initialState: {
    currentUser: "",
    loading: false,
    err: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerRedux.pending, (state: State) => {
        state.loading = true;
      })
      .addCase(registerRedux.fulfilled, (state: State, action) => {
        state.loading = false;
        console.log(action.payload);
        state.currentUser = action.payload;
      })
      .addCase(registerRedux.rejected, (state: State,action) => {
        state.loading = false;
        state.err = action.error
      });
  },
});

export const registerRedux = createAsyncThunk(
  "auth/register",
  async ({
    userName,
    passwordUser,
    passwordConfirm,
  }: {
    userName: string;
    passwordUser: string;
    passwordConfirm: string;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/register",
        {
          userName,
          passwordUser,
          passwordConfirm,
        }
      );
      return response.data;
    } catch (error:any) {
      throw new Error(error)
    }
  }
);
export default userSlice.reducer;

//   if (response.data.status === 409) {
//     notification.error({
//       message: "Tên đăng nhập đã được đăng ký!",
//       placement: "top",
//       duration: 2,
//     });
//     return "";
//   }
// if (response.data.message === "passworDincorrect") {
//     notification.error({
//       message: "Mật khẩu không khớp!",
//       placement: "top",
//       duration: 2,
//     });
//     return "";
//   }
// if (response.data.status === "Success") {
//   notification.success({
//     message: "Đăng ký thành công!",
//     placement: "top",
//     duration: 2,
//   });
//   console.log("first")
//   return ""
// }
