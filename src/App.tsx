import React, { useState } from 'react';
import { Heart, Brain, Users, Gauge, CheckCircle2, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  isReversed: boolean;
  subscale: string;
}

interface Results {
  selfKindness: number;
  selfJudgment: number;
  commonHumanity: number;
  isolation: number;
  mindfulness: number;
  overIdentification: number;
  totalScore: number;
}

const questions: Question[] = [
  { id: 1, text: "Soy tolerante con mis propios defectos y limitaciones.", isReversed: false, subscale: "other" },
  { id: 2, text: "Cuando algo doloroso me pasa, trato de mantener mis emociones en equilibrio.", isReversed: false, subscale: "mindfulness" },
  { id: 3, text: "Cuando me siento fracasado, tiendo a ser duro conmigo mismo.", isReversed: true, subscale: "selfJudgment" },
  { id: 4, text: "Cuando enfrento situaciones difíciles, me recuerdo que muchas personas también pasan por lo mismo.", isReversed: false, subscale: "commonHumanity" },
  { id: 5, text: "Tiendo a obsesionarme y a fijarme demasiado en cosas negativas que me han ocurrido.", isReversed: true, subscale: "overIdentification" },
  { id: 6, text: "Cuando me siento inadecuado de alguna manera, trato de ver mis defectos con amabilidad.", isReversed: false, subscale: "selfKindness" },
  { id: 7, text: "Cuando experimento emociones negativas, trato de mantener una perspectiva equilibrada.", isReversed: false, subscale: "mindfulness" },
  { id: 8, text: "Cuando pienso en mis errores, tiendo a sentirme aislado del resto del mundo.", isReversed: true, subscale: "isolation" },
  { id: 9, text: "Cuando estoy sufriendo, tiendo a culpabilizarme a mí mismo por todo.", isReversed: true, subscale: "selfJudgment" },
  { id: 10, text: "Cuando tengo dificultades, sé que no estoy solo en mi experiencia.", isReversed: false, subscale: "commonHumanity" },
  { id: 11, text: "Cuando me siento emocionalmente mal, trato de tomar distancia con mis emociones para no dejarme atrapar por ellas.", isReversed: false, subscale: "mindfulness" },
  { id: 12, text: "Cuando me siento mal conmigo mismo, tiendo a sentirme solo en mis fallas.", isReversed: true, subscale: "isolation" },
  { id: 13, text: "Cuando me enfrento a un fallo personal, trato de mantenerme calmado.", isReversed: false, subscale: "overIdentification" },
  { id: 14, text: "Cuando algo doloroso me sucede, tiendo a pensar que esto es solo mi problema.", isReversed: true, subscale: "isolation" },
  { id: 15, text: "Trato de ser comprensivo con aquellos aspectos de mí mismo que no me gustan.", isReversed: false, subscale: "selfKindness" },
  { id: 16, text: "Cuando me siento deprimido por algo que he hecho, tiendo a fijarme solo en mis errores.", isReversed: true, subscale: "selfJudgment" },
  { id: 17, text: "Cuando tengo dificultades, me doy cuenta de que lo que estoy sintiendo forma parte de la experiencia humana.", isReversed: false, subscale: "commonHumanity" },
  { id: 18, text: "Cuando me siento mal emocionalmente, me ayuda ver mis sentimientos con claridad.", isReversed: false, subscale: "mindfulness" },
  { id: 19, text: "Cuando me siento frustrado, tiendo a pensar que la mayoría de la gente está probablemente más feliz que yo.", isReversed: true, subscale: "isolation" },
  { id: 20, text: "Cuando cometo errores, tiendo a ser muy crítico conmigo mismo.", isReversed: true, subscale: "selfJudgment" },
  { id: 21, text: "Trato de mantener una actitud equilibrada frente a cosas que me molestan.", isReversed: false, subscale: "mindfulness" },
  { id: 22, text: "Cuando algo me duele, me esfuerzo por cuidarme de la mejor manera.", isReversed: false, subscale: "selfKindness" },
  { id: 23, text: "Cuando me siento mal conmigo mismo, pienso que los demás probablemente están llevando una vida mejor que yo.", isReversed: true, subscale: "isolation" },
  { id: 24, text: "Cuando las cosas van mal, me esfuerzo por ver los aspectos positivos.", isReversed: false, subscale: "selfKindness" },
  { id: 25, text: "Cuando tengo emociones difíciles, me permito sentirlas sin resistirme.", isReversed: false, subscale: "mindfulness" },
  { id: 26, text: "Cuando fallo en algo importante para mí, intento tratarme con comprensión en lugar de juzgarme severamente.", isReversed: false, subscale: "selfKindness" }
];

