# ui5.pdf
This library contains a number of controls. The main control is the "Viewer". With the help of this control you can integrate the PDF ad into your apps. The presentation of the PDF is done using the Mozilla [PDF.js](https://mozilla.github.io/pdf.js) library. This library has been seamlessly integrated into the control, so there are no problems with the controls' Ui5 lifecycle.

## [Demo](https://bitech-ag.github.io/ui5.pdf)

## How do you integrate the viewer into my application?

With the new capabilities of [UI5 Tooling] (https://sap.github.io/ui5-tooling), it is very easy to integrate open source libraries like this into your own applications. You do not need to copy files to your applications. If your app is older and does not have a Ui5.yaml file, you can create this file with [UI5 Cli] (https://sap.github.io/ui5-tooling/pages/GettingStarted).

1. Insert this repository as a dependency in your Package.json.
```sh
dependencies: {
...
"bitech.ui5.pdf": "1.0.0"
...
```
or you use the command line
```sh
npm install @bitech/ui5.pdf --save
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
Do not forget the three dashes!

### Using in views

Now you can integrate the control into your views.
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
```
5. Start the consumer app
```sh
npm start
```

## Known limitations

The control can not display large PDF files. This would require some incredible rendering to be implemented

## License

MIT

## Author
[<img src="https://bitech.ag/images/icon_netweaver_gr.png">](https://bitech.ag/netweaver-technologies.html)  
*[Business Technologies](https://bitech.ag/netweaver-technologies.html)*  
**[Bitech AG Leverkusen](https://www.bitech.ag)**