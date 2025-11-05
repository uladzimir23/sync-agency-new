import React from 'react'
import { Button } from '@/components/ui/button'
import './ButtonSizesSection.scss'

export const ButtonSizesSection: React.FC = () => {
  return (
    <section className="demo-section fade-in-up">
      <h2 className="demo-section__title">Button Sizes</h2>
      <div className="colabsys-btn-flex-group">
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="md">Medium</Button>
        <Button variant="primary" size="lg">Large</Button>
        <Button variant="primary" size="xl">Extra Large</Button>
        <Button variant="primary" size="icon">🔍</Button>
      </div>
    </section>
  )
}