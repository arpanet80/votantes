import { Role } from "../../enums/rol.enum";

////// ARMAR EL MENU EN EL ORDEN QUE APARECERA EN EL SIDEBAR ////////////
export const menuDeOpcionesDos = {

    etiquetaFuncionarios:'consulta ciudada',

    judiciales2024: {
            titulo: 'Judiciales 2024',
            icono:  "bi bi-bookmarks-fill",
            url: "/votantes/judiciales",
            roles: [Role.Admin, Role.Usuario],
    },
    generales2025: {
        titulo: 'Generales 2025',
        icono:  "bi bi-check2-square",
        url: "/votantes/generales2025",
        roles: [Role.Admin, Role.Usuario],
    },
    generales2021segunda: {
        titulo: 'Generales 2022 2da. Vuelta',
        icono:  "bi bi-calendar-check",
        url: "/votantes/generales2025segunda",
        roles: [Role.Admin, Role.Usuario],
    },
    busquedaciudadano: {
        titulo: 'Busqueda por criterios',
        icono:  "bi bi-search",
        url: "/votantes/busquedaciudadanos",
        roles: [Role.Admin],
    },


    /*
    menuPrimerNivel: [
        {
            titulo: 'Certificaciones',
            icono: "bi bi-android",
            url: "/votantes",
            roles: [Role.Admin, Role.Rrhh],
            opcionSimple: [
                {
                    titulo: 'Judiciales 2024',
                    url: "/votantes/judiciales",
                },
            ]
        },
    ],*/

}

