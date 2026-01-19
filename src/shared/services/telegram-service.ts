interface TelegramMessage {
  name: string
  email: string
  communicationMethod: string
  contactId: string
  date: string
  time: string
}

interface BriefTelegramMessage {
  type: 'brief_submission'
  page: string
  name: string
  email: string
  communicationMethod: string
  contactId: string
  projectDescription: string
  selectedFeatures: string[]
  selectedBudget: string | null
  selectedTimeline: string | null
  fileCount: number
  timestamp: string
}

export class TelegramService {
  private static readonly BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  
  // Массив Chat IDs для отправки в несколько чатов
  private static readonly CHAT_IDS = [
    import.meta.env.VITE_TELEGRAM_CHAT_ID || import.meta.env.VITE_TELEGRAM_PERSONAL_CHAT_ID, // Поддержка старого и нового названий
    import.meta.env.VITE_TELEGRAM_GROUP_CHAT_ID
  ].filter(Boolean) // убираем пустые значения

  // Логируем конфигурацию при загрузке
  static {
    console.log('🔧 Конфигурация TelegramService:', {
      hasToken: !!this.BOT_TOKEN,
      chatIds: this.CHAT_IDS,
      chatIdsCount: this.CHAT_IDS.length
    })
  }

  static async sendBookingNotification(message: TelegramMessage): Promise<boolean> {
    console.log('📅 Отправка уведомления о бронировании:', message)
    
    if (!this.BOT_TOKEN) {
      console.log('Telegram notification (mock):', message)
      return true
    }

    if (this.CHAT_IDS.length === 0) {
      console.warn('❌ No Telegram chat IDs configured')
      console.log('Доступные переменные окружения:', {
        VITE_TELEGRAM_CHAT_ID: import.meta.env.VITE_TELEGRAM_CHAT_ID,
        VITE_TELEGRAM_PERSONAL_CHAT_ID: import.meta.env.VITE_TELEGRAM_PERSONAL_CHAT_ID,
        VITE_TELEGRAM_GROUP_CHAT_ID: import.meta.env.VITE_TELEGRAM_GROUP_CHAT_ID
      })
      return true
    }

    let allSuccess = true

    // Отправляем сообщение в каждый чат
    for (const chatId of this.CHAT_IDS) {
      try {
        const success = await this.sendToChat(chatId, this.formatBookingMessage(message))
        if (!success) {
          allSuccess = false
        }
      } catch (error) {
        console.error(`Failed to send to chat ${chatId}:`, error)
        allSuccess = false
      }
    }

    return allSuccess
  }

  static async sendBriefNotification(message: BriefTelegramMessage): Promise<boolean> {
    console.log('📋 Отправка уведомления о брифе:', message)
    
    if (!this.BOT_TOKEN) {
      console.log('Telegram brief notification (mock):', message)
      return true
    }

    if (this.CHAT_IDS.length === 0) {
      console.warn('❌ No Telegram chat IDs configured')
      console.log('Доступные переменные окружения:', {
        VITE_TELEGRAM_CHAT_ID: import.meta.env.VITE_TELEGRAM_CHAT_ID,
        VITE_TELEGRAM_PERSONAL_CHAT_ID: import.meta.env.VITE_TELEGRAM_PERSONAL_CHAT_ID,
        VITE_TELEGRAM_GROUP_CHAT_ID: import.meta.env.VITE_TELEGRAM_GROUP_CHAT_ID
      })
      return true
    }

    let allSuccess = true

    // Отправляем сообщение в каждый чат
    for (const chatId of this.CHAT_IDS) {
      try {
        const success = await this.sendToChat(chatId, this.formatBriefMessage(message))
        if (!success) {
          allSuccess = false
        }
      } catch (error) {
        console.error(`Failed to send to chat ${chatId}:`, error)
        allSuccess = false
      }
    }

    return allSuccess
  }

