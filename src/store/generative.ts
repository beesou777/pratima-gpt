import { writable } from "svelte/store";
import {GenerativeService} from "../service/generative_store"
const generativeService = new GenerativeService();

export const promptStore = writable<string>("");
export const responseStore = writable<string | null>(null);
export const errorStore = writable<string | null>(null);

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
    const text = await generativeService.generateContent(promptValue);
    responseStore.set(text);
  } catch (err: any) {
    errorStore.set(err.message);
  }
};