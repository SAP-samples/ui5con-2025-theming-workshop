import Control from "sap/ui/core/Control";
import type RenderManager from "sap/ui/core/RenderManager";

/** @namespace UI5con2025.notheming.control */
export default class Flower extends Control {
	static metadata = {};

	renderer = {
		apiVersion: 2,
		render(renderManager: RenderManager, control: Flower) {
			renderManager.openStart("div", control);
			renderManager.class("flower");
			renderManager.openEnd();

			for (let i = 0; i < 5; i++) {
				renderManager.openStart("div");
				renderManager.class("flower__petal");
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
