# Ajax Tags
Ajax tags is a small jquery plugin that lets you make ajax calls straight from our html tags. Ajax tags uses the html attributes to generate you ajax call.

##Usage
First you must give you element a `class="ajax"`. Then add all the data attributes to it to make your ajax call
```
<a class="ajax" data-ajaxHref="/post/url.php" data-ajaxDataType="html" data-ajaxSuccess="after" data-ajaxUpdate="body">Logout</a>
```

##Available html attributes
* [data-ajaxhref]( #data-ajaxhref ) 
* [data-ajaxmethord](#data-ajaxmethord)
* [data-ajaxdatatype](#data-ajaxdatatype)
* [data-ajaxdata](#data-ajaxdata)
* [data-ajaxcomplete](#data-ajaxcomplete)
* [data-ajaxsuccess](#data-ajaxsuccess)
* [data-ajaxupdate](#data-ajaxupdate)

###data-ajaxhref

The source that will be used to post to. 

###data-ajaxmethord

The method to use in your request.

* GET **DEFAULT**
* POST

###data-ajaxdatatype

The data type to return form your request

* Intelligent Guess **DEFAULT**
* xml
* json
* script
* html

###data-ajaxdata

The data to be sent to your post url. This can be a jquery selector or a json string

```
<form id="myForm">
    <input type="text" placeholder="User Name" />
    <input type="password" placeholder="Password" />
</form>
<a class="ajax" data-ajaxHref="post.url.php" data-ajaxdata="#myForm">Submit</a>
```
The above code will parse the form and send it to post/url.php.
You can also use a json string.

```
data-ajaxdata="{'key1':'value1', 'key2':'value2'}"
```

###data-ajaxcomplete

The function to be run on ajax complete. The built in options are.
* replace
* after
* before

<!--add link to update-->
This attribute must be set with `data-ajaxupdate` see data-ajaxupdate. When the call is finished then it will get the ajaxupdate container and run the relevant function

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **replace:**  This will clear the container and insert the response

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **after:**  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This will append the response to the update container

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **before:** &nbsp; This will prepend the response to the update container
```
<a class="ajax" data-ajaxcomplete="replace" data-ajaxupdate="#updateContainer">Submit</a>
<div id="updateContainer">
    <p>User Name Must not be empty</p>
</div>
```
When the ajax call has finished the above code will remove the contents of `updateContainer` and replace it with the response of the ajax call.

**Defining you own functions**

You can defile you own functions and use the name of the function in the `data-ajaxcomplete` attribute
```
<a class="ajax" data-ajaxcomplete="myFunction">Submit</a>
<script type="text/javascript">
    function myFunction () {
        // code goes here
    }
</script>
```
###data-ajaxsuccess
This dose the same as `data-ajaxcomlete` see data-ajaxcomlete
only uses the ajax success function to be used when the form had a file input if the form has no file input you can use either.

###data-ajaxupdate
Sets the container the ajax call will target when the call has finished.<br>
This is to be used with `data-ajaxcomplete` or `data-ajaxsuccess` and will update the specified container

##Reloading ajax tags for dynamically called pages
When loading views with ajax tags the browser will not add a event listener to the html that is not there. So when loading html that has a ajax tag in it load this snippet in you response.
```
<script type="text/javascript">
    if (typeof callAjax == 'function') {
        var el = document.getElementsByClassName("ajax");

        for (var i = 0, len = el.length; i < len; i++) {
            el[i].addEventListener('click', function (event) {
                event.preventDefault();
                callAjax(this);
            }, false);
        }
      }
</script>
```

