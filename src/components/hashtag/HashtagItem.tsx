import { useFeedbackItemActions } from "../../stores/feedbackItemsStore";

type HashtagItemProps = {
  company: string;
};

export default function HashtagItem({
  company,
}: HashtagItemProps) {
  const { selectCompany } = useFeedbackItemActions(); 
  return (
    <li key={company}>
      <button onClick={() => selectCompany(company)}>#{company}</button>
    </li>
  );
}