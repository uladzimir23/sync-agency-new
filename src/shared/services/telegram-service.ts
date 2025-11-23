// src/shared/services/telegram-service.ts

interface TelegramMessage {
    name: string
    email: string
    communicationMethod: string
    contactId: string
    date: string
    time: string
  }
  
  export class TelegramService {
    private static readonly BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    
    // Массив Chat IDs для отправки в несколько чатов
    private static readonly CHAT_IDS = [
      import.meta.env.VITE_TELEGRAM_CHAT_ID,           // основной чат (личный)
      import.meta.env.VITE_TELEGRAM_GROUP_CHAT_ID      // группа
    ].filter(Boolean) // убираем пустые значения
  
    static async sendBookingNotification(message: TelegramMessage): Promise<boolean> {
      if (!this.BOT_TOKEN) {
        console.log('Telegram notification (mock):', message)
        return true
      }
  
      if (this.CHAT_IDS.length === 0) {
        console.warn('No Telegram chat IDs configured')
        return true
      }
  
      let allSuccess = true
  
      // Отправляем сообщение в каждый чат
      for (const chatId of this.CHAT_IDS) {
        try {
          const success = await this.sendToChat(chatId, message)
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
  
    private static async sendToChat(chatId: string, message: TelegramMessage): Promise<boolean> {
      try {
        const text = this.formatMessage(message)
        
        const response = await fetch(`https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'HTML',
            disable_web_page_preview: true
          })
        })
  
        if (!response.ok) {
          const errorData = await response.json()
          console.error(`Telegram API error for chat ${chatId}:`, errorData)
          return false
        }
  
        console.log(`Telegram notification sent successfully to chat: ${chatId}`)
        return true
  
      } catch (error) {
        console.error(`Failed to send to chat ${chatId}:`, error)
        return false
      }
    }
  
    private static formatMessage(message: TelegramMessage): string {
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
  }