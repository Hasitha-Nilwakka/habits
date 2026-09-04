'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

//tanstack provider is declared in a seperate file since the provider is client component
export default function QueryProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())
    return <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
}