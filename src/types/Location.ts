export interface Hotspot {
  id: string;
  position: [number, number, number];
  title: string;
  description: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  hotspots: Hotspot[];
  nextLocationId?: string;
}