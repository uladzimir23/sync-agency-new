
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'

import { ThemeProvider } from '@app/providers/ThemeProvider'
import { LanguageProvider } from '@/shared/localization/contexts/LanguageContext'

import { Header } from '@/widgets/header'
import { Footer } from '@/shared/sections/Footer'

// Импортируем компоненты
import { SimpleGridBackground } from '@/shared/ui/simple-grid-background'
import ScrollToTop from '@/shared/utils/ScrollToTop'

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

import styles from './App.module.scss'

import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'

gsap.registerPlugin(CSSPlugin)

// Компонент приложения с темой
const AppContent: React.FC = () => {
  const handleServiceChange = (index: number) => {
    console.log('Selected service:', index)
  }

  return (
    <div className={styles.app}>
      {/* Grid Background на всех страницах */}
      <SimpleGridBackground
        cellSize={45.39}
        lineWidth={1}
        color="var(--border-color-accent)"
        opacity={0.16}
        speed={0.12}
        highlightCount={50}
        highlightColors={[
          'rgba(79, 70, 229, 0.15)',
          'rgba(147, 51, 234, 0.12)',
          'rgba(236, 72, 153, 0.1)',
          'rgba(6, 182, 212, 0.1)',
          'rgba(34, 197, 94, 0.08)',
        ]}
        className={styles.gridBackground}
      />
      
      {/* Компонент для сброса скролла при переходе между страницами */}
      <ScrollToTop />
      
      <Header onServiceChange={handleServiceChange} />
      
      <main className={styles.appMainContent}>
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

      {/* <Footer /> */}
    </div>
  )
}

// Главный компонент App с провайдерами
const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App