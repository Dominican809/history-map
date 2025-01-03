if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error('NEXT_PUBLIC_OPENAI_API_KEY is not defined in environment variables')
}

export const config = {
  openai: {
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
  }
} 