var updatePage = function() {
	var docLoc = document.location.href

	//Only really need to match first part of URL
	var shotRegex = new RegExp("dribbble\.com\/shots\/[0-9]+")

	var isShot = shotRegex.test(docLoc) || document.getElementsByClassName("shot-overlay")[0].style.display == ""
	var isProfile = !isShot && (document.getElementsByClassName("profile-container").length != 0)
	var isListing = document.getElementsByClassName("dribbbles group").length == 1

	if (isShot) {
		var countRegex = new RegExp("[0-9]+(,[0-9]+)?")

		var likesContainer = document.getElementsByClassName("likes-count stats-num")[0]
		var likesText = likesContainer.innerHTML
		var likes = countRegex.exec(likesText)[0]
		likes = parseFloat(likes.replace(",", ""))

		var viewsContainer = document.getElementsByClassName("views-count stats-num")[0]
		var viewsText = viewsContainer.innerHTML
		var views = countRegex.exec(viewsText)[0]
		views = parseFloat(views.replace(",", ""))

		var percentage = Number((likes/views)*100).toFixed(1)
		if (!isFinite(percentage)) {
			percentage = 100
		}

		likesContainer.innerHTML = likesContainer.innerHTML.replace(likesText, percentage+"%")
	}

	if (isListing) {
		var shots = document.getElementsByClassName("dribbbles group")[0].children
		for (var i = 0; i < shots.length; i++) {

			var shot = shots[i]

			if (shot.tagName.toLowerCase() == "li") {
				var likesContainer = shot.getElementsByClassName("fav")[0].children[1]
				if (likesContainer == undefined) {
					return
				}
				var likesText = likesContainer.innerText
				var likes = parseFloat(likesText.replace(",", ""))

				var viewsContainer = shot.getElementsByClassName("views")[0].children[0]
				var views = viewsContainer.innerText
				views = parseFloat(views.replace(",", ""))

				var percentage = Number((likes/views)*100).toFixed(1)
				if (!isFinite(percentage)) {
					percentage = 100
				}

				likesContainer.innerHTML = likesContainer.innerHTML.replace(likesText, percentage+"%")
			}
		}
	}
}

updatePage()