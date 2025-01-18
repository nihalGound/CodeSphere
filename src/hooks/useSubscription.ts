import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { useRouter } from "next/navigation"

export const useSubscription = (userId: string) => {
    const router = useRouter()
    const upgrade = useMutation(api.users.upgradeToPro)
    const [isProcessing, setIsProcessing] = useState(false)
    const onSubscribe = async () => {
        setIsProcessing(true)
        await upgrade({userId})
        router.refresh()
        setIsProcessing(false)
    }
    return { onSubscribe, isProcessing }
}