if (typeof jQuery === 'undefined')
{
  throw new Error('ajaxTags.js requires jQuery');
}

// creates form data into json string
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function callAjax (thisEl) {

        // Add href to the ajax url var
        if (typeof thisEl.dataset.ajaxhref != 'undefined') {
            var ajaxhref = thisEl.dataset.ajaxhref;
        } else {
            console.log(thisEl.outerHTML + '\nthisEl ajax tag must have a href attribute');
        }

        // type var get or set
        if(typeof thisEl.dataset.ajaxmethod != 'undefined') {
            if(thisEl.dataset.ajaxmethod == 'GET'|| thisEl.dataset.ajaxmethod == 'POST') {
                var ajaxType = thisEl.dataset.ajaxmethod.toUpperCase();
            } else {
                console.log(thisEl.outerHTML + "\ndata-ajaxmethod attribute must be 'GET' or 'POST'");
            }
        }

        //det the data type defult html
        if(typeof thisEl.dataset.ajaxdatatype != 'undefined') {
            var ajaxdatatype = thisEl.dataset.ajaxdatatype;
        } else {
            var ajaxdatatype = 'Intelligent Guess';
        }

       
        if(typeof thisEl.dataset.ajaxdata != 'undefined') {
            var fileInputPresent = $(thisEl.dataset.ajaxdata).find('input[type=file]').length;
            if(fileInputPresent) {

                var form_data = new FormData();

                var varName = "";
                $.each($(thisEl.dataset.ajaxdata).find('input[type=file]'), function() {
                    varName = this.name;
                    $.each($(this).prop('files'), function(){
                        form_data.append(varName, this);
                    });
                });

                otherData = $(thisEl.dataset.ajaxdata).serializeArray();
                $.each(otherData, function() {
                    form_data.append(this.name, this.value);
                });

            } else {
                var ajaxdataNodeVal = thisEl.dataset.ajaxdata;

                if (ajaxdataNodeVal.match('^{')) {
                    var form_data = thisEl.dataset.ajaxdata;
                } else {
                    var form_data = $(thisEl.dataset.ajaxdata).serializeObject();
                }

            }
        } else {
            var form_data = null;
        }

        if(typeof thisEl.dataset.ajaxsuccess != 'undefined') {
            if(typeof thisEl.dataset.ajaxupdate != 'undefined') {
                var updateEliment = thisEl.dataset.ajaxupdate;
            }

            if(thisEl.dataset.ajaxsuccess == 'replace') {
                var ajaxSuccess = function (output) {
                    $(updateEliment).empty().append(output);
                }
            } else if(thisEl.dataset.ajaxsuccess == 'after') {
                var ajaxSuccess = function (output) {
                   $(updateEliment).append(output);
                }
            } else if(thisEl.dataset.ajaxsuccess == 'before') {
                var ajaxSuccess = function (output) {
                    $(updateEliment).prepend(output);
                }
            } else {
                var ajaxSuccess = window[thisEl.dataset.ajaxsuccess];
            }
        }

        if(typeof thisEl.dataset.ajaxcomplete != 'undefined') {
            if(typeof thisEl.dataset.ajaxupdate != 'undefined') {
                var updateEliment = thisEl.dataset.ajaxupdate;
            }
            if(thisEl.dataset.ajaxcomplete == 'replace') {
                var ajaxComplete = function (output) {
                    $(updateEliment).empty().append(output);
                }
            } else if(thisEl.dataset.ajaxcomplete == 'after') {
                var ajaxComplete = function (output) {
                   $(updateEliment).append(output);
                }
            } else if(thisEl.dataset.ajaxcomplete == 'before') {
                var ajaxComplete = function (output) {
                    $(updateEliment).prepend(output);
                }
            } else {
                var ajaxComplete = window[thisEl.dataset.ajaxcomplete];
            }
        }

        if(typeof thisEl.dataset.uploadporgress != 'undefined') {
            var uploadporgressEl = thisEl.dataset.uploadporgress
        }

        if(fileInputPresent && form_data != null) {
            $.ajax({
                url: ajaxhref,
                type: "post",
                xhr: function()
                {
                   var myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload){ // Check if upload property exists
                        myXhr.upload.addEventListener('progress',function(e) {
                                var value = ~~((e.loaded / e.total) * 100);

                                if(typeof window.ajaxFunVar == 'function') {
                                    var fun = window.ajaxFunVar;
                                    //ajaxXhrfunction(value, e.loaded, e.total);
                                    fun(value, e.loaded, e.total);
                                }
                        }, false);
                    }
                    return myXhr;
                },
                data: form_data,
                dataType: "json",
                cache: false,
                contentType: false,
                processData: false,
                success: function(output) {
                    if (typeof ajaxSuccess === 'function') {
                        ajaxSuccess(output);
                    }
                },
                error: function(xhr,status,error){
                    console.log("error");
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                }
            });
        } else {
            $.ajax({
                url: ajaxhref,
                type: ajaxType,
                dataType: ajaxdatatype,         
                data: form_data,
                success: function(output) {
                    if (typeof ajaxSuccess === 'function') {
                        ajaxSuccess(output);
                    }
                },
                error: function(xhr,status,error){
                        console.log("error");
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                }
            })
            .done(function (output) {
                if (typeof ajaxComplete === 'function') {
                    ajaxComplete(output);
                }
            });
        }
}

$('.ajax').click(function(event) {

    event.preventDefault();
    callAjax(this);
    

});
