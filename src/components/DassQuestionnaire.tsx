import React, { useState } from 'react';
import { Brain, CheckCircle2, RotateCcw, ArrowLeft, AlertTriangle } from 'lucide-react';
import { dassQuestions, dassScaleLabels } from '../data/questions';
import { DassResults, UserInfo } from '../types';

interface DassQuestionnaireProps {
  userInfo: UserInfo;
  onBack: () => void;
  onComplete: (results: DassResults) => void;
}

export function DassQuestionnaire({ userInfo, onBack, onComplete }: DassQuestionnaireProps) {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<DassResults | null>(null);

  const progress = (Object.keys(answers).length / dassQuestions.length) * 100;

  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const getLevel = (score: number, type: 'depression' | 'anxiety' | 'stress'): string => {
    const cutoffs = {
      depression: { normal: 9, mild: 13, moderate: 20, severe: 27 },
      anxiety: { normal: 7, mild: 9, moderate: 14, severe: 19 },
      stress: { normal: 14, mild: 18, moderate: 25, severe: 33 }
    };

    const cut = cutoffs[type];
    if (score <= cut.normal) return 'Normal';
    if (score <= cut.mild) return 'Leve';
    if (score <= cut.moderate) return 'Moderada';
    if (score <= cut.severe) return 'Severa';
    return 'Extremadamente severa';
  };

  const getLevelColor = (level: string): string => {
    switch (level) {
      case 'Normal': return 'text-green-600';
      case 'Leve': return 'text-yellow-600';
      case 'Moderada': return 'text-orange-600';
      case 'Severa': return 'text-red-600';
      case 'Extremadamente severa': return 'text-red-800';
      default: return 'text-gray-600';
    }
  };

  const calculateResults = (): DassResults => {
    const subscaleScores = {
      depression: 0,
      anxiety: 0,
      stress: 0
    };

    const subscaleCounts = {
      depression: 0,
      anxiety: 0,
      stress: 0
    };

    dassQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer !== undefined) {
        subscaleScores[question.subscale] += answer;
        subscaleCounts[question.subscale]++;
      }
    });

    // Multiplicar por 2 para equiparar con DASS-42
    const depression = subscaleScores.depression * 2;
    const anxiety = subscaleScores.anxiety * 2;
    const stress = subscaleScores.stress * 2;

    return {
      depression,
      anxiety,
      stress,
      depressionLevel: getLevel(depression, 'depression'),
      anxietyLevel: getLevel(anxiety, 'anxiety'),
      stressLevel: getLevel(stress, 'stress')
    };
  };

  const handleEvaluate = () => {
    if (Object.keys(answers).length === dassQuestions.length) {
      const calculatedResults = calculateResults();
      setResults(calculatedResults);
      setShowResults(true);
      onComplete(calculatedResults);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setResults(null);
  };

  if (showResults && results) {
    const hasElevatedScores = results.depressionLevel !== 'Normal' || 
                             results.anxietyLevel !== 'Normal' || 
                             results.stressLevel !== 'Normal';

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <CheckCircle2 size={32} />
                Resultados DASS-21 - {userInfo.name}
              </h1>
              <p className="text-purple-100 mt-2">Evaluación de depresión, ansiedad y estrés</p>
            </div>

            <div className="p-8">
              {hasElevatedScores && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                  <div className="flex items-center">
                    <AlertTriangle className="text-yellow-400 mr-3" size={24} />
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-800">Importante</h3>
                      <p className="text-yellow-700">
                        Algunos de tus resultados indican niveles elevados. Te recomendamos consultar con un profesional de la salud mental.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">Depresión</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{results.depression}</div>
                    <div className={`text-lg font-semibold ${getLevelColor(results.depressionLevel)}`}>
                      {results.depressionLevel}
                    </div>
                  </div>
                  <div className="mt-4 bg-blue-200 rounded-full h-3">
                    <div 
                      className="bg-blue-500 rounded-full h-3 transition-all duration-1000"
                      style={{ width: `${Math.min((results.depression / 42) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-blue-700 mt-3">
                    Evalúa síntomas como tristeza, anhedonia, desesperanza y autovaloración negativa.
                  </p>
                </div>

                <div className="bg-red-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-red-800 mb-4">Ansiedad</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">{results.anxiety}</div>
                    <div className={`text-lg font-semibold ${getLevelColor(results.anxietyLevel)}`}>
                      {results.anxietyLevel}
                    </div>
                  </div>
                  <div className="mt-4 bg-red-200 rounded-full h-3">
                    <div 
                      className="bg-red-500 rounded-full h-3 transition-all duration-1000"
                      style={{ width: `${Math.min((results.anxiety / 42) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-red-700 mt-3">
                    Evalúa activación autonómica, miedo anticipatorio y síntomas físicos de hiperalerta.
                  </p>
                </div>

                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-orange-800 mb-4">Estrés</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">{results.stress}</div>
                    <div className={`text-lg font-semibold ${getLevelColor(results.stressLevel)}`}>
                      {results.stressLevel}
                    </div>
                  </div>
                  <div className="mt-4 bg-orange-200 rounded-full h-3">
                    <div 
                      className="bg-orange-500 rounded-full h-3 transition-all duration-1000"
                      style={{ width: `${Math.min((results.stress / 42) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-orange-700 mt-3">
                    Refleja niveles de tensión sostenida, irritabilidad e impaciencia.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h4 className="text-lg font-semibold mb-3">Interpretación de Niveles</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="font-semibold text-blue-800 mb-2">Depresión</h5>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Normal: 0-9</li>
                      <li>• Leve: 10-13</li>
                      <li>• Moderada: 14-20</li>
                      <li>• Severa: 21-27</li>
                      <li>• Extrema: 28+</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-red-800 mb-2">Ansiedad</h5>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Normal: 0-7</li>
                      <li>• Leve: 8-9</li>
                      <li>• Moderada: 10-14</li>
                      <li>• Severa: 15-19</li>
                      <li>• Extrema: 20+</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-orange-800 mb-2">Estrés</h5>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Normal: 0-14</li>
                      <li>• Leve: 15-18</li>
                      <li>• Moderada: 19-25</li>
                      <li>• Severa: 26-33</li>
                      <li>• Extrema: 34+</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h4 className="text-lg font-semibold mb-3">Consideraciones Importantes</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Este cuestionario no constituye un diagnóstico clínico</li>
                  <li>• Los resultados deben ser interpretados por profesionales de la salud mental</li>
                  <li>• En caso de puntajes moderados o altos, se recomienda evaluación especializada</li>
                  <li>• Si tienes pensamientos de autolesión, busca ayuda profesional inmediatamente</li>
                </ul>
              </div>

              <div className="mt-8 flex gap-4 justify-center">
                <button
                  onClick={onBack}
                  className="bg-gray-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-600 transition-all duration-300 flex items-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Volver al Inicio
                </button>
                <button
                  onClick={handleReset}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2"
                >
                  <RotateCcw size={20} />
                  Repetir Cuestionario
                </button>
              </div>

              <div className="mt-6 text-xs text-gray-500 text-center">
                <p>Basado en: Lovibond, S. H., & Lovibond, P. F. (1995). Psychology Foundation of Australia.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Brain size={32} />
                  Cuestionario DASS-21
                </h1>
                <p className="text-purple-100 mt-2">Hola {userInfo.name}, evalúa tu estado emocional de la última semana</p>
              </div>
              <button
                onClick={onBack}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Volver
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progreso del cuestionario</span>
                <span className="text-sm font-medium text-gray-700">{Object.keys(answers).length}/21</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full h-3 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 mb-6">
              <h2 className="font-semibold text-purple-800 mb-2">Instrucciones:</h2>
              <p className="text-purple-700">
                A continuación encontrarás una serie de afirmaciones. Lee cada una cuidadosamente y responde cuánto te ha afectado cada situación <strong>durante la última semana</strong>.
              </p>
            </div>

            <div className="space-y-6">
              {dassQuestions.map((question, index) => (
                <div key={question.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                  <div className="mb-4">
                    <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-3">
                      Pregunta {index + 1}
                    </span>
                    <p className="text-gray-800 font-medium leading-relaxed">{question.text}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {[0, 1, 2, 3].map((value) => (
                      <label
                        key={value}
                        className={`cursor-pointer p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                          answers[question.id] === value
                            ? 'border-purple-500 bg-purple-100 text-purple-800'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={value}
                          checked={answers[question.id] === value}
                          onChange={() => handleAnswerChange(question.id, value)}
                          className="sr-only"
                        />
                        <div className="text-center">
                          <div className="font-bold text-lg mb-1">{value}</div>
                          <div className="text-xs text-gray-600">{dassScaleLabels[value]}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleEvaluate}
                disabled={Object.keys(answers).length !== dassQuestions.length}
                className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  Object.keys(answers).length === dassQuestions.length
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={24} />
                  Evalúa mis Resultados
                </div>
              </button>
              
              {Object.keys(answers).length !== dassQuestions.length && (
                <p className="text-gray-500 mt-3">
                  Completa todas las preguntas para obtener tu evaluación
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}