import { useEffect } from "react";
import { useFeedbackItemActions } from "../stores/feedbackItemsStore";
import HashtagList from "./hashtag/HashtagList";
import Container from "./layout/Container";
import Footer from "./layout/Footer";

function App() {
  const { fetchFeedbackItems } = useFeedbackItemActions();

  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);

  return (
    <div className="app">
      <Footer />

      <Container />

      <HashtagList />
    </div>
  );
}

export default App;