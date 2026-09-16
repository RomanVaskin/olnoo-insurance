const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

export type PaymentStatus = 'pending' | 'paid' | 'cancelled'

export interface CreatePaymentResponse {
  payment_id: string
  confirmation_url: string | null
  status: PaymentStatus
}

export interface PaymentStatusResponse {
  payment_id: string
  status: PaymentStatus
  paid_at: string | null
}

export interface PaymentApplicationSummary {
  id: string
  status: string
  amount_kopecks: number
  created_at: string
}

export interface PaymentPolicySummary {
  id: string
  policy_number: string
  status: string
  valid_from: string
  valid_to: string
  policy_url: string | null
}

export interface PaymentDetails extends PaymentStatusResponse {
  application: PaymentApplicationSummary | null
  policy: PaymentPolicySummary | null
}

interface ApiResult<T> {
  ok: boolean
  status: number
  data: T | null
  /** Error code from the backend's { error: code } envelope, when ok is false. */
  errorCode: string | null
}

async function paymentsRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<ApiResult<T>> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  const body = (await res.json().catch(() => null)) as
    | T
    | { error: string }
    | null

  if (!res.ok) {
    const errorCode =
      body && typeof body === 'object' && 'error' in body ? body.error : null
    return { ok: false, status: res.status, data: null, errorCode }
  }

  return { ok: true, status: res.status, data: body as T, errorCode: null }
}

export const paymentsApi = {
  create(applicationId: string, returnUrl: string) {
    return paymentsRequest<CreatePaymentResponse>('/payments/create', {
      method: 'POST',
      body: JSON.stringify({ application_id: applicationId, return_url: returnUrl }),
    })
  },
  status(paymentId: string) {
    return paymentsRequest<PaymentStatusResponse>(`/payments/${paymentId}/status`, {
      method: 'GET',
    })
  },
  get(paymentId: string) {
    return paymentsRequest<PaymentDetails>(`/payments/${paymentId}`, {
      method: 'GET',
    })
  },
}
