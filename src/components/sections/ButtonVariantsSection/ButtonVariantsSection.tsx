import React from 'react'
import { Button } from '@/components/ui/button'
import './ButtonVariantsSection.scss'

export const ButtonVariantsSection: React.FC = () => {
  return (
    <section className="demo-section fade-in-up">
      <h2 className="demo-section__title">Button Variants</h2>
      <div className="colabsys-btn-flex-group">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="link">Link</Button>
      </div>
    </section>
  )
}