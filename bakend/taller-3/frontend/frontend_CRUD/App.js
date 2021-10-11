const baseUrl = "http://localhost:8090/v1/empleados",
  d = document,
  container = d.querySelector("tbody"),
  modalEmpleados = new bootstrap.Modal(d.getElementById("modalEmpleado")),
  formEmpleado = d.querySelector("form"),
  nombre = d.getElementById("nombre"),
  apellido = d.getElementById("apellido"),
  correo = d.getElementById("correo"),
  btnCrear = d.getElementById("btncrear");

let resultados = "",
  opcion = "";

btnCrear.addEventListener("click", (e) => {
  nombre.value = "";
  apellido.value = "";
  correo.value = "";
  modalEmpleados.show();

  opcion = "crear";
});

const mostrar = ({ empleadoResponse }) => {
  const { empleados } = empleadoResponse;

  empleados.forEach((empleado) => {
    resultados += `
    <tr>
        <td>${empleado.id}</td>
        <td>${empleado.nombre}</td>
        <td>${empleado.apellido}</td>
        <td>${empleado.email}</td>
        <td>
            <a class="btnEditar btn btn-primary">Editar</a>
            <a class="btnBorrar btn btn-danger">Borrar</a>
        </td>

    </tr>
    `;
    container.innerHTML = resultados;
  });
};

fetch(baseUrl)
  .then((res) => res.json())
  .then((data) => mostrar(data))
  .catch((err) => console.error(err));

const ApiActions = (element, event, selector, handle) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handle(e);
    }
  });
};

//prosediento de borrar un registro

ApiActions(d, "click", ".btnBorrar", (e) => {
  const fila = e.target.parentNode.parentNode,
    id = fila.firstElementChild.innerHTML;

  //funcion importada de la libreria alertifyJS
  alertify.confirm(
    "Desea Borrra un empleado de la lista",
    function () {
      fetch(`http://localhost:8090/v1/empleados${/eliminar/}${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json)
        .then(() => location.reload());
      alertify.success("Ok");
    },
    function () {
      alertify.error("Cancel");
    }
  );
});

//prosedimiento de editar
let idForm = 0;
ApiActions(d, "click", ".btnEditar", (e) => {
  const fila = e.target.parentNode.parentNode;
  idForm = fila.children[0].innerHTML;
  const nombreForm = fila.children[1].innerHTML,
    apellidoForm = fila.children[2].innerHTML,
    correoForm = fila.children[3].innerHTML;

  nombre.value = nombreForm;
  apellido.value = apellidoForm;
  correo.value = correoForm;
  opcion = "editar";
  modalEmpleados.show();

  console.log(fila);
});

//prosedimiento para crear o editar registros

formEmpleado.addEventListener("submit", (e) => {
  //e.preventDefault();

  if (opcion === "crear") {
    console.log("estoy creando");
    fetch("http://localhost:8090/v1/empleados/insertar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        nombre: nombre.value,
        apellido: apellido.value,
        email: correo.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const nuevoEmpleado = {
          empleadoResponse: {
            empleados: [],
          },
        };
        nuevoEmpleado.empleadoResponse.empleados.push(data);
        mostrar(nuevoEmpleado);
      });
  }

  if (opcion === "editar") {
    console.log("estoy editando");

    fetch(`http://localhost:8090/v1/empleados/actualizar/${idForm}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        nombre: nombre.value,
        apellido: apellido.value,
        email: correo.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => location.reload());
  }

  modalEmpleados.hide();
});
