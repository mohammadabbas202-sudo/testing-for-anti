export type HomeType = 'own-single' | 'own-multi' | 'rent-single' | 'rent-multi';

export interface LeadFormData {
  zipCode: string;
  homeType?: HomeType;
  estimatedBill?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ModalStep {
  step: number;
  title: string;
}
