import { writable } from "svelte/store";
import {GenerativeService} from "../service/generative_store"
const generativeService = new GenerativeService();

interface ChatHistry {
  prompt: string;
  response: string;
}

export const promptStore = writable<string>("");
export const errorStore = writable<string | null>(null);
export const isLoading = writable<boolean | null>(false)
export const chatHistry = writable<ChatHistry[]>([]);

export const generateContent = async () => {
  errorStore.set(null);

  let promptValue: string;
  promptStore.subscribe(value => promptValue = value);

  if (!promptValue) {
    errorStore.set("Prompt is required");
    return;
  }

  try {
    isLoading.set(true)
    const text = await generativeService.generateContent(promptValue);
    chatHistry.update(history => [...history, { prompt: promptValue, response: text.html }]);
    promptValue = "";
  } catch (err: any) {
    errorStore.set(err.message);
    isLoading.set(false)
  }finally{
    isLoading.set(false)
  }
};