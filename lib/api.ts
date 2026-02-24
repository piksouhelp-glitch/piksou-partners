export interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
}

class ApiService {
  async sendSupportMessage(payload: Record<string, string>, token?: string): Promise<ApiResponse<unknown>> {
    try {
      const response = await fetch("/api/support/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || errorData.detail || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return { data, success: true }
    } catch (error: any) {
      return {
        error: error.message || "Failed to submit support message. Please try again later.",
        success: false,
      }
    }
  }
}

export const apiService = new ApiService()
