//Copyright (C) 2013 Sebastian Raschka
function cleavingMode (form) {
    
    // user inputs
    var sequence = form.input_box.value;
    var interval = form.interval_box.value;
    var start = form.start_box.value;
    
    //input validation
    //test if sequence input is empty
    if (sequence ==="" ){
        alert ("You entered an empty string");
    }
    //test if start and interval inputs are numbers
    else if (/^(\d|,)+$/.test(start) !== true || start === ""){ 
       alert ("Start value is not a number!");
    }
    else if (/^(\d|,)+$/.test(interval) !== true || interval ==""){
       alert ("Interval value is not a number!");

    }

    // proceed if input valid
    else{   //else_main
        sequence_str = new String(sequence);
        sequence_str = sequence.replace(/ /g,''); //remove whitespace
        interval_int = parseInt(interval);
        start_int = parseInt(start);

    
        // remove first line if input is .fasta
        if (sequence_str.substring(0,1) === '>'){
            sequence_str = sequence_str.replace(/^>.*/,'');
            };

        sequence_str = sequence_str.replace(/(\r\n|\n|\r)/gm,""); //remove linebreaks

        // main function starts
        // start variables
        var upper = start_int-1 + interval_int;
        var seqLength_int = sequence_str.length;
        

        document.write("<body style='margin: 12px; padding: 12px'>") // fixed margin issue
        // reload/restart button
        document.write("<form><input type='button' onClick='window.location.href=window.location.href' VALUE='Go Back and Restart'></form>");

        // write outputs
        for (lower = (start_int-1); lower <= seqLength_int; lower += interval_int){
            var print_screen = sequence_str.substring(lower, upper);
            if (print_screen){ // to avoid last empty position print
                document.write("<p style = 'font-family:Courier; font-size:12px'>",">Position: ", (lower+1) + "-" + (lower +print_screen.length), "<br/>");
                document.write(print_screen.replace(/(.{40})/g, '$1<br/>')); // write only 40 char per line
                document.write("</p>");
                document.write("</body>");
            upper += interval_int;
            }; // close if condition
        }; // close for loop
}; // close else_main condition
}; // close cleavingMode function



function croppingMode (form) {

    var sequence = form.input_box.value;
    var start2 = form.start_box2.value;
    var end = form.end_box.value;

    //input validation
    //test if sequence input is empty
   if (sequence ===""){
       alert ("You entered an empty string");
    }
    //test if start and interval inputs are numbers
    else if (/^(\d|,)+$/.test(start2) !== true || start2 === ""){ 
        alert ("Start value is not a number!");
    }
    else if (/^(\d|,)+$/.test(end) !== true || end ==""){
        alert ("End value is not a number!");
    }


    else{ // start main else

        
        sequence_str = new String(sequence);

        // remove first line if input is .fasta
        if (sequence_str.substring(0,1) === '>'){
            sequence_str = sequence_str.replace(/^>.*/,'');
        };

        sequence_str = sequence_str.replace(/(\r\n|\n|\r)/gm,""); //remove linebreaks



        // write output
        document.write("<body style='margin: 12px; padding: 12px'>") // fixed margin issue
        // reload/restart button
        document.write("<form><input type='button' onClick='window.location.href=window.location.href' VALUE='Go Back and Restart'></form>");

        var print_screen = sequence_str.substring(start2-1, end);
        end = parseInt(start2-1) + print_screen.length
        if (print_screen){
            document.write("<p style = 'font-family:Courier; font-size:12px'>",">Position: ", (start2) + "-" + (end), "<br/>");
            document.write(print_screen.replace(/(.{60})/g, '$1<br/>')); // write only 60 char per line
            document.write("</p>");
            document.write("</body>");
        };
    
    }; // close main else
}; // close croppingMode function