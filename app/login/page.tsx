'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/brand'
import { Button } from '@/components/ui/button'
import { authApi } from '@/lib/auth-api'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const { ok, status, data } = await authApi.login(email, password)

    if (!ok) {
      setSubmitting(false)
      setError(
        status === 401
          ? 'Неверный email или пароль.'
          : 'Не удалось выполнить вход. Попробуйте ещё раз.',
      )
      return
    }

    router.push(data?.account.role === 'athlete' ? '/dashboard' : '/admin')
  }

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="space-y-1.5">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Вход в кабинет
            </h1>
            <p className="text-sm text-muted-foreground">
              Введите email и пароль для доступа к платформе.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-9 w-full rounded-lg border border-border bg-secondary/60 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:bg-background focus:ring-2 focus:ring-brand/20 focus:outline-none"
                placeholder="you@olnoo.dev"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Пароль
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-9 w-full rounded-lg border border-border bg-secondary/60 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:bg-background focus:ring-2 focus:ring-brand/20 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            {error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : null}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full justify-center"
              size="lg"
            >
              {submitting ? 'Вход…' : 'Войти'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
