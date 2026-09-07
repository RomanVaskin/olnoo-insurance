import type { MetadataRoute } from 'next'
import { competitions } from '@/lib/data'

const BASE_URL = 'https://insurance.olnoo.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/insurance`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sport`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/competitions`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/partners`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  const competitionRoutes: MetadataRoute.Sitemap = competitions.map((c) => ({
    url: `${BASE_URL}/competitions/${c.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...competitionRoutes]
}
