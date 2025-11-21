import { useState, useMemo } from 'react';
import { Case, CaseFilter } from '../types/case.types';
import { casesData } from '../lib/data/casesData';

export const useCases = () => {
  const [filters, setFilters] = useState<CaseFilter>({});
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  // Фильтрация кейсов
  const filteredCases = useMemo(() => {
    let result = casesData;

    if (filters.categories && filters.categories.length > 0) {
      result = result.filter(caseItem => 
        filters.categories!.includes(caseItem.category)
      );
    }

    if (filters.companies && filters.companies.length > 0) {
      result = result.filter(caseItem => 
        filters.companies!.includes(caseItem.company)
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      result = result.filter(caseItem =>
        caseItem.tags.some(tag => filters.tags!.includes(tag))
      );
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(caseItem =>
        caseItem.title.toLowerCase().includes(query) ||
        caseItem.description.toLowerCase().includes(query) ||
        caseItem.company.toLowerCase().includes(query) ||
        caseItem.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [filters]);

  // Функция для предзагрузки изображений кейса
  const preloadCaseImages = (caseItem: Case) => {
    caseItem.images.forEach(image => {
      const img = new Image();
      img.src = image.url;
    });
  };

  const updateFilters = (newFilters: Partial<CaseFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const selectCase = (caseItem: Case) => {
    setSelectedCase(caseItem);
    // Предзагрузка изображений при выборе кейса
    preloadCaseImages(caseItem);
  };

  const clearSelectedCase = () => {
    setSelectedCase(null);
  };

  // Предзагрузка изображений для первых нескольких кейсов
  const preloadInitialImages = () => {
    const initialCases = filteredCases.slice(0, 3);
    initialCases.forEach(preloadCaseImages);
  };

  return {
    cases: casesData,
    filteredCases,
    filters,
    selectedCase,
    updateFilters,
    clearFilters,
    selectCase,
    clearSelectedCase,
    preloadInitialImages,
  };
};