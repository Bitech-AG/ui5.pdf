# ui5.pdf
This library contains a number of controls. The main control is the "Viewer". With the help of this control you can integrate the PDF ad into your apps. The presentation of the PDF is done using the Mozilla [PDF.js](https://mozilla.github.io/pdf.js) library. This library has been seamlessly integrated into the control, so there are no problems with the controls' Ui5 lifecycle.

## [Demo](https://demo-ad538ec20.dispatcher.hana.ondemand.com)

## How do you integrate the viewer into my application?

1. create follow folder structure and upload the files

- webapp
- - bitech
- - - ui5
- - - - pdf
- - - - - build
- - - - - - [pdf.min.js](./src/bitech/ui5/pdf/build/pdf.min.js)
- - - - - - [pdf.worker.min.js](./src/bitech/ui5/pdf/build/pdf.worker.min.js)
- - - - - [library-preload.js](./webide/library-preload.js)


1. Extend the manifest.json
```sh
{
...
	"sap.ui5": {
...
		"dependencies": {
...
			"libs": {
...
				"bitech.ui5.pdf": {}
...
			}
		},
...,
		"resourceRoots": {
			"bitech.ui5.pdf": "./bitech/ui5/pdf"
		},
      },
```

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
npm link

cd consumer
npm install
npm link @bitech-ag/ui5.pdf
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