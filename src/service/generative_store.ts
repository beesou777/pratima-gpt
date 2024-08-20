import axios from "axios";

export class GenerativeService {
  private apiUrl = "/generate-content";

  async generateContent(prompt: string): Promise<string> {
    try {
      const response = await axios.post(this.apiUrl, { prompt });
      if (response.data.text) {
        return response.data.text;
      } else {
        throw new Error("Unexpected result structure");
      }
    } catch (error: any) {
      throw new Error(`Error generating content: ${error.message}`);
    }
  }
}
