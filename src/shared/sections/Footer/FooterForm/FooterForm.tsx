import React, { useState } from 'react';
import styles from './FooterForm.module.scss';

interface FormData {
  name: string;
  email: string;
  phone: string;
}

export const FooterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }

    // Здесь можно добавить отправку на сервер
    console.log('Form submitted:', formData);
    
    // Сброс формы
    setFormData({
      name: '',
      email: '',
      phone: '',
    });
    
    alert('Thank you! We will contact you soon.');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className={styles.input}
          required
          aria-label="Name"
        />
      </div>
      
      <div className={styles.inputGroup}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-mail"
          className={styles.input}
          required
          aria-label="Email"
        />
      </div>
      
      <div className={styles.inputGroup}>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (999) 999-9999"
          className={styles.input}
          required
          aria-label="Phone"
        />
      </div>
      
      <button type="submit" className={styles.submitButton}>
        SYNC
      </button>
    </form>
  );
};