/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3774164897")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "autodate2990389176",
    "name": "Tanggal",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3774164897")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "autodate2990389176",
    "name": "tanggal",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  return app.save(collection)
})
