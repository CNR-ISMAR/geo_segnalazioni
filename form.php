
<style>
.formtooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.formtooltip .formtooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.formtooltip .formtooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.formtooltip:hover .formtooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
<label>Coordinate:</label>
<input type="text" class="form-control-plaintext" id='lat' name='Latitude' size='8' value=''>
<input type="text" class="form-control-plaintext" id='lon' name='Longitude' size='8' value=''>
&nbsp;<a href="https://www.latlong.net/degrees-minutes-seconds-to-decimal-degrees">Convertitore</a>
<p>
<label for="utente">A che categoria appartieni?:</label><br>
<select name="utente">
<option disabled selected value> -- scegli -- </option>
<option value="sub">sub/snorkeling</option>
<option value="diportista">diportista</option>
<option value="professionista">navigo in laguna per lavoro</option>
<option value="sportivo">faccio attivit&agrave; sportiva in laguna (vela, voga...)</option>
<option value="pescatore">pescatore</option>
<option value="ricercatore">ricercatore/biologo</option>
<option value="altro">altro (puoi specificare in campo note)</option>
</select>
<br>
<label for="area_mq">ordine di grandezza dell'area:</label><br>
<select name="area_mq">
<option disabled selected value> -- scegli -- </option>
<option value="100 mq ">100 mq (raggio di circa 5 m, pari all'intorno della barca)</option>
<option value="10000 mq">10000 mq (raggio di circa 50 m, pari alla distanza tra due bricole)</option>
<option value="oltre 10000 mq">maggiore di 10000 mq(velma, palude etc.)</option>
<option value="">Non so/non ricordo</option>
</select>
<br>
<label for="N_approx">numero approssimativo:</label><br>
<select name="N_approx">
<option disabled selected value> -- scegli -- </option>
<option value="1-2 esemplari">1-2 esemplari</option>
<option value="&lt; 10">&lt; 10</option>
<option value="10-100">10-100</option>
<option value="&gt; 100">&gt; 100</option>
<option value="nd">Non sono sicuro che sia Pinna Nobilis</option>
</select>
<br>
<label for="morti_appr">di cui morti:</label><br>
<select name="morti_appr">
<option disabled selected value> -- scegli -- </option>
<option value="1-2 esemplari">1-2 esemplari</option>
<option value="&lt; 50% del totale">&lt; 50% del totale</option>
<option value="&gt; 50% del totale">&gt; 50% del totale</option>
<option value="nd">Non saprei</option>
</select>
</p>
<p>
<label>note</label>
<br>
<textarea class="form-control" name="note" placeholder="aggiungi liberamente informazioni che ritieni utili (habitat, etc)"></textarea>
<label>data osservazione</label>
<input class="form-control" type="text" name="data_oss" value>
</p>
<p>
<div class="formtooltip">
<em>Le segnalazioni sono anonime e verranno gestite come tali, ma se ti fa piacere puoi lasciarci un recapito. 
<span class="formtooltiptext">
Compilando il campo fornisci il tuo consenso ad utilizzare i tuoi recapiti al solo fine di ricontattarti.</em>
Ai sensi del regolamento UE 679 (GDPR) I dati personali non sono oggetto di trattamenti diversi dall'archiviazione, non verranno comunicati a terzi e 
verranno cancellati dall'archivio entro due anni dall'inserimento. 
Titolare del trattamento &egrave; il ricercatore Dott. PhD Marco Sigovini CNR-ISMAR Venezia</span>
</div>
</p>
<label for="nome_cogn">Nome e cognome</label>
<br>
<input class="form-control"type="text" name="nome_cogn" value>
<label for="contatto">contatto (indirizzo email, profilo fb, altro)</label>
<br>
<input class="form-control" type="text" name="contatto" value>
<input class="form-control" type="submit" name="submit" value="Invia Segnalazione"></p>
 

