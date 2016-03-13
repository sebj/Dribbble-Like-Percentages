var countRegex = new RegExp("[0-9]+(,[0-9]+)?")

var parseValue = function(elementText) {
	var v = countRegex.exec(elementText)[0]
	return parseFloat(v.replace(",", ""))
}

var updateValues = function(likesContainer, viewsContainer) {
	var likesText = likesContainer.innerHTML
	var likes = parseValue(likesText)

	var viewsText = viewsContainer.innerHTML
	views = parseValue(viewsText)

	var percent = (likes/views)

	var percentage
	if (!isFinite(percent)) {
		percentage = 100

	} else {
		percentage = (percent*100).toFixed(1)
	}

	likesContainer.innerHTML = likesContainer.innerHTML.replace(likesText, percentage+"%")
}

var updatePage = function() {
	var docLoc = document.location.href

	//Only really need to match first part of URL
	var shotRegex = new RegExp("dribbble\.com\/shots\/[0-9]+")

	var isShot = shotRegex.test(docLoc) || document.getElementsByClassName("shot-overlay")[0].style.display == ""
	var isProfile = !isShot && (document.getElementsByClassName("profile-container").length != 0)
	var isListing = document.getElementsByClassName("dribbbles group").length == 1

	if (isShot) {
		var likesContainer = document.getElementsByClassName("likes-count stats-num")[0]
		var viewsContainer = document.getElementsByClassName("views-count stats-num")[0]
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