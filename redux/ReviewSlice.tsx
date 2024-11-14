import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Review {
    episodeId: string;
    feedback: string[];
    reviewed: boolean;
}

interface ReviewState {
    reviews: Record<string, Review>;
}

const initialState: ReviewState = { reviews: {} };

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        addFeedback: (state, action: PayloadAction<{ episodeId: string; feedback: string }>) => {
            const review = state.reviews[action.payload.episodeId] || { feedback: [], reviewed: false };
            review.feedback.push(action.payload.feedback);
            state.reviews[action.payload.episodeId] = review;
        },
        markReviewed: (state, action: PayloadAction<string>) => {
            if (state.reviews[action.payload]) state.reviews[action.payload].reviewed = true;
        },
    },
});

export const { addFeedback, markReviewed } = reviewSlice.actions;
export default reviewSlice.reducer;
