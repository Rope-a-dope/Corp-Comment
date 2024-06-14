import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useFeedbackItemActions } from "../stores/feedbackItemsStore";

const fetchFeedbackItems = async () => {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.feedbacks;
};

export const useFetchFeedbackItems = () => {
  const { setFeedbackItems } = useFeedbackItemActions();

  const { data, isLoading, error } = useQuery({
    queryKey: ["feedbackItems"],
    queryFn: fetchFeedbackItems,
  });

  useEffect(() => {
    setFeedbackItems(data || []);
  }, [data, setFeedbackItems]);
  return { isLoading, error };
};
