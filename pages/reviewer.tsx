import { useSelector, useDispatch } from 'react-redux';
import { addFeedback, markReviewed } from '../redux/ReviewSlice';
import { RootState } from '@/redux/store';
import StoryReviewItem from '@/components/StoryReviewItem';
import styles from '../styles/ReviewerDashboard.module.css';

const ReviewerDashboard = () => {
    const dispatch = useDispatch();
    const review = useSelector((state: RootState) => state.stories.stories);
    console.log(review);

    const handleAddFeedback = (episodeId: string, feedback: string) => {
        dispatch(addFeedback({ episodeId, feedback }));
    };

    const handleMarkReviewed = (episodeId: string) => {
        dispatch(markReviewed(episodeId));
    };

    return (
        <div className={styles.dashboardContainer}>
            <h2 className={styles.title}>Reviewer Dashboard</h2>
            {review
                .filter(review => review.submittedForReview)
                .map(review => (
                    <div key={review.storyId} className={styles.reviewItem}>
                        <StoryReviewItem
                            story={review}
                            onAddFeedback={handleAddFeedback}
                            onMarkReviewed={handleMarkReviewed}
                        />
                    </div>
                ))}
        </div>
    );
};

export default ReviewerDashboard;
