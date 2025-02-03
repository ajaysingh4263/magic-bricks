import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Project {
    name: string;
    location: string;
    price: string;
    image: string;
    link: string;
}

interface ProjectState {
    projects: Project[];
}

const initialState: ProjectState = {
    projects: [],
};

export const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<Project[]>) => {
            state.projects = action.payload;
        },
    },
});

export const { setProjects } = projectSlice.actions;
export default projectSlice.reducer;
