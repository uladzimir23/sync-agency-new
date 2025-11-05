import React from 'react'
import { Button } from '@/components/ui/button'
import './FooterSection.scss'

export const FooterSection: React.FC = () => {
  return (
    <footer className="footer-section">
      <p>Built with ❤️ using React, TypeScript, and Colabsys UI</p>
      <div className="mt-4 colabsys-btn-flex-group justify-center">
        <Button variant="link" size="sm">Documentation</Button>
        <Button variant="link" size="sm">GitHub</Button>
        <Button variant="link" size="sm">Examples</Button>
      </div>
    </footer>
  )
}