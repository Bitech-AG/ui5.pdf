# ui5.pdf
This library contains a number of controls. The main control is the "Viewer". With the help of this control you can integrate the PDF ad into your apps. The presentation of the PDF is done using the Mozilla [PDF.js](https://mozilla.github.io/pdf.js) library. This library has been seamlessly integrated into the control, so there are no problems with the controls' Ui5 lifecycle.

## Why another PDF viewer?

There are already several PDF-Viewer. Why do you need another?

A viewer already exists in [OpenUI5] (https://openui5.hana.ondemand.com/#/entity/sap.m.PDFViewer). This renders the PDF into an iframe and adds a few more controls. With this type of integration you can not influence the presentation of the PDF.

Nabisoft offers another viewer in UI5Lab [Nabi Mobile] (https://ui5lab.io/browser/index.html#/Samples/nabi.m). This variant also uses Mozilla's PDF.js. Here is also working with an IFrame. Only here is not the PDF itself but a viewer of Mozilla included. This can also be changed and expanded. However, you are no longer moving in UI5.

And last but not least, there is the viewer from Wouter Lemaire [
PDF library] (https://ui5lab.io/browser/index.html#/Samples/ui5lab.wl.pdf). This also uses the PDF.js for rendering. However, he only renders a page. When switching to the next page, the next page overwrites the contents of the Canvas. In our version we have kept more of the original.

## How do you integrate the viewer into my application?

With the new capabilities of [UI5 Tooling] (https://sap.github.io/ui5-tooling), it is very easy to integrate open source libraries like this into your own applications.

With the new capabilities of [UI5 Tooling] (https://sap.github.io/ui5-tooling), it is very easy to integrate open source bibliotics like this into your own applications. You do not need to copy files to your applications. If your app is older and does not have a Ui5.yaml file, you can create this file with [UI5 Cli] (https://sap.github.io/ui5-tooling/pages/GettingStarted).

1. Insert this repository as a dependency in your Package.json. If you do not have a dependencies node in your package.json, add it at the top level.
```sh
dependencies: {
...
"bitech.ui5.pdf": "latest"
...
}
```
or you use the command line
```sh
npm install @bitech-ag/ui5.pdf --save
```
2. Extend your ui5.yaml file with
```sh
---
specVersion: "0.1"
kind: extension
type: project-shim
metadata:
  name: bitech.ui5.pdf
shims:
  configurations:
    pdfjs-dist:
      specVersion: "0.1"
      type: module
      metadata:
        name: "@bitech-ag/ui5.pdf"
      resources:
        configuration:
          paths:
            /resources/bitech/ui5/pdf: ""
```
Do not forget the three dashes! If necessary you have to adapt the SpecVersion to that of your app.

3. Now you can integrate the control into your views.
```sh
<mvc:View ... xmlns:pdf="bitech.ui5.pdf">
...
<pdf:Viewer src="some.pdf" ></pdf:Viewer>
<!-- or 
<pdf:Viewer />
-->
...
</mvc:View>
```
At the moment you can not embed the control in the WebIDE, see #16.


## How do you contribute to the project?

You like our code and you want to get involved with us? You're welcome.

1. install nodejs and npm, see [nodejs](https://nodejs.org/en/download/)
2. install git, see [git](https://git-scm.com/downloads)
3. clone the repo
```sh
git clone https://github.com/Bitech-AG/ui5.pdf.git
```
4. install dependencies and link the library and consumer project
```sh
cd ui5.pdf
npm install
npm link

cd consumer
npm install
npm link @bitech-ag/ui5.pdf
```
5. Start the consumer app
```sh
npm start
```

## License

MIT

## Author
[<img src="https://bitech.ag/images/icon_netweaver_gr.png">](https://bitech.ag/netweaver-technologies.html)
*[Business Technologies](https://bitech.ag/netweaver-technologies.html)*  
**[Bitech AG Leverkusen](https://www.bitech.ag)**