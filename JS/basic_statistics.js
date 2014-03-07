//Copyright (C) 2013 Sebastian Raschka

var dataRead = function(){
	var dataList = new Array();
	var dataTextarea = $("textarea[name=input_box]").val(); // read textarea input
	var dataList = dataTextarea.split(/[\s\(\),]+/);
	var cleanList = new Array();
	
	var isNaN_bool = false;
	for(i=0; i<dataList.length; i++){  //for loop1
		if (isNaN(dataList[i]) == true){
			isNaN_bool = true;
		}
		if (dataList[i] && isNaN(dataList[i]) == false){
			cleanList.push(parseFloat(dataList[i]));
		}
	
	} //close for loop1
	
	if(isNaN_bool == true){
		alert("Non-number characters where detected in your dataset and have been removed.")
	}
	return cleanList

}; // close dataRead

var dataCSV = function(){
	var dataList = dataRead();
	var data_str = "";
	for(i=0; i<dataList.length; i++){
		data_str += dataList[i] + ",";
	};
	data_str = data_str.replace(/,+$/, "");	// remove trailing comma
	
	document.write("<html><body style='margin: 12px; padding: 12px'>");
	document.write("<form><input type='button' onClick='window.location.href=window.location.href' VALUE='Go Back and Restart'></form>");
	document.write("<span style = 'font-family:Courier; font-size:0.8em'>");
	document.write(data_str.replace(/(.{61})/g, '$1<br/>'));
	document.write("</span>");
	document.write("</body></html>");

}; // close dataCSV

var calcMean = function(dataList, dataLen){
	var dataSum = 0;
    for(i=0; i<dataLen; i++){
    	dataSum += dataList[i];
    };
	var dataMean = dataSum / dataLen;
	return [dataMean, dataSum]

}; //close calcMean

var calcMedian = function(dataList){
	var dataLen = dataList.length;
	var dataMedian = 0;
	if (dataLen == 2){
		dataMedian = (dataList[0] + dataList[1]) / 2
	}
	else if (dataLen%2 == 0){
		var middle_before = dataList[(dataLen / 2) -1];
		var middle_after =  dataList[(dataLen / 2) +1];
		var middle_avg = (middle_before + middle_after) / 2;
		dataMedian = middle_avg;
	}
	else{
		var middle_after = (dataLen+1) / 2 ;
		var middle = dataList[middle_after - 1];
		dataMedian = middle;
	};
	return dataMedian
}; //close dataMedian



var calcMode = function(dataList){
	var modeList = [];
	var checkedList = [];
	var iCount = 0;
	var modeItem = "";
	var modeValue = "";
	var modeKey = "";
	var maxVal = 0;

	// find count of highest mode
	for(i=0; i<dataList.length; i++){
		iCount = 0
		for(e=0; e<dataList.length; e++){
				if(dataList[i] == dataList[e]){
					iCount += 1;
		};
		if(iCount > maxVal){
			maxVal = iCount;
		};
	};

	// collect values that have highest count
	for(i=0; i<dataList.length; i++){
		iCount = 0;
		if($.inArray(dataList[i], checkedList) == -1){
			checkedList.push(dataList[i]);
			for(e=0; e<dataList.length; e++){
				if(dataList[i] == dataList[e]){
					iCount += 1;
				}; // close checkedList if
			}; // close e loop 
			if((iCount == maxVal)&& !(dataList[i] in checkedList)){
				modeList.push(iCount);
				modeList.push(dataList[i]);
			}; //close if
		}; //close if
		
		//document.write(checkedList)
	
		}; // close if
	}; // close i loop
	return modeList

}; //close calcMode



var calcVar = function(dataList, dataMean, dataLen){
	var Numerator = 0;
	var Denominator = dataLen;
	for(i=0; i<dataLen; i++){
		Numerator += Math.pow((dataList[i] - dataMean),2)
	}
	var Variance = Numerator / Denominator
	return Variance
}; //close calcVar

