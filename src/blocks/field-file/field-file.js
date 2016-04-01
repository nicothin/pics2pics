/*
  Форма: работа стилизованного input[type="file"]
  Автор: Osvaldas Valutis, www.osvaldas.info (адаптировано под используемую разметку)
  Available for use under the MIT License
*/

// ;( function ()
// {
//   var inputs = document.querySelectorAll( '.field-file__input' );
//   Array.prototype.forEach.call( inputs, function( input )
//   {
//     var label  = input.closest('.field-file').querySelector( '.field-file__name-text' ),
//         labelVal = label.innerHTML;

//     input.addEventListener( 'change', function( e ) {
//       var fileName = '';
//       if( this.files && this.files.length > 1 ) {
//         fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
//       }
//       else {
//         fileName = e.target.value.split( '\\' ).pop();
//       }

//       if( fileName ) {
//         label.innerHTML = fileName;
//       }
//       else {
//         label.innerHTML = labelVal;
//       }
//     });
//   });
// }());
