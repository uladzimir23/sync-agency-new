import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import { Header } from './components/layout/header'
import { CursorFollower } from './components/ui/cursor-follower'
import { ROUTES } from './constants/routes'

// Импорты страниц
import { HomePage } from './components/pages/Home'
import { CasesPage } from './components/pages/Cases'
import { AboutPage } from './components/pages/About'
import { ContactPage } from './components/pages/Contact'
import { ProductDevelopmentPage } from './components/pages/ProductDevelopment'
import { MarketingStrategyPage } from './components/pages/MarketingStrategy'
import { BrandingAndIdentityPage } from './components/pages/BrandingAndIdentity'
import { AutomationAndInfrastructurePage } from './components/pages/AutomationAndInfrastructure'
import { AnalyticsAndOptimizationPage } from './components/pages/AnalyticsAndOptimization'

import '@/App.scss'

function App() {
  const { theme } = useTheme()

  // Обработчик изменения сервиса (теперь только для логирования или дополнительной логики)
  const handleServiceChange = (index: number) => {
    console.log('Selected service:', index)
  }

  return (
    <Router>
      {/* Хедер теперь сам управляет навигацией через хук useNavigation */}
      <Header onServiceChange={handleServiceChange} />
      
      <CursorFollower 
        size={8}
        delay={1.05}
        color="var(--primary-color)"
        offsetX={-4}
        offsetY={-2}
      />
      
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.CASES} element={<CasesPage />} />
        <Route path={ROUTES.PRODUCT_DEVELOPMENT} element={<ProductDevelopmentPage />} />
        <Route path={ROUTES.MARKETING_STRATEGY} element={<MarketingStrategyPage />} />
        <Route path={ROUTES.BRANDING_AND_IDENTITY} element={<BrandingAndIdentityPage />} />
        <Route path={ROUTES.AUTOMATION_AND_INFRASTRUCTURE} element={<AutomationAndInfrastructurePage />} />
        <Route path={ROUTES.ANALYTICS_AND_OPTIMIZATION} element={<AnalyticsAndOptimizationPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
      </Routes>
    </Router>
  )
}

export default App