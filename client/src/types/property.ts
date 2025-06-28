// src/types/property.ts
export interface Property {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  images:string;
  location: string;
  createdAt?: string;
  updatedAt?: string;
}
