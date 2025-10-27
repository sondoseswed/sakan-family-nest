"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  User,
  Heart,
  Brain,
  Target,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import { useRouter } from "next/navigation";

const PersonalityAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [personalityResult, setPersonalityResult] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const router = useRouter();
  const questions = [
    {
      id: 1,
      text: "كيف تفضل قضاء عطلة نهاية الأسبوع؟",
      category: "social",
      options: [
        { value: "E", text: "في تجمع مع الأصدقاء والعائلة" },
        { value: "I", text: "في المنزل أقرأ كتاب أو أشاهد فيلم" },
        { value: "E", text: "في نشاطات اجتماعية جديدة" },
        { value: "I", text: "في هواية شخصية أحبها" },
      ],
    },
    {
      id: 2,
      text: "عند اتخاذ قرارات مهمة، ما الذي تعتمد عليه أكثر؟",
      category: "thinking",
      options: [
        { value: "T", text: "المنطق والحقائق الموضوعية" },
        { value: "F", text: "مشاعري وما أحس أنه صحيح" },
        { value: "T", text: "التحليل والبيانات المتاحة" },
        { value: "F", text: "تأثير القرار على الآخرين" },
      ],
    },
    {
      id: 3,
      text: "كيف تتعامل مع المعلومات الجديدة؟",
      category: "sensing",
      options: [
        { value: "S", text: "أركز على التفاصيل والحقائق المحددة" },
        { value: "N", text: "أبحث عن الأنماط والإمكانيات المستقبلية" },
        { value: "S", text: "أطبق ما تعلمته عملياً" },
        { value: "N", text: "أتخيل كيف يمكن تطوير هذه المعلومات" },
      ],
    },
    {
      id: 4,
      text: "في العلاقات الشخصية، أنت شخص:",
      category: "social",
      options: [
        { value: "E", text: "منفتح وأشارك مشاعري بسهولة" },
        { value: "I", text: "أحتاج وقت لأثق وأنفتح مع الآخرين" },
        { value: "E", text: "أحب التعبير عن نفسي علناً" },
        { value: "I", text: "أفضل المحادثات العميقة الخاصة" },
      ],
    },
    {
      id: 5,
      text: "كيف تخطط لمستقبلك؟",
      category: "judging",
      options: [
        { value: "J", text: "أضع خطط واضحة وألتزم بها" },
        { value: "P", text: "أتكيف مع الظروف وأتخذ قرارات حين الحاجة" },
        { value: "J", text: "أحب أن يكون كل شيء منظم ومخطط له" },
        { value: "P", text: "أفضل المرونة والخيارات المفتوحة" },
      ],
    },
  ];

  const personalityTypes = {
    ESTJ: {
      name: "المنفذ",
      description: "شخصية قيادية منظمة تحب النظام والتخطيط",
      traits: ["قيادي", "منظم", "عملي", "مسؤول"],
      compatibility: ["ISFP", "ISTP", "ESFP", "ESTP"],
      strengths: [
        "التنظيم الممتاز",
        "القيادة الطبيعية",
        "الالتزام بالمسؤوليات",
      ],
      challenges: ["قد يكون صارماً جداً", "يحتاج للمرونة أحياناً"],
    },
    ISFP: {
      name: "الفنان",
      description: "شخصية حساسة ومبدعة تقدر الجمال والانسجام",
      traits: ["مبدع", "حساس", "مرن", "متفهم"],
      compatibility: ["ESTJ", "ESFJ", "ENFJ", "ENTJ"],
      strengths: ["التعاطف العالي", "الإبداع", "التكيف مع المواقف"],
      challenges: ["قد يتجنب الصراعات", "يحتاج للتشجيع للتعبير عن رأيه"],
    },
  };

  const calculatePersonality = () => {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    Object.values(answers).forEach((answer: any) => {
      scores[answer]++;
    });

    const type =
      (scores.E > scores.I ? "E" : "I") +
      (scores.S > scores.N ? "S" : "N") +
      (scores.T > scores.F ? "T" : "F") +
      (scores.J > scores.P ? "J" : "P");

    return (
      personalityTypes[type] || {
        name: "نمط شخصي فريد",
        description: "شخصيتك تحمل مزيج متميز من الصفات",
        traits: ["متوازن", "متنوع", "مرن", "متكيف"],
        compatibility: ["متوافق مع أنماط متنوعة"],
        strengths: ["التوازن في الشخصية", "القدرة على التكيف"],
        challenges: ["قد يحتاج لتحديد أولوياته أكثر"],
      }
    );
  };

  const handleAnswer = (value: any) => {
    const actualValue = value.split("-")[1];
    setCurrentAnswer(value);
  };

  const nextQuestion = () => {
    if (currentAnswer) {
      const actualValue = currentAnswer.split("-")[1];
      const newAnswers = { ...answers, [currentQuestion]: actualValue };
      setAnswers(newAnswers);
      setCurrentAnswer("");

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setPersonalityResult(calculatePersonality());
        setShowResults(true);
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const prevAnswer = answers[currentQuestion - 1];
      if (prevAnswer) {
        const prevQuestionData = questions[currentQuestion - 1];
        const optionIndex = prevQuestionData.options.findIndex(
          (opt) => opt.value === prevAnswer
        );
        setCurrentAnswer(`${optionIndex}-${prevAnswer}`);
      } else {
        setCurrentAnswer("");
      }
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setPersonalityResult(null);
    setCurrentAnswer("");
  };

  const goBack = () => {
    router.back();
  };

  const progress = (Object.keys(answers).length / questions.length) * 100;

  if (showResults && personalityResult) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 p-6"
        dir="rtl"
      >
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6 border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-t-lg">
              <div className="flex items-center justify-center mb-4">
                <Heart className="w-12 h-12 mr-3" />
                <CardTitle className="text-3xl font-bold">
                  نتائج اختبار الشخصية
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  <User className="w-16 h-16" />
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">
                  {personalityResult.name}
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  {personalityResult.description}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {personalityResult.traits.map((trait, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-lg px-4 py-2 bg-gradient-to-r from-rose-100 to-purple-100 text-purple-800"
                    >
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Target className="w-6 h-6 mr-2" />
                      نقاط القوة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {personalityResult.strengths.map((strength, index) => (
                        <li
                          key={index}
                          className="flex items-center text-gray-700"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <Brain className="w-6 h-6 mr-2" />
                      مجالات التطوير
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {personalityResult.challenges.map((challenge, index) => (
                        <li
                          key={index}
                          className="flex items-center text-gray-700"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-8 bg-gradient-to-r from-purple-50 to-rose-50 border-0">
                <CardHeader>
                  <CardTitle className="text-purple-700 flex items-center justify-center">
                    <Heart className="w-6 h-6 mr-2" />
                    الأنماط المتوافقة معك
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap justify-center gap-3">
                    {personalityResult.compatibility.map((type, index) => (
                      <Badge
                        key={index}
                        className="text-lg px-6 py-3 bg-gradient-to-r from-purple-500 to-rose-500 text-white"
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-center text-gray-600 mt-4">
                    هذه الأنماط تتناسب مع شخصيتك وقد تكون أساس لعلاقة متوازنة
                  </p>
                </CardContent>
              </Card>

              <div className="flex justify-center space-x-4 mt-8">
                <Button
                  onClick={resetTest}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 text-lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  إعادة الاختبار
                </Button>
                <Button
                  onClick={goBack}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  العودة للقائمة
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 p-6"
      dir="rtl"
    >
      <div className="max-w-3xl mx-auto">
        <Card className="mb-6 border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <Button
                // onClick={onBack}
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center">
                <Heart className="w-10 h-10 mr-3" />
                <CardTitle className="text-2xl font-bold">
                  اختبار الشخصية - سكن
                </CardTitle>
              </div>
              <div></div>
            </div>
            <div className="text-sm opacity-90 mt-2">
              اكتشف شخصيتك لتجد الشريك المناسب
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-700">
                  السؤال {currentQuestion + 1} من {questions.length}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(progress)}% مكتمل
                </span>
              </div>
              <Progress value={progress} className="h-3 bg-gray-200">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-purple-600 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </Progress>
            </div>

            <Card className="mb-8 border-2 border-gray-100 hover:border-rose-200 transition-colors">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center leading-relaxed">
                  {questions[currentQuestion].text}
                </h3>

                <RadioGroup
                  value={currentAnswer}
                  onValueChange={handleAnswer}
                  className="space-y-4"
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-100 hover:border-rose-300 hover:bg-rose-50 transition-all cursor-pointer"
                    >
                      <RadioGroupItem
                        value={`${index}-${option.value}`}
                        id={`option-${index}`}
                        className="text-rose-600"
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className="text-lg text-gray-700 cursor-pointer flex-1 leading-relaxed"
                      >
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                variant="outline"
                className="px-8 py-3 text-lg border-2 border-gray-300 hover:border-rose-400 hover:bg-rose-50"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                السابق
              </Button>

              <Button
                onClick={nextQuestion}
                disabled={!currentAnswer}
                className="px-8 py-3 text-lg bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion === questions.length - 1
                  ? "إظهار النتائج"
                  : "التالي"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalityAssessment;
