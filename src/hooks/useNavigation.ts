import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

// Массив сервисов для меню
export const services = [
  { name: 'Máin', path: ROUTES.HOME },
  { name: 'Cáses', path: ROUTES.CASES },
  { name: 'Bránding & Idéntity', path: ROUTES.BRANDING_AND_IDENTITY },
  { name: 'Márketing Strátegy', path: ROUTES.MARKETING_STRATEGY },
  { name: 'Próduct Devélopment', path: ROUTES.PRODUCT_DEVELOPMENT },
  { name: 'Analýtics & Òptimization', path: ROUTES.ANALYTICS_AND_OPTIMIZATION },
  { name: 'Automátion & Ìnfrastructure', path: ROUTES.AUTOMATION_AND_INFRASTRUCTURE },
] as const

export const useNavigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)

  // Определяем активный индекс на основе текущего пути
  useEffect(() => {
    const currentPath = location.pathname
    const index = services.findIndex(service => service.path === currentPath)
    if (index !== -1) {
      setActiveServiceIndex(index)
    } else {
      // Если путь не найден, устанавливаем на главную
      setActiveServiceIndex(0)
    }
  }, [location.pathname])

  // Обработчик изменения сервиса
  const handleServiceChange = (index: number) => {
    const service = services[index]
    if (service) {
      setActiveServiceIndex(index)
      navigate(service.path)
    }
  }

  // Получаем текущий активный сервис
  const getCurrentService = () => {
    return services[activeServiceIndex]
  }

  return {
    activeServiceIndex,
    handleServiceChange,
    getCurrentService,
    services
  }
}