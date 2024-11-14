import React, { useState } from 'react';
import { Episode, Story } from '../redux/types';
import styles from '../styles/StoryReviewItem.module.css';

interface StoryReviewItemProps {
    story: Story;
    onAddFeedback: (storyId: string, episodeId: string, feedback: string) => void;
    onMarkReviewed: (storyId: string, episodeId: string) => void;
}

const StoryReviewItem: React.FC<StoryReviewItemProps> = ({ story, onAddFeedback, onMarkReviewed }) => {
    const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

    const handleFeedbackChange = (episodeId: string, feedbackText: string) => {
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [episodeId]: feedbackText,
        }));
    };

    const handleFeedbackSubmit = (episodeId: string) => {
        const feedbackText = feedback[episodeId];
        if (feedbackText) {
            onAddFeedback(story.storyId, episodeId, feedbackText);
            setFeedback((prevFeedback) => ({
                ...prevFeedback,
                [episodeId]: '',
            }));
        }
    };

    const handleMarkReviewed = (episodeId: string) => {
        onMarkReviewed(story.storyId, episodeId);
    };

    return (
        <div className={styles.storyReviewItem}>
            <h3 className={styles.storyTitle}>Story Name: {story.storyName}</h3>
            <p className={styles.storyDescription}>Story Description: {story.storyDescription}</p>
            <div className={styles.episodeList}>
                {story.episodes.map((episode) => (
                    <div key={episode.episodeId} className={styles.episodeItem}>
                        <h4 className={styles.episodeTitle}>
                            Episode {episode.episodeNumber}: {episode.episodeName}
                        </h4>
                        <p className={styles.episodeDescription}>Description: {episode.episodeDescription}</p>

                        <textarea
                            placeholder="Enter feedback"
                            className={styles.feedbackTextarea}
                            value={feedback[episode.episodeId] || ''}
                            onChange={(e) => handleFeedbackChange(episode.episodeId, e.target.value)}
                        />

                        <button
                            onClick={() => handleFeedbackSubmit(episode.episodeId)}
                            className={styles.button}
                        >
                            Submit Feedback
                        </button>
                        <button
                            onClick={() => handleMarkReviewed(episode.episodeId)}
                            className={`${styles.button} ${episode.reviewed ? styles.reviewedButton : ''}`}
                            disabled={episode.reviewed}
                        >
                            {episode.reviewed ? "Reviewed" : "Mark as Reviewed"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoryReviewItem;
