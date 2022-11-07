// https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript
// had to refer to resources in order to read from json files

// code inspired by Adam Tilsons ENSE374 Lab

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback(rawFile.responseText);
      }
  }
  rawFile.send(null);
}

var ix, iy, it, iz, ia;

readTextFile("./Objects.json", function(text){
  var data = JSON.parse(text);
  console.log(data);
  console.log(data.Group.EmployeeList.Employee[1].Name);

  var x = document.getElementById("startPoint");

  function startPoint() {
    for (ix = 0; ix < data.Group.LocationList.Location.length; ix++) {
      var form = document.createElement("div");
      form.className = "form-check form-check-inline";
      form.innerHTML =
      `<div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox` + ix + `" value="option` + ix + `">
        <label class="form-check-label" for="inlineCheckbox` + ix + `">` + data.Group.LocationList.Location[ix].Name + `</label>
      </div>`;
      $(x).append(form);
    }
  }
  
  var y = document.getElementById("endPoint");

  function endPoint() {
    for (iy = 0; iy < data.Group.LocationList.Location.length; iy++) {
      var form = document.createElement("div");
      form.className = "form-check form-check-inline";
      form.innerHTML =
      `<div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox` + iy+data.Group.LocationList.Location.length + `" value="option` + iy+data.Group.LocationList.Location.length + `">
        <label class="form-check-label" for="inlineCheckbox` + iy+data.Group.LocationList.Location.length + `">` + data.Group.LocationList.Location[iy].Name + `</label>
      </div>`;
      $(y).append(form);
    }
  }

  var t = document.getElementById("startT");
  
  function time() {
    
  }

  var z = document.getElementById("driver");

  function driver() {
    for (iz = 0; iz < data.Group.EmployeeList.Employee.length; iz++) {
      var form = document.createElement("div");
      form.className = "form-check form-check-inline";
      form.innerHTML =
      `<div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox` + iz+(2*data.Group.LocationList.Location.length) + `" value="option` + iz+(2*data.Group.LocationList.Location.length) + `">
        <label class="form-check-label" for="inlineCheckbox` + iz+(2*data.Group.LocationList.Location.length) + `">` + data.Group.EmployeeList.Employee[iz].Name + ` ID: ` + data.Group.EmployeeList.Employee[iz].id + `</label>
      </div>`;
      $(z).append(form);
    }
  }

  var a = document.getElementById("truckUnitNum");

  function truck() {
    for (ia = 0; ia < data.Group.TruckList.Truck.length; ia++) {
      if (data.Group.TruckList.Truck[ia].TailTrailer == null) 
      {
        var form = document.createElement("div");
        form.className = "form-check form-check-inline";
        form.innerHTML =
        `<div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="inlineCheckbox` + ia+(2*data.Group.LocationList.Location.length)+data.Group.EmployeeList.Employee.length + `" value="option` + ia+(2*data.Group.LocationList.Location.length)+data.Group.EmployeeList.Employee.length + `">
          <label class="form-check-label" for="inlineCheckbox` + ia+(2*data.Group.LocationList.Location.length)+data.Group.EmployeeList.Employee.length + `">` + data.Group.TruckList.Truck[ia].UnitNumber + ` w/ Trailer ` + data.Group.TruckList.Truck[ia].Trailer + `</label>
        </div>`;
      } 
      else 
      {
        var form = document.createElement("div");
        form.className = "form-check form-check-inline";
        form.innerHTML =
        `<div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox` + ia+(2*data.Group.LocationList.Location.length)+data.Group.EmployeeList.Employee.length + `" value="option` + ia+(2*data.Group.LocationList.Location.length)+data.Group.EmployeeList.Employee.length + `">
        <label class="form-check-label" for="inlineCheckbox` + ia+(2*data.Group.LocationList.Location.length)+data.Group.EmployeeList.Employee.length + `">` + data.Group.TruckList.Truck[ia].UnitNumber + ` w/ Trailer ` + data.Group.TruckList.Truck[ia].Trailer + ` and ` + data.Group.TruckList.Truck[ia].TailTrailer + `</label>
        </div>`;
      }
      $(a).append(form);
    }
  }
  startPoint();
  endPoint();
  time();
  driver();
  truck();
});

document.getElementById("submit").onclick=function()
{
    document.getElementById("table").style.display="block";
    
    var table = document.getElementById("table");
    var row = table.insertRow(-1);
    var name = row.insertCell(0);
    var truckNum = row.insertCell(1);
    var dest = row.insertCell(2);
    var totalTime = row.insertCell(3);
    var timeRemain = row.insertCell(4);
    var startDate = row.insertCell(5);

    name.innerHTML = document.getElementById("inlineCheckbox6").value;
    truckNum.innerHTML = document.getElementById("inlineCheckbox11").value;
    dest.innerHTML = document.getElementById("inlineCheckbox3").value;
    totalTime.innerHTML = document.getElementById("inlineCheckbox5").value;
    timeRemain.innerHTML = document.getElementById("inlineCheckbox6").value;
    startDate.innerHTML = document.getElementById("startT").value;
    
    return false;
}