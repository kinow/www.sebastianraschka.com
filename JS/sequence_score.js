//Copyright (C) 2013 Sebastian Raschka

var sequence_score =function(){
	var sequence1_str = $("textarea[name=input_box1]").val(); // read textarea input
	sequence1_str = sequence1_str.replace(/^\s+|\s+$/g, '') // removes whitespaces & co from the ends

	var sequence2_str = $("textarea[name=input_box2]").val(); // read textarea input
	sequence2_str = sequence2_str.replace(/^\s+|\s+$/g, '') // removes whitespaces & co from the ends


	//start html formatting 
	document.write("<html><body style='margin: 12px; padding: 12px'>")
	document.write("<form><input type='button' onClick='window.location.href=window.location.href' VALUE='Go Back and Restart'></form>");
	document.write("<span style = 'font-family:Courier; font-size:0.8em'>");


	document.write(sequence1_str, "\n")
	document.write(sequence2_str)


	//end html formatting 
	document.write("</span>");
	document.write("</body></html>");


}; //close sequence_score