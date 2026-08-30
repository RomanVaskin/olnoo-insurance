'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { type Product } from '@/lib/data'
import { DataTable, type Column } from '@/components/data-table'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'

const inputClass =
  'mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none'

type Draft = {
  id: string
  name: string
  coverage: string
  price: string
  period: string
  status: Product['status']
}

export function ProductManager({ initial }: { initial: Product[] }) {
  const [rows, setRows] = useState<Draft[]>(
    initial.map((p) => ({
      id: p.id,
      name: p.name,
      coverage: p.coverage,
      price: p.price,
      period: p.period,
      status: p.status,
    })),
  )
  const [editing, setEditing] = useState<Draft | null>(null)
  const [open, setOpen] = useState(false)

  function openNew() {
    setEditing({
      id: `p${Date.now()}`,
      name: '',
      coverage: '',
      price: '',
      period: 'на 1 турнир',
      status: 'На модерации',
    })
    setOpen(true)
  }

  function openEdit(row: Draft) {
    setEditing({ ...row })
    setOpen(true)
  }

  function save() {
    if (!editing) return
    setRows((prev) => {
      const exists = prev.some((r) => r.id === editing.id)
      return exists
        ? prev.map((r) => (r.id === editing.id ? editing : r))
        : [editing, ...prev]
    })
    setOpen(false)
    setEditing(null)
  }

  function remove(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  const columns: Column<Draft>[] = [
    {
      key: 'name',
      header: 'Продукт',
      render: (r) => <span className="font-medium text-foreground">{r.name}</span>,
    },
    { key: 'coverage', header: 'Покрытие', align: 'right', render: (r) => r.coverage },
    { key: 'price', header: 'Цена', align: 'right', render: (r) => r.price },
    { key: 'period', header: 'Период', render: (r) => r.period },
    {
      key: 'status',
      header: 'Статус',
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="icon-sm" onClick={() => openEdit(r)}>
            <Pencil className="size-4" />
            <span className="sr-only">Редактировать</span>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => remove(r.id)}
          >
            <Trash2 className="size-4 text-destructive" />
            <span className="sr-only">Удалить</span>
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={openNew}>
          <Plus className="size-4" />
          Новый продукт
        </Button>
      </div>

      <DataTable columns={columns} rows={rows} caption="Продукты" />

      {open && editing ? (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                {initial.some((p) => p.id === editing.id)
                  ? 'Редактировать продукт'
                  : 'Новый продукт'}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-8 place-items-center rounded-md text-muted-foreground hover:text-foreground"
                aria-label="Закрыть"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="text-sm text-muted-foreground">Название</span>
                <input
                  className={inputClass}
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                  placeholder="Название продукта"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm text-muted-foreground">Покрытие</span>
                  <input
                    className={inputClass}
                    value={editing.coverage}
                    onChange={(e) =>
                      setEditing({ ...editing, coverage: e.target.value })
                    }
                    placeholder="1 000 000 ₽"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-muted-foreground">Цена</span>
                  <input
                    className={inputClass}
                    value={editing.price}
                    onChange={(e) =>
                      setEditing({ ...editing, price: e.target.value })
                    }
                    placeholder="1 290 ₽"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-muted-foreground">Период</span>
                  <select
                    className={inputClass}
                    value={editing.period}
                    onChange={(e) =>
                      setEditing({ ...editing, period: e.target.value })
                    }
                  >
                    {['на 1 турнир', 'на 30 дней', 'на 1 год'].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm text-muted-foreground">Статус</span>
                  <select
                    className={inputClass}
                    value={editing.status}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        status: e.target.value as Product['status'],
                      })
                    }
                  >
                    {['Активен', 'На модерации', 'Архив'].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Отмена
              </Button>
              <Button onClick={save} disabled={!editing.name}>
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
