var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    inventory: {type: String, required: true},
    processed: {
        identifikatorSloga: {
            _id: {type: String, required: true},
            a: {type: String, required: true},
            b: {type: String, required: true},
            c: {type: String, required: true},
            d: {type: Number, required: true}
        },
        isbn: {
            _id: {type: String, required: true},
            a: {type: String, required: true}
        },
        opstiPodaciZaObradu: {
            _id: {type: String, required: true},
            c: {type: Number, required: true},
            h: {type: String, required: true}
        },
        jezikPublikacije: {
            _id: {type: String, required: true},
            a: {type: String, required: true}
        },
        zemljaIzdavanja: {
            _id: {type: String, required: true},
            a: {type: String, required: true}
        },
        poljeKodiranihPodataka: {
            _id: {type: String, required: true},
            a: {type: String, required: true}
        },
        stvarniNaslovOdgovornost: {
            _id: {type: String, required: true},
            a: {type: String, required: true},
            f: {type: String, required: true}
        },
        izdavanje: {
            _id: {type: String, required: true},
            a: {type: String, required: true},
            c: {type: String, required: true},
            d: {type: Number, required: true}
        },
        materijalniOpis: {
            _id: {type: String, required: true},
            a: {type: String, required: true},
            d: {type: String, required: true}
        },
        napomenaOBibliografijama: {
            _id: {type: String, required: true},
            a: {type: String, required: true}
        },
        fizickiOpis: {
            _id: {type: String, required: true},
            a: {type: String, required: true}
        },
        kratakSadrzaj: {
            _id: {type: String, required: true},
            a: {type: String, required: true}
        },
        licnoImePredmetnaOdrednica: {
            _id: {type: String, required: true},
            a: {type: String, required: true},
            b: {type: String, required: true}
        },
        tematskaPredmetnaOdrednica: {
            _id: {type: String, required: true},
            a: {type: String, required: true},
            x: {type: String, required: true},
            y: {type: String, required: true}
        },
        udk: {
            _id: {type: String, required: true},
            a: {type: String, required: true},
            b: {type: String, required: true}
        },
        licnoImePrimarnaOdgovornost: {
            _id: {type: String, required: true},
            4: {type: Number, required: true},
            a: {type: String, required: true},
            b: {type: String, required: true}
        },
        lokalnePotrebe: {
            _id: {type: String, required: true},
            b: {type: String, required: true}
        }
    },
    inventoryData: {
        inventarnaKnjiga: {type: String, required: true},
        inventarniBroj: {type: String, required: true},
        datumInventarisanja: {type: String, required: true},
        inventator: {type: String, required: true},
        udkGrupa: {type: String, required: true},
        nacinNabavke: {type: String, required: true},
        povez: {type: String, required: true},
        cena: {type: String, required: true}
    },
    reservations: [{
        type: Number, required: false
    }]
}, {collection: 'knjige'});

module.exports = mongoose.model('Book', schema);


