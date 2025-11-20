import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTheme } from '@shared/hooks/useTheme' // Обновленный путь
import { Header } from '@/widgets/header' // Обновленный путь
import { CursorFollower } from '@shared/ui/cursor-follower' // Обновленный путь
import { ROUTES } from '@/shared/constants/routes' // Используем @ для корня src

// Импорты страниц
import { HomePage } from '@pages/Home'
import { CasesPage } from '@pages/Cases'
import { AboutPage } from '@pages/About'
import { ContactPage } from '@pages/Contact'
import { ProductDevelopmentPage } from '@pages/ProductDevelopment'
import { MarketingStrategyPage } from '@pages/MarketingStrategy'
import { BrandingAndIdentityPage } from '@pages/BrandingAndIdentity'
import { AutomationAndInfrastructurePage } from '@pages/AutomationAndInfrastructure'
import { AnalyticsAndOptimizationPage } from '@pages/AnalyticsAndOptimization'

import './App.module.scss' // Относительный импорт для стилей

function App() {
  const { theme } = useTheme()

  const handleServiceChange = (index: number) => {
    console.log('Selected service:', index)
  }

  return (
    <Router>
      <Header onServiceChange={handleServiceChange} />
      
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