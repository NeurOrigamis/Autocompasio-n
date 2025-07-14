import React from 'react';
import { Heart, Brain, ArrowRight, Clock, BarChart3 } from 'lucide-react';
import { QuestionnaireType, UserInfo } from '../types';

interface QuestionnaireSelectorProps {
  userInfo: UserInfo;
  onSelect: (type: QuestionnaireType) => void;
}

export function QuestionnaireSelector({ userInfo, onSelect }: QuestionnaireSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Hola, {userInfo.name}
          </h1>
          <p className="text-gray-600 text-lg">
            Selecciona el cuestionario que deseas completar
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Cuestionario de Autocompasión */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Heart size={32} />
                <h2 className="text-2xl font-bold">Autocompasión</h2>
              </div>
              <p className="text-green-100">
                Evalúa tu capacidad de tratarte con amabilidad durante momentos difíciles
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock size={20} />
                  <span>Tiempo estimado: 8-10 minutos</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <BarChart3 size={20} />
                  <span>26 preguntas</span>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-800 mb-2">¿Qué mide?</h3>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Amabilidad hacia uno mismo</li>
                  <li>• Humanidad compartida</li>
                  <li>• Mindfulness</li>
                  <li>• Autojuicio, aislamiento y sobreidentificación</li>
                </ul>
              </div>

              <button
                onClick={() => onSelect('self-compassion')}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Comenzar Cuestionario
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Cuestionario DASS-21 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Brain size={32} />
                <h2 className="text-2xl font-bold">DASS-21</h2>
              </div>
              <p className="text-purple-100">
                Evalúa niveles de depresión, ansiedad y estrés durante la última semana
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock size={20} />
                  <span>Tiempo estimado: 5-7 minutos</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <BarChart3 size={20} />
                  <span>21 preguntas</span>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-purple-800 mb-2">¿Qué mide?</h3>
                <ul className="text-purple-700 text-sm space-y-1">
                  <li>• Síntomas depresivos</li>
                  <li>• Niveles de ansiedad</li>
                  <li>• Indicadores de estrés</li>
                  <li>• Estado emocional reciente</li>
                </ul>
              </div>

              <button
                onClick={() => onSelect('dass-21')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Comenzar Cuestionario
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Información importante</h3>
          <div className="text-gray-600 text-sm space-y-2">
            <p>• Estos cuestionarios son herramientas de evaluación psicológica validadas científicamente</p>
            <p>• Los resultados no constituyen un diagnóstico clínico</p>
            <p>• En caso de puntajes elevados, se recomienda consultar con un profesional de la salud mental</p>
            <p>• Responde con honestidad para obtener resultados más precisos</p>
          </div>
        </div>
      </div>
    </div>
  );
}