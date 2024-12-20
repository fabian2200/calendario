import {http} from "./http_services";

export function listarObligaciones() {
    return http().get('compromiso/listTodosCompromisos');
}

export function guardarNota($data) {
    return http().post(
        'notas/guardar-nota', 
        $data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
}

export function listarNotas() {
    return http().get('notas/listar-notas');
}

export function editarNota($data) {
    return http().post(
        'notas/editar-nota', 
        $data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
}