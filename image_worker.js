
	//simply check the DOM to see if any images are obscured. if they are, great, message reddit.js and tell it to remove that node. else, just keep looping.
	
	var hiddencheck = window.setInterval(check, 100);
	
	function check(){
		//loop over db
			//if id > 100px && false
				self.postmessage({"remove": id});//remove will set hidden true in the db and remove the image
			//else if < 100px && true
				self.postmessage({"add": id});//add will set hidden false in the db and add the image
	}

	/*!!!!!
	loop{
		loop_over_indexdb{
			when(id) == 100px + above_window && hidden == false{
				remove image;
				hidden == true
			}
			when(id) == 100px + above_window && hidden == true{
				add image;
				hidden == false
			}
		} 
	}*/

			/*on window scroll, check to see if a image in the iamgearray is obscued by window (element.pos > top of window/viewport) 
		at the same time check if a image in the image array is comeing back in view (element.pos > 10px from the top of the window/viewport)
		if the image is obscured delete the <img> from the <div>
		if the image is comeing back down, append it back to the <div>(and remove the div height)
		<div> should be referenced by reddit id, as should the image.
		each <div> should be set to the same height as the image that will be deleted (element.image.heigt, div.height set element.image.height).
			of course we could also just set the <div> to the image's heght in the first place, and then continue simply removeing the <img>
		basically we are going to chew through cpu cycles to save on memory. costly on the processing front, but should leave everyone with a snappier experiance.



		*/
/*
				window.scroll
			pagehieght = display area
				when .images go 100px above window.top
					set div height to image height
					remove image
					set visibility to hidden
				when .images come within 100px of window.top
					set visibility to show
					add image back (grab the imgur url from the array of images that imgload will build)
				when .images go 100px below window.bottom
					remove image
					setvisibility to hidden
				when .images come within 100px of window.bottom
					setvisibility to show
					add image back
		*/