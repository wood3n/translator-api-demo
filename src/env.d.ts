/// <reference types="@rsbuild/core/types" />

/**
 * Imports the SVG file as a React component.
 * @requires [@rsbuild/plugin-svgr](https://npmjs.com/package/@rsbuild/plugin-svgr)
 */
declare module "*.svg?react" {
  import type React from "react";
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

interface Window {
  LanguageDetector: LanguageDetectorConstructor;
  Translator: TranslatorConstructor;
}

interface LanguageDetectorConstructor {
  availability(options: {
    expectedInputLanguages: string[];
  }): Promise<"available" | "downloadable" | "downloading" | "unavailable">;
  create(options?: LanguageDetectorOptions): Promise<LanguageDetectorInstance>;
}

interface TranslatorConstructor {
  availability(options: {
    sourceLanguage: string;
    targetLanguage: string;
  }): Promise<"available" | "downloadable" | "downloading" | "unavailable">;
  create(options: TranslatorOptions): Promise<TranslatorInstance>;
}

interface LanguageDetectorOptions {
  /**
   * 预期检测文本符合的语言标签范围
   * 提高语言检测的准确性
   */
  expectedInputLanguages: string[];
  /**
   * 用于监测下载 AI 模型或者数据的进度
   */
  monitor?: CreateMonitor;
  /**
   * 用于中断检测
   */
  signal?: AbortSignal;
}

interface LanguageDetectionResult {
  /**
   * 检测到的 BCP 语言标签
   */
  detectedLanguage: string;
  /**
   * 匹配准确度，从 0 到 1
   */
  confidence: number;
}

interface TranslatorOptions {
  /**
   * 输入文本的预期语言标签
   */
  sourceLanguage: string;
  /**
   * 目标翻译语言标签
   */
  targetLanguage: string;
  /**
   * 用于监测下载 AI 模型或者数据的进度
   */
  monitor?: CreateMonitor;
  /**
   * 用于中断翻译
   */
  signal?: AbortSignal;
}

interface TranslatorInstance {
  /**
   * 输入文本的预期语言标签
   */
  sourceLanguage: string;
  /**
   * 目标翻译语言标签
   */
  targetLanguage: string;
  /**
   * 一次最大能翻译的文本配额
   */
  inputQuota: number;
  /**
   * 翻译输入文本
   * @param input 要翻译的文本
   * @param options 可选参数，包括中断信号
   * @returns 翻译后的字符串
   */
  translate(input: string, options?: { signal?: AbortSignal }): Promise<string>;
  /**
   * 生成输入字符串的翻译流
   * @param input 要翻译的文本
   * @param options 可选参数，包括中断信号
   * @returns 翻译流的 ReadableStream 对象
   */
  translateStreaming(input: string, options?: { signal?: AbortSignal }): ReadableStream<string>;
  /**
   * 检测翻译操作将使用多少输入配额
   * @param input 要检测的文本
   * @param options 可选参数，包括中断信号
   * @returns 使用的配额数值
   */
  measureInputUsage(input: string, options?: { signal?: AbortSignal }): Promise<number>;
  /**
   * 销毁 Translator 实例
   */
  destroy(): void;
}

interface LanguageDetectorInstance {
  /**
   * 预期检测文本符合的语言标签范围
   */
  expectedInputLanguages: string[];
  /**
   * 一次最大能检测的文本配额
   */
  inputQuota: number;
  /**
   * 检测输入文本的语言
   * @param input 要检测的文本
   * @param options 可选参数，包括中断信号
   * @returns 检测结果数组
   */
  detect(input: string, options?: { signal?: AbortSignal }): Promise<LanguageDetectionResult[]>;
  /**
   * 检测语言检测操作将使用多少输入配额
   * @param input 要检测的文本
   * @param options 可选参数，包括中断信号
   * @returns 使用的配额数值
   */
  measureInputUsage(input: string, options?: { signal?: AbortSignal }): Promise<number>;
  /**
   * 销毁 LanguageDetector 实例
   */
  destroy(): void;
}
