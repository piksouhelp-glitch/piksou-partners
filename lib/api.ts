export interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
}

class ApiService {
  private getBaseApiUrl(): string {
    const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || ""
    return rawBaseUrl.replace(/\/+$/, "").replace(/\/api$/i, "")
  }

  private getApiUrl(path: string): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`
    const baseUrl = this.getBaseApiUrl()
    return baseUrl ? `${baseUrl}${normalizedPath}` : normalizedPath
  }

  async sendPartnerContact(payload: Record<string, string>, token?: string): Promise<ApiResponse<unknown>> {
    try {
      const response = await fetch(this.getApiUrl("/api/partners/contact/"), {
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
        error: error.message || "Failed to submit partner contact. Please try again later.",
        success: false,
      }
    }
  }
}

export const apiService = new ApiService()
