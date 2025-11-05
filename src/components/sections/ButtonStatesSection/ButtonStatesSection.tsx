import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import './ButtonStatesSection.scss'

export const ButtonStatesSection: React.FC = () => {
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})

  const handleLoadingClick = (buttonKey: string) => {
    setLoadingStates(prev => ({ ...prev, [buttonKey]: true }))
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [buttonKey]: false }))
    }, 2000)
  }

  return (
    <section className="demo-section fade-in-up">
      <h2 className="demo-section__title">Button States</h2>
      <div className="colabsys-btn-flex-group">
        <Button 
          variant="primary" 
          loading={loadingStates.loading1} 
          onClick={() => handleLoadingClick('loading1')}
        >
          {loadingStates.loading1 ? 'Loading...' : 'Click to Load'}
        </Button>
        <Button variant="secondary" disabled>Disabled</Button>
        <Button variant="outline" glow>Glow Effect</Button>
      </div>
    </section>
  )
}