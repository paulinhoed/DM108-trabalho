var app = {
    
        initialize: function () {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        },
    
        // deviceready Event Handler
        //
        // Bind any cordova events here. Common events are:
        // 'pause', 'resume', etc.
        onDeviceReady: function () {
            //myApp.alert('Exemplo modal', 'Exemplo modal!');
            this.receivedEvent('deviceready');
        },
        receivedEvent: function (id) {
            window.FirebasePlugin.getInstanceId( 
                (token) => {
                    console.log('token: ' + token);
                }, (error) => {
                    console.log('token: ' + error);
                    alert(error);
                });
            window.FirebasePlugin.subscribe("example");
    
            window.FirebasePlugin.onNotificationOpen((notification) => {
                alert(JSON.stringify(notification));
            }, (error) => {
                alert(error);
            });
        }
    };
    
    app.initialize();