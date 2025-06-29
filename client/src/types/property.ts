// src/types/property.ts
export interface Property {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  images:string;
  ratings?: {
    user: string;
    value: number;
    _id?: string;
  }[];
  location: string;
  averageRating?: number;
  totalRatings?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PropertyListResponse {
  properties: Property[];
  userBookmarks: string[];
}
export interface ToggleBookmarkResponse {
  bookmarks: string[];
}

export interface RatePropertyResponse {
  property: Property;
}

export interface UpdatePropertyResponse {
  property: Property;
}