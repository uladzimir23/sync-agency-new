import React, { useState } from 'react'
import { useTheme } from './hooks/useTheme'
import { HeaderSection } from './components/sections/HeaderSection/HeaderSection'
import { ButtonStackSection } from './components/sections/ButtonStackSection/ButtonStackSection'
import { ContentCardSection } from './components/sections/ContentCardSection/ContentCardSection'
import { ButtonVariantsSection } from './components/sections/ButtonVariantsSection/ButtonVariantsSection'
import { ButtonSizesSection } from './components/sections/ButtonSizesSection/ButtonSizesSection'
import { ButtonAnimationsSection } from './components/sections/ButtonAnimationsSection/ButtonAnimationsSection'
import { ButtonStatesSection } from './components/sections/ButtonStatesSection/ButtonStatesSection'
import { CalendarSection } from './components/sections/CalendarSection/CalendarSection'
import { FooterSection } from './components/sections/FooterSection/FooterSection'
import { CursorFollower } from './components/ui/cursor-follower'
import { Header } from './components/layout/header' // Импортируем новый хедер
import '@/App.scss'
//import {CurvedLoop}  from "@/components/ui/shadcn-io/curved-loop";
import CircularText from "@/components/ui/shadcn-io/circular-text";


function App() {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState(0)
  const [activeMenu, setActiveMenu] = useState(0)

  // Обработчик изменения сервиса в хедере
  const handleServiceChange = (index: number) => {
    setActiveMenu(index)
    // Здесь можно добавить логику навигации или другие действия
    console.log('Selected service:', index)
  }

  return (
    <>
      {/* Хедер всегда загружен и отображается */}
      <Header 
        activeServiceIndex={activeMenu}
        onServiceChange={handleServiceChange}
      />
      
      <CursorFollower 
        size={8}
        delay={0.2}
        color="var(--primary-color)"
        offsetX={-4}
        offsetY={-2}
      />


      <CircularText
        text="REACT • COMPONENTS • BUILD FAST • "
        onHover="speedUp"
        spinDuration={20}
        className="text-primary"
      />
      
      <div className="dashboard-section">
        <div className="dashboard-header">
          <h1>
            Ùnified sýstem whére : <br />
            Strátegy, bránd, technoólogy ánd dáta , <br />
            Wórk togéther in sync .
          </h1>
        </div>

        <div className="curved-loop">
          <div className="curved-loop__container">
            <CurvedLoop 
              marqueeText=" in developing ✦"
              speed={1}
              curveAmount={250}
              direction="left"
              interactive={true}
              className="text-foreground"
            />
          </div>
        </div>
        <CalendarSection />

        <ButtonStackSection 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
        
        <ContentCardSection />
        <ButtonVariantsSection />
        <ButtonSizesSection />
        <ButtonAnimationsSection />
        <ButtonStatesSection />
        
        <FooterSection />
      </div>
    </>
  )
}

export default App