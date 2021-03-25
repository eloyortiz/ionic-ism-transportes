var app = angular.module('starter.services', []);

app.factory('Datos', function ($ionicPlatform, $q) {
    var db = {},
        camiones = [],
        partidas = [],
        destinos = [],
        pedidos = [],
        bultos = [],
        firmas = [],
        incidencias = [],
        fotos = [],
        inciden_fotos = [];

    var createCamiones = function () {
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS CAMION (Id integer primary key, Clave text, Matricula text)');
            tx.executeSql('INSERT INTO CAMION (Clave, Matricula) VALUES (?,?)', ["ISM123", "1234BBB"]);
            tx.executeSql('INSERT INTO CAMION (Clave, Matricula) VALUES (?,?)', ["ISM123", "1234CCC"]);
        }, function (error) {
            console.log('CAMION Transaction ERROR: ' + error.message);
        }, function () {
            console.log('CAMION Populated database OK');

            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM CAMION', [], function (tx, rs) {
                    if (rs.rows.length > 0) {
                        for (var i = 0; i < rs.rows.length; i++) {
                            camiones.push(rs.rows.item(i));
                        }
                        $scope.$apply();
                    }
                }, function (tx, error) {
                    console.log('SELECT * FROM CAMION error: ' + error.message);
                });
            });
        });
    };

    var createPartidas = function () {
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS PARTIDA (Id integer primary key, CamionId integer, LugarSalida text , Info text, Fecha date)');
            tx.executeSql('INSERT INTO PARTIDA (CamionId,LugarSalida,Info,Fecha) VALUES (?,?,?,?)', [1, "Oficina central", "Campiña Sur", new Date()]);
            tx.executeSql('INSERT INTO PARTIDA (CamionId,LugarSalida,Info,Fecha) VALUES (?,?,?,?)', [1, "Oficina central", "Córdoba Centro", new Date()]);
            tx.executeSql('INSERT INTO PARTIDA (CamionId,LugarSalida,Info,Fecha) VALUES (?,?,?,?)', [2, "Oficina sur", "Norte", new Date()]);
            tx.executeSql('INSERT INTO PARTIDA (CamionId,LugarSalida,Info,Fecha) VALUES (?,?,?,?)', [2, "Oficina sur", "Oeste", new Date()]);
        }, function (error) {
            console.log('PARTIDA Transaction ERROR: ' + error.message);
        }, function () {
            console.log('PARTIDA Populated database OK');

            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM PARTIDA', [], function (tx, rs) {
                    if (rs.rows.length > 0) {
                        for (var i = 0; i < rs.rows.length; i++) {
                            partidas.push(rs.rows.item(i));
                        }
                    }
                }, function (tx, error) {
                    console.log('SELECT error: ' + error.message);
                });
            });
        });
    };

    var createDestinos = function () {
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS DESTINO (Id INTEGER PRIMARY KEY,PartidaId INTEGER, Orden INTEGER,Direccion TEXT, Numero INTEGER, Piso TEXT, Localidad TEXT,CodigoPostal INTEGER, Provincia TEXT)');
            tx.executeSql('INSERT INTO DESTINO (PartidaId,Orden,Direccion,Numero,Piso,Localidad,CodigoPostal,Provincia) VALUES (?,?,?,?,?,?,?,?)', [1, 1, "Calle Alta", 24, "1ºc", "Baena", 14850, "Córdoba"]);
            tx.executeSql('INSERT INTO DESTINO (PartidaId,Orden,Direccion,Numero,Piso,Localidad,CodigoPostal,Provincia) VALUES (?,?,?,?,?,?,?,?)', [1, 2, "Calle Mesones", 12, "", "Baena", 14850, "Córdoba"]);
            tx.executeSql('INSERT INTO DESTINO (PartidaId,Orden,Direccion,Numero,Piso,Localidad,CodigoPostal,Provincia) VALUES (?,?,?,?,?,?,?,?)', [1, 3, "Calle Salvador Muñoz", 45, "2 derecha", "Baena", 14850, "Córdoba"]);
            tx.executeSql('INSERT INTO DESTINO (PartidaId,Orden,Direccion,Numero,Piso,Localidad,CodigoPostal,Provincia) VALUES (?,?,?,?,?,?,?,?)', [1, 4, "Calle Mayor", 25, "", "Albendin", 14850, "Córdoba"]);
            tx.executeSql('INSERT INTO DESTINO (PartidaId,Orden,Direccion,Numero,Piso,Localidad,CodigoPostal,Provincia) VALUES (?,?,?,?,?,?,?,?)', [2, 1, "Calle Arroyo del Moro", 25, "", "Córdoba", 14011, "Córdoba"]);
            tx.executeSql('INSERT INTO DESTINO (PartidaId,Orden,Direccion,Numero,Piso,Localidad,CodigoPostal,Provincia) VALUES (?,?,?,?,?,?,?,?)', [2, 2, "Calle José Alcaide Irlan", 1, "Bloque 5, 1º c", "Córdoba", 14005, "Córdoba"]);
            tx.executeSql('INSERT INTO DESTINO (PartidaId,Orden,Direccion,Numero,Piso,Localidad,CodigoPostal,Provincia) VALUES (?,?,?,?,?,?,?,?)', [2, 3, "Calle José Maria Martorel", 4, "2º", "Córdoba", 14005, "Córdoba"]);
            tx.executeSql('INSERT INTO DESTINO (PartidaId,Orden,Direccion,Numero,Piso,Localidad,CodigoPostal,Provincia) VALUES (?,?,?,?,?,?,?,?)', [3, 1, "Calle Alta", 24, "1ºc", "Baena", 14850, "Córdoba"]);
            tx.executeSql('INSERT INTO DESTINO (PartidaId,Orden,Direccion,Numero,Piso,Localidad,CodigoPostal,Provincia) VALUES (?,?,?,?,?,?,?,?)', [3, 2, "Calle Mesones", 12, "", "Baena", 14850, "Córdoba"]);
            tx.executeSql('INSERT INTO DESTINO (PartidaId,Orden,Direccion,Numero,Piso,Localidad,CodigoPostal,Provincia) VALUES (?,?,?,?,?,?,?,?)', [4, 1, "Calle Salvador Muñoz", 45, "2 derecha", "Baena", 14850, "Córdoba"]);
            tx.executeSql('INSERT INTO DESTINO (PartidaId,Orden,Direccion,Numero,Piso,Localidad,CodigoPostal,Provincia) VALUES (?,?,?,?,?,?,?,?)', [4, 2, "Calle Mayor", 25, "", "Albendin", 14850, "Córdoba"]);
        }, function (error) {
            console.log('DESTINO Transaction ERROR: ' + error.message);
        }, function () {
            console.log('DESTINO Populated database OK');

            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM DESTINO', [], function (tx, rs) {
                    if (rs.rows.length > 0) {
                        for (var i = 0; i < rs.rows.length; i++) {
                            destinos.push(rs.rows.item(i));
                        }
                    }
                }, function (tx, error) {
                    console.log('SELECT * FROM DESTINO error: ' + error.message);
                });
            });
        });
    };

    var createPedidos = function () {
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS PEDIDO (Id INTEGER PRIMARY KEY, DestinoId INTEGER, Destinatario TEXT , Telefono INTEGER,Remitente TEXT, NSeguimiento TEXT , NBultos INTEGER ,TipoTransporte TEXT, Finalizado INTEGER, Firmado INTEGER, Firma TEXT)');
            tx.executeSql('INSERT INTO PEDIDO (DestinoId, Destinatario, Remitente, Telefono, NSeguimiento, NBultos, TipoTransporte, Finalizado, Firmado) VALUES (?,?,?,?,?,?,?,?,?)', [1, "Juan Garrido", "El Corte Inglés", 645879154, "ES846841222", 2, "Entrega", 0, 0]);
            tx.executeSql('INSERT INTO PEDIDO (DestinoId, Destinatario, Remitente, Telefono, NSeguimiento, NBultos, TipoTransporte, Finalizado, Firmado) VALUES (?,?,?,?,?,?,?,?,?)', [1, "Belén Amo", "Zalando", 645879154, "DEV-34564234ACC", 1, "Recogida", 0, 0]);
            tx.executeSql('INSERT INTO PEDIDO (DestinoId, Destinatario, Remitente, Telefono, NSeguimiento, NBultos, TipoTransporte, Finalizado, Firmado) VALUES (?,?,?,?,?,?,?,?,?)', [2, "Maria Gallardo", "Zara", 612549783, "34564234332", 1, "Entrega", 0, 0]);
            tx.executeSql('INSERT INTO PEDIDO (DestinoId, Destinatario, Remitente, Telefono, NSeguimiento, NBultos, TipoTransporte, Finalizado, Firmado) VALUES (?,?,?,?,?,?,?,?,?)', [3, "Hiper marcas", "Amazon", 957456258, "sp2353424309908", 3, "Entrega", 0, 0]);
            tx.executeSql('INSERT INTO PEDIDO (DestinoId, Destinatario, Remitente, Telefono, NSeguimiento, NBultos, TipoTransporte, Finalizado, Firmado) VALUES (?,?,?,?,?,?,?,?,?)', [4, "Mario Luna", "Amazon", 95769823, "sp2353424312345", 1, "Entrega", 0, 0]);
            tx.executeSql('INSERT INTO PEDIDO (DestinoId, Destinatario, Remitente, Telefono, NSeguimiento, NBultos, TipoTransporte, Finalizado, Firmado) VALUES (?,?,?,?,?,?,?,?,?)', [5, "Carlos Aceituno", "Springfield", 605769741, "235374589654", 1, "Recogida", 0, 0]);
            tx.executeSql('INSERT INTO PEDIDO (DestinoId, Destinatario, Remitente, Telefono, NSeguimiento, NBultos, TipoTransporte, Finalizado, Firmado) VALUES (?,?,?,?,?,?,?,?,?)', [6, "Juan Castro", "Auto-recambios 24H", 665231845, "2ert23425345", 2, "Entrega", 0, 0]);
            tx.executeSql('INSERT INTO PEDIDO (DestinoId, Destinatario, Remitente, Telefono, NSeguimiento, NBultos, TipoTransporte, Finalizado, Firmado) VALUES (?,?,?,?,?,?,?,?,?)', [7, "Rafa Serrano", "Gym-4U", 648253114, "234544312345", 1, "Entrega", 0, 0]);
            tx.executeSql('INSERT INTO PEDIDO (DestinoId, Destinatario, Remitente, Telefono, NSeguimiento, NBultos, TipoTransporte, Finalizado, Firmado) VALUES (?,?,?,?,?,?,?,?,?)', [8, "Luis Cobos", "MediaMarkt", 645879154, "ES846841222", 1, "Entrega", 0, 0]);
            tx.executeSql('INSERT INTO PEDIDO (DestinoId, Destinatario, Remitente, Telefono, NSeguimiento, NBultos, TipoTransporte, Finalizado, Firmado) VALUES (?,?,?,?,?,?,?,?,?)', [9, "Adolfo del Real", "Pc Componentes", 645879154, "DEV-34564234ACC", 1, "Recogida", 0, 0]);
            tx.executeSql('INSERT INTO PEDIDO (DestinoId, Destinatario, Remitente, Telefono, NSeguimiento, NBultos, TipoTransporte, Finalizado, Firmado) VALUES (?,?,?,?,?,?,?,?,?)', [9, "Mireia Sanchez", "Pull&Bear", 612549783, "34564234332", 1, "Entrega", 0, 0]);
            tx.executeSql('INSERT INTO PEDIDO (DestinoId, Destinatario, Remitente, Telefono, NSeguimiento, NBultos, TipoTransporte, Finalizado, Firmado) VALUES (?,?,?,?,?,?,?,?,?)', [9, "Antonio Lucena", "Amazon", 957456258, "sp2353424309908", 1, "Entrega", 0, 0]);
            tx.executeSql('INSERT INTO PEDIDO (DestinoId, Destinatario, Remitente, Telefono, NSeguimiento, NBultos, TipoTransporte, Finalizado, Firmado) VALUES (?,?,?,?,?,?,?,?,?)', [10, "Rosa Rivas", "Mango", 95769823, "sp2353424312345", 2, "Entrega", 0, 0]);
            tx.executeSql('INSERT INTO PEDIDO (DestinoId, Destinatario, Remitente, Telefono, NSeguimiento, NBultos, TipoTransporte, Finalizado, Firmado) VALUES (?,?,?,?,?,?,?,?,?)', [10, "Juan Leiva", "CoolMod", 605769741, "235374589654", 1, "Recogida", 0, 0]);
            tx.executeSql('INSERT INTO PEDIDO (DestinoId, Destinatario, Remitente, Telefono, NSeguimiento, NBultos, TipoTransporte, Finalizado, Firmado) VALUES (?,?,?,?,?,?,?,?,?)', [11, "Damian Suarez", "Auto-recambios 24H", 665231845, "2ert23425345", 2, "Entrega", 0, 0]);
        }, function (error) {
            console.log('PEDIDO Transaction ERROR: ' + error.message);
        }, function () {
            console.log('PEDIDO Populated database OK');

            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM PEDIDO', [], function (tx, rs) {
                    if (rs.rows.length > 0) {
                        for (var i = 0; i < rs.rows.length; i++) {
                            pedidos.push(rs.rows.item(i));
                        }
                    }
                }, function (tx, error) {
                    console.log('SELECT * FROM PEDIDO error: ' + error.message);
                });
            });
        });
    };

    var createBultos = function () {
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS BULTO (Id INTEGER PRIMARY KEY,PedidoId INTEGER, Descripcion TEXT, Numero INTEGER, Foto TEXT)');
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [1, "Bulto 500 grs", 1]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [1, "Bulto 700 grs", 2]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [2, "Bulto 1500 grs", 1]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [3, "Bulto 150 grs", 1]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [4, "Bulto 615 grs", 1]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [4, "Bulto 264 grs", 2]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [4, "Bulto 845 grs", 3]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [5, "Bulto 334 grs", 1]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [6, "Bulto 558 grs", 1]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [7, "Bulto 2312 grs", 1]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [7, "Bulto 1203 grs", 2]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [8, "Bulto 321 grs", 1]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [9, "Bulto 500 grs", 1]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [10, "Bulto 700 grs", 1]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [11, "Bulto 1500 grs", 1]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [12, "Bulto 150 grs", 1]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [13, "Bulto 615 grs", 1]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [13, "Bulto 264 grs", 2]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [14, "Bulto 845 grs", 1]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [15, "Bulto 334 grs", 1]);
            tx.executeSql('INSERT INTO BULTO (PedidoId,Descripcion,Numero) VALUES (?,?,?)', [15, "Bulto 558 grs", 2]);
        }, function (error) {
            console.log('BULTO Transaction ERROR: ' + error.message);
        }, function () {
            console.log('BULTO Populated database OK');

            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM BULTO', [], function (tx, rs) {
                    if (rs.rows.length > 0) {
                        for (var i = 0; i < rs.rows.length; i++) {
                            bultos.push(rs.rows.item(i));
                        }
                    }
                }, function (tx, error) {
                    console.log('SELECT * FROM BULTO error: ' + error.message);
                });
            });
        });
    };

    var createFirmas = function () {
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS FIRMA (Id INTEGER PRIMARY KEY, Fecha DATE , Firma TEXT)');

        }, function (error) {
            console.log('FIRMA Transaction ERROR: ' + error.message);
        }, function () {
            console.log('FIRMA Populated database OK');

            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM FIRMA', [], function (tx, rs) {
                    if (rs.rows.length > 0) {
                        for (var i = 0; i < rs.rows.length; i++) {
                            firmas.push(rs.rows.item(i));
                        }
                    }
                }, function (tx, error) {
                    console.log('SELECT error: ' + error.message);
                });
            });
        });
    };

    var createFotos = function () {
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS FOTO (Id INTEGER PRIMARY KEY, Foto TEXT)');

        }, function (error) {
            console.log('FOTO Transaction ERROR: ' + error.message);
        }, function () {
            console.log('FOTO Populated database OK');

            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM FOTO', [], function (tx, rs) {
                    if (rs.rows.length > 0) {
                        for (var i = 0; i < rs.rows.length; i++) {
                            fotos.push(rs.rows.item(i));
                        }
                    }
                }, function (tx, error) {
                    console.log('SELECT error: ' + error.message);
                });
            });
        });
    };

    var createIncidencias = function () {
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS INCIDENCIA (Id INTEGER PRIMARY KEY, Tipo TEXT , Descripcion TEXT)');

        }, function (error) {
            console.log('INCIDENCIA Transaction ERROR: ' + error.message);
        }, function () {
            console.log('INCIDENCIA Populated database OK');

            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM INCIDENCIA', [], function (tx, rs) {
                    if (rs.rows.length > 0) {
                        for (var i = 0; i < rs.rows.length; i++) {
                            incidencias.push(rs.rows.item(i));
                        }
                    }
                }, function (tx, error) {
                    console.log('SELECT error: ' + error.message);
                });
            });
        });
    };

    var createInciden_fotos = function () {
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS INCIDEN_FOTO (Id INTEGER PRIMARY KEY, IncidenciaId INTEGER, FotoId INTEGER )');

        }, function (error) {
            console.log('INCIDEN_FOTO Transaction ERROR: ' + error.message);
        }, function () {
            console.log('INCIDEN_FOTO Populated database OK');

            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM INCIDEN_FOTO', [], function (tx, rs) {
                    if (rs.rows.length > 0) {
                        for (var i = 0; i < rs.rows.length; i++) {
                            inciden_fotos.push(rs.rows.item(i));
                        }
                    }
                }, function (tx, error) {
                    console.log('SELECT error: ' + error.message);
                });
            });
        });
    };

    var inicializaBBDD = function () {

        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS CAMION', [], function (tx, rs) {
                createCamiones();
                console.log('createCamiones()');
            }, function (tx, error) {
                console.log(error);
            });
        });

        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS PARTIDA', [], function (tx, rs) {
                createPartidas();
                console.log('createPartidas()');
            }, function (tx, error) {
                console.log(error);
            });
        });

        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS DESTINO', [], function (tx, rs) {
                createDestinos();
                console.log('createDestinos()');
            }, function (tx, error) {
                console.log(error);
            });
        });

        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS PEDIDO', [], function (tx, rs) {
                createPedidos();
                console.log('createPedidos()');
            }, function (tx, error) {
                console.log(error);
            });
        });

        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS BULTO', [], function (tx, rs) {
                createBultos();
                console.log('createBultos()');
            }, function (tx, error) {
                console.log(error);
            });
        });

        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS FIRMA', [], function (tx, rs) {
                createFirmas();
                console.log('createFirmas()');
            }, function (tx, error) {
                console.log(error);
            });
        });

        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS FOTO', [], function (tx, rs) {
                createFotos();
                console.log('createFotos()');
            }, function (tx, error) {
                console.log(error);
            });
        });

        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS INCIDENCIA', [], function (tx, rs) {
                createIncidencias();
                console.log('createIncidencias()');
            }, function (tx, error) {
                console.log(error);
            });
        });

        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS INCIDEN_FOTO', [], function (tx, rs) {
                createInciden_fotos();
                console.log('createInciden_fotos');
            }, function (tx, error) {
                console.log(error);
            });
        });
    };

    $ionicPlatform.ready(function () {
        console.log('>> platform Ready!');

        document.addEventListener('deviceready', function () {
            db = window.sqlitePlugin.openDatabase({
                name: 'ISM.db',
                location: 'default',
                androidDatabaseImplementation: 2,
                androidLockWorkaround: 1
            });
        });

        inicializaBBDD();
    });

    return {
        camiones: camiones,
        setInitBBD: function () {
            inicializaBBDD();
        },
        getAllCamiones: function () {
            return camiones;
        },
        //getAllPartidas: function () {
        //	return partidas;
        //},
        //getAllDestinos: function () {
        //	return destinos;
        //},
        //getAllPedidos: function () {
        //	return pedidos;
        //},
        //getAllBultos: function () {
        //	return bultos;
        //},
        getPartidas: function (camionId) {
            var selected = [];
            for (var i = 0; i < partidas.length; i++) {
                if (partidas[i].CamionId === parseInt(camionId)) {
                    selected.push(partidas[i]);
                }
            }

            if (selected.length < 1) { return null };

            return selected;
        },
        getDestinos: function (partidaId) {
            var selected = [];
            for (var i = 0; i < destinos.length; i++) {
                if (destinos[i].PartidaId === parseInt(partidaId)) {
                    selected.push(destinos[i]);
                }
            }

            if (selected.length < 1) { return null };

            return selected;
        },
        getPedidos: function (destinoId) {
            var selected = [];
            for (var i = 0; i < pedidos.length; i++) {
                if (pedidos[i].DestinoId === parseInt(destinoId)) {
                    selected.push(pedidos[i]);
                }
            }

            if (selected.length < 1) { return null };

            return selected;
        },
        getBultos: function (pedidoId) {
            var selected = [];
            for (var i = 0; i < bultos.length; i++) {
                if (bultos[i].PedidoId === parseInt(pedidoId)) {
                    selected.push(bultos[i]);
                }
            }

            if (selected.length < 1) { return null };

            return selected;
        },

        getCamion: function (matricula, clave) {
            for (var i = 0; i < camiones.length; i++) {
                if (camiones[i].Matricula === matricula && camiones[i].Clave === clave) {
                    return camiones[i];
                }
            }
            return null;
        },
        getPartida: function (partidaId) {
            for (var i = 0; i < partidas.length; i++) {
                if (partidas[i].Id === parseInt(partidaId)) {
                    return partidas[i];
                }
            }
            return null;
        },
        getDestino: function (destinoId) {
            for (var i = 0; i < destinos.length; i++) {
                if (destinos[i].Id === parseInt(destinoId)) {
                    return destinos[i];
                }
            }
            return null;
        },
        getPedido: function (pedidoId) {
            for (var i = 0; i < pedidos.length; i++) {
                if (pedidos[i].Id === parseInt(pedidoId)) {
                    return pedidos[i];
                }
            }
            return null;
        },
        getBulto: function (bultoId) {
            for (var i = 0; i < bultos.length; i++) {
                if (bultos[i].Id === parseInt(bultoId)) {
                    return bultos[i];
                }
            }
            return null;
        },
        getFoto: function (fotoId) {
            for (var i = 0; i < fotos.length; i++) {
                if (fotos[i].Id === parseInt(fotoId)) {
                    return foto[i];
                }
            }
            return null;
        },
        pedidoEntregado: function (pedido) {
            pedido.Finalizado = 1;
            pedidos.splice(pedidos.indexOf(pedido), 1);
        },
        getFirma: function (firmaId) {
            if (firmas.length > 0) {
                for (var i = 0; i < firmas.length; i++) {
                    if (firmas[i].Id === parseInt(firmasId)) {
                        return firmas[i];
                    }
                }
            }
            else {
                return null;
            }
        },
        addFirma: function (signature) {
            var q = $q.defer();
            var query = "INSERT INTO FIRMA (Fecha, Firma) VALUES (?,?)";

            db.transaction(function (tx) {
                tx.executeSql(query, [new Date(), signature], function (tx, res) {
                    q.resolve(res);
                },
                function (tx, error) {
                    q.reject(error);
                });
            }, function (error) {
                console.log('transaction addFirma error: ' + error.message);
            }, function () {
                console.log('addFirma ok');
            });

            return q.promise;
        },
        updatePedido: function (pedidoId, Finalizado, Firmado, Firma) {
            var q = $q.defer();

            db.transaction(function (tx) {

                var query = "UPDATE PEDIDO SET Finalizado = ?, Firmado = ?, Firma = ? WHERE Id = ?";

                tx.executeSql(query, [Finalizado, Firmado, Firma, pedidoId], function (tx, res) {
                    q.resolve(res);
                    console.log("insertId: " + res.insertId);
                    console.log("rowsAffected: " + res.rowsAffected);
                },
                function (tx, error) {
                    q.reject(error);
                    console.log('UPDATE error: ' + error.message);
                });
            }, function (error) {
                console.log('updatePedido transaction error: ' + error.message);
            }, function () {
                console.log('updatePedido transaction ok');
            });

            return q.promise;
        }
    };
});
