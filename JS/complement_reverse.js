//Copyright (C) 2013 Sebastian Raschka

var checkInput = function (form){

		var sequence = form.input_box.value;
		sequence = sequence.replace(/ /g,''); //remove whitespace
		// remove first line if input is .fasta
        if (sequence.substring(0,1) === '>'){
            sequence = sequence.replace(/^>.*/,'');
        };
		sequence = sequence.replace(/(\r\n|\n|\r)/gm,""); //remove linebreaks
		sequence = sequence.toUpperCase();


		if (sequence ==="" ){
        	alert("You entered an empty string");
        	return false;
    	};
    	var i = 0;
    	var test_sequence = true;
    	var isRNA = false;
        var processed_sequence = "";
        var NonDNA = false;

    	for (i=0; i < sequence.length; i++){
    		var j = sequence.substring(i,i+1);
    		if (j == "A" || j == "C" || j == "T" || j == "G" || j == "U"){
                processed_sequence += j;
    			
    		    if (j == "U"){
                     isRNA = true;
                };
            }
            else{
                NonDNA = true;
            };
    	};

    	if (NonDNA == true){
         alert("Non-DNA/RNA characters were detected in your sequence and have been removed.");
        };

    	return {
    		a: true,
    		b: processed_sequence,
    		c: isRNA
    	};
	};


	var Reverse = function (form){
		var checkedInput = checkInput(form);

		if (checkedInput.a == true){
			var sequence = checkedInput.b
			var reverse_sequence = "";
			for (i=sequence.length; i>0; i--){
			reverse_sequence += sequence.substring(i,i-1);
			};
			
            document.write("<body style='margin: 12px; padding: 12px'>")
            // reload/restart button
            document.write("<form><input type='button' onClick='window.location.href=window.location.href' VALUE='Go Back and Restart'></form>");
            document.write("<strong> The REVERSED sequence is:</strong> <br> <br>");
    		document.write("<p style = 'font-family:Courier; font-size:0.8em'>");
    		document.write(reverse_sequence.replace(/(.{60})/g, '$1<br/>')); // write only 40 char per line
    		document.write("</p></body>");
		};		
	};

	var Complement = function (form){
		var checkedInput = checkInput(form);

		if (checkedInput.a == true){
			var sequence = checkedInput.b
			var isRNA = checkedInput.c
			var complement_sequence = "";
			for (i=0; i < sequence.length; i++){
    			var j = sequence.substring(i,i+1);

    			if (j == "A" && isRNA == false){ 
                    complement_sequence += "T";
                };
                if (j == "A" && isRNA == true){ 
                    complement_sequence += "U";
                };
                if (j == "C"){  
                    complement_sequence += "G";
                };
                if (j == "G"){  
                    complement_sequence += "C";
                };
                if (j == "T"){  
                    complement_sequence += "A";
                };
                if (j == "U"){  
                    complement_sequence += "A";
                };
    		};

            document.write("<body style='margin: 12px; padding: 12px'>")
    		// reload/restart button
            document.write("<form><input type='button' onClick='window.location.href=window.location.href' VALUE='Go Back and Restart'></form>");
    		document.write("<strong>The COMPLEMENTARY sequence is:</strong> <br> <br>");
    		document.write("<p style = 'font-family:Courier; font-size:0.8em'>");
    		document.write("<br>",complement_sequence.replace(/(.{60})/g, '$1<br/>'), "<br>", "<br>"); // write only 40 char per line
    		document.write("</p></body>");
		};
	};


	var ComplementReverse = function (form){
		var checkedInput = checkInput(form);

		if (checkedInput.a == true){
			var sequence = checkedInput.b
			var reverse_sequence = "";
			for (i=sequence.length; i>0; i--){
				reverse_sequence += sequence.substring(i,i-1);
			};
			var isRNA = checkedInput.c
			var complement_sequence = "";
			for (i=0; i < reverse_sequence.length; i++){
    			var j = reverse_sequence.substring(i,i+1);

    			if (j == "A" && isRNA == false){	
    				complement_sequence += "T";
    			};
    			if (j == "A" && isRNA == true){	
    				complement_sequence += "U";
    			};
    			if (j == "C"){	
    				complement_sequence += "G";
    			};
    			if (j == "G"){	
    				complement_sequence += "C";
    			};
    			if (j == "T"){	
    				complement_sequence += "A";
    			};
    			if (j == "U"){	
    				complement_sequence += "A";
    			};
    		};

            
            
            document.write("<body style='margin: 12px; padding: 12px'>")
            // reload/restart button
            document.write("<form><input type='button' onClick='window.location.href=window.location.href' VALUE='Go Back and Restart'></form>");
    		document.write("<strong> The COMPLEMENTARY and REVERSED sequence is:</strong> <br> <br>");
    		document.write("<p style = 'font-family:Courier; font-size:0.8em'>");
    		document.write(complement_sequence.replace(/(.{60})/g, '$1<br/>')); // write only 40 char per line
    		document.write("</p></body>");
		};
			


	};