
import { GoogleGenAI, Type } from "@google/genai";
import { FairPriceResponse, DeveloperReliabilityResponse, DecisionSimulationResponse, GroundingSource, LegalAuditResponse, UnitAnalysisResponse } from "../types";

// Production Utility: Trims text to prevent token overhead
const trimText = (text: string, max: number = 2000) => text.trim().substring(0, max);

// Production Utility: Exponential Backoff Retry logic for Rate Limiting (CRITICAL FOR ADS)
const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
const callWithRetry = async (fn: () => Promise<any>, retries = 5): Promise<any> => {
  try {
    return await fn();
  } catch (e: any) {
    if (retries > 0 && (e.message?.includes('429') || e.message?.includes('500') || e.message?.includes('quota'))) {
      const waitTime = (6 - retries) * 2000; // زيادة وقت الانتظار تدريجياً
      await sleep(waitTime); 
      return callWithRetry(fn, retries - 1);
    }
    throw e;
  }
};

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const extractSources = (response: any): GroundingSource[] => {
  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return chunks
    .filter((chunk: any) => chunk.web)
    .map((chunk: any) => ({
      uri: chunk.web.uri,
      title: chunk.web.title,
    }));
};

export const analyzeUnitDescription = async (description: string): Promise<UnitAnalysisResponse> => {
  const prompt = `[CONTEXT: EGYPT REAL ESTATE MARKET 2025 - HIGH PRECISION AUDIT] 
  Analyze this unit description for a professional investor: "${trimText(description)}". 
  STRICT: Evaluate loading factor (نسبة التحميل), actual orientation (بحري/قبلي), and current EGP market value relevance.
  Detect marketing traps (over-promising, vague delivery).
  Return JSON with: score (0-100), honestyScore (0-100), breakdown{specs(0-100), location(0-100), valueForMoney(0-100)}, pros[], cons[], redFlags[], summary.`;

  return callWithRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });
    const parsed = JSON.parse(response.text || '{}');
    return {
      score: parsed.score ?? 0,
      honestyScore: parsed.honestyScore ?? 0,
      breakdown: {
        specs: parsed.breakdown?.specs ?? 0,
        location: parsed.breakdown?.location ?? 0,
        valueForMoney: parsed.breakdown?.valueForMoney ?? 0,
      },
      pros: parsed.pros ?? [],
      cons: parsed.cons ?? [],
      redFlags: parsed.redFlags ?? [],
      summary: parsed.summary ?? "Audit incomplete."
    };
  });
};

export const getFairPriceEstimation = async (params: {
  location: string;
  unitType: string;
  area: number;
  deliveryDate: string;
}): Promise<FairPriceResponse> => {
  const prompt = `[STRICT: USE LATEST 2025 EGP DEVALUATION DATA - NEUTRAL ADVISORY]
  Estimate fair market value for ${params.unitType} in ${params.location}, Egypt. 
  Area: ${params.area}sqm. Delivery: ${params.deliveryDate}.
  Search for recent secondary market resale prices (actual closed deals) in ${params.location} from Q4 2024 to present.
  Return JSON: minPrice, maxPrice, avgPrice, label (Overpriced/Fair/Undervalued), explanation, rentalYield, estimatedROI.`;

  return callWithRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { tools: [{ googleSearch: {} }], responseMimeType: "application/json" },
    });
    const parsed = JSON.parse(response.text || '{}');
    return {
      minPrice: parsed.minPrice ?? 0,
      maxPrice: parsed.maxPrice ?? 0,
      avgPrice: parsed.avgPrice ?? 0,
      label: parsed.label ?? 'Fair',
      explanation: parsed.explanation ?? "Pricing audit unavailable.",
      rentalYield: parsed.rentalYield ?? "N/A",
      estimatedROI: parsed.estimatedROI ?? "N/A",
      sources: extractSources(response)
    };
  });
};

export const getDeveloperReliability = async (developerName: string): Promise<DeveloperReliabilityResponse> => {
  const prompt = `[AUDIT REPORT: EGYPT 2025 DEVELOPER INTEGRITY] Developer: ${developerName}. 
  Audit recent 2024/2025 performance, specifically construction speed, delivery accuracy, and any legal disputes or complaints in Egypt.
  Return JSON with: score, breakdown{punctuality, completion, specAdherence, legalStanding}, summary, projects[{name, location, unitType, status, deliveryAccuracy, finishingOption, expectedCompletion, challenges, constructionProgress}].`;

  return callWithRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { tools: [{ googleSearch: {} }], responseMimeType: "application/json" },
    });
    const parsed = JSON.parse(response.text || '{}');
    return {
      score: parsed.score ?? 0,
      breakdown: {
        punctuality: parsed.breakdown?.punctuality ?? 0,
        completion: parsed.breakdown?.completion ?? 0,
        specAdherence: parsed.breakdown?.specAdherence ?? 0,
        legalStanding: parsed.breakdown?.legalStanding ?? 0,
      },
      summary: parsed.summary ?? "Audit incomplete.",
      projects: parsed.projects ?? [],
      sources: extractSources(response)
    };
  });
};

export const getDecisionSimulation = async (params: {
  scenario: string;
  budget: number;
  duration: string;
}): Promise<DecisionSimulationResponse> => {
  const prompt = `[INVESTMENT SIMULATOR: EGYPT REAL ESTATE 2025] 
  Simulate this investment scenario: "${params.scenario}" with a budget of ${params.budget} EGP over a ${params.duration} horizon.
  Evaluate the feasibility, potential ROI, and risks specifically for the Egyptian market context including EGP volatility.
  Return JSON with: riskLevel (Low/Medium/High), lockInPeriod, worstCaseScenario, upsidePotential, recommendation.`;

  return callWithRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });
    const parsed = JSON.parse(response.text || '{}');
    return {
      riskLevel: parsed.riskLevel ?? 'Medium',
      lockInPeriod: parsed.lockInPeriod ?? "N/A",
      worstCaseScenario: parsed.worstCaseScenario ?? "Data unavailable.",
      upsidePotential: parsed.upsidePotential ?? "N/A",
      recommendation: parsed.recommendation ?? "Consult a financial advisor."
    };
  });
};

export const analyzeContractDocument = async (base64: string, mimeType: string): Promise<LegalAuditResponse> => {
  const prompt = `[LEGAL AUDIT: EGYPT PROPERTY LAW 2025]
  Audit this property contract document image. Identify predatory clauses, risks regarding delivery delays, maintenance fee transparency issues, and legal loopholes in Egypt's current regulations.
  Return JSON with: summary, riskPoints[{title, description, severity('Low' | 'Medium' | 'High'), suggestedAction}], clarityNotes, disclaimer.`;

  const imagePart = {
    inlineData: {
      data: base64,
      mimeType: mimeType,
    },
  };

  return callWithRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: { parts: [imagePart, { text: prompt }] },
      config: { responseMimeType: "application/json" },
    });
    const parsed = JSON.parse(response.text || '{}');
    return {
      summary: parsed.summary ?? "Legal audit unavailable.",
      riskPoints: parsed.riskPoints ?? [],
      clarityNotes: parsed.clarityNotes ?? "N/A",
      disclaimer: parsed.disclaimer ?? "This is not formal legal advice."
    };
  });
};
