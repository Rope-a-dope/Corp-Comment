import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";

type Store = {
  feedbackItems: TFeedbackItem[];
  selectedCompany: string;
  actions: {
    getCompanyList: () => string[];
    getFilteredFeedbackItems: () => TFeedbackItem[];
    addItemToList: (text: string) => Promise<void>;
    selectCompany: (company: string) => void;
    setFeedbackItems: (feedbackItems: TFeedbackItem[]) => void;
  };
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  selectedCompany: "",
  actions: {
    getCompanyList: () => {
      const state = get();
      return state.feedbackItems
        .map((item) => item.company)
        .filter((company, index, array) => {
          return array.indexOf(company) === index;
        });
    },
    getFilteredFeedbackItems: () => {
      const state = get();

      return state.selectedCompany
        ? state.feedbackItems.filter(
            (feedbackItem) => feedbackItem.company === state.selectedCompany
          )
        : state.feedbackItems;
    },
    addItemToList: async (text: string) => {
      const companyName = text
        .split(" ")
        .find((word) => word.includes("#"))!
        .substring(1);

      const newItem: TFeedbackItem = {
        id: new Date().getTime(),
        text: text,
        upvoteCount: 0,
        daysAgo: 0,
        company: companyName,
        badgeLetter: companyName.substring(0, 1).toUpperCase(),
      };

      set((state) => ({
        feedbackItems: [...state.feedbackItems, newItem],
      }));

      await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
        {
          method: "POST",
          body: JSON.stringify(newItem),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    },
    selectCompany: (company: string) => {
      set(() => ({
        selectedCompany: company,
      }));
    },
    setFeedbackItems(feedbackItems) {
      set(() => ({
        feedbackItems,
      }));
    },
  },
}));

export const useFeedbackItems = () => useFeedbackItemsStore((state) => state.feedbackItems);
export const useSelectedCompany = () => useFeedbackItemsStore((state) => state.selectedCompany);
export const useFeedbackItemActions = () => useFeedbackItemsStore((state) => state.actions);
export const useCompanyList = () => useFeedbackItemsStore((state) => state.actions.getCompanyList());
export const useFilteredFeedbackItems = () => useFeedbackItemsStore((state) => state.actions.getFilteredFeedbackItems());
