//Copyright (C) 2013 Sebastian Raschka

	var pdbMass = function(){
		
		var residue = 0;
		var unique = true;
		var lines = $("textarea[name=input_box]").val(); // read textarea input
		lines = lines + '\n'
		lines = lines.split('\n')
		var x_coord = 0.0;
        var y_coord = 0.0;
        var z_coord = 0.0;
        var element = "";
        var xcoord_list = [];
		var ycoord_list = [];
        var zcoord_list = [];
        var atomic_masses = [];


       ATOMIC_WEIGHTS={'H':1.008, 'HE':4.002602, 'LI':6.94, 'BE':9.012182, 
        'B':10.81, 'C':12.011, 'N':14.007, 'O':15.999, 'F':18.9984032,
        'NE':20.1797, 'NA':22.98976928, 'MG':24.305, 'AL':26.9815386,
        'SI':28.085, 'P':30.973762, 'S':32.06, 'CL':35.45, 'AR':39.948,
        'K':39.0983, 'CA':40.078, 'SC':44.955912, 'TI':47.867, 'V':50.9415,
        'CR':51.9961, 'MN':54.938045, 'FE':55.845, 'CO':58.933195,
        'NI':58.6934, 'CU':63.546, 'ZN':65.38, 'GA':69.723, 'GE':72.630,
        'AS':74.92160, 'SE':78.96, 'BR':79.904, 'RB':85.4678, 'SR':87.62,
        'Y':88.90585, 'ZR':91.224, 'NB':92.90638, 'MO':95.96, 'TC':98,
        'RU':101.07, 'RH':102.90550, 'PD':106.42, 'AG':107.8682, 'CD':112.411,
        'IN':114.818, 'SN':118.710, 'SB':121.760, 'TE':127.60, 'I':126.90447,
        'XE':131.293, 'CS':132.9054519, 'BA':137.327, 'LA':138.90547,
        'CE':140.116, 'PR':140.90765, 'ND':144.242, 'PM':145, 'SM':150.36,
        'EU':151.964, 'GD':157.25, 'TB':158.92535, 'DY':162.500, 'HO':164.93032,
        'ER':167.259, 'TM':168.93421, 'YB':173.054, 'LU':174.9668, 'HF':178.49,
        'TA':180.94788, 'W':183.84, 'RE':186.207, 'OS':190.23, 'IR':192.217,
        'PT':195.084, 'AU':196.966569, 'HG':200.592, 'TL':204.38, 'PB':207.2,
        'BI':208.98040, 'PO':209, 'AT':210, 'RN':222, 'FR':223, 'RA':226,
        'AC':227, 'TH':232.03806, 'PA':231.03588, 'U':238.02891, 'NP':237,
        'PU':244, 'AM':243, 'CM':247, 'BK':247, 'CF':251, 'ES':252, 'FM':257,
        'MD':258, 'NO':259, 'LR':262, 'RF':267, 'DB':268, 'SG':269, 'BH':270,
        'HS':269, 'MT':278, 'DS':281, 'RG':281, 'CN':285, 'UUT':286, 'FL':289,
        'UUP':288, 'LV':293, 'UUS':294
       };


        // evaluate checkboxes
	    var hetatm = false;
    	var atom = false;

	    if (document.textform.lig.checked == true){
    	    hetatm = true;
        };
        if (document.textform.prot.checked == true){
    	    atom = true;
        };


        

		for(var i = 0;i < lines.length;i++){  // FOR_main


			// cleaning up current line
			var cleanline = lines[i] + '\n';
			cleanline = cleanline.replace(/(^[\s]+|[\s]+$)/g, '');
			

			if ( (atom && cleanline.substring(0,4) == "ATOM") || (hetatm && cleanline.substring(0,6) == "HETATM") ) {			
	            x_coord = parseFloat(cleanline.substring(30,38));
                y_coord = parseFloat(cleanline.substring(38,46));
                z_coord = parseFloat(cleanline.substring(46,54));
                element = cleanline.substring(76,78).replace(/^\s+|\s+$/g, '');
            }

            else {
                x_coord = false;
                y_coord = false;
                z_coord = false;
                element = false;                
            };

            if (typeof x_coord == 'number' && typeof y_coord == 'number' && typeof z_coord == 'number' && element){
                xcoord_list.push(x_coord);
                ycoord_list.push(y_coord);
                zcoord_list.push(z_coord);
                atomic_masses.push(ATOMIC_WEIGHTS[element]);

            };


						
	}; // close FOR_main

    
    // Calculate the total mass in terms of the atom element occurences
    var total_mass = 0.0;
    for (i = 0; i < atomic_masses.length; i++){  
	    total_mass += atomic_masses[i];
    };		

    var weights = [];
    // calculate the atomic_weights
    for (i = 0; i < atomic_masses.length; i++){
        weights.push(atomic_masses[i]/total_mass);
    };

    // weight coordinates
    var weighted_xcoords = [];
    var weighted_ycoords = [];
    var weighted_zcoords = [];

    for (i = 0; i < weights.length; i++){
        weighted_xcoords.push(xcoord_list[i] * weights[i]);        
        weighted_ycoords.push(ycoord_list[i] * weights[i]);  
        weighted_zcoords.push(zcoord_list[i] * weights[i]);  
    };

    
    // calculate center coordinates
    var xcenter = 0.0;
    var ycenter = 0.0;
    var zcenter = 0.0;
    for (i = 0; i < weighted_xcoords.length; i++){  
	    xcenter += weighted_xcoords[i];
        ycenter += weighted_ycoords[i];
        zcenter += weighted_zcoords[i];
    };	
    

	if(weighted_xcoords.length == 0 || weighted_ycoords.length == 0 || weighted_zcoords.length == 0){
		alert("Please enter a valid PDB code!");
	}
 
    else if(!atom && !hetatm){
		alert("Please make a valid selection!");
	}

    

	else{
		document.write("<html><body style='margin: 12px; padding: 12px'>")
		document.write("<form><input type='button' onClick='window.location.href=window.location.href' VALUE='Go Back and Restart'></form>");
		document.write("<span style = 'font-family:Courier; font-size:0.8em'>");

        document.write('Center of Mass (X, Y, Z) of ');
        if(atom && hetatm){ 
            document.write('protein and ligand atoms');
        }
        else if(atom){
            document.write('the protein atoms');
        }
        else if(hetatm){
            document.write('the ligand atoms');
        };
   
        document.write('<br><br>(' + ((xcenter).toFixed(3)) + ',' + ((ycenter).toFixed(3)) + ',' + ((zcenter).toFixed(3)) + ')')

        document.write

		document.write("</span>");
		document.write("</body></html>");
	}
} // close function pdbCoords

