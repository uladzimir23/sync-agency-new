import React from 'react'
import { Button } from '@/components/ui/button'
import './ButtonAnimationsSection.scss'

export const ButtonAnimationsSection: React.FC = () => {
  return (
    <section className="demo-section fade-in-up">
      <h2 className="demo-section__title">Animation Effects</h2>
      <div className="colabsys-btn-flex-group">
        <Button variant="primary" animation="scale">Scale Animation</Button>
        <Button variant="secondary" animation="lift">Lift Animation</Button>
        <Button variant="outline" animation="glow">Glow Animation</Button>
        <Button variant="ghost" animation="none">No Animation</Button>
      </div>
    </section>
  )
}