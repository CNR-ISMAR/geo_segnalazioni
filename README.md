# Geo-Segnalazioni a supporto della ricerca

QUesto piccolo software è stato realizzato per permettere l'inserimento di segnalazioni di avvistamento di esemplari di Pinna nobilis e la successiva visualizzazione su una mappa creata con Umap. Può funzionare agevolmente anche su un hosting condiviso (Aruba, Tophost etc..)

Per riutilizzarlo:

1) creare la propria mappa di interesse su Umap come è stato fatto per la Pinna Nobilis

https://umap.openstreetmap.fr/it/map/mappa-la-pinna-cnr-ismar_427297

2) impostare un livello di sfondo standard (es. openstreetmap) o un WMS

3) scaricere ed adattare il codice:

  -  impostare la vista iniziale della mappa nel file mappa.js righe 27-30
  -  sostituire il livello di sfondo nel file mappa.js riga 40
  -  rinominare il file segnalazioni.sample in segnlazioni.csv e adattarlo alle proprie esigenze rinominando i campi eccetto Latitude e Longitude
  -  personalizzare il file form.php assegnando ai campi in input l'attributo name uguale ai campi usati nel file csv
  -  ridefinire l'array $savestring nel file index.php alla riga 124 in base al formato del file csv
  -  impostare la variabile $mapurl file index.php riga 95 alla url della mappa desiderata
  
  
 Amedeo Fadini
 Marco Sigovini
 CNR-ISMAR Venezia
