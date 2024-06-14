import { useFetchFeedbackItems } from "../../lib/hooks";
import {
  useFilteredFeedbackItems
} from "../../stores/feedbackItemsStore";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";
import FeedbackItem from "./FeedbackItem";

export default function FeedbackList() {
  const { isLoading, error } = useFetchFeedbackItems();
  const filteredFeedbackItems = useFilteredFeedbackItems();

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}

      {error && <ErrorMessage message={error.message} />}

      {filteredFeedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
