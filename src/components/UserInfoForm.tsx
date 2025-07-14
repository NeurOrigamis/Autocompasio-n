import React, { useState } from 'react';
import { User, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { UserInfo } from '../types';

interface UserInfoFormProps {
  onSubmit: (userInfo: UserInfo) => void;
}

export function UserInfoForm({ onSubmit }: UserInfoFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Lista de dominios válidos comunes
  const validDomains = [
    // Proveedores principales
    'gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com',
    'live.com', 'msn.com', 'aol.com', 'protonmail.com', 'zoho.com',
    
    // Dominios educativos comunes
    'edu', 'ac.uk', 'edu.mx', 'edu.co', 'edu.ar', 'edu.pe', 'edu.cl',
    'unam.mx', 'itesm.mx', 'udg.mx', 'uabc.mx', 'uanl.mx',
    
    // Dominios gubernamentales
    'gov', 'gob.mx', 'gov.co', 'gov.ar', 'gov.pe', 'gov.cl',
    
    // Dominios corporativos comunes
    'company.com', 'corp.com', 'inc.com', 'ltd.com', 'sa.com',
    'microsoft.com', 'google.com', 'apple.com', 'amazon.com',
    'facebook.com', 'twitter.com', 'linkedin.com', 'adobe.com',
    'oracle.com', 'ibm.com', 'hp.com', 'dell.com', 'intel.com'
  ];

  const validateEmail = (emailValue: string): boolean => {
    // Validación básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError('Por favor ingresa un formato de correo válido');
      return false;
    }

    // Extraer el dominio del email
    const domain = emailValue.split('@')[1]?.toLowerCase();
    if (!domain) {
      setEmailError('Por favor ingresa un correo válido');
      return false;
    }

    // Verificar si es un dominio válido conocido
    const isValidDomain = validDomains.some(validDomain => {
      // Verificar coincidencia exacta o si termina con el dominio (para subdominios)
      return domain === validDomain || domain.endsWith('.' + validDomain);
    });

    // Verificar patrones de dominios corporativos comunes
    const corporatePatterns = [
      /\.com$/,
      /\.org$/,
      /\.net$/,
      /\.edu$/,
      /\.gov$/,
      /\.mil$/,
      /\.int$/,
      /\.co\.[a-z]{2}$/,
      /\.com\.[a-z]{2}$/,
      /\.org\.[a-z]{2}$/,
      /\.edu\.[a-z]{2}$/,
      /\.gov\.[a-z]{2}$/
    ];

    const hasValidPattern = corporatePatterns.some(pattern => pattern.test(domain));

    if (!isValidDomain && !hasValidPattern) {
      setEmailError('Por favor usa un correo de un proveedor reconocido (Gmail, Outlook, Yahoo) o corporativo');
      return false;
    }

    // Verificar que no sea un dominio temporal o sospechoso
    const suspiciousDomains = [
      '10minutemail.com', 'tempmail.org', 'guerrillamail.com',
      'mailinator.com', 'throwaway.email', 'temp-mail.org'
    ];

    if (suspiciousDomains.includes(domain)) {
      setEmailError('Por favor usa un correo permanente');
      return false;
    }

    setEmailError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    
    if (emailValue.trim()) {
      validateEmail(emailValue.trim());
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    
    if (trimmedName && trimmedEmail && validateEmail(trimmedEmail)) {
      onSubmit({ name: trimmedName, email: trimmedEmail });
    }
  };

  const isValid = name.trim().length > 0 && 
                  email.trim().length > 0 && 
                  !emailError && 
                  email.includes('@');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Bienvenido/a
          </h1>
          <p className="text-gray-600">
            Para comenzar, necesitamos algunos datos básicos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Ingresa tu nombre completo"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                  emailError 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="tu@email.com"
                required
              />
              {emailError && (
                <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" size={20} />
              )}
            </div>
            {emailError && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={16} />
                {emailError}
              </p>
            )}
            <div className="mt-2 text-xs text-gray-500">
              <p>Ejemplos válidos: usuario@gmail.com, nombre@empresa.com, estudiante@universidad.edu</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
              isValid
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continuar
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-500 text-center">
          <p>Tus datos se utilizarán únicamente para personalizar tu experiencia</p>
          <p className="mt-1">Aceptamos correos de Gmail, Outlook, Yahoo y dominios corporativos</p>
        </div>
      </div>
    </div>
  );
}