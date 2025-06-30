export default {
	name: "QUnit test suite for UI5con Library Less",
	defaults: {
		qunit: { version: 2 },
		loader: { paths: { "UI5con2025/libraryless": "../" } },
	},
	tests: {
		sap_horizon: {
			page: "ui5://test-resources/UI5con2025/libraryless/Test.qunit.html?sap-theme=sap_horizon",
			title: "UI5con Library Less sap_horizon tests",
		},
		sap_horizon_dark: {
			page: "ui5://test-resources/UI5con2025/libraryless/Test.qunit.html?sap-theme=sap_horizon_dark",
			title: "UI5con Library Less sap_horizon_dark tests",
		},
		sap_horizon_hcb: {
			page: "ui5://test-resources/UI5con2025/libraryless/Test.qunit.html?sap-theme=sap_horizon_hcb",
			title: "UI5con Library Less sap_horizon_hcb tests",
		},
		sap_horizon_hcw: {
			page: "ui5://test-resources/UI5con2025/libraryless/Test.qunit.html?sap-theme=sap_horizon_hcw",
			title: "UI5con Library Less sap_horizon_hcw tests",
		},
	},
};
