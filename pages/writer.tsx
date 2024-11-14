import { useSelector, useDispatch } from 'react-redux';
import { addStory, addEpisode, submitForReview } from '../redux/StorySlice';
import StoryForm from '@/components/StoryForm';
import StoryItem from '@/components/StoryItem';
import { RootState } from '@/redux/store';
import { Episode, Story } from '@/redux/types';
import styles from '@/styles/WriterDashboard.module.css';

const WriterDashboard: React.FC = () => {
    const dispatch = useDispatch();
    const stories = useSelector((state: RootState) => state.stories.stories);

    const handleAddStory = (story: Story) => {
        dispatch(addStory(story));
    };

    const handleAddEpisode = (storyId: string, episode: Episode) => {
        dispatch(addEpisode({ storyId, episode }));
    };

    const handleSubmitForReview = (storyId: string) => {
        dispatch(submitForReview(storyId));
    };

    return (
        <div className={styles.dashboard}>
            <h2 className={styles.title}>Writer Dashboard</h2>
            <StoryForm onAddStory={handleAddStory} />
            <div className={styles.storiesContainer}>
                {stories.map((story) => (
                    <StoryItem
                        key={story.storyId}
                        story={story}
                        onAddEpisode={handleAddEpisode}
                        onSubmitForReview={handleSubmitForReview}
                    />
                ))}
            </div>
        </div>
    );
};

export default WriterDashboard;
