import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import { LoginResponse } from "../interfaces/auth.interface";
import axios, { AxiosError } from "axios";
import { Profile } from "../interfaces/user.interface";
import { RootState } from "./store";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserPersistentState {
  jwt: string | null;
}
export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
  registerErrorMessage?: string;
  profile?: Profile;
}

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          email: params.email,
          password: params.password,
        }
      );
      console.log(data);
      return data.access_token;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (params: {
    email: string;
    password: string;
    name: string;
    avatar: string;
  }) => {
    try {
      axios.post<LoginResponse>("https://api.escuelajs.co/api/v1/users/", {
        email: params.email,
        password: params.password,
        name: params.name,
        avatar: params.avatar,
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const updateUserData = createAsyncThunk<
  Profile,
  {
    email?: string;
    id: string;
    password?: string;
    name?: string;
    avatar?: string;
  },
  { state: RootState }
>("user/updateUserData", async (params, thunkApi) => {
  console.log(params);
  const jwt = thunkApi.getState().user.jwt;
  console.log(jwt);
  const { data } = await axios.put<Profile>(
    `https://api.escuelajs.co/api/v1/users/${params.id}`,
    {
      email: params?.email,
      password: params?.password,
      name: params?.name,
      avatar: params?.avatar,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return data;
});
export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
  "user/getProfile",
  async (_, thunkApi) => {
    const jwt = thunkApi.getState().user.jwt;
    const { data } = await axios.get<Profile>(
      "https://api.escuelajs.co/api/v1/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
      state.profile = undefined;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
    clearRegisterError: (state) => {
      state.registerErrorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });

    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.profile = action.payload;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.registerErrorMessage = action.error.message;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
