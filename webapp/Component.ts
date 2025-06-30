import XMLView from "sap/ui/core/mvc/XMLView";
import UIComponent from "sap/ui/core/UIComponent";
import Theming from "sap/ui/core/Theming";
import includeStylesheet from "sap/ui/dom/includeStylesheet";

/** @namespace UI5con2025.libraryless */
export default class Component extends UIComponent {
	public static metadata = {
		interfaces: ["sap.ui.core.IAsyncContentCreation"],
		manifest: "json",
	};

	async createContent() {
		// IRL including the right stylesheet would be done by the library;
		// also, this assumes that a file for that theme actually exists
		await includeStylesheet(`css/skeleton.css`);

		return XMLView.create({
			viewName: "UI5con2025.libraryless.view.App",
			id: "app",
		});
	}
}
