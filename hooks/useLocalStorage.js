import { useEffect, useState } from 'react'

const useLocalStorage = (key, initialValue) => {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    // if (typeof window !== 'undefined') {
        const [storedValue, setStoredValue] = useState(() => {
            try {
                // Get from local storage by key
                const item = localStorage.getItem(key)
                // Parse stored json or if none return initialValue
                return item ? JSON.parse(item) : initialValue
            } catch (error) {
                // If error also return initialValue
                // console.log(error)
                return initialValue
            }
        })

        useEffect(() => {
            try {
                // Save to local storage
                localStorage.setItem(key, JSON.stringify(storedValue))
            } catch (error) {
                // A more advanced implementation would handle the error case
                console.log(error)
            }
        }, [key, storedValue])

        return [storedValue, setStoredValue]
    // } else {
    //     return []
    // }
}

export { useLocalStorage }

// localStorage.setItem(
//     key,
//     JSON.stringify(storedValue, function (key, val) {
//         if (val != null && typeof val == 'object') {
//             if (seen.indexOf(val) >= 0) {
//                 return
//             }
//             seen.push(val)
//         }
//         return val
//     })
// )
