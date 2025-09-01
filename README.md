# Web Language APIs 使用指南

## TypeScript 类型声明

首先需要在项目中声明 API 的类型：

```typescript
// 语言检测器选项
interface LanguageDetectorOptions {
  expectedInputLanguages?: string[];
}

// 检测到的语言信息
interface DetectedLanguage {
  detectedLanguage: string;
  confidence: number;
}

// 语言检测器
interface LanguageDetector {
  detect(text: string): Promise<DetectedLanguage[]>;
}

// 语言检测器构造器
interface LanguageDetectorConstructor {
  create(options?: LanguageDetectorOptions): Promise<LanguageDetector>;
}

// 翻译器选项
interface TranslatorOptions {
  sourceLanguage?: string;
  targetLanguage: string;
}

// 翻译器
interface Translator {
  translate(text: string): Promise<string>;
}

// 翻译器构造器
interface TranslatorConstructor {
  create(options: TranslatorOptions): Promise<Translator>;
}

// 扩展 Window 接口
interface Window {
  LanguageDetector: LanguageDetectorConstructor;
  Translator: TranslatorConstructor;
}
```

## API 使用示例

### 语言检测

```typescript
// 创建语言检测器
const detector = await window.LanguageDetector.create({
  // 可选：指定期望的输入语言
  expectedInputLanguages: ["en-US", "zh"]
});

// 检测文本语言
const result = await detector.detect("Hello, World!");
console.log(result);
// 输出: [{ detectedLanguage: "en", confidence: 0.9 }, ...]
```

### 文本翻译

```typescript
// 创建翻译器
const translator = await window.Translator.create({
  sourceLanguage: "en",    // 源语言（可选）
  targetLanguage: "zh"     // 目标语言（必需）
});

// 翻译文本
const result = await translator.translate("Hello, World!");
console.log(result);
// 输出: "你好，世界！"
```

### 完整示例

```typescript
async function translateText(text: string, targetLang: string) {
  try {
    // 1. 检测源文本语言
    const detector = await window.LanguageDetector.create();
    const [{ detectedLanguage }] = await detector.detect(text);

    // 2. 如果检测到的语言与目标语言相同，直接返回源文本
    if (detectedLanguage === targetLang) {
      return text;
    }

    // 3. 创建翻译器并翻译
    const translator = await window.Translator.create({
      sourceLanguage: detectedLanguage,
      targetLanguage: targetLang
    });
    
    return await translator.translate(text);
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
}
```

## 注意事项

1. 这些 API 目前是实验性的，目前仅在 Chrome 较新的版本中支持；
2. API 支持的语言代码遵循 [BCP 47](https://www.rfc-editor.org/info/bcp47) 标准，常见的包括：
   - `en`: 英语
   - `zh`: 中文
   - `es`: 西班牙语
   - `fr`: 法语
   - `de`: 德语
   - `ja`: 日语
   - `ko`: 韩语