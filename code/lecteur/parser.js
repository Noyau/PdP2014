/**
 * fichier: parser.js
 * Gere la lecture et l'analyse de fichiers XML.
 * lien(s) util(s):
 *  [1] lecture de fichiers XML : http://www.steveborn.com/codenotes/LoadingXML.htm
 *
 * @author Xavier Jouvenot : xavier.jouvenot@etu.u-bordeaux.fr
 * @author Romain Fontaine : romain.fontaine@etu.u-bordeaux.fr
 */

/**
 * Ouvre un fichier XML et retourne le document associe.
 * @param  {String}      fichier Le lien vers le fichier a ouvrir.
 * @return {XmlDocument}         Le document ouvert.
 */
function ouvrirDocument(fichier)
{
    var xmlhttp = null;

    if(window.XMLHttpRequest)
	xmlhttp = new XMLHttpRequest();
    else
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    
    xmlhttp.open("GET", fichier, false);
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send("");
    
    return xmlhttp.responseXML;
}

/**
 * Analyse un document XML et retourne une liste des index crees a partir des actions lues.
 * @param  {XmlDocument} doc Le document a analyser.
 * @return {Array}           Les index crees.
 */
function analyserDocument(doc)
{
    var index = new Array();
    var actions = doc.getElementsByTagName("ACTION");
    var observ, depart, fin, nom, proba;
    var i;
    for(i = 0; i < actions.length; ++i) 
    {
	observ = actions[i].getElementsByTagName("OBSERVATION")[0].childNodes[0];
	depart = actions[i].getElementsByTagName("DEPART")[0].childNodes[0];
	fin    = actions[i].getElementsByTagName("FIN")[0].childNodes[0];
	nom    = actions[i].getElementsByTagName("NOM")[0];
	proba  = actions[i].getElementsByTagName("PROBA")[0];
	
	if(nom != null)
	    nom = nom.childNodes[0];
	
	if(proba != null)
	    proba = proba.childNodes[0];

	index[i] = {
	    observation: observ.nodeValue,
	    depart:      depart.nodeValue,
	    fin:         fin.nodeValue,
	    nom:         ((nom   != null) ? nom.nodeValue   : null),
	    proba:       ((proba != null) ? proba.nodeValue : null)
	}
    }
    return index;
}

/**
 * Ajoute les index a une liste du document HTML.
 * @param {Array}  index         La liste des index.
 * @param {String} selecteurHTML Un selecteur type CSS vers la balise a modifier.
 */
function ajouterIndex(index, selecteurHTML)
{
    var balise = document.querySelector(selecteurHTML);
    var tr, tdDepart, tdFin, tdObserv;
    var i, htemps, mtemps, stemps;
    for(i = 0; i < index.length; ++i) 
    {
	htemps = parseInt(index[i].depart / 3600);
	mtemps = parseInt(index[i].depart / 60);
	stemps = parseInt(index[i].depart % 60);

	tdDepart = document.createElement('td');
	tdDepart.innerHTML = sprintf("%02d:%02d.%02d", htemps, mtemps, stemps);

	htemps = parseInt(index[i].fin / 3600);
	mtemps = parseInt(index[i].fin / 60);
	stemps = parseInt(index[i].fin % 60);
	
	tdFin = document.createElement('td');
	tdFin.innerHTML = sprintf("%02d:%02d.%02d", htemps, mtemps, stemps);

	tdObserv = document.createElement('td');
	tdObserv.innerHTML = index[i].observation;

	tr = document.createElement('tr');
	tr.setAttribute('class', 'lienEtiquette');
	tr.setAttribute('onclick', 'lectVideo.allerA('+index[i].depart+')');
	tr.appendChild(tdDepart);
	tr.appendChild(tdFin);
	tr.appendChild(tdObserv);
	balise.appendChild(tr);
    }
}

/**
 * Variable globale permettant de selectionner la balise contenant les index.
 */
var selecteurBaliseIndex = "div#lecteur section#etiquettes table";

/**
 * Ouvre, lit, analyse le fichier passe en parametre et initialise la balise des index avec les informations tirees.
 * @parma {String} fichier Le lien vers le fichier a analyser.
 */
function initIndex(fichier)
{
    ajouterIndex(
	analyserDocument(
	    ouvrirDocument(fichier)
	),
	selecteurBaliseIndex
    );
}