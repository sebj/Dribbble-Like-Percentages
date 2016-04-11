const countRegex = new RegExp("[0-9]+(,[0-9]+)?")

const shotModalClassName = "shot-overlay"
const likesClass = "likes-count stats-num"
const viewsClass = "views-count stats-num"

var observer = new MutationObserver(function(mutations) {
	updatePage()
})

//Infinite scrolling changes
var shotListingElem = document.getElementsByClassName("dribbbles group")
if (shotListingElem.length == 1) {
	observer.observe(shotListingElem[0], {
		attributes: false, 
		childList: true, 
		characterData: false 
	})
}

//Shot modal
var shotModalElem = document.getElementsByClassName(shotModalClassName)
if (shotModalElem.length == 1) {
	observer.observe(shotModalElem[0], {
		attributes: true, 
		childList: false, 
		characterData: false 
	})
}

var parseValue = function(elementText) {
	var val = countRegex.exec(elementText)[0]
	return parseFloat(val.replace(",", ""))
}

var updateValues = function(likesContainer, viewsContainer) {
	var likesText = likesContainer.innerHTML
	if (likesText.indexOf("%") > -1) {
		//Don't go over nodes already calculated
		return
	}

	var likes = parseValue(likesText)

	var viewsText = viewsContainer.innerHTML
	views = parseValue(viewsText)

	var percent = (likes/views)
	
	if (!isFinite(percent)) {
		percent = 100

	} else {
		percent = (percent*100).toFixed(1)
	}

	likesContainer.innerHTML = likesContainer.innerHTML.replace(likesText, percent+"%")
}

var hideUsernames  = function() {
	
}

var updatePage = function() {
	var docLoc = document.location.href

	chrome.storage.sync.get({
		removeUsernames: false

	}, function(items) {

		if (items.removeUsernames) {
			document.head.insertAdjacentHTML('beforeend',
			    '<style>.attribution { display: none !important }</style>'
			);
		}
	});

	//Only really need to match first part of URL
	const shotRegex = new RegExp("dribbble\.com\/shots\/[0-9]+")

	var isShot = shotRegex.test(docLoc) || document.getElementsByClassName(shotModalClassName)[0].style.display != "none"
	var isProfile = !isShot && (document.getElementsByClassName("profile-container").length != 0)
	var isListing = document.getElementsByClassName("dribbbles group").length == 1

	if (isShot) {
		var likesContainer = document.getElementsByClassName(likesClass)[0]
		var viewsContainer = document.getElementsByClassName(viewsClass)[0]
		updateValues(likesContainer, viewsContainer)
	}

	if (isListing) {
		var shots = document.getElementsByClassName("dribbbles group")[0].children
		for (var i = 0; i < shots.length; i++) {

			var shot = shots[i]

			if (shot.tagName.toLowerCase() == "li") {
				var likesContainer = shot.getElementsByClassName("fav")[0].children[1]
				var viewsContainer = shot.getElementsByClassName("views")[0].children[0]
				updateValues(likesContainer, viewsContainer)
			}
		}
	}
}

updatePage()