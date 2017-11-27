(//https://www.stickler.de/en/information/analytics/ip-anonymization)

function sendHitTask(model){
    var payLoad = model.get('hitPayload');
    var trackingBaseUrl = '//www.google-analytics.com/collect?';

    if (payLoad.length < 400) {
        var collectUrl = window.location.protocol + trackingBaseUrl + payLoad + '&uip=' + ANONYMIZED_CLIENTIP;
        var myImage = new Image();
        myImage.src = collectUrl;
    } else {
        var r = window.ord || Math.floor(Math.random() * 1e16);

        var myIframe = document.createElement('IFRAME');
        myIframe.width = "1px";
        myIframe.height = "1px";
        myIframe.style.display = 'none';
        myIframe.name = "tiframe_" + r;

        var myForm = document.createElement('FORM');
        myForm.method = 'POST';
        myForm.action = window.location.protocol + trackingBaseUrl;
        myForm.target = "tiframe_" + r;

        var parameterValuePairs = payLoad.split('&');

        for (var vpi=0; vpi < parameterValuePairs.length; vpi++) {
            var splittedParameterValuePair = parameterValuePairs[vpi].split('=');
            var parameterName = decodeURIComponent(splittedParameterValuePair[0]);
            var parameterValue = (splittedParameterValuePair.length == 1) ? '' : decodeURIComponent(splittedParameterValuePair[1]);

            var parameterInput = document.createElement('INPUT');
            parameterInput.type = 'HIDDEN';
            parameterInput.name = parameterName;
            parameterInput.value = parameterValue;
            myForm.appendChild(parameterInput);
        }

        var parameterInput = document.createElement('INPUT');
        parameterInput.type = 'HIDDEN';
        parameterInput.name = 'uip';
        parameterInput.value = ANONYMIZED_CLIENTIP;
        myForm.appendChild(parameterInput);

        document.body.appendChild(myForm);
        document.body.appendChild(myIframe);
        myForm.submit();
    }
}

-------------

ga('create', 'UA-XXXX-Y', 'auto');

ga(function(tracker) {
  tracker.set('sendHitTask', function(model) {
        // enter your send hit task function here
  });
});
