import { useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" }
] as const;

const Home = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState<string>("zh");
  const [isTranslating, setIsTranslating] = useState(false);
  const [detectedLang, setDetectedLang] = useState<string>("");

  const handleTranslate = async () => {
    if (!sourceText) {
      return;
    }

    try {
      setIsTranslating(true);
      setTranslatedText("");

      // 检测源文本语言
      const detector = await window.LanguageDetector.create({
        expectedInputLanguages: ["en-US", "zh"]
      });
      const detectionResult = await detector.detect(sourceText);
      console.log(detectionResult);

      const sourceLang = detectionResult?.[0]?.detectedLanguage;
      setDetectedLang(sourceLang);

      // 如果检测到的语言与目标语言相同，直接返回源文本
      if (sourceLang === targetLang) {
        setTranslatedText(sourceText);
        return;
      }

      const translator = await window.Translator.create({
        sourceLanguage: sourceLang,
        targetLanguage: targetLang
      });
      const translationResult = await translator.translate(sourceText);
      setTranslatedText(translationResult);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("翻译出错，请稍后再试");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center">
      <div className="flex w-full justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">Translator API Demo</h1>
        <ThemeToggle />
      </div>
      <p>
        探索使用浏览器原生支持的 Web API -{" "}
        <a
          className="text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
          href="https://developer.mozilla.org/en-US/docs/Web/API/Translator_and_Language_Detector_APIs/Using"
        >
          Translator
        </a>{" "}
        进行文本翻译
      </p>
      <div className="flex min-h-0 w-full flex-1 items-start gap-4 overflow-auto p-6">
        <Card className="flex h-full flex-1 flex-col">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>原文 {detectedLang && `(已检测为: ${detectedLang})`}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <textarea
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-full min-h-[300px] w-full resize-none rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="请输入要翻译的文本..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
            />
          </CardContent>
        </Card>

        <div className="flex h-full flex-col items-center justify-center">
          <Button onClick={handleTranslate} disabled={isTranslating || !sourceText} className="w-24">
            {isTranslating ? "翻译中..." : "翻译"}
          </Button>
        </div>

        <Card className="flex h-full flex-1 flex-col">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>译文</span>
              <Select value={targetLang} onValueChange={setTargetLang}>
                <SelectTrigger>
                  <SelectValue placeholder="选择语言">
                    {SUPPORTED_LANGUAGES.find((lang) => lang.code === targetLang)?.name}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <textarea
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-full min-h-[300px] w-full resize-none rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={isTranslating ? "正在翻译..." : "翻译结果将显示在这里..."}
              value={translatedText}
              readOnly
              disabled={isTranslating}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Home;
