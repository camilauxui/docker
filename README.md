# Centro Médico  

**Contexto:**
En este ejercicio práctico, se aplicará todo lo aprendido sobre ReactJS para crear
un sistema completo para el Centro Médico. Implementación de componentes reutilizables, optimización de rendimiento, y interacciones con datos a través de APIs. Todas las vistas del sistema del hospital (Home, Servicios, Equipo Médico, Citas) deberán integrar
componentes avanzados y técnicas de optimización de ReactJS.

# 1. Implementación de Vistas Complejas con ReactJS
**- Vista Principal (Home):** Incluye una lista de servicios destacados y una sección
con información del hospital.
**- Vista del Equipo Médico:** Muestra los perfiles de doctores utilizando
componentes DoctorCard para cada miembro del equipo, permitiendo filtrar
por especialidad.
**- Vista de Citas:** Implementa un formulario para agendar citas con validaciones y
uso de Hooks (useState, useEffect).

# 2. Optimización del DOM Virtual y Uso de Fragmentos
- Usa el DOM Virtual para gestionar eficientemente la actualización de datos en las
diferentes vistas, asegurando que solo los elementos necesarios se actualicen:
Uso Correcto del Estado y Eficiencia del DOM Virtual

**Cargar Datos Iniciales** usando useEffect para cargar los datos de los doctores, esto permite que React solo actualice el componente cuando los datos cambian, en lugar de volver a renderizarlo completamente.

**Actualización del Estado utilizando setDoctors** para actualizar el estado del contexto. Esto desencadena una re-renderización de los componentes que están utilizando DoctorContext.

**El uso del componente Profiler** se usa para de medir el tiempo de renderización del componente 


**Implementa Fragmentos** (<React.Fragment>) para evitar renderizar div innecesariosen el DOM y mejorar la estructura del código en las diferentes secciones del sistema.

# 3. Uso de Referencias y Callbacks
En el formulario para agendar una Cita mèdica, se enfoca el primer campo, cumpiendo con "Enfocar automáticamente en un campo de entrada cuando el usuario ingresa a la vista de Citas."
**Uso de useRef:** referencia para el campo de nombre utilizando useRef. Esto permite acceder directamente al elemento del DOM.
En el **useEffect** se llama a nameInputRef.current.focus() para enfocar el campo de nombre cuando el componente carga:

useEffect(() => {  
    // Enfocar el campo de nombre 
    nameInputRef.current.focus();  
}, []);

- **Callbacks** Se usan referencias de callback para gestionar el desplazamiento a diferentes secciones + botòn para subir al inicio de la pàgina, en la vista Home.
