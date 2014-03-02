<div id="debug" style="hidden:true;"></div>
<div id="lecteur">
  <section id="etiquettes">
    <table>
      <tr>
	<th>Début</th>
	<th>Fin</th>
	<th>Commentaire</th>
      </tr>
      <!-- ici les index a generer -->
    </table>
  </section>
  <section id="video">
    <video>
      <source src="../../bdd/videos/trolldance/trolldance.mp4" type="video/mp4"><!-- non supportee (?) -->
	<!----><source src="../../bdd/videos/trolldance/trolldance.ogv" type="video/ogg"><!---->
	  <!----><source src="../../bdd/videos/trolldance/trolldance.webm" type="video/webm"><!---->
	    Votre navigateur ne supporte pas la balise "video".
    </video>
    <div id="commandes">
      <button id="restart" onclick="lectVideo.restart();">[]</button>
      <button id="play" onclick="lectVideo.play();">&gt;</button>
      <div id="temps"></div>
    </div>
    <div id="progression">
      <div id="curseur"></div>
    </div>
  </section>
  <div class="clear"></div>
</div>
