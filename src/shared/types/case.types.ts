export interface CaseImage {
    id: string;
    url: string;
    alt: string;
  }
  
  export interface Case {
    id: string;
    company: string;
    category: string;
    //title: string;
    title: string | React.ReactNode; // изменяем тип
    description: string;
    images: CaseImage[];
    tags: string[];
  }
  
  export type CaseCategory = 
    | 'Branding & Identity'
    | 'Marketing Strategy'
    | 'Corporate Websites'
    | 'Web Applications'
    | 'MVP Development'
    | 'Product Design'
    | 'AI'
    | 'Your Request';
  
  export type CaseLayout = 'detailed' | 'compact' | 'minimal';
  
  export interface CaseFilter {
    categories?: string[];
    companies?: string[];
    tags?: string[];
    searchQuery?: string;
  }
  
  export interface CasesState {
    cases: Case[];
    filteredCases: Case[];
    filters: CaseFilter;
    selectedCase: Case | null;
    isLoading: boolean;
  }