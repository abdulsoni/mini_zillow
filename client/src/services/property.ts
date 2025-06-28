import api from "./api";
import { Property } from "../types/property";

// Get all properties
export const getAllProperties = () => api.get<Property[]>("/properties");

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
