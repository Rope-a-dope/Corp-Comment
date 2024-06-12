import {
  useErrorMessage,
  useFilteredFeedbackItems,
  useIsLoading
} from "../../stores/feedbackItemsStore";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";
import FeedbackItem from "./FeedbackItem";

export default function FeedbackList() {
  const isLoading = useIsLoading();
  const errorMessage = useErrorMessage();
  const filteredFeedbackItems = useFilteredFeedbackItems();

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {filteredFeedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