const scaleLabels = [
  "Casi nunca",
  "Rara vez", 
  "A veces",
  "Frecuentemente",
  "Casi siempre"
];

function App() {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<Results | null>(null);

  const progress = (Object.keys(answers).length / questions.length) * 100;

  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateResults = (): Results => {
    const subscaleScores: { [key: string]: number[] } = {
      selfKindness: [],
      selfJudgment: [],
      commonHumanity: [],
      isolation: [],
      mindfulness: [],
      overIdentification: []
    };

    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer !== undefined) {
        let score = answer;
        
        // Invertir puntuaciones de ítems negativos
        if (question.isReversed) {
          score = 6 - answer; // 1↔5, 2↔4, 3=3
        }

        if (question.subscale !== "other") {
          subscaleScores[question.subscale].push(score);
        }
      }
    });

    // Calcular promedios de cada subescala
    const selfKindness = subscaleScores.selfKindness.reduce((a, b) => a + b, 0) / subscaleScores.selfKindness.length;
    const selfJudgment = subscaleScores.selfJudgment.reduce((a, b) => a + b, 0) / subscaleScores.selfJudgment.length;
    const commonHumanity = subscaleScores.commonHumanity.reduce((a, b) => a + b, 0) / subscaleScores.commonHumanity.length;
    const isolation = subscaleScores.isolation.reduce((a, b) => a + b, 0) / subscaleScores.isolation.length;
    const mindfulness = subscaleScores.mindfulness.reduce((a, b) => a + b, 0) / subscaleScores.mindfulness.length;
    const overIdentification = subscaleScores.overIdentification.reduce((a, b) => a + b, 0) / subscaleScores.overIdentification.length;

    // Puntuación total (promedio de subescalas positivas + inverso de negativas)
    const totalScore = (selfKindness + commonHumanity + mindfulness + (6 - selfJudgment) + (6 - isolation) + (6 - overIdentification)) / 6;

    return {
      selfKindness,
      selfJudgment,
      commonHumanity,
      isolation,
      mindfulness,
      overIdentification,
      totalScore
    };
  };

  const handleEvaluate = () => {
    if (Object.keys(answers).length === questions.length) {
      const calculatedResults = calculateResults();
      setResults(calculatedResults);
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setResults(null);
  };

  const getScoreInterpretation = (score: number): { label: string; color: string } => {
    if (score >= 4) return { label: "Muy Alto", color: "text-green-600" };
    if (score >= 3.5) return { label: "Alto", color: "text-green-500" };
    if (score >= 3) return { label: "Moderado", color: "text-yellow-500" };
    if (score >= 2.5) return { label: "Bajo", color: "text-orange-500" };
    return { label: "Muy Bajo", color: "text-red-500" };
  };

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white">
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <CheckCircle2 size={32} />
                Resultados de Autocompasión
              </h1>
              <p className="text-blue-100 mt-2">Análisis completo de tu nivel de autocompasión</p>
            </div>

            <div className="p-8">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-6 text-white mb-8">
                <h2 className="text-2xl font-bold mb-2">Puntuación Total</h2>
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold">{results.totalScore.toFixed(2)}</div>
                  <div className="text-xl">{getScoreInterpretation(results.totalScore).label}</div>
                </div>
                <div className="mt-3 bg-white bg-opacity-20 rounded-full h-3">
                  <div 
                    className="bg-white rounded-full h-3 transition-all duration-1000"
                    style={{ width: `${(results.totalScore / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6 text-gray-800">Análisis por Dimensiones</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-green-600 flex items-center gap-2">
                    <Heart size={24} />
                    Aspectos Positivos
                  </h4>
                  
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Amabilidad hacia uno mismo</span>
                      <span className={`font-bold ${getScoreInterpretation(results.selfKindness).color}`}>
                        {results.selfKindness.toFixed(2)}
                      </span>
                    </div>
                    <div className="bg-green-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 rounded-full h-2 transition-all duration-1000"
                        style={{ width: `${(results.selfKindness / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Humanidad compartida</span>
                      <span className={`font-bold ${getScoreInterpretation(results.commonHumanity).color}`}>
                        {results.commonHumanity.toFixed(2)}
                      </span>
                    </div>
                    <div className="bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 rounded-full h-2 transition-all duration-1000"
                        style={{ width: `${(results.commonHumanity / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Mindfulness</span>
                      <span className={`font-bold ${getScoreInterpretation(results.mindfulness).color}`}>
                        {results.mindfulness.toFixed(2)}
                      </span>
                    </div>
                    <div className="bg-purple-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 rounded-full h-2 transition-all duration-1000"
                        style={{ width: `${(results.mindfulness / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-red-600 flex items-center gap-2">
                    <Brain size={24} />
                    Aspectos a Mejorar
                  </h4>
                  
                  <div className="bg-red-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Autojuicio</span>
                      <span className={`font-bold ${getScoreInterpretation(6 - results.selfJudgment).color}`}>
                        {results.selfJudgment.toFixed(2)}
                      </span>
                    </div>
                    <div className="bg-red-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 rounded-full h-2 transition-all duration-1000"
                        style={{ width: `${(results.selfJudgment / 5) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Puntuación más baja indica mejor resultado</p>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Aislamiento</span>
                      <span className={`font-bold ${getScoreInterpretation(6 - results.isolation).color}`}>
                        {results.isolation.toFixed(2)}
                      </span>
                    </div>
                    <div className="bg-orange-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 rounded-full h-2 transition-all duration-1000"
                        style={{ width: `${(results.isolation / 5) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Puntuación más baja indica mejor resultado</p>
                  </div>

                  <div className="bg-yellow-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Sobreidentificación</span>
                      <span className={`font-bold ${getScoreInterpretation(6 - results.overIdentification).color}`}>
                        {results.overIdentification.toFixed(2)}
                      </span>
                    </div>
                    <div className="bg-yellow-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 rounded-full h-2 transition-all duration-1000"
                        style={{ width: `${(results.overIdentification / 5) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Puntuación más baja indica mejor resultado</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-3">Interpretación de Resultados</h4>
                <p className="text-gray-700 leading-relaxed">
                  La autocompasión es la capacidad de tratarse a uno mismo con amabilidad durante momentos difíciles. 
                  Una puntuación total más alta indica mayor autocompasión. Las dimensiones positivas (amabilidad, 
                  humanidad compartida, mindfulness) reflejan aspectos saludables, mientras que las negativas 
                  (autojuicio, aislamiento, sobreidentificación) representan patrones que conviene reducir.
                </p>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={handleReset}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
                >
                  <RotateCcw size={20} />
                  Realizar Nueva Evaluación
                </button>
              </div>

              <div className="mt-6 text-xs text-gray-500 text-center">
                <p>Basado en: Neff, K. D. (2003). Self and Identity, 2(3), 223–250.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Heart size={32} />
              Cuestionario de Autocompasión
            </h1>
            <p className="text-blue-100 mt-2">Evalúa tu nivel de autocompasión con este instrumento científicamente validado</p>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progreso del cuestionario</span>
                <span className="text-sm font-medium text-gray-700">{Object.keys(answers).length}/26</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 rounded-full h-3 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <h2 className="font-semibold text-blue-800 mb-2">Instrucciones:</h2>
              <p className="text-blue-700">
                Por favor, lea cada afirmación cuidadosamente y marque la opción que mejor describa con qué frecuencia se siente de esa manera.
              </p>
            </div>

            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                  <div className="mb-4">
                    <span className="inline-block bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-3">
                      Pregunta {index + 1}
                    </span>
                    <p className="text-gray-800 font-medium leading-relaxed">{question.text}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <label
                        key={value}
                        className={`cursor-pointer p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                          answers[question.id] === value
                            ? 'border-blue-500 bg-blue-100 text-blue-800'
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
                          <div className="text-xs text-gray-600">{scaleLabels[value - 1]}</div>
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
                disabled={Object.keys(answers).length !== questions.length}
                className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  Object.keys(answers).length === questions.length
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Gauge size={24} />
                  Evalúa mi Autocompasión
                </div>
              </button>
              
              {Object.keys(answers).length !== questions.length && (
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

export default App;