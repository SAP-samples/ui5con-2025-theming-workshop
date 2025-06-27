import Control from "sap/ui/core/Control";
import Parameters from "sap/ui/core/theming/Parameters";
import Theming from "sap/ui/core/Theming";
import type RenderManager from "sap/ui/core/RenderManager";

/**
 * @param color
 * @param amount between 0 and 1
 * @returns
 */
function darken(color: string, amount: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) * (1 - amount));
  const g = Math.max(0, ((num >> 8) & 0x00ff) * (1 - amount));
  const b = Math.max(0, (num & 0x0000ff) * (1 - amount));
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

/**
 * @param color
 * @param amount between 0 and 1
 * @returns
 */
function lighten(color: string, amount: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) * (1 + amount));
  const g = Math.min(255, ((num >> 8) & 0x00ff) * (1 + amount));
  const b = Math.min(255, (num & 0x0000ff) * (1 + amount));
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

/**
 * @param background
 * @param lightColor picked when background is light
 * @param darkColor picked when background is dark
 * @returns
 */
function contrast(
  background: string,
  lightColor: string,
  darkColor: string
): string {
  const bgNum = parseInt(background.replace("#", ""), 16);
  const lightNum = parseInt(lightColor.replace("#", ""), 16);
  const darkNum = parseInt(darkColor.replace("#", ""), 16);
  const bgLuminance =
    (0.2126 * ((bgNum >> 16) & 0xff) +
      0.7152 * ((bgNum >> 8) & 0xff) +
      0.0722 * (bgNum & 0xff)) /
    255;
  const lightLuminance =
    (0.2126 * ((lightNum >> 16) & 0xff) +
      0.7152 * ((lightNum >> 8) & 0xff) +
      0.0722 * (lightNum & 0xff)) /
    255;
  const darkLuminance =
    (0.2126 * ((darkNum >> 16) & 0xff) +
      0.7152 * ((darkNum >> 8) & 0xff) +
      0.0722 * (darkNum & 0xff)) /
    255;
  return Math.abs(bgLuminance - lightLuminance) >
    Math.abs(bgLuminance - darkLuminance)
    ? lightColor
    : darkColor;
}

/** @namespace UI5con2025.parametersget.control */
export default class Flower extends Control {
  static metadata = {};

  renderer = {
    apiVersion: 2,
    render(renderManager: RenderManager, control: Flower) {
      const themeId = Theming.getTheme();
      const {
        sapSelectedColor,
        sapHC_StandardForeground,
        sapTextColor,
        sapContent_ContrastTextColor,
      } = Parameters.get([
        "sapSelectedColor",
        "sapHC_StandardForeground",
        "sapTextColor",
        "sapContent_ContrastTextColor",
      ]) as Record<string, string>;

      renderManager.openStart("div", control);
      renderManager.class("flower");
      renderManager.openEnd();

      for (let i = 0; i < 5; i++) {
        renderManager.openStart("div");
        renderManager.class("flower__petal");
        let backgroundColor: string;
        let borderColor: string;
        if (themeId.endsWith("_hcb") || themeId.endsWith("_hcw")) {
          backgroundColor = sapSelectedColor;
          borderColor = sapHC_StandardForeground;
        } else if (themeId.endsWith("_dark")) {
          // because of DOM layering, the last petal is on top, hence shades
          // are reversed
          backgroundColor = lighten(sapSelectedColor, (4 - i) * 0.1);
          borderColor = lighten(backgroundColor, 0.2);
        } else {
          backgroundColor = darken(sapSelectedColor, (4 - i) * 0.1);
          borderColor = darken(backgroundColor, 0.2);
        }
        renderManager.style("background-color", backgroundColor);
        renderManager.style("border-color", borderColor);
        renderManager.style(
          "color",
          contrast(backgroundColor, sapTextColor, sapContent_ContrastTextColor)
        );
        renderManager.openEnd();

        if (i === 4) {
          renderManager.text("UI5con");
        }

        renderManager.close("div");
      }

      renderManager.close("div");
    },
  };
}
