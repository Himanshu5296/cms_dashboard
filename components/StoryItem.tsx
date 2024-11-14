import { Episode, Story } from '@/redux/types';
import { useState } from 'react';
import styles from '../styles/StoryItem.module.css';

interface StoryItemProps {
    story: Story;
    onAddEpisode: (storyId: string, episode: Episode) => void;
    onSubmitForReview: (storyId: string) => void;
}

const StoryItem: React.FC<StoryItemProps> = ({ story, onAddEpisode, onSubmitForReview }) => {
    const [episodeName, setEpisodeName] = useState('');
    const [episodeDescription, setEpisodeDescription] = useState('');
    const [episodeNumber, setEpisodeNumber] = useState<number>(1);

    const handleAddEpisode = () => {
        if (episodeName && episodeDescription && episodeNumber > 0) {
            onAddEpisode(story.storyId, {
                episodeId: String(Date.now()),
                episodeName,
                episodeDescription,
                episodeNumber,
                reviewed: false
            });
            setEpisodeName('');
            setEpisodeDescription('');
            setEpisodeNumber(episodeNumber + 1);
        } else {
            alert("Please fill in all episode details.");
        }
    };

    return (
        <div className={styles.storyContainer}>
            <h3 className={styles.storyTitle}>Story Name: {story.storyName}</h3>
            <p className={styles.storyDescription}>Description: {story.storyDescription}</p>

            <div className={styles.episodesContainer}>
                <h2>Episodes</h2>
                {story.episodes.map((episode) => (
                    <div key={episode.episodeId} className={styles.episodeItem}>
                        <strong className={styles.episodeTitle}>
                            {`Episode ${episode.episodeNumber}: ${episode.episodeName}`}
                        </strong>
                        <p>{episode.episodeDescription}</p>
                    </div>
                ))}
            </div>

            <div className={styles.addEpisodeContainer}>
                <h4>Add New Episode</h4>
                <input
                    type="text"
                    placeholder="Episode Name"
                    value={episodeName}
                    onChange={(e) => setEpisodeName(e.target.value)}
                    className={styles.input}
                />
                <textarea
                    placeholder="Episode Description"
                    value={episodeDescription}
                    onChange={(e) => setEpisodeDescription(e.target.value)}
                    className={styles.textarea}
                />
                <input
                    type="number"
                    placeholder="Episode Number"
                    value={episodeNumber}
                    onChange={(e) => setEpisodeNumber(Number(e.target.value))}
                    className={styles.numberInput}
                />
                <button onClick={handleAddEpisode} className={styles.addEpisodeButton}>
                    Add Episode
                </button>
            </div>

            <button
                onClick={() => onSubmitForReview(story.storyId)}
                className={styles.submitButton}
            >
                Submit for Review
            </button>
        </div>
    );
};

export default StoryItem;
