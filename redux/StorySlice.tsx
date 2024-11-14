import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Episode = {
    episodeId: string;
    episodeName: string;
    episodeDescription: string;
    episodeNumber: number;
    reviewed: boolean;
};

type Story = {
    storyId: string;
    storyName: string;
    storyDescription: string;
    episodes: Episode[];
    submittedForReview: boolean;
};

interface StoryState {
    stories: Story[];
}

const initialState: StoryState = { stories: [] };

const storySlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {
        addStory: (state, action: PayloadAction<Story>) => {
            state.stories.push(action.payload);
        },
        addEpisode: (state, action: PayloadAction<{ storyId: string; episode: Episode }>) => {
            const story = state.stories.find(s => s.storyId === action.payload.storyId);
            if (story) story.episodes.push(action.payload.episode);
        },
        submitForReview: (state, action: PayloadAction<string>) => {
            const story = state.stories.find(s => s.storyId === action.payload);
            if (story) story.submittedForReview = true;
        },
    },
});

export const { addStory, addEpisode, submitForReview } = storySlice.actions;
export default storySlice.reducer;
