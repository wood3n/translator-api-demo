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

interface LanguageDetectorOptions {
  expectedInputLanguages?: string[];
}

interface DetectedLanguage {
  /** https://en.wikipedia.org/wiki/IETF_language_tag#List_of_common_primary_language_subtags */
  detectedLanguage: string;
  confidence: number;
}

interface LanguageDetector {
  detect(text: string): Promise<DetectedLanguage[]>;
}

interface LanguageDetectorConstructor {
  create(options?: LanguageDetectorOptions): Promise<LanguageDetector>;
}

interface Translator {
  translate(text: string): Promise<string>;
}

interface TranslatorConstructor {
  create(options: { sourceLanguage: string; targetLanguage: string }): Promise<Translator>;
}

interface Window {
  LanguageDetector: LanguageDetectorConstructor;
  Translator: TranslatorConstructor;
}
