import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Send, Bot, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // تأكد إنك مستخدم shadcn/ui

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const WeddingPlanning = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "مرحباً! كيف يمكنني مساعدتك في تخطيط حفل زفافك؟",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationStep, setConversationStep] = useState(0);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // Predefined conversation flow
  const conversationFlow = [
    "كم ميزانيتك و عدد الحضور لاجل اختيار القاعة؟",
    "شو الصالون الي بدك اياه؟",
    "هل تريد توزيعات أو تزيين السيارة أو خدمات إضافية؟",
  ];

  const finalSummary =
    "المجموع الكلي للحملة هو 2500 JD ويشمل القاعة، الصالون، التوزيعات، وكل التفاصيل. سيتم التواصل معك لتثبيت العرض.";

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      if (conversationStep < conversationFlow.length) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: conversationFlow[conversationStep],
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setConversationStep((prev) => prev + 1);
      } else {
        // بدل ما نعرض الرسالة الأخيرة بالـ chat، نفتح المودال
        setIsSummaryOpen(true);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />

      <section className="py-20">
        <div className="container px-4">
          <div className="mt-16 max-w-5xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">
                    محادثة فورية مع المساعد الذكي
                  </CardTitle>
                </div>
                <CardDescription>
                  ابدئي الحوار الآن واحصلي على اقتراحات فورية
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col h-[480px]">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex items-start gap-3 ${
                            message.isUser ? "justify-start" : "justify-end"
                          }`}
                        >
                          <div
                            className={`flex items-start gap-3 max-w-[80%] ${
                              message.isUser ? "flex-row" : "flex-row-reverse"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                message.isUser
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-secondary-foreground"
                              }`}
                            >
                              {message.isUser ? (
                                <User className="w-4 h-4" />
                              ) : (
                                <Bot className="w-4 h-4" />
                              )}
                            </div>
                            <div
                              className={`rounded-lg p-3 ${
                                message.isUser
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-secondary-foreground"
                              }`}
                            >
                              <p className="text-sm leading-relaxed">
                                {message.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex items-start gap-3 justify-end">
                          <div className="flex items-start gap-3 max-w-[80%] flex-row-reverse">
                            <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                              <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-secondary text-secondary-foreground rounded-lg p-3">
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  <div className="border-t bg-muted/20 p-4">
                    <div className="flex gap-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="اكتبي رسالتك هنا..."
                        disabled={isLoading || isSummaryOpen}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={
                          isLoading || !inputValue.trim() || isSummaryOpen
                        }
                        size="icon"
                        className="flex-shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />

      {/* Popup / Modal */}
      <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
        <DialogContent
          className="sm:max-w-md justify-center !justify-items-center"
          dir="rtl"
        >
          <DialogHeader>
            <DialogTitle>ملخص العرض</DialogTitle>
          </DialogHeader>
          <p className="mt-4 text-sm text-muted-foreground justify-center justify-items-center font-semibold">
            {finalSummary}
          </p>
          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => {
                window.location.href = "/";
              }}
            >
              العودة للصفحة الرئيسية
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WeddingPlanning;
