import { toast } from "react-toastify"

export const hienMsgError = err => {
    let message = null
    if (typeof err === 'object' && err.message) {
        ({ message } = err)
    }
    if (message !== null && message !== '' && typeof message !== 'undefined') {
        toast.error(message)
    }
}

export const hienMsg = msg => {
    if (msg !== null && msg !== '' && typeof msg !== 'undefined') {
        toast.success(msg)
    }
}