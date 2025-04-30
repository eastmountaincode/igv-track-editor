// Define track interface based on the JSON structure
export interface Track {
  name?: string;
  type?: string;
  order?: number;
  format?: string;
  height?: number;
  url?: string;
  indexURL?: string;
  colorBy?: string;
  [key: string]: any; // Allow for other properties
}

// Define IGV session interface
export interface IGVSession {
  reference: any;
  tracks: Track[];
  [key: string]: any; // Allow for other properties
} 