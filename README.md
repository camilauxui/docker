# Aprendizaje Basado en Proyectos: Uso de Hooks y Manejo de Errores en la Web del Hospital  

**Contexto:**
implementar Hooks para la gestión de estado y efectos secundarios, además de manejar errores y excepciones dentro del sistema del hospital.
Integraciòn del Hook de estado y el Hook de efecto para interactuar con los datos del hospital. 
Creaciòn de un Hook personalizado 
Estrategias para la detección y manejo de errores dentro de la aplicación React.

# 1. Uso de useState para la Gestión de Estado

##  En el componente *AppointmentForm*, se está utilizando *useState* para manejar:

✅*El estado del formulario (formData):* Este estado almacena temporalmente la información ingresada por el usuario (nombre, email, teléfono, doctor, fecha y hora). Cada vez que el usuario escribe en un campo, el estado se actualiza mediante setFormData.

✅*Errores del formulario (formError):* Si hay un error en los datos ingresados (como una fecha en el pasado), este estado se utiliza para mostrar un mensaje de error al usuario.

✅*Confirmación de la cita (confirmation):* Una vez que el formulario se envía correctamente, este estado almacena los detalles de la cita agendada y los muestra en la interfaz.

*Ejemplo de uso:*
const [formData, setFormData] = useState({  
    name: "",  
    email: "",  
    phone: "",  
    doctor: "",  
    date: "",  
    time: "",  
});   

const handleChange = (e) => {  
    const { name, value } = e.target;  
    setFormData((prevData) => ({  
        ...prevData,  
        [name]: value, // Actualiza solo el campo que cambió  
    }));  
};  


###  El estado *formData* en *AppointmentForm* almacena temporalmente los datos ingresados por el usuario hasta que:

✅ Se valida la información.
✅Se envía el formulario.
✅ Se restablece el formulario después de que se muestra el mensaje de confirmación.
✅ El estado *confirmation* almacena temporalmente los datos de la cita agendada para mostrarlos en la interfaz.

## *Manejo del estado de autenticación*
En el componente *AuthProvider*, se está utilizando *useStateP para manejar:

✅ El estado de autenticación (isAuthenticated):* Este estado indica si el usuario está autenticado o no.

✅ El estado del usuario (user):* Este estado almacena temporalmente la información del usuario autenticado (como el nombre o el nombre de usuario).

## Manejo del estado en el Login
El componente *LoginForm* está utilizando useState para manejar:

✅ El estado del nombre de usuario (username).

✅ El estado de la contraseña (password).

✅ El estado del modal (show): Este estado controla si el modal de inicio de sesión está visible o no.

# 2. Uso de useEffect para la Gestión de Efectos Secundarios

### Cambios realizados:
Simulación de una API con *simulateFetchDoctors*:

✅Simula una llamada a la API con un retraso de 2 segundos usando setTimeout.

✅Uso de *useEffect* para cargar los doctores dinámicamente:
 - Se utiliza *useEffect* para llamar a la función *simulateFetchDoctors* 
 
 - Se actualiza el estado doctors con los datos simulados.

### *Indicador de carga (loading):*
Se muestra un mensaje de "Cargando Agenda Virtual..." mientras se obtienen los datos de los doctores.

### *Formulario dinámico:*
La lista de doctores ahora se genera dinámicamente a partir del estado doctors.

# 3. Construcción de un Hook Personalizado
Para extraer la lógica del formulario en un Custom Hook, se crea un archivo separado *useAppointmentForm.js* y se mueve ahí toda la lógica relacionada con la validación, manejo de estados, y simulación de la API. De esta forma se separa la lógica de negocio del componente visual, facilitando el mantenimiento y la reutilización de la funcionalidad del formulario en diferentes partes de la aplicación.

### Este hook encapsula toda la lógica necesaria para el funcionamiento del formulario, incluyendo:

### *Gestión de Estados:*
Maneja los estados de los campos del formulario como nombre, email, teléfono, médico seleccionado, fecha y hora.
Controla los mensajes de error y la confirmación de la cita agendada.

### *Validación de Datos:*
Realiza validaciones sobre los datos ingresados, como verificar que la fecha no sea en el pasado.

### *Simulación de API:*
Simula una llamada a una API para obtener la lista de médicos disponibles, incluyendo su especialidad.

### *Manejo de Carga:*
Controla el estado de carga mientras se obtienen los datos.

### *Manejo de Formulario:*
Procesa los cambios en los campos del formulario y maneja el envío del formulario.

### *Muestra mensajes:* 
Muestra mensajes de error o confirmación según sea necesario.

# 4. Manejo de Errores en la Aplicación

### Hook Personalizado: `useAppointmentForm`  

El hook `useAppointmentForm` encapsula la lógica necesaria para manejar un formulario de registro de citas médicas, incluyendo la validación de datos, la gestión de errores y la simulación de una llamada a la API para obtener datos de doctores.  

#### Funcionalidades Principales:  
✅ **Manejo de Errores en Peticiones a la API:**  
   - Simula una llamada a la API para obtener la lista de doctores y utiliza un bloque `try...catch` para capturar errores.  
   - Utiliza el estado `loading` para indicar al usuario que los datos están cargando.  

✅ **Validación de Formularios:**  
   - Valida que la fecha seleccionada no sea en el pasado.  
   - Los errores de validación se almacenan en el estado `formError` y se muestran al usuario mediante mensaje de advertencia.  

✅ **Confirmación de Registro:**  
   - Tras una validación exitosa, los datos del formulario se limpian y se almacena una confirmación en el estado `confirmation`.  

#### Ejemplo de Manejo de Errores:  
- Si el usuario selecciona una fecha inválida, el formulario mostrará el mensaje: `"La fecha seleccionada no puede ser en el pasado."`.  
- Si ocurre un error al cargar los datos de los doctores, este se captura y se puede manejar para mostrar un mensaje al usuario.  

# 5. Aplicación Correcta de las Reglas de los Hooks

El hook *useAppointmentForm* sigue correctamente las reglas de los Hooks en React:

✅ **Llamada de Hooks al Nivel Superior:**  
   Todos los Hooks (`useState`, `useRef`, `useEffect`, `useCallback`) están declarados al nivel superior de la función, fuera de bucles y condicionales, como exige React.  

✅ **Uso Correcto de `useEffect`:**  
   Los efectos secundarios, como la carga de médicos simulada o la asignación del foco al input de nombre, están correctamente implementados con las dependencias necesarias.  

✅ **Uso Correcto de `useCallback`:**  
   Las funciones como `handleSubmit` (envío de formulario) y `validateForm` (validación de datos) están optimizadas mediante `useCallback`, evitando renders innecesarios.  

Al seguir estas prácticas, el hook garantiza un comportamiento predecible y eficiente, respetando las reglas y mejores prácticas de ReactJS.  
