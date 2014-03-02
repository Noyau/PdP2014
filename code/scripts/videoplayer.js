function loadScript(e)
{
    /* Definition des selecteurs faisant references aux balises */
    var selecteurLecteur     = "section#video video";
    var selecteurCurseur     = "section#video div#progression div#curseur";
    var selecteurProgression = "section#video div#progression";
    var selecteurBtnPlay     = "section#video div#commandes button#play";
    var selecteurTemps       = "section#video div#commandes div#temps";

    var selecteurDebug       = "div#debug";

    function var_dump(obj) {
	var dump = "";
	for(var i in obj)
	    dump += (i + ": " + obj[i] + "<br/>");
	
	var debug = document.querySelector(selecteurDebug);
	debug.style.hidden = false;
	debug.innerHTML = dump;
    }

    /* Definition de la classe gerant le lecteur video */
    function Lecteur(selectLecteur, selectCurseur, selectProgression, selectPlay, selectTemps)
    {
	this.lecteur     = document.querySelector(selectLecteur);
	this.curseur     = document.querySelector(selectCurseur);
	this.progression = document.querySelector(selectProgression);
	this.boutonPlay  = document.querySelector(selectPlay);
	this.temps       = document.querySelector(selectTemps);

	this.interval = null;

	this.allerA = function(temps) {
	    // mise a jour du temps video (en sec)
	    this.lecteur.currentTime = temps;

	    var_dump(this.lecteur); ///////////// DEBUG

	    // calculer la position du curseur
	    var dureeTotale = this.lecteur.duration;
	    if(dureeTotale > 0) {
		var t = this.lecteur.currentTime;
		var l = this.progression.offsetWidth;
		var pct = (t * 1.0) / dureeTotale;
		var pos = (l * pct) + this.progression.offsetLeft;
		this.curseur.style.left = pos + "px";
		this.temps.innerHTML = t + "s";
	    }
	}

	this.deplacerCurseur = function() {
	    // recuperer le temps video
	    var t = this.lecteur.currentTime; // UNDEFINED ???
	    var d = this.lecteur.duration;    // UNDEFINED ???

	    var_dump(this.lecteur); //////////// DEBUG

	    // si la video est en phase de lecture
	    if(!this.lecteur.paused) {
		var l = this.progression.offsetWidth;
		var pct = (t * 1.0) / d;
		var pos = (l * pct) + this.progression.offsetLeft;
		/* penser à mettre la position du curseur en "absolute" (CSS ou Javascript ?) */
		this.curseur.style.position = "absolute";
		this.curseur.style.left = pos + "px";
		this.temps.innerHTML = parseInt(t) + "s";
	    } else if((d-t) <= 0) {
		clearInterval(this.interval);
	    }
	}

	this.play = function() {
	    if(this.lecteur.paused) {
		this.lecteur.play();
		this.boutonPlay.textContent = "||";
		this.interval = setInterval(this.deplacerCurseur, 1000);
	    } else {
		this.lecteur.pause();
		this.boutonPlay.textContent = ">";
		clearInterval(this.interval);
	    }
	}

	this.restart = function() {
	    this.lecteur.currentTime = 0;
	}
    }

    /* Variable globale et initialisation */
    var lectVideo = null;

    function initLecteur()
    {
	lectVideo = new Lecteur(selecteurLecteur, selecteurCurseur, selecteurProgression, selecteurBtnPlay, selecteurTemps);
    }

    initLecteur();
}