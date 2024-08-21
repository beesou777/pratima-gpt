import { writable, get } from "svelte/store";
import { GenerativeService } from "../service/generative_store";

const generativeService = new GenerativeService();

interface ChatHistry {
  prompt: string;
  response: string;
}

export const promptStore = writable<string>("");
export const errorStore = writable<string | null>(null);
export const isLoading = writable<boolean | null>(false);
export const chatHistry = writable<ChatHistry[]>([]);

export const generateContent = async () => {
  errorStore.set(null);

  const promptValue = get(promptStore);

  if (!promptValue) {
    errorStore.set("Prompt is required");
    return;
  }

  try {
    isLoading.set(true);
    chatHistry.update(history => [...history, { prompt: promptValue, response: "" }]);

    const text = await generativeService.generateContent(promptValue);

    chatHistry.update(history => {
      const updatedHistory = history.slice();
      const lastIndex = updatedHistory.length - 1;
      if (lastIndex >= 0) {
        updatedHistory[lastIndex].response = text.html;
      }
      return updatedHistory;
    });

    promptStore.set("");
  } catch (err: any) {
    errorStore.set(err.error);
  } finally {
    isLoading.set(false);
  }
};