  private static async sendToChat(chatId: string, formattedMessage: string): Promise<boolean> {
    console.log('📤 Попытка отправки в Telegram:', {
      chatId,
      messageLength: formattedMessage.length
    })

    try {
      const response = await fetch(`https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: formattedMessage,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        })
      })

      console.log('📨 Ответ от Telegram API:', {
        status: response.status,
        ok: response.ok
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error(`❌ Telegram API error:`, errorData)
        return false
      }

      const responseData = await response.json()
      console.log('✅ Успешно отправлено в Telegram:', responseData)
      return true

    } catch (error) {
      console.error(`❌ Network error:`, error)
      return false
    }
  }

  private static formatBookingMessage(message: TelegramMessage): string {
    const escapeHtml = (text: string) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
    }

    return `
🎉 <b>New Booking Request</b>

👤 <b>Name:</b> ${escapeHtml(message.name)}
📧 <b>Email:</b> ${escapeHtml(message.email)}
📅 <b>Date:</b> ${escapeHtml(message.date)}
⏰ <b>Time:</b> ${escapeHtml(message.time)}
💬 <b>Communication Method:</b> ${escapeHtml(message.communicationMethod)}
🔗 <b>Contact ID:</b> ${escapeHtml(message.contactId)}

📋 <i>Booking created at: ${escapeHtml(new Date().toLocaleString())}</i>
    `.trim()
  }

  private static formatBriefMessage(message: BriefTelegramMessage): string {
    const escapeHtml = (text: string) => {
      if (!text) return ''
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
    }

    const formatFeatureList = (features: string[]) => {
      if (!features || features.length === 0) return 'No features selected'
      return features.map(f => `• ${f}`).join('\n')
    }

    const formatBudget = (budget: string | null) => {
      if (!budget) return 'Not specified'
      return budget.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }

    const formatTimeline = (timeline: string | null) => {
      if (!timeline) return 'Not specified'
      return timeline.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }

    const formatPageName = (page: string) => {
      const pageNames: Record<string, string> = {
        branding: 'Branding & Identity',
        automation: 'Automation & Infrastructure',
        analytics: 'Analytics & Optimization',
        marketing: 'Marketing Strategy',
        product: 'Product Development'
      }
      return pageNames[page] || page
    }

    const truncatedDescription = message.projectDescription.length > 500 
      ? message.projectDescription.substring(0, 500) + '...'
      : message.projectDescription

    return `
📋 <b>New Brief Submission</b>

🏷️ <b>Service:</b> ${escapeHtml(formatPageName(message.page))}
👤 <b>Name:</b> ${escapeHtml(message.name)}
📧 <b>Email:</b> ${escapeHtml(message.email)}
💬 <b>Contact via:</b> ${escapeHtml(message.communicationMethod)} (${escapeHtml(message.contactId)})

📝 <b>Project Description:</b>
${escapeHtml(truncatedDescription)}

🎯 <b>Selected Features (${message.selectedFeatures.length}):</b>
${escapeHtml(formatFeatureList(message.selectedFeatures))}

💰 <b>Budget:</b> ${escapeHtml(formatBudget(message.selectedBudget))}
⏱️ <b>Timeline:</b> ${escapeHtml(formatTimeline(message.selectedTimeline))}
📎 <b>Files Attached:</b> ${message.fileCount}

🕐 <b>Submitted at:</b> ${escapeHtml(new Date(message.timestamp).toLocaleString())}
    `.trim()
  }

  // Утилита для проверки конфигурации
  static checkConfig(): { isValid: boolean; issues: string[] } {
    const issues: string[] = []

    if (!this.BOT_TOKEN) {
      issues.push('VITE_TELEGRAM_BOT_TOKEN is not configured')
    }

    if (this.CHAT_IDS.length === 0) {
      issues.push('No chat IDs configured (VITE_TELEGRAM_CHAT_ID or VITE_TELEGRAM_GROUP_CHAT_ID)')
    }

    return {
      isValid: issues.length === 0,
      issues
    }
  }
}