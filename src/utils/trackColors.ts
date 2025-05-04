// Track type color palette
// This defines background and text colors for track type badges

export interface TrackTypeColors {
  background: string;
  text: string;
}

// Map of track types to their colors (using the former dark mode colors)
export const TRACK_TYPE_COLORS: Record<string, TrackTypeColors> = {
  // Primary track types
  alignment: {
    background: '#111936',
    text: '#4FC3F7',
  },
  annotation: {
    background: '#271506',
    text: '#FFA726',
  },
  sequence: {
    background: '#0E2018',
    text: '#4CAF50',
  },
  
  // Other common track types
  wig: {
    background: '#2A142C',
    text: '#E040FB',
  },
  variant: {
    background: '#1B1124',
    text: '#B388FF',
  },
  
  // Fallback for unknown types
  default: {
    background: '#333333',
    text: '#BBBBBB',
  }
};

/**
 * Get colors for a track type
 * @param trackType - The track type
 * @returns Object with background and text colors
 */
export function getTrackTypeColors(trackType: string | undefined): TrackTypeColors {
  if (!trackType) return TRACK_TYPE_COLORS.default;
  
  return TRACK_TYPE_COLORS[trackType.toLowerCase()] || TRACK_TYPE_COLORS.default;
} 