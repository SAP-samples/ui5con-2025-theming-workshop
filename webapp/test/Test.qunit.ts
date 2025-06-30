import type Flower from "../control/Flower";
import type Opa5 from "sap/ui/test/Opa5";
import type UIElement from "sap/ui/core/Element";
import type opaQunit from "sap/ui/test/opaQunit";
import type Theming from "sap/ui/core/Theming";

/**
 * Compares two colors for equality by rendering them in a canvas and comparing the pixel data.
 * @param a 1st color
 * @param b 2nd color
 * @returns true if the colors are equal, false otherwise.
 */
function colorEqual(a: string, b: string): boolean {
	const ctx = document.createElement("canvas").getContext("2d");
	if (ctx) {
		ctx.fillStyle = a;
		ctx.fillRect(0, 0, 1, 1);
		ctx.fillStyle = b;
		ctx.fillRect(1, 0, 1, 1);
		return JSON.stringify(Array.from(ctx.getImageData(0, 0, 1, 1).data)) === JSON.stringify(Array.from(ctx.getImageData(1, 0, 1, 1).data));
	} else {
		return false;
	}
}

sap.ui.require(["sap/ui/core/Theming", "sap/ui/test/opaQunit"], (theming: typeof Theming, opaTest: typeof opaQunit) => {
	const themeId = theming.getTheme();

	QUnit.module(themeId);

	opaTest(`with CSS custom properties in sap.ui.core library.css`, function (Given: Opa5, When: Opa5, Then: Opa5) {
		Given.iStartMyAppInAFrame(`/index.html?sap-theme=${themeId}`);

		Then.waitFor({
			controlType: "UI5con2025.libraryless.control.Flower",
			success(elements: UIElement[]) {
				if (elements.length > 0) {
					const sapSelectedColor = getComputedStyle(document.documentElement).getPropertyValue("--sapSelectedColor").trim();

					const flower = elements[0] as Flower;
					const petalDomRefs = flower.getDomRef()?.children;
					if (petalDomRefs && petalDomRefs.length > 4) {
						const topPetalCS = getComputedStyle(petalDomRefs[4]);

						const topPetalBackground = topPetalCS.getPropertyValue("background-color").trim();
						QUnit.assert.ok(
							colorEqual(topPetalBackground, sapSelectedColor),
							`Top petal background should be sapSelectedColor=${sapSelectedColor}, is ${topPetalBackground}`
						);

						const topPetalOpacity = topPetalCS.getPropertyValue("opacity").trim();
						const expectedOpacity = themeId.includes("_hc") ? 1 : 0.8;
						QUnit.assert.equal(topPetalOpacity, expectedOpacity, `Top petal opacity should be ${expectedOpacity}, is ${topPetalOpacity}`);
					}
				}
			},
		}).and.iTeardownMyApp();
	});

	QUnit.start();
});
