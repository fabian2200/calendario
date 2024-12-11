import {http} from "./http_services";

export function listarObligaciones() {
    return http().get('compromiso/listTodosCompromisos');
}

export function cambiarEstadoCompromiso($data) {
    return http().post(
        'compromiso/cambiarEstadoCompromiso', 
        $data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
}

export function avanceContable(anio) {
    return http().get('avance/avanceContable?anio='+anio);
}

export function cambiarEstadoPago(id_pago, estado) {
    return http().get('avance/cambiar-estado-pago?id_pago='+id_pago+'&estado='+estado);
}

export function datosDashboard() {
    return http().get('compromiso-avance/datosDashboard');
}