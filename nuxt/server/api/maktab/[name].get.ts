import { getFeaturesByMaktab } from '@/module/db/features/features.service';

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')

  try {
    const features = await getFeaturesByMaktab(name)

    return features
  } catch (e) {
    return {
      status: 'error',
      message: (e as any).message
    }
  }
})