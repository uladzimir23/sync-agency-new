import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'

// Массив сервисов для меню
export const services = [
  { name: 'Main', path: ROUTES.HOME },
  { name: 'Cases', path: ROUTES.CASES },
  { name: 'Brand Identity', path: ROUTES.BRANDING_AND_IDENTITY },
  { name: 'Marketing Strategy', path: ROUTES.MARKETING_STRATEGY },
  { name: 'Product Development', path: ROUTES.PRODUCT_DEVELOPMENT },
  { name: 'Performance Intelligence', path: ROUTES.ANALYTICS_AND_OPTIMIZATION },
  { name: 'Infrastructure Automation', path: ROUTES.AUTOMATION_AND_INFRASTRUCTURE },
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