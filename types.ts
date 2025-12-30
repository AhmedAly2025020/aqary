
export type Language = 'ar' | 'en';

export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface UnitAnalysisResponse {
  score: number;
  honestyScore: number;
  breakdown: {
    specs: number;
    location: number;
    valueForMoney: number;
  };
  pros: string[];
  cons: string[];
  redFlags: string[];
  summary: string;
}

export interface FairPriceResponse {
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  label: 'Overpriced' | 'Fair' | 'Undervalued';
  explanation: string;
  sources: GroundingSource[];
  estimatedROI?: string;
  rentalYield?: string;
}

export interface ProjectDetail {
  name: string;
  location: string;
  unitType: string;
  status: 'Delivered' | 'Under Construction' | 'Launched';
  deliveryAccuracy: string;
  finishingOption: string;
  expectedCompletion: string;
  challenges: string;
  constructionProgress: number; // 0-100 percentage
}

export interface DeveloperReliabilityResponse {
  score: number;
  breakdown: {
    punctuality: number;
    completion: number;
    specAdherence: number;
    legalStanding: number;
  };
  summary: string;
  projects: ProjectDetail[];
  sources: GroundingSource[];
}

export interface DecisionSimulationResponse {
  riskLevel: RiskLevel;
  lockInPeriod: string;
  worstCaseScenario: string;
  upsidePotential: string;
  recommendation: string;
}

export interface LegalAuditResponse {
  summary: string;
  riskPoints: {
    title: string;
    description: string;
    severity: 'Low' | 'Medium' | 'High';
    suggestedAction: string;
  }[];
  clarityNotes: string;
  disclaimer: string;
}

export enum UserStatus {
  PENDING = 'Pending',
  CONTACTED = 'Contacted',
  PAID = 'Paid',
  EXPIRED = 'Expired'
}

export interface UserLead {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  propertyType: 'Apartment' | 'Villa' | 'Investment' | 'Office' | 'Shop' | 'Medical Office';
  budgetRange: string;
  purpose: 'Living' | 'Investment';
  contactMethod: 'Phone' | 'WhatsApp';
  status: UserStatus;
  createdAt: number;
  activatedAt?: number;
}

export type AppView = 'LANDING' | 'FORM' | 'ADMIN' | 'USER_DASHBOARD' | 'PRICE_ENGINE' | 'DEVELOPER_SCORE' | 'SIMULATOR' | 'CONTRACT_AUDITOR' | 'UNIT_ANALYZER' | 'LOGIN';
