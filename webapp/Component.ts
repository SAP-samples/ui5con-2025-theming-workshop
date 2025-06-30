import XMLView from "sap/ui/core/mvc/XMLView";
import UIComponent from "sap/ui/core/UIComponent";

/** @namespace UI5con2025.notheming */
export default class Component extends UIComponent {
  public static metadata = {
    interfaces: ["sap.ui.core.IAsyncContentCreation"],
    manifest: "json",
  };

  createContent() {
    return XMLView.create({
      viewName: "UI5con2025.notheming.view.App",
      id: "app",
    });
  }
}
