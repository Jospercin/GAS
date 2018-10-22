function onOpen() {
  var ui = SpreadsheetApp.getUi();
  //Creamos el menu con submenu
  ui.createMenu('Unir')
      .addItem('Hacer merge', 'hacerMerge')
      .addToUi();
}

function hacerMerge() {
  //Definimos una variable donde vamos a registrar un input:
  var url1 = Browser.inputBox("Por favor, introduce URL 1:");
  //Registro de 1º url
  Logger.log(url1);
  //Definimos una segunda variable donde vamos a registrar un input:
  var url2 = Browser.inputBox("Por favor, introduce URL 2:");
  //Registro de 2º url
  Logger.log(url2);
  //Mensaje de las 2 url almacenadas.
  Browser.msgBox('url1: ' +url1+ ' url2: '+url2);

  //variables para apertura por id (url) de ambas spreadsheet
  var sheet = SpreadsheetApp.openByUrl(url1);
  //Registro de sheet
  Logger.log(sheet);
  var sheet2 = SpreadsheetApp.openByUrl(url2); 
  //Registro de sheet2
  Logger.log(sheet2);
  
  //variables para almacenamiento de primera posicion de cada spreadsheet
  var valor = sheet.getSheetValues(1, 1, 1, 1);
  var valor2 = sheet2.getSheetValues(1, 1, 1, 1);
  //Registro de ambos valores
  Logger.log(valor);
  Logger.log(valor2);
  //Variable para suma de ambas variables
  var valor3 = valor + valor2;
  //Mensaje para la suma.
  Browser.msgBox('El primer valor de Hoja nº 1 es: '+valor);
  Browser.msgBox('El primer valor de Hoja nº 2 es: '+valor2);
  Browser.msgBox('La suma de ambos valores es: '+ valor3);// Los concatena porque son objetos distintos en lugar de sumarlos. 
  
  
  

}

