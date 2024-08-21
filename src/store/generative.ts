import { writable } from "svelte/store";
import {GenerativeService} from "../service/generative_store"
const generativeService = new GenerativeService();

interface ChatHistry {
  prompt: string;
  response: string;
}

export const promptStore = writable<string>("");
export const responseStore = writable<string | null>(null);
export const errorStore = writable<string | null>(null);
export const isLoading = writable<boolean | null>(false)
export const chatHistry = writable<ChatHistry[]>([]);

export const generateContent = async () => {
  errorStore.set(null);
  responseStore.set(null);

  let promptValue: string;
  promptStore.subscribe(value => promptValue = value);

  if (!promptValue) {
    errorStore.set("Prompt is required");
    return;
  }

  try {
    isLoading.set(true)
    const text = await generativeService.generateContent(promptValue);
    responseStore.set(text.html);
    chatHistry.update(history => [...history, ...text.chatHistory]);
  } catch (err: any) {
    errorStore.set(err.message);
    isLoading.set(false)
  }finally{
    isLoading.set(false)
  }
};