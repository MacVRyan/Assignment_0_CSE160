function main() {
  // Retrieve <canvas> element <- (1)
  var canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }
  
  // Get the rendering context for 2DCG <- (2)
  var ctx = canvas.getContext('2d');
  
  // Draw a blue rectangle <- (3)
  //ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a blue color
  ctx.fillRect(0, 0, 400, 400); // Fill a rectangle with the color
} 

function drawVector(v, color) {
  var canvas = document.getElementById('example');
  let ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(200,200);
  ctx.lineTo(v.elements[0]*20 + 200, -(v.elements[1]*20) + 200);
  ctx.strokeStyle = color;
  ctx.stroke();
}

function handleDrawEvent() {
  var canvas = document.getElementById('example');
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, 400, 400); // Fill a rectangle with the color
  let x = document.getElementById("x1").value
  x = parseFloat(x)
  let y = document.getElementById("y1").value
  y = parseFloat(y)
  coords = [x,y,0]
  const v1 = new Vector3(coords)
  drawVector(v1, "red")
  const v2 = new Vector3([parseFloat(document.getElementById("x2").value), parseFloat(document.getElementById("y2").value), 0])
  drawVector(v2, "blue")
  const op = document.getElementById("ops").value
  let v3 = null;
  let v4 = null;
  if (op === "add") {
    v3 = new Vector3()
    v3.set(v1)
    v3.add(v2)
  } else if (op === "sub") {
    v3 = new Vector3()
    v3.set(v1)
    v3.sub(v2)
  } else if (op === "mult") {
    let scalar = document.getElementById("scalar").value
    scalar = parseFloat(scalar)
    if (scalar !== NaN) {
      v3 = new Vector3()
      v3.set(v1)
      v3.mul(scalar)
      v4 = new Vector3()
      v4.set(v2)
      v4.mul(scalar)
    }
  } else if (op === "div") {
    let scalar = document.getElementById("scalar").value
    scalar = parseFloat(scalar)
    if (scalar !== NaN) {
      v3 = new Vector3()
      v3.set(v1)
      v3.div(scalar)
      v4 = new Vector3()
      v4.set(v2)
      v4.div(scalar)
    }
  } else if (op === "mag") {
    console.log("Magnitude v1: " + v1.magnitude())
    console.log("Magnitude v2: " + v2.magnitude())
  } else if (op === "norm") {
    v3 = new Vector3()
    v3.set(v1)
    v3.normalize()
    v4 = new Vector3()
    v4.set(v2)
    v4.normalize()
  } else if (op === "area") {
    console.log("Area of triangle: " + areaTriangle(v1, v2))
  } else if (op === "angle") {
    console.log("Angle between: " + angleBetween(v1, v2))
  }

  if (v3 != null) {
    drawVector(v3, "green")
  }
  if (v4 != null) {
    drawVector(v4, "green")
  }
}

function areaTriangle(v1, v2) {
  const v3 = Vector3.cross(v1, v2)
  return v3.magnitude() / 2
}

function angleBetween(v1, v2) {
  const m1 = v1.magnitude();
  const m2 = v2.magnitude();
  return Math.acos(Vector3.dot(v1, v2)/(m1*m2))
}