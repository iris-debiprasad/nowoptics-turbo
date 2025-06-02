import { useEffect } from "react"


export function useInterval(callback: () => void, delay: number | null) {

    useEffect(() => {
        if (delay === null) {
            return
        }
        const interval = setInterval(() => {
            callback()
        }, delay)

        return () => {
            clearInterval(interval)
        }
    }, [delay])
}