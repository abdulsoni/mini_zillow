import api from "./api";
import { Property, PropertyListResponse, RatePropertyResponse, ToggleBookmarkResponse, UpdatePropertyResponse } from "../types/property";

// Get all properties
export const getAllProperties = () => api.get<PropertyListResponse>("/properties");

// Get property by ID
export const getPropertyById = (id: string) => api.get<Property>(`/properties/${id}`);

// Create property with FormData
export const createProperty = (data: FormData) => {
  return api.post<Property>("/properties", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Delete property
export const deleteProperty = (id: string) => api.delete<{ message: string }>(`/properties/${id}`);

export const toggleBookmark = (id: string) =>
  api.post<ToggleBookmarkResponse>(`/properties/${id}/bookmark`);

export const rateProperty = (
  id: string,
  value: number
) => {
  return api.post<RatePropertyResponse>(`/properties/${id}/rate`, { value });
};

export const updateProperty = (id: string, data: FormData) =>
  api.put<UpdatePropertyResponse>(`/properties/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
