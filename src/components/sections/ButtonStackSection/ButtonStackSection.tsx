import React from 'react'
import { ButtonStack, ButtonStackItem } from '@/components/ui/button-stack'
import './ButtonStackSection.scss'

interface ButtonStackSectionProps {
  activeTab: number
  setActiveTab: (index: number) => void
  activeMenu: number
  setActiveMenu: (index: number) => void
}

export const ButtonStackSection: React.FC<ButtonStackSectionProps> = ({
  activeTab,
  setActiveTab,
  activeMenu,
  setActiveMenu
}) => {
  return (
    <section className="demo-section fade-in-up">
      <h2 className="demo-section__title">🎯 Button Stack Component</h2>
      <p className="text-secondary mb-6">
        Interactive button stack with animated slider indicator. Hover over items to see the smooth animation!
      </p>
      
      <div className="demo-section_items">
        {/* Горизонтальный стек */}
        <div className='demo-items'>
          <h3 className="font-semibold mb-4 text-primary">Horizontal Stack</h3>
          <div className='button-stack-row_wrapper'>
            <ButtonStack 
              direction="row" 
              spacing={12}
              activeIndex={activeTab}
              onActiveChange={setActiveTab}
              className="mb-6"
            >
              <ButtonStackItem>Projects</ButtonStackItem>
              <ButtonStackItem>Cases</ButtonStackItem>
              <ButtonStackItem>Colabsys/ui</ButtonStackItem>
              <ButtonStackItem>Contacts</ButtonStackItem>
            </ButtonStack>
  
            <div className="flex-1 content-card p-4">
              <h4 className="font-semibold mb-2">The active menu item:</h4>
              <p className="text-sm text-secondary">
                Active tab: {activeTab + 1} - {['Projects', 'Cases', 'Colabsys/ui', 'Contacts'][activeTab]}
              </p>
              <p className="text-sm text-secondary mt-2">
                Try hovering over different menu items to see the animation!
              </p>
            </div>
          </div>
        </div>

        {/* Вертикальный стек */}
        <div className='demo-items'>
          <h3 className="font-semibold mb-4 text-primary">Vertical Stack</h3>
          <div className="button-stack_wrapper">
            <ButtonStack 
              direction="column" 
              spacing={8}
              activeIndex={activeMenu}
              onActiveChange={setActiveMenu}
            >
              <ButtonStackItem>Profile</ButtonStackItem>
              <ButtonStackItem>Settings</ButtonStackItem>
              <ButtonStackItem>Auntefication</ButtonStackItem>
              <ButtonStackItem>Messages</ButtonStackItem>
              <ButtonStackItem>Log out</ButtonStackItem>
            </ButtonStack>
            
            <div className="flex-1 content-card p-4">
              <h4 className="font-semibold mb-2">The active menu item:</h4>
              <p className="text-primary">
                {['Profile', 'Settings', 'Safety', 'Notifications', 'Exit'][activeMenu]}
              </p>
              <p className="text-sm text-secondary mt-2">
                Try hovering over different menu items to see the animation!
              </p>
            </div>
          </div>
        </div>

        {/* Компактный стек */}
        <div className='demo-items'>
          <h3 className="font-semibold mb-4 text-primary">Compact Filter Stack</h3>
          <ButtonStack 
            direction="row" 
            spacing={4}
            className="justify-center"
          >
            <ButtonStackItem>Today</ButtonStackItem>
            <ButtonStackItem>Week</ButtonStackItem>
            <ButtonStackItem>Mounth</ButtonStackItem>
            <ButtonStackItem>Quarter</ButtonStackItem>
            <ButtonStackItem>Year</ButtonStackItem>
            <ButtonStackItem>All time</ButtonStackItem>
          </ButtonStack>
        </div>
      </div>
    </section>
  )
}