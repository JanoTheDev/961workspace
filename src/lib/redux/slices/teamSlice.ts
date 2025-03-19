import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Define types for team members
export interface TeamMember {
  id: string;
  name: string;
  fullName: string;
  role: 'Admin' | 'Finance' | 'Staff';
  brands: string[];
  status: 'Active' | 'Inactive' | 'Pending';
  dateAdded: string; // Format: YYYY-MM-DD
  initial: string;
}

// Define the initial state
interface TeamState {
  members: TeamMember[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamState = {
  members: [],
  loading: false,
  error: null,
}

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    addTeamMember: (state, action: PayloadAction<Omit<TeamMember, 'id'>>) => {
      const newMember = {
        ...action.payload,
        id: Date.now().toString(), 
      };
      state.members.push(newMember);
    },
    
    editTeamMember: (state, action: PayloadAction<TeamMember>) => {
      const index = state.members.findIndex(member => member.id === action.payload.id);
      if (index !== -1) {
        state.members[index] = action.payload;
      }
    },
    
    removeTeamMember: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter(member => member.id !== action.payload);
    },
    
    setTeamMembers: (state, action: PayloadAction<TeamMember[]>) => {
      state.members = action.payload;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
})

// Export actions
export const { 
  addTeamMember, 
  editTeamMember, 
  removeTeamMember, 
  setTeamMembers,
  setLoading,
  setError
} = teamSlice.actions

// Export selectors
export const selectTeamMembers = (state: RootState) => state.team.members
export const selectTeamLoading = (state: RootState) => state.team.loading
export const selectTeamError = (state: RootState) => state.team.error

// Export reducer
export default teamSlice.reducer 