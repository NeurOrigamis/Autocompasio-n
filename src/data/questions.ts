import { SelfCompassionQuestion, DassQuestion } from '../types';

export const selfCompassionQuestions: SelfCompassionQuestion[] = [
  { id: 1, text: "Soy tolerante con mis propios defectos y limitaciones.", isReversed: false, subscale: "selfKindness" },
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
  { id: 13, text: "Cuando me enfrento a un fallo personal, trato de mantenerme calmado.", isReversed: false, subscale: "mindfulness" },
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

export const dassQuestions: DassQuestion[] = [
  { id: 1, text: "He tenido dificultad para relajarme", subscale: "stress" },
  { id: 2, text: "He sentido sequedad en la boca", subscale: "anxiety" },
  { id: 3, text: "No he podido sentir ningún entusiasmo por nada", subscale: "depression" },
  { id: 4, text: "He tenido dificultad para respirar (sin haber realizado esfuerzo físico)", subscale: "anxiety" },
  { id: 5, text: "He encontrado difícil iniciar cosas", subscale: "depression" },
  { id: 6, text: "He tendido a reaccionar de forma exagerada a las situaciones", subscale: "stress" },
  { id: 7, text: "He sentido temblor (por ejemplo, en las manos)", subscale: "anxiety" },
  { id: 8, text: "He sentido que estoy triste o deprimido", subscale: "depression" },
  { id: 9, text: "He sentido que me resultaba difícil relajarme", subscale: "stress" },
  { id: 10, text: "He tenido miedo sin razón aparente", subscale: "anxiety" },
  { id: 11, text: "He sentido que la vida no tiene sentido", subscale: "depression" },
  { id: 12, text: "He sentido que estaba inquieto/a", subscale: "stress" },
  { id: 13, text: "He tenido dificultad para tragar", subscale: "anxiety" },
  { id: 14, text: "No podía experimentar ningún sentimiento positivo", subscale: "depression" },
  { id: 15, text: "He sentido que estaba a punto de entrar en pánico", subscale: "anxiety" },
  { id: 16, text: "He sentido que no valía nada", subscale: "depression" },
  { id: 17, text: "He estado consciente de la acción de mi corazón sin haber hecho esfuerzo físico (por ejemplo, aumento del ritmo cardíaco, salto del corazón)", subscale: "anxiety" },
  { id: 18, text: "He sentido que estaba muy irritable", subscale: "stress" },
  { id: 19, text: "He sentido que tenía una actitud de indiferencia hacia todo", subscale: "depression" },
  { id: 20, text: "Me he sentido cercano a entrar en pánico", subscale: "anxiety" },
  { id: 21, text: "He sentido que era difícil calmarme", subscale: "stress" }
];

export const selfCompassionScaleLabels = [
  "Casi nunca",
  "Rara vez", 
  "A veces",
  "Frecuentemente",
  "Casi siempre"
];

export const dassScaleLabels = [
  "No me ha pasado nada de esto",
  "Me ha pasado en alguna medida o en ocasiones",
  "Me ha pasado en una medida considerable o muchas veces",
  "Me ha pasado mucho o casi siempre"
];