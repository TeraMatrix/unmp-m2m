
//Toggle Button
$("input[type='button'].toggleButton").click(function() {
   var currentValue, previousTd;
   currentValue= $(this).val();
   previousTd= $(this).parent().prev();
   if(currentValue=== 'Activate') {
      previousTd.html('Active');
      $(this).val('Deactivate');
      $(this).removeClass('green').addClass('red');
   } else {
      previousTd.html('Inactive');
      $(this).val('Activate');
      $(this).removeClass('red').addClass('green');
   }
});

function createSelectBox(domElement, callback) {
   var scombobox= $(domElement).scombobox({
      highlight: true
   });
   callback(scombobox);
}

function halloMapServices() {
$(".map_services_delete").bind('click', function() {
   var $tr= $(this).closest('tr');
   var $trSiblings= $tr.siblings(':visible').length;
   
   if($trSiblings > 4) {
      if(!$tr.hasClass('findInnerHTML')) {
      $tr.remove();   
   } else {
      $tr.removeClass('findInnerHTML').prev().addClass('findInnerHTML');
      $tr.remove();
   }   
   }
   
});
}

function findAndRemove(array, property, value) {
   $.each(array, function(index, result) {
       console.log(index);
       if(result[property] == value) {
          //Remove from array
          array.splice(index, 1);
      }    
   });
}


Array.prototype.removeValue = function(name, value){
   var array = $.map(this, function(v,i){
      return v[name] === value ? null : v;
   });
   this.length = 0; //clear original array
   this.push.apply(this, array); //push all elements except the one we want to delete
}


function groupTable($rows, startIndex, total){
    if (total === 0){
        return;
    }
    var i , currentIndex = startIndex, count=1, lst=[];
    var tds = $rows.find('td:eq('+ currentIndex +')');
    var ctrl = $(tds[0]);
    lst.push($rows[0]);
    for (i=1;i<=tds.length;i++){
        if (ctrl.text() ==  $(tds[i]).text()){
            count++;
            $(tds[i]).addClass('deleted');
            lst.push($rows[i]);
        }
        else{
            if (count>1){
                ctrl.attr('rowspan',count);
                groupTable($(lst),startIndex+1,total-1)
            }
            count=1;
            lst = [];
            ctrl=$(tds[i]);
            lst.push($rows[i]);
        }
    }
}

function addExtraTd(tableDomElement, headerHtml, tdHtml) {
    'use strict';
    
    $('#' + tableDomElement).find('tr').each(function (i, tr) {
        if(i===0) {
            $(this).find('th').last().after(headerHtml);
        } else {
            $(this).find('td').last().after(tdHtml);
        }
    });
}
