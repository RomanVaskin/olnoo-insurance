const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

export interface AthletePerson {
  id: string
  last_name: string
  first_name: string
  patronymic: string | null
  birthdate: string | null
  gender: string | null
  phone: string | null
  email: string | null
}

export interface AthleteFederationMembership {
  federation: { id: string; name: string } | null
  club: string | null
  coach: string | null
  grade: string | null
  weight: number | null
  sport_name: string | null
  status: string
}

export interface AthleteProfile {
  person: AthletePerson
  federation_memberships: AthleteFederationMembership[]
}

export interface AthleteProduct {
  product_id: string
  name: string
  category: string
  insurer_name: string | null
  coverage_amount_kopecks: number | null
  validity_days: number
  amount_kopecks: number
  currency: string
  federation: { id: string; name: string }
}

export interface CreateApplicationResponse {
  application_id: string
  status: string
  product_id: string
  amount_kopecks: number
}

interface ApiResult<T> {
  ok: boolean
  status: number
  data: T | null
  /** Error code from the backend's { error: code } envelope, when ok is false. */
  errorCode: string | null
}

async function athleteRequest<T>(
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

export const athleteApi = {
  profile() {
    return athleteRequest<AthleteProfile>('/athlete/profile', { method: 'GET' })
  },
  products() {
    return athleteRequest<AthleteProduct[]>('/athlete/products', { method: 'GET' })
  },
}

export const applicationsApi = {
  /** product_id is the only client-controlled value; person/federation/amount/status are server-derived. */
  create(productId: string) {
    return athleteRequest<CreateApplicationResponse>('/applications', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId }),
    })
  },
}
