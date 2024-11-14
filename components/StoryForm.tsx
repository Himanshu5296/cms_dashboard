import { Story } from '@/redux/types';
import { useState } from 'react';
import styles from '../styles/StoryForm.module.css';

interface StoryFormProps {
    onAddStory: (storyData: Story) => void;
}

const StoryForm: React.FC<StoryFormProps> = ({ onAddStory }) => {
    const [storyName, setStoryName] = useState('');
    const [storyDescription, setStoryDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (storyName && storyDescription) {
            onAddStory({
                storyId: String(Date.now()),
                storyName,
                storyDescription,
                episodes: [],
                submittedForReview: false,
            });
            setStoryName('');
            setStoryDescription('');
        } else {
            alert("Please fill in both the story name and description.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h3 className={styles.formTitle}>Create New Story</h3>
            <div>
                <label className={styles.label}>Story Name:</label>
                <input
                    type="text"
                    value={storyName}
                    onChange={(e) => setStoryName(e.target.value)}
                    className={styles.input}
                />
            </div>
            <div>
                <label className={styles.label}>Story Description:</label>
                <textarea
                    value={storyDescription}
                    onChange={(e) => setStoryDescription(e.target.value)}
                    className={styles.textarea}
                />
            </div>
            <button type="submit" className={styles.button}>Add Story</button>
        </form>
    );
};

export default StoryForm;
