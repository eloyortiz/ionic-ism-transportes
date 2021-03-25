var app = angular.module('starter.controllers', []);

app.controller('AppCtrl', function ($scope, $stateParams, Datos, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaFile, $ionicModal, $ionicLoading, $ionicListDelegate) {

    $scope.camiones = Datos.camiones;

    if (typeof ($stateParams.camionId) !== 'undefined') {
        $scope.partidas = Datos.getPartidas($stateParams.camionId);
    }

    //DESTINOS
    if (typeof ($stateParams.partidaId) !== 'undefined') {
        $scope.destinos = Datos.getDestinos($stateParams.partidaId);
    }

    //PEDIDOS
    if (typeof ($stateParams.destinoId) !== 'undefined') {
        $scope.pedidos = Datos.getPedidos($stateParams.destinoId);
        $scope.entregado = function (pedido) {
            Datos.pedidoEntregado(pedido);
            $scope.pedidos = Datos.getPedidos($stateParams.destinoId);
        };
    }

    //BULTOS
    if (typeof ($stateParams.pedidoId) !== 'undefined') {
        $scope.bultos = Datos.getBultos($stateParams.pedidoId);
        $scope.pedido = Datos.getPedido($stateParams.pedidoId);

    }

    if (typeof ($stateParams.bultoId) !== 'undefined') {
        $scope.incidencia = Datos.getIncidencia($stateParams.bultoId);
    }

    $scope.user = {
        Matricula: '',
        Clave: ''
    };

    $ionicModal.fromTemplateUrl('templates/usuariosModal.html', {
        scope: $scope,
        animation: 'fade-in'
    }).then(function (modal) {
        $scope.usuariosModal = modal;
    });

    $scope.openUsuariosModal = function () {
        $scope.usuariosModal.show();
    };

    $scope.hideModal = function () {
        $scope.usuariosModal.hide();
    };

    $scope.InicializaBBDD = function () {
        Datos.setInitBBD();
        $scope.showLoading();
    }

    $scope.showLoading = function () {
        $ionicLoading.show({
            template: 'Cargando...',
            duration: 2500
        }).then(function () {
            var alertPopup = $ionicPopup.alert({
                title: 'BBDD Inicializada',
                template: ''
            });
            console.log("The loading indicator is now displayed");
        });
    };
    $scope.hideLoading = function () {
        $ionicLoading.hide().then(function () {
            console.log("The loading indicator is now hidden");
        });
    };

    $scope.SetLogin = function (camion) {
        $scope.user.Matricula = camion.Matricula;
        $scope.user.Clave = camion.Clave;
        $scope.hideModal();
    }
    $scope.Login = function () {
        
        $scope.UsuarioActivo = Datos.getCamion($scope.user.Matricula, $scope.user.Clave);
        if( $scope.UsuarioActivo !== null)
        {
            var _url = '#/tab/partidas/' + $scope.UsuarioActivo.Id;
            $scope.GoTo(_url);
            $scope.SetLogin('', '');
        }
        else {
            $scope.SetLogin('', '');
            var alertPopup = $ionicPopup.alert({
                title: 'Login',
                template: 'Datos Incorrectos',
                buttons: [{
                    text: 'Aceptar',
                    type: 'button-assertive'
                    }]
            });
        }
    }

    $scope.GoTo = function (url) {
        window.location.href = url;
    }

    $scope.navInicio = function () {
        $ionicHistory.nextViewOptions({
            disableBack: true,
            historyRoot: true
        });
        window.location.href = "#/inicio";
    }

    $scope.showConfirm = function () {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Salir de la aplicación',
            template: '¿Está seguro que desea salir?',
            cancelText: 'No',
            cancelType: 'button-light',
            okText: 'Si',
            okType: 'button-assertive',
        });

        confirmPopup.then(function (res) {
            if (res) {
                console.log('Salida');
                $scope.navInicio();
            } else {
                console.log('No salida');
            }
        });
    };

});

app.controller('imageCtrl', function ($scope, $stateParams, $cordovaCamera, $cordovaFile, Datos, $ionicPopup, $ionicHistory, $ionicModal) {
    $scope.images = [];

    if (typeof ($stateParams.bultoId) !== 'undefined') {
        $scope.bulto = Datos.getBulto($stateParams.bultoId);

        if (typeof ($scope.bulto.Foto) !== 'undefined' && $scope.bulto.Foto !== null) {
            $scope.images.push($scope.bulto.Foto);
        }

    }

    $scope.addImage = function() {
        var options = {
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            onImageSuccess(imageData);

            function onImageSuccess(fileURI) {
                createFileEntry(fileURI);
            }

            function createFileEntry(fileURI) {
                window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
            }

            function copyFile(fileEntry) {
                var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
                var newName = makeid() + name;

                window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
                    fileEntry.copyTo(
					  fileSystem2,
					  newName,
					  onCopySuccess,
					  fail
					);
                },
				fail);
            }

            function onCopySuccess(entry) {
                $scope.$apply(function () {
                    $scope.images.push(entry.nativeURL);

                    $scope.bulto = Datos.getBulto($stateParams.bultoId);
                    $scope.bulto.Foto = entry.nativeURL;

                    var alertPopup = $ionicPopup.alert({
                        title: 'Incidencia registrada',
                        template: 'Foto guardada',
                        buttons: [{
                            text: 'Aceptar',
                            type: 'button-energized'
                        }]
                    });

                    $ionicHistory.goBack();
                    
                });
            }

            function fail(error) {
                console.log("fail: " + error.code);
            }

            function makeid() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i=0; i < 5; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            }

        }, function(err) {
            console.log(err);
        });
    }

    $scope.urlForImage = function(imageName) {
        var name = imageName.substr(imageName.lastIndexOf('/') + 1);
        var trueOrigin = cordova.file.dataDirectory + name;
        return trueOrigin;
    }

    $scope.showImages = function (index) {
        $scope.activeSlide = index;
        $scope.showModal('templates/image-popover.html');
    }

    $scope.showModal = function (templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    }

    $scope.closeModal = function () {
        $scope.modal.hide();
        $scope.modal.remove()
    };

});

app.controller('SignatureCtrl', function ($scope, $stateParams, $ionicHistory, Datos, $ionicPopup, $ionicListDelegate) {
    var canvas = document.getElementById('signatureCanvas');
    var signaturePad = new SignaturePad(canvas);

    if (typeof ($stateParams.pedidoId) !== 'undefined') {
        $scope.pedido = Datos.getPedido($stateParams.pedidoId);

        if ($scope.pedido.Firmado == 1) {
            $scope.signature = $scope.pedido.Firma;
        }
        
    }

    $scope.clearCanvas = function () {
        signaturePad.clear();
    }

    $scope.saveCanvas = function () {
        var sigImg = signaturePad.toDataURL();
        $scope.pedido = Datos.getPedido($stateParams.pedidoId);
        $scope.pedido.Firma = sigImg;
        $scope.pedido.Firmado = 1;
        $scope.pedido.Finalizado = 1;
        $scope.firmado = true
        $scope.signature = $scope.pedido.Firma;

        Datos.updatePedido($scope.pedido.Id, $scope.pedido.Finalizado, $scope.pedido.Firmado, $scope.pedido.Firma);

        signaturePad.clear();

        var alertPopup = $ionicPopup.alert({
            title: 'Confirmación de Entrega',
            template: 'Firma guardada',
            buttons: [{
                text: 'Aceptar',
                type: 'button-balanced'
            }]
        });

        $ionicHistory.goBack();
    }


    
});