var calcVarS = function(dataList, dataMean, dataLen){
	var Numerator = 0;
	var Denominator = dataLen-1;
	for(i=0; i<dataLen; i++){
		Numerator += Math.pow((dataList[i] - dataMean),2)
	}
	var Variance = Numerator / Denominator
	return Variance
}; //close calcVar

var calcStDev = function(dataVar){
	var StDev = Math.sqrt(dataVar);
	return StDev;
}; //close calcStDev



var calcStErr = function(dataStDevS, dataLen){
	var Numerator = dataStDevS;
	var Denominator = Math.sqrt(dataLen);
	var StErr = Numerator/Denominator;
	return StErr;
}; //close calcStErr


var calcConf = function(dataStDevS, dataLen, CI_level){
	var N = dataLen;
	var S = dataStDevS;
	var CI = S/(Math.sqrt(N)) * CI_level;
	return CI
};

var dataStats = function(){
	

	// evaluate checkboxes
	var checkPoints = false;
	var checkSum = false;
	var checkMean = false;
	var checkMedian = false;
	var checkVar = false;
	var checkSDev = false;
	var checkSErr = false;
	var checkMode = false;
	var checkCI = false;

	if (document.textform.dataPoints.checked == true){
    	checkPoints = true
    };
    if (document.textform.sum.checked == true){
    	checkSum = true
    };
    if (document.textform.mean.checked == true){
    	checkMean = true
    };
    if (document.textform.median.checked == true){
    	checkMedian = true
    };
    if (document.textform.variance.checked == true){
    	checkVar = true
    };
    if (document.textform.stDev.checked == true){
    	checkSDev = true
    };
    if (document.textform.stErr.checked == true){
    	checkSErr = true
    };
    if (document.textform.mode.checked == true){
    	checkMode = true
    };
    if (document.textform.CI.checked == true){
    	checkCI = true
    };
    
    

	var dataList = dataRead();
	dataList.sort();
    var dataLen = dataList.length;
    
    var dataMeanSum = calcMean(dataList, dataLen);
    var dataMean = dataMeanSum[0];
    var dataSum = dataMeanSum[1];
    
	var dataMedian = calcMedian(dataList);

	var dataVarS = calcVarS(dataList, dataMean, dataLen);
	var dataStDevS = calcStDev(dataVarS);

	var dataVarP = calcVar(dataList, dataMean, dataLen);
	var dataStDevP = calcStDev(dataVarP);

	var dataStErr = calcStErr(dataStDevS, dataLen);

	var dataMode = calcMode(dataList);

	var CI95 = calcConf(dataStDevS, dataLen, 1.96)
	CI95 = (Math.ceil(CI95 * 10000) / 10000)
	var CI99 = calcConf(dataStDevS, dataLen, 2.576)
	CI99 = (Math.ceil(CI99 * 10000) / 10000)
	var CI90 = calcConf(dataStDevS, dataLen, 1.645)
	CI90 = (Math.ceil(CI90 * 10000) / 10000)

	document.write("<html><body style='margin: 12px; padding: 12px'>");
	document.write("<form><input type='button' onClick='window.location.href=window.location.href' VALUE='Go Back and Restart'></form>");
	document.write("<span style = 'font-family:Courier; font-size:0.8em'>");
	//document.write(data_str.replace(/(.{60})/g, '$1<br/>'));
	document.write("<br><br>")
	if(checkPoints){
		document.write("No. of data points: ", dataLen, "<br><br>");
	};

	if(checkSum){
		document.write("Sum: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", dataSum, "<br><br>");
	};

	if(checkMean || checkMedian){
		document.write("<br><br>");
		document.write("=========================<br>");
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Midpoint<br>");
		document.write("=========================<br><br>");
	};
	
	if(checkMean){
		document.write("Mean:  &nbsp;&nbsp;&nbsp;  ", (Math.ceil(dataMean * 10000) / 10000), "<br><br>");
	};
	if(checkMedian){
		document.write("Median: &nbsp; ", dataMedian, "<br><br>");
	};

 	if(checkVar || checkSDev || checkSErr){
		document.write("<br><br><br>");
		document.write("=========================<br>");
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Spread <br>");
		document.write("=========================<br><br>");
	};
 	


	if(checkVar){
		document.write("Population Variance: &nbsp; &nbsp; ",(Math.ceil(dataVarP* 10000) / 10000),"<br>");
	};
	if(checkSDev){
		document.write("Population Std. Dev.:&nbsp; &nbsp; ",(Math.ceil(dataStDevP* 10000) / 10000), "<br><br>");
	};
	if(checkVar){
		document.write("Sample Variance: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp; ",(Math.ceil(dataVarS * 10000) / 10000),"<br>");
	};
	if(checkSDev){
		document.write("Sample Std. Dev.:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ",(Math.ceil(dataStDevS * 10000) / 10000), "<br>");
	};
	if(checkSErr){
		document.write("Std. Err.: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ",(Math.ceil(dataStErr * 10000) / 10000));
	};
	document.write("<br><br><br><br>");
	
	if(checkMode){
		if(dataMode.length > 2){
			document.write("Modes: <br>");
			for(i=0; i < dataMode.length; i+=2){
				if(i <= 21) {
					document.write(dataMode[i+1] + " (", dataMode[i] + "x)", "<br>");
					if(i == 20){
						document.write("...");
					};
				};
			};
		}
		else{
			document.write("Mode: &nbsp;&nbsp;&nbsp;&nbsp;" + dataMode[1] + " (", dataMode[0] + "x)", "<br>");
		};
	};

	if(checkCI){
		document.write("<br><br><br>");
		document.write("=====================<br>");
		document.write("Confidence Intervals <br>");
		document.write("=====================<br><br>");
		if(dataLen<100){
			document.write("Currently Confidence Intervals only accurate for large sample sizes! <br><br>")
		}
		var dataMean4 = (Math.ceil(dataMean * 10000) / 10000)
		CI90 = (Math.ceil(CI90 * 10000) / 10000)
		CI95 = (Math.ceil(CI95 * 10000) / 10000)
		CI99 = (Math.ceil(CI99 * 10000) / 10000)
		var CI90M = (Math.ceil((dataMean4-CI90) * 10000) / 10000)
		var CI95M = (Math.ceil((dataMean4-CI95) * 10000) / 10000)
		var CI99M = (Math.ceil((dataMean4-CI99) * 10000) / 10000)
		var CI90P = (Math.ceil((dataMean4+CI90) * 10000) / 10000)
		var CI95P = (Math.ceil((dataMean4+CI95) * 10000) / 10000)
		var CI99P = (Math.ceil((dataMean4+CI99) * 10000) / 10000)

		document.write("CI 90%: &nbsp; ", dataMean4, " +- ", CI90 ,"  (", CI90M, ", " ,CI90P,")","<br><br>");
		document.write("CI 95%: &nbsp; ",dataMean4, " +- ", CI95 ,"  (", CI95M, ", " ,CI95P,")","<br><br>");
		document.write("CI 99%: &nbsp; ",dataMean4, " +- ", CI99 ,"  (", CI99M, ", " ,CI99P,")","<br><br>");
	};



	// write data as csv

	document.write("<br><br>");
	document.write("=============<br>");
	document.write("Input Data <br>");
	document.write("=============<br><br>");

	var data_str = "";
	for(i=0; i<dataList.length; i++){
		data_str += dataList[i] + ",";
	};
	data_str = data_str.replace(/,+$/, "");	// remove trailing comma
	document.write(data_str.replace(/(.{60})/g, '$1<br/>'));
	

	//test sectiomn

    

	document.write("</span>");
	document.write("</body></html>");


}; // close dataStats
