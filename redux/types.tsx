
export interface Episode {
    episodeId: string;
    episodeName: string;
    episodeDescription: string;
    episodeNumber: number;
    reviewed: boolean;
}

export interface Story {
    storyId: string;
    storyName: string;
    storyDescription: string;
    episodes: Episode[];
    submittedForReview: boolean;
}

