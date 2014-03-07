//Copyright (C) 2013 Sebastian Raschka

	var pdbToFasta =function(){
		// write the amino acid sequence in 1-letter code
		
		var residue = 0;
		var unique = true;
		var lines = $("textarea[name=input_box]").val(); // read textarea input
		lines = lines + '\n'
		lines = lines.split('\n')
		var header_test = false;
		var sequence_str = ""; // the later output sequence
		var chain = 1;
		var chain_letter = new Array("A", "B", "C", "D", "E", "F",
                 "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", 
                 "U", "V", "W", "X", "Y", "Z");
		var newChain = false;
		var sequence_list = []
		var selenomethionine = false
		var selenocysteine = false


		for(var i = 0;i < lines.length;i++){  // FOR_main

		// following line might be redundant
			if (lines[i].substring(0,5) == "TITLE" || lines[i].substring(0,6) == "HEADER" 
				|| lines[i].substring(0,4) == "ATOM" || lines[i].substring(0,3) == "TER"
				|| (lines[i].substring(0,6) == "HETATM" && (lines[i].search("MSE")!= -1 || lines[i].search("CSE")!= -1))){
			

			// cleaning up current line
			var newline = lines[i] + '\n';
			newline = newline.replace(/(^[\s]+|[\s]+$)/g, '');


			// avoid ANISOU entries in nextnewline
			if (lines[i+1].substring(0,6) == "ANISOU"){
				var nextnewline = lines[i+2] + '\n';
				}
			else{
				var nextnewline = lines[i+1] + '\n';
				};
			
			// cleaning current line + i
			nextnewline = nextnewline.replace(/(^[\s]+|[\s]+$)/g, '');

		// start: write FASTA header

			if (newline.substring(0,6) == "HEADER" && header_test == false){
				var header_title = newline.substring(6,newline.length);
				var fasta_str = ">" + header_title + "<br>";
				sequence_list.push(fasta_str);
				header_test = true;
			}
			else if (newline.substring(0,5) == "TITLE" && header_test == false){
				var title_title = newline.substring(5,newline.length);
				var fasta_str = ">" + title_title + "<br>";
				sequence_list.push(fasta_str);
				header_test = true;
			}
			else if (header_test == false){
				var fasta_str = ">No header in PDB code found<br>";
				sequence_list.push(fasta_str); 
				header_test = true;
			}
		
			// stop: write FASTA header

			
			// start: write FASTA for next chain
	

			if (newline.substring(0,3) == "TER"){
					newChain = true;
					
				}

			if (newline.substring(0,4) == "ATOM" || newline.substring(0,6) == "HETATM"){		// accounts for selenomethionine	
			
				if (newChain){					
					sequence_list.push(sequence_str);
					sequence_str = '';				


					if (chain <= 6){
						sequence_list.push( "<br> > Chain " + chain_letter[chain] + "<br>");
						chain +=1;
					}
					else{
						sequence_list.push( "<br> > New Chain <br>");
					}

					newChain = false;
				};

				// stop: write FASTA for next chain


				
				// start: convert to 1-letter amino a code

				if (newline.search("ALA") != -1  && unique === true){	
					aaCode = "ALA";
					sequence_str += "A";
					
				}
				else if (newline.search("ARG")!= -1 && unique === true){
					aaCode = "ARG";			
					sequence_str += "R";
				}
				else if (newline.search("ASN")!= -1 && unique === true){
					aaCode = "ASN";			
					sequence_str += "N";
				}
				else if (newline.search("ASP")!= -1 && unique === true){
					aaCode = "ASP";			
					sequence_str += "D";
				}
				else if (newline.search("CYS")!= -1 && unique === true){	
					aaCode = "CYS";		
					sequence_str += "C";
				}
				else if (newline.search("GLU")!= -1 && unique === true){	
					aaCode = "GLU";		
					sequence_str += "E";
				}
				else if (newline.search("GLN")!= -1 && unique === true){	
					aaCode = "GLN";		
					sequence_str += "Q";
				}
				else if (newline.search("GLY")!= -1 && unique === true){	
					aaCode = "GLY";		
					sequence_str += "G";
				}
				else if (newline.search("HIS")!= -1 && unique === true){
					aaCode = "HIS";			
					sequence_str += "H";
				}
				else if (newline.search("ILE")!= -1 && unique === true){		
					aaCode = "ILE";	
					sequence_str += "I";
				}
				else if (newline.search("LEU")!= -1 && unique === true){	
					aaCode = "LEU";		
					sequence_str += "L";
				}
				else if (newline.search("LYS")!= -1 && unique === true){	
					aaCode = "LYS";		
					sequence_str += "K";
				}
				else if (newline.search("MET")!= -1 && unique === true){	
					aaCode = "MET";		
					sequence_str += "M";
				}
				else if (newline.search("PHE")!= -1 && unique === true){	
					aaCode = "PHE";		
					sequence_str += "F";
				}
				else if (newline.search("PRO")!= -1 && unique === true){
					aaCode = "PRO";			
					sequence_str += "P";
				}
				else if (newline.search("SER")!= -1 && unique === true){	
					aaCode = "SER";		
					sequence_str += "S";
				}
				else if (newline.search("THR")!= -1 && unique === true){	
					aaCode = "THR";		
					sequence_str += "T";
				}
				else if (newline.search("TRP")!= -1 && unique === true){	
					aaCode = "TRP";		
					sequence_str += "W";
				}
				else if (newline.search("TYR")!= -1 && unique === true){	
					aaCode = "TYR";		
					sequence_str += "Y";
				}
				else if (newline.search("VAL")!= -1 && unique === true){		
					aaCode = "VAL";	
					sequence_str += "V";
				}			
				else if (newline.search("MSE")!= -1 && unique === true){	
					aaCode = "MSE";		
					sequence_str += "M*";
					selenomethionine = true
				}
				else if (newline.search("CSE")!= -1 && unique === true){	
					aaCode = "CSE";		
					sequence_str += "U";
					selenocysteine = true
				}
                else if (newline.search("DG")!= -1 && unique === true){	
					aaCode = "DG";		
					sequence_str += "G";
				}
                else if (newline.search("DC")!= -1 && unique === true){	
					aaCode = "DC";		
					sequence_str += "C";
				}
                else if (newline.search("DA")!= -1 && unique === true){	
					aaCode = "DA";		
					sequence_str += "A";
				}
                else if (newline.search("DT")!= -1 && unique === true){	
					aaCode = "DT";		
					sequence_str += "T";
				}
                else if (newline.slice(19,20) == "U" && unique === true){	
					aaCode = "U";		
					sequence_str += "U";
				}
                else if (newline.slice(19,20) == "C" && unique === true){	
					aaCode = "C";		
					sequence_str += "C";
				}
                else if (newline.slice(19,20) == "G" && unique === true){	
					aaCode = "G";		
					sequence_str += "G";
				}
                else if (newline.slice(19,20) == "T" && unique === true){	
					aaCode = "T";		
					sequence_str += "T";
				}
                else if (newline.slice(19,20) == "A" && unique === true){	
					aaCode = "A";		
					sequence_str += "A";
				}


			// start: convert to 1-letter amino a code

			// check if newline is new amino acid
			past_residue = newline.substring(23,26);
			current_residue = nextnewline.substring(23,26);

			if(past_residue === current_residue && nextnewline.substring(0,3) != "TER"){
				unique = false;
			}
			else{
				unique = true;
			}

				
		} //close if_atom	
	}; // close first if in for loop
	} // close FOR_main

	sequence_list.push(sequence_str)	// appends last chain to sequence_list

	if(sequence_str == ""){
		alert("Please enter a valid PDB code!");
	}
	else{
		document.write("<html><body style='margin: 12px; padding: 12px'>")
		document.write("<form><input type='button' onClick='window.location.href=window.location.href' VALUE='Go Back and Restart'></form>");
		document.write("<span style = 'font-family:Courier; font-size:0.8em'>");
		//document.write(fasta_str);

		for (i = 0; i < sequence_list.length; i++){  

			if (sequence_list[i][0] == ">"){
				document.write(sequence_list[i])
			}
			else{
				document.write(sequence_list[i].replace(/(.{60})/g, '$1<br/>'));
			};

		};		

		if (selenomethionine == true || selenocysteine == true){
			document.write("<br> <br>")
			if (selenomethionine == true){
			document.write("M* = seleno-methionine <br>");
			};
			if(selenocysteine == true){
			document.write("U = seleno-cysteine");
			};
		};
	
		document.write("</span>");
		document.write("</body></html>");
	}
} // close function pdbToFasta
