"use client";

import { useState } from "react";
import { analyzeHumanImage, predictDecision, simulateDecision, recommendDecision } from "@/lib/decisionApi";

// Types based on backend API structure
type ReportData = any;
type PredictionData = any;
type RecommendationData = any;
type SimulationData = any;

export default function DecisionIntelligenceDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [recommendation, setRecommendation] = useState<RecommendationData | null>(null);
  const [simulation, setSimulation] = useState<SimulationData | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Helper functions
  function getOutcomeLabel(outcome: string): string {
    // Map decision modes to outcome labels
    const modeMap: Record<string, string> = {
      fast_intuitive: "LIKELY CLICK",
      slow_analytical: "HESITANT",
      overwhelmed: "HESITANT",
      skeptical: "LIKELY BOUNCE",
    };
    
    // Map outcome values
    const outcomeMap: Record<string, string> = {
      LIKELY_CLICK: "LIKELY CLICK",
      HESITANT: "HESITANT",
      LIKELY_BOUNCE: "LIKELY BOUNCE",
    };
    
    // Check mode map first, then outcome map, then return as-is
    return modeMap[outcome] || outcomeMap[outcome] || outcome.toUpperCase().replace(/_/g, " ");
  }

  function getOutcomeColor(): string {
    return "text-blue-400 border-blue-400/30 bg-blue-400/10";
  }

  function formatConfidence(confidence?: string): string {
    if (!confidence) return "Medium";
    return confidence;
  }

  // Handle file selection
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  }

  // Handle analyze click
  async function handleAnalyze() {
    if (!file) {
      setError("Please select an image file");
      return;
    }

    setLoading(true);
    setError(null);
    setReport(null);
    setPrediction(null);
    setRecommendation(null);
    setSimulation(null);

    try {
      // Step 1: Analyze image
      const reportData = await analyzeHumanImage(file);
      setReport(reportData);

      // Step 2: Predict decision
      const predictionPayload = {
        evidence: reportData.evidence,
        decision_model: reportData.decision_model,
      };
      const predictionData = await predictDecision(predictionPayload);
      setPrediction(predictionData);

      // Step 3: Get recommendation (optional, may not be needed if report already contains recommendations)
      if (reportData.report_id && !reportData.quick_wins) {
        try {
          const recommendationPayload = {
            report_id: reportData.report_id,
            max_actions: 3,
          };
          const recommendationData = await recommendDecision(recommendationPayload);
          setRecommendation(recommendationData);
        } catch (err) {
          // Recommendation API may not exist, that's OK
          console.warn("Recommendation API not available:", err);
        }
      } else if (reportData.quick_wins) {
        // Use quick_wins from report as recommendations
        setRecommendation({ primary_recommendation: reportData.quick_wins[0] });
      }
    } catch (err: any) {
      setError(err.message || "Failed to analyze. Please try again.");
      console.error("Analysis error:", err);
    } finally {
      setLoading(false);
    }
  }

  // Handle what-if simulation
  async function handleSimulate() {
    if (!report?.report_id || isSimulating) return;

    setIsSimulating(true);
    setError(null);

    try {
      const simulationPayload = {
        base_report_id: report.report_id,
        scenarios: [
          {
            id: "trust_boost",
            changes: { trust_signal: "high" },
          },
        ],
      };
      const simulationData = await simulateDecision(simulationPayload);
      
      // Store only best scenario
      if (simulationData.best_scenario) {
        setSimulation(simulationData.best_scenario);
      }
    } catch (err: any) {
      setError(err.message || "Failed to simulate. Please try again.");
      console.error("Simulation error:", err);
    } finally {
      setIsSimulating(false);
    }
  }

  // Map API data to UI
  // API response has decision_mode at root level, not nested in decision_model
  const predictedOutcome =
    prediction?.predicted_outcome || report?.decision_mode || null;
  const probability =
    prediction?.probability ?? report?.decision_machine?.confidence ?? report?.confidence ?? 0.5;
  const dominantBlocker = report?.verdict?.primary_blocker || report?.primary_blocker || null;
  const drivers = report?.decision_machine?.drivers || report?.drivers || null;
  const primaryFriction =
    report?.decision_machine?.frictions?.[0] || report?.frictions?.[0] || null;
  const verdictSummary = report?.verdict?.summary || report?.summary || null;
  const primaryRecommendation =
    recommendation?.primary_recommendation || recommendation?.recommendations?.[0] || report?.quick_wins?.[0] || null;
  const bestScenario = simulation || null;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* File Upload Section */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold mb-4">Upload Image for Analysis</h2>
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-400/20 file:text-blue-400 hover:file:bg-blue-400/30"
            />
            <button
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="w-full py-4 px-6 rounded-xl border border-blue-400/50 bg-blue-400/10 hover:bg-blue-400/20 transition text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="rounded-2xl border border-red-400/50 bg-red-400/10 p-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* 1. HERO BLOCK */}
        {predictedOutcome && probability !== undefined && probability !== null && (
          <div className={`rounded-3xl border-2 ${getOutcomeColor()} p-12 text-center`}>
            <div className="space-y-6">
              <h1 className="text-5xl font-bold tracking-tight">
                {getOutcomeLabel(predictedOutcome)}
              </h1>

              {/* Probability bar */}
              <div className="max-w-md mx-auto">
                <div className="h-8 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-400 transition-all"
                    style={{ width: `${probability * 100}%` }}
                  />
                </div>
                <p className="text-2xl font-semibold mt-4">
                  {Math.round(probability * 100)}%
                </p>
              </div>

              {/* Dominant blocker */}
              <p className="text-xl text-white/80">{dominantBlocker}</p>
            </div>
          </div>
        )}

        {/* 2. DECISION FLOW SECTION */}
        {(drivers || primaryFriction) && (
          <div className="space-y-8">
            {/* Drivers */}
            {drivers && (
              <div className="space-y-6">
                {drivers.pain_urgency !== undefined && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/70">Pain Urgency</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-400/60 rounded-full"
                        style={{ width: `${drivers.pain_urgency * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {drivers.price_shock !== undefined && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/70">Price Shock</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-400/60 rounded-full"
                        style={{ width: `${drivers.price_shock * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {drivers.trust_signal !== undefined && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/70">Trust Signal</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-400/60 rounded-full"
                        style={{ width: `${drivers.trust_signal * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Arrow */}
            {primaryFriction && (
              <div className="flex justify-center py-4">
                <div className="text-4xl text-white/40">↓</div>
              </div>
            )}

            {/* Primary Friction */}
            {primaryFriction && (
              <div className="rounded-2xl border-2 border-blue-400/50 bg-blue-400/10 p-6 text-center">
                <p className="text-xl font-semibold">{primaryFriction}</p>
              </div>
            )}
          </div>
        )}

        {/* 3. WHY USERS HESITATE CARD */}
        {verdictSummary && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold mb-4">Why users hesitate</h2>
            <p className="text-lg text-white/80 leading-relaxed">{verdictSummary}</p>
          </div>
        )}

        {/* 4. WHAT-IF SIMULATION */}
        {report?.report_id && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="w-full py-4 px-6 rounded-xl border border-blue-400/50 bg-blue-400/10 hover:bg-blue-400/20 transition text-lg font-medium disabled:opacity-50"
            >
              {isSimulating ? "Simulating..." : "If trust is reinforced"}
            </button>

            {bestScenario && (
              <div className="mt-6 space-y-4 p-6 rounded-xl border border-blue-400/30 bg-blue-400/10">
                <div>
                  <p className="text-sm text-white/70 mb-1">New predicted outcome</p>
                  <p className="text-xl font-semibold">
                    {getOutcomeLabel(bestScenario.predicted_outcome)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white/70 mb-1">New probability</p>
                  <p className="text-2xl font-bold">
                    {Math.round(bestScenario.probability * 100)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white/70 mb-1">Delta</p>
                  <p className="text-xl font-semibold text-blue-400">
                    +{Math.round(bestScenario.lift || 0)}%
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. AI RECOMMENDATION */}
        {primaryRecommendation && (
          <div className="rounded-3xl border-2 border-blue-400/50 bg-blue-400/10 p-10">
            <h2 className="text-2xl font-bold mb-6">AI Recommendation — First Action</h2>

            <div className="space-y-4 mb-6">
              <p className="text-lg text-white/90 leading-relaxed">
                {primaryRecommendation.action || primaryRecommendation.description || primaryRecommendation}
              </p>
              {primaryRecommendation.reason && (
                <p className="text-base text-white/70 leading-relaxed">
                  {primaryRecommendation.reason}
                </p>
              )}
              {primaryRecommendation.why_it_works && (
                <p className="text-base text-white/70 leading-relaxed">
                  {primaryRecommendation.why_it_works}
                </p>
              )}
            </div>

            {(primaryRecommendation.expected_lift !== undefined || primaryRecommendation.confidence) && (
              <div className="flex items-center gap-6 pt-6 border-t border-white/10">
                {primaryRecommendation.expected_lift !== undefined && (
                  <div>
                    <p className="text-sm text-white/70 mb-1">Expected lift</p>
                    <p className="text-2xl font-bold text-blue-400">
                      +{Math.round(primaryRecommendation.expected_lift || 0)}%
                    </p>
                  </div>
                )}
                {primaryRecommendation.confidence && (
                  <div>
                    <p className="text-sm text-white/70 mb-1">Confidence</p>
                    <p className="text-xl font-semibold">
                      {formatConfidence(primaryRecommendation.confidence)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 6. CONFIDENCE STRIP */}
        {report?.metadata && (
          <div className="flex items-center justify-center gap-8 py-6 text-sm text-white/50 border-t border-white/10">
            {report.metadata.sample_size && (
              <span>Sample size: {report.metadata.sample_size}</span>
            )}
            {report.metadata.brain_version && (
              <span>Brain version: {report.metadata.brain_version}</span>
            )}
            {report.metadata.prediction_accuracy !== undefined && (
              <span>
                Prediction accuracy: {Math.round(report.metadata.prediction_accuracy * 100)}%
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
