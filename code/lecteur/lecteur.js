/* Definition des selecteurs faisant references aux balises */
var selecteurLecteur = "section#video video";
var selecteurCurseur = "section#video div#progression div#curseur";
var selecteurProgression = "section#video div#progression";
var selecteurBtnPlay = "section#video div#commandes button#play";
var selecteurTemps = "section#video div#commandes div#temps";

/* Recuperation des balises */
var lecteur = document.querySelector(selecteurLecteur);
var curseur = document.querySelector(selecteurCurseur);
var progression = document.querySelector(selecteurProgression);
var btnPlay = document.querySelector(selecteurBtnPlay);
var temps = document.querySelector(selecteurTemps);

/* Definition de la variable d'interval */
var inter = null;

function allerA(temps) {
    // mise a jour du temps video (en sec)
    lecteur.currentTime = temps;

    // calculer la position du curseur
    var dureeTotale = lecteur.duration;
    if(dureeTotale > 0) {
		var t = lecteur.currentTime;
		var l = progression.offsetWidth;
		var pct = (t * 1.0) / dureeTotale;
		var pos = (l * pct) + progression.offsetLeft;
		curseur.style.left = pos + "px";
		temps.innerHTML = t + "s";
    }
}

/* La fonction qui va permettre de mettre a jour le curseur de la video en temps reel */
function deplacerCurseur() {
    // recuperer le temps video
    var t = lecteur.currentTime;
    var d = lecteur.duration;

    // si la video est en phase de lecture
    if(!lecteur.paused) {
		var l = progression.offsetWidth;
		var pct = (t * 1.0) / d;
		var pos = (l * pct) + progression.offsetLeft;
		/* penser à mettre la position du curseur en "absolute" (CSS ou Javascript ?) */
		curseur.style.position = "absolute";
		curseur.style.left = pos + "px";
		temps.innerHTML = parseInt(t) + "s";
    } else if((d-t) <= 0) {
		clearInterval(inter);
    }
}

/* Fonction de commande du lecteur */
function commandeRestart() {
    lecteur.currentTime = 0;
}

function commandePlay() {
    if(lecteur.paused) {
		lecteur.play();
		btnPlay.textContent = "||";
		inter = setInterval(deplacerCurseur, 1000);
    } else {
		lecteur.pause();
		btnPlay.textContent = ">";
		clearInterval(inter);
    }
}
