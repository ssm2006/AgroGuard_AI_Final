
export interface DiseaseResult {
  diseaseName: string;
  confidence: number;
  severity: 'Low' | 'Moderate' | 'High' | 'Critical';
  symptoms: string[];
  prevention: string[];
  treatment: string[];
}

export interface WeatherData {
  temp: number;
  humidity: number;
  rainfall: string;
  windSpeed: number;
  condition: string;
  alerts: string[];
  location: string;
}

export interface SoilData {
  moisture: number;
  pH: number;
  fertility: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Seeds' | 'Fertilizers' | 'Pesticides' | 'Equipment';
  price: number;
  image: string;
  seller?: string;
  targetCrop?: string;
  targetIssue?: string;
}

export interface MarketplaceListing {
  id: string;
  cropName: string;
  quantity: string;
  price: number;
  companyName: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface CalendarActivity {
  month: string;
  activity: string;
  type: 'Planting' | 'Fertilization' | 'Irrigation' | 'Harvesting' | 'Monitoring';
  description: string;
}

export interface CropCalendar {
  cropName: string;
  activities: CalendarActivity[];
}

export interface UserProfile {
  name: string;
  location: string;
  avatar: string;
  joinDate: string;
  phoneNumber: string;
}
