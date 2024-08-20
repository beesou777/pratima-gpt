import axios from "axios";

export class GenerativeService {
  private apiUrl = "/generate-content";

  async generateContent(prompt: string): Promise<string> {
    try {
      const response = await axios.post(this.apiUrl, { prompt });
      return Promise.resolve(response.data.html)
    } catch (error: any) {
      return Promise.reject(error)
    }
  }
}
