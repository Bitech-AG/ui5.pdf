# We are currently working on the publication. This version may not be usable.

# ui5.pdf
This library contains a number of controls. The main control is the "Viewer". With the help of this control you can integrate the PDF ad into your apps. The presentation of the PDF is done using the Mozilla [PDF.js](https://mozilla.github.io/pdf.js) library. This library has been seamlessly integrated into the control, so there are no problems with the controls' Ui5 lifecycle.

## Why another PDF viewer?

There are already several PDF-Viewer. Why do you need another?

A viewer already exists in [OpenUI5] (https://openui5.hana.ondemand.com/#/entity/sap.m.PDFViewer). This renders the PDF into an iframe and adds a few more controls. With this type of integration you can not influence the presentation of the PDF.

Nabisoft offers another viewer in UI5Lab [Nabi Mobile] (https://ui5lab.io/browser/index.html#/Samples/nabi.m). This variant also uses Mozilla's PDF.js. Here is also working with an IFrame. Only here is not the PDF itself but a viewer of Mozilla included. This can also be changed and expanded. However, you are no longer moving in UI5.

And last but not least, there is the viewer from Wouter Lemaire [
PDF library] (https://ui5lab.io/browser/index.html#/Samples/ui5lab.wl.pdf). This also uses the PDF.js for rendering. However, he only renders a page. When switching to the next page, the next page overwrites the contents of the Canvas. In our version we have kept more of the original.

## How do I integrate the viewer into my application?

With the new capabilities of [UI5 Tooling] (https://sap.github.io/ui5-tooling), it is very easy to integrate open source libraries like this into your own applications.

With the new capabilities of [UI5 Tooling] (https://sap.github.io/ui5-tooling), it is very easy to integrate open source bibliotics like this into your own applications. You do not need to copy files to your applications. If your app is older and does not have a Ui5.yaml file, you can create this file with [UI5 Cli] (https://sap.github.io/ui5-tooling/pages/GettingStarted).

1. Insert this repository as a dependency in your Package.json.
```sh
dependencies: {
...
"bitech.ui5.pdf": "^0.4.1"
...
}
```
or you use the command line
```sh
npm install bitech.ui5.pdf --save
```


