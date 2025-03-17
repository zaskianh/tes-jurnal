/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3774164897")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "bool1792940398",
    "name": "Verifikasi_Guru",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3522219177",
    "max": 0,
    "min": 0,
    "name": "Catatan_Instruktur",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3774164897")

  // remove field
  collection.fields.removeById("bool1792940398")

  // remove field
  collection.fields.removeById("text3522219177")

  return app.save(collection)
})
