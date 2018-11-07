function GoogleCalToGoogleSheet(){

//
// Exportar Eventos de Calendario Google En Hoja de Cálculo Google.
//

// Este código devuelve los eventos introducidos en 2 fechas para un específico calendario
// Pasos a seguir:
// 1. Modificar el valor para mycal para corresponderlo con el calendario propio (es decir introduzca la direccion de correo)
// 2. Modificar los valores de evento, es decir las fechas de inicio y fecha final para obtener todos los eventos del calendario deseado.

// Páginas de referencia:
// https://developers.google.com/apps-script/reference/calendar/calendar
// https://developers.google.com/apps-script/reference/calendar/calendar-event
//

var mycal = "joseluisperez.16@campuscamara.es";
var cal = CalendarApp.getCalendarById(mycal);

// Variaciones de uso:
// var events = cal.getEvents(new Date("January 3, 2014 00:00:00 CST"), new Date("January 14, 2014 23:59:59 CST")); <-- Búsqueda en 2 fechas introducidas (fecha_inicio, fecha_fin).
// var events = cal.getEvents(new Date("January 3, 2014 00:00:00 CST"), new Date("January 14, 2014 23:59:59 CST"), {search: 'word1'}); <-- Igual al anterior, añadiendo una búsqueda específica de palabras del titulo del evento.
// 
//    {search: 'word1'}              Busca eventos que contengan word1
//    {search: '-word1'}             Busca eventos que no contengan word1
//    {search: 'word1 word2'}        Busca eventos que contengan solo word2
//    {search: 'word1 -word2'}       Busca eventos que no contengan word2
//    {search: 'word1+word2'}        Busca eventos con word1 y word2
//    {search: 'word1+-word2'}       Busca eventos con word1 y sin word2
//
var events = cal.getEvents(new Date("January 12, 2018 00:00:00 CST"), new Date("October 27, 2018 23:59:59 CST"), {search: 'COMMUNITY MANAGER'});


var sheet = SpreadsheetApp.getActiveSheet();
  
// Comentar esta linea si no quiere limpiar la hoja de cálculo cada vez que ejecute la función.
sheet.clearContents();  

//Creacion de un header con el nombre de las columnas y los datos del evento:
  
var header = [["Dirección Calendario", "Titulo Evento", "Descripcion", "Localización", "Comienzo Evento", "Fin Evento", "Duración", "Visibilidad", "Fecha Creacion", "Ultimo Cambio", "Mi Puesto", "Creado por", "Evento Todo el Dia", "Evento Disponible"]]
var range = sheet.getRange(1,1,1,14);
range.setValues(header);

  
// Bucle que recorre todos los eventos del calendario encontrados por los datos específicos y los escribe dentro de la hoja de cálculo.
for (var i=0;i<events.length;i++) {
  var row=i+2;
  var myformula_placeholder = '';
  var details=[[mycal,events[i].getTitle(), events[i].getDescription(), events[i].getLocation(), events[i].getStartTime(), events[i].getEndTime(), myformula_placeholder, ('' + events[i].getVisibility()), events[i].getDateCreated(), events[i].getLastUpdated(), events[i].getMyStatus(), events[i].getCreators(), events[i].isAllDayEvent(), events[i].isRecurringEvent()]];
  var range=sheet.getRange(row,1,1,14);
  range.setValues(details);
  var cell=sheet.getRange(row,7);
  cell.setFormula('=(HOUR(F' +row+ ')+(MINUTE(F' +row+ ')/60))-(HOUR(E' +row+ ')+(MINUTE(E' +row+ ')/60))');
  cell.setNumberFormat('.00');  
}
}
function onOpen() {
  Browser.msgBox('Instrucciones de la Aplicación - Porfavor, lea este mensaje ', '1) Clic en Herramientas y luego en Secuencia de comandos \\n 2) Leer/Cambiar el codigo con los valores deseados. \\n3) Luego cuando todo este listo hacer Click en Ejecutar GoogleCalToGoogleSheet.', Browser.Buttons.OK);

}

