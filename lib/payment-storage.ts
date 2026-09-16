// Bridges the full-page redirect to YooKassa: payment_id is only known after
// POST /api/payments/create responds, and return_url can't carry it (it is
// sent to YooKassa before that response exists). Stashing it here lets the
// return leg recover which payment to check without a webhook.
const STORAGE_KEY = 'olnoo_pending_payment'

interface PendingPayment {
  applicationId: string
  paymentId: string
}

export function savePendingPayment(payment: PendingPayment) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payment))
  } catch {
    // Storage unavailable (private mode, etc.) — return flow will show a recovery notice.
  }
}

export function readPendingPaymentId(applicationId: string): string | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PendingPayment
    return parsed.applicationId === applicationId ? parsed.paymentId : null
  } catch {
    return null
  }
}

export function clearPendingPayment() {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
