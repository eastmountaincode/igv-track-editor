import { atom } from 'jotai';
import { IGVSession } from './types';

// The main session atom that stores the IGV session data
export const sessionAtom = atom<IGVSession | null>(null);

// Atom to store information about the file
export interface FileInfo {
  name: string;
  originalName: string;  // Original name from upload
}

export const fileInfoAtom = atom<FileInfo | null>(null);

// Helper atoms for derived state
export const hasSessionAtom = atom((get) => get(sessionAtom) !== null);

// Atom to store the number of tracks
export const trackCountAtom = atom((get) => {
  const session = get(sessionAtom);
  return session?.tracks?.length || 0;
});

// Atom to track which track types have been modified and should shimmer
export const shimmerTrackTypesAtom = atom<string[]>([]);

// Atom to track which track types are currently selected in the editor
export const selectedTrackTypesAtom = atom<string[]>([]); 