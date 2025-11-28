import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, useThemeContext } from '@app/providers/ThemeProvider'
import { WavyBackground } from '@shared/ui/wavy-background'
import { Header } from '@/widgets/header'
import { CursorFollower } from '@shared/ui/cursor-follower'
import { ROUTES } from '@/shared/constants/routes'

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

import './App.module.scss'

// Компонент приложения с темой
const AppContent: React.FC = () => {

  const handleServiceChange = (index: number) => {
    console.log('Selected service:', index)
  }

  return (
    <>
        <Header onServiceChange={handleServiceChange} />
        
        <main className="app-main-content">
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
        </main>
    </>
  )
}

// Главный компонент App с провайдерами
function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App