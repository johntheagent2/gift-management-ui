import { createAsyncThunk } from "@reduxjs/toolkit";
import { useHistory, Redirect } from "react-router-dom";
import apiClient from "../../utils/api";
import { addLoading, removeLoading } from "./loadingSlice";
import { redirectAccessForbidden } from "./commonSlice";

const customCreateAsyncThunk = {};
const formatUrl = (url, additionalData) => {
  if (!additionalData) return url;
  let finalUrl = url;
  if (additionalData.pathVariables) {
    Object.keys(additionalData.pathVariables).forEach((key) => {
      if (
        additionalData.pathVariables[key] !== null &&
        additionalData.pathVariables[key] !== undefined
      ) {
        finalUrl = finalUrl.replace(key, additionalData.pathVariables[key]);
      }
    });
  }
  if (additionalData.params) {
    const keys = Object.keys(additionalData.params);
    let addedFirstParam = false;
    for (let i = 0; i < keys.length; i++) {
      if (
        additionalData.params[keys[i]] !== null &&
        additionalData.params[keys[i]] !== undefined
      ) {
        finalUrl += `${!addedFirstParam ? "?" : "&"}${
          keys[i]
        }=${encodeURIComponent(additionalData.params[keys[i]])}`;
        if (!addedFirstParam) {
          addedFirstParam = true;
        }
      }
    }
  }
  return finalUrl;
};

customCreateAsyncThunk.createAsyncThunkWithLoading = (type, method, url) =>
  createAsyncThunk(type, async (additionalData, thunkAPI) => {
    const finalUrl = formatUrl(url, additionalData);

    if (!additionalData?.hideLoading) thunkAPI.dispatch(addLoading());
    let response;
    const header = additionalData?.isFormData
      ? apiClient.headerFormData()
      : null;
    switch (method) {
      case "GET":
        response = await apiClient.getMethod(finalUrl);
        break;
      case "POST":
        response = await apiClient.postMethod(
          finalUrl,
          additionalData?.body || {},
          header
        );
        break;
      case "PATCH":
        response = await apiClient.patchMethod(
          finalUrl,
          additionalData?.body || {},
          header
        );
        break;
      case "PUT":
        response = await apiClient.putMethod(
          finalUrl,
          additionalData?.body || {},
          header
        );
        break;
      case "DELETE":
        response = await apiClient.deleteMethod(
          finalUrl,
          additionalData?.body || {},
          header
        );
        break;
      default:
        if (!additionalData?.hideLoading) thunkAPI.dispatch(removeLoading());
        throw new Error("Unknown method.");
    }
    if (response.status === 403) {
      thunkAPI.dispatch(redirectAccessForbidden());
    }
    if (response.status === 401 && type !== "auth/login") {
      const { auth } = thunkAPI.getState();
      if (!additionalData?.hideLoading) thunkAPI.dispatch(removeLoading());
      throw new Error("Unauthorized");
    }
    if (response.status !== 200 && response.status !== 204) {
      if (!additionalData?.hideLoading) thunkAPI.dispatch(removeLoading());
      if (additionalData && additionalData.id) {
        return thunkAPI.rejectWithValue({
          id: additionalData.id,
          response: response.data,
        });
      }
      return thunkAPI.rejectWithValue(response.data);
    }
    if (!additionalData?.hideLoading) thunkAPI.dispatch(removeLoading());
    if (additionalData && additionalData.id) {
      return {
        id: additionalData.id,
        response: response.data,
      };
    }
    return response.data;
  });

const buildSearchUrl = (url, filter) => {
  if (!filter) return url;
  let searchUrl = url;
  const keys = Object.keys(filter);
  let addedFirstParam = false;
  for (let i = 0; i < keys.length; i++) {
    if (filter[keys[i]] !== null && filter[keys[i]] !== undefined) {
      searchUrl += `${!addedFirstParam ? "?" : "&"}${
        keys[i]
      }=${encodeURIComponent(filter[keys[i]])}`;
      if (!addedFirstParam) {
        addedFirstParam = true;
      }
    }
  }
  return searchUrl;
};
export default customCreateAsyncThunk;
