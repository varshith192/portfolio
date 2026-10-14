// Fire-and-forget notifications, rendered by <Toaster />.
export function toast(message) {
  window.dispatchEvent(new CustomEvent('app:toast', { detail: message }))
}
