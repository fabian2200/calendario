<template lang="">
    <div>
        <loading :active="loading" 
            :can-cancel="true"
            loader="bars" 
            color="#38b4c5"
            :height=100
            :width=200
            :on-cancel="onCancel"
            :is-full-page="true">
        </loading>
        <div id="main" style="background-color: #f2f7ff; margin-left: 0px !important; height:">
            <header class="mb-3">
                <a href="#" class="burger-btn d-block d-xl-none">
                    <i class="bi bi-justify fs-3"></i>
                </a>
            </header>
            <div class="page-content">
                <section class="row">
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-6 col-lg-2 col-md-6" style="display: flex;flex-direction: column;justify-content: center;">
                                <h2 style="color: #050539ab; font-weight: bolder;">Dashboard</h2>
                                <h2 style="color: #050539ab; font-weight: bolder; ">Año: {{ anio }}</h2>
                            </div>
                            <div class="col-6 col-lg-4 col-md-6">
                                <router-link to="/obligaciones-impuestos">
                                    <div class="card cadop" style="margin: 0">
                                        <div class="card-body px-3 py-4-5">
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <div class="stats-icon green">
                                                        <i class="bi bi-currency-dollar green_i"></i>
                                                    </div>
                                                </div>
                                                <div class="col-md-10" style="display: flex;flex-direction: column;justify-content: center;">
                                                    <h3 class="text-muted font-semibold">Obligaciones e impuestos</h3>
                                                    <h4 class="font-extrabold mb-0">Esta semana: <strong v-if="datos != null">{{ datos.compromisos_semana }}</strong></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                            <div class="col-6 col-lg-3 col-md-6">
                                <router-link to="/avance-contable">
                                    <div class="card cadop" style="margin: 0">
                                        <div class="card-body px-3 py-4-5">
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <div class="stats-icon red">
                                                        <i class="bi bi-bar-chart-line-fill red_i"></i>
                                                    </div>
                                                </div>
                                                <div class="col-md-10" style="display: flex;flex-direction: column;justify-content: center;">
                                                    <h3 class="text-muted font-semibold">Avance Contable</h3>
                                                    <h4 class="font-extrabold mb-0" v-if="datos!=null" >{{ datos.pagos.porcentaje_pagos_pendientes }}%</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                            <div class="col-6 col-lg-2 col-md-6">
                                <div class="card cadop" style="margin: 0" @click="mostrarNotificaciones();">
                                    <div class="card-body px-3 py-4-5">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="stats-icon green">
                                                    <div class="div_notification" v-if="notificaciones != null">{{notificaciones.numero_notificaciones}}</div>
                                                    <i class="bi bi-bell-fill orange_i"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-lg-1 col-md-6">
                                <div class="card cadop" @click="openModal()" style="margin: 0">
                                    <div class="card-body px-3 py-4-5">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="stats-icon green">
                                                    <i class="bi bi-gear-fill grey_i"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="row" style="margin-top: 2.5vh">
                            <div class="col-lg-6">
                                <div class="card" style="margin: 0px;">
                                    <div class="card-header">
                                        <br>
                                        <h2>Obligaciones DIAN</h2>
                                    </div>
                                    <div class="card-body">
                                        <div style="display: flex;  align-items: center">
                                            <label style="width: 100px; font-weight: bold">Filtrar: </label>
                                            <select style="width: 300px;" v-model="tipo_obligacion_mostrada" class="form-control">
                                                <option value="1">Fecha de presentación</option>
                                                <option value="2">Fecha de pago</option>
                                            </select>
                                        </div>
                                        <br>
                                        <div class="table-responsive">
                                            <template v-if="datos != null">
                                                <template v-if="tipo_obligacion_mostrada == 1">
                                                    <div class="table-container" style="height: 58.9vh;">
                                                        <table class="table table-hover table-lg">
                                                            <thead>
                                                                <tr>
                                                                    <th style="width:40%; background-color: #b5f1fd">Empresa</th>
                                                                    <th style="background-color: #b5f1fd">Declaración</th>
                                                                    <th style="width:20%; text-align: center; background-color: #b5f1fd">Fecha <br> presentación</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="(item, index) in datos.fecha_presentacion_vencida" :key="index">
                                                                    <td class="col-3">
                                                                        <div class="align-items-center">
                                                                            <p class="font-bold ms-3 mb-0">{{ item.nombre_empresa }}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td class="col-auto">
                                                                        <p class=" mb-0">{{ item.compromiso_descripcion }}</p>
                                                                    </td>
                                                                    <td class="col-auto" style="background-color: #ffc8c8">
                                                                        <p class=" mb-0" style="font-weight: bold;">{{ item.fecha_presentacion }}</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="table-container" style="height: 44vh">
                                                        <table class="table table-hover table-lg">
                                                            <thead>
                                                                <tr>
                                                                    <th style="width:40%; background-color: #b5f1fd">Empresa</th>
                                                                    <th style="background-color: #b5f1fd">Declaración</th>
                                                                    <th style="width:20%; text-align: center; background-color: #b5f1fd">Fecha <br> vencimiento</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="(item, index) in datos.fecha_vencimiento_vencida" :key="index">
                                                                    <td class="col-3">
                                                                        <div class="align-items-center">
                                                                            <p class="font-bold ms-3 mb-0">{{ item.nombre_empresa }}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td class="col-auto">
                                                                        <p class=" mb-0">{{ item.compromiso_descripcion }}</p>
                                                                    </td>
                                                                    <td class="col-auto" style="background-color: #ffc8c8">
                                                                        <p class=" mb-0" style="font-weight: bold;">{{ item.fecha_vencimiento }}</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </template>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="card" style="margin: 0px;">
                                    <div class="card-header" style="display: flex; justify-content: space-between; padding: 31px  28px 9px 37px">
                                        <h2>Notas rápidas</h2>
                                        <button @click="openModalNotas()" class="btn btn-success"><h4 style="padding: 0px; margin: 0px">Nueva nota <i style="font-size: 15px" class="bi bi-plus-circle"></i></h4></button>
                                    </div>
                                    <div class="card-body">
                                        <template v-if="notas != null">
                                            <div class="table-container tablero" style="background-image: url('/tablero.png');">
                                                <div style="padding: 31px; height: 100%;  width: 100.5%; padding-right: 10px;overflow-y: scroll; overflow-x: clip">
                                                    <div class="row">
                                                        <div class="col-lg-3" style="padding: 10px; margin-top: 35px;" v-for="(item, index) in notas" :key="index">
                                                            <div @click="openModalEditarNotas(item)" class="nota" :style="'padding: 10px; background-color: '+item.color+';'+'color: '+item.color_texto+'; '">
                                                                <p><span>{{ item.descripcion }}</span></p>
                                                                <p v-if="item.fecha != null" style="margin-bottom: 0px"><i class="bi bi-calendar-range"></i> <span>{{ item.fecha }}</span></p>
                                                                <img src="/clip.png" class="clip" alt="imagen">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <div class="modal fade" id="configModal" tabindex="-1" role="dialog" aria-labelledby="infoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h3  id="infoModalLabel">Configuraciones</h3>
                    </div>
                    <div class="modal-body">
                        <div style="padding: 0px; display: flex; width: 100%; align-items: center;">
                            <h4 style="padding-right: 30px;">Seleccione un periodo</h4>
                            <select class="form-control select-mio" name="anio" v-model="anio" id="">
                                <option v-for="year in years" :key="year" :value="year">
                                    {{ year }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" @click="cambiarAnio()">Aplicar</button>
                        <button type="button" class="btn btn-danger" @click="closeModal()">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="div_notificaciones_contenedor" style="cursor: pointer; right:-30%;" id="div_notificaciones_contenedor">
            <i @click="mostrarNotificaciones()" style="position: absolute;  top: 18px;  right: 20px; font-weight: bolder;  color: red; font-size: 30px;" class="bi bi-x-lg"></i>
            <br>
            <br>
            <table style="width: 100%">
                <thead>
                    <tr>
                        <td @click="cambiarTipoNot(1)" :style="tipo_notificacion == 1 ? 'width: 50%; text-align: center; background-color: aquamarine;': 'width: 50%; text-align: center; background-color: white;'">
                            Obligaciones e impuestos
                        </td>
                        <td @click="cambiarTipoNot(2)" :style="tipo_notificacion == 2 ? 'width: 50%; text-align: center; background-color: aquamarine;': 'width: 50%; text-align: center; background-color: white;'">
                            Avance contable
                        </td>
                    </tr>
                </thead>
            </table>
            <br>
            <div style="width: 100%; height: 80vh; overflow-y: auto" v-if="tipo_notificacion == 1 && notificaciones != null">
                <div :class="'notificacion '+item.clase" v-for="(item, index) in notificaciones.compromisos_vencidos" :key="index">
                    <div @click="openModalCambiarEstadoObligaciones(item)">
                        <label><strong>Obligación: </strong> {{item.compromiso_descripcion}}</label><br>
                        <label><strong>Empresa: </strong> {{item.nombre_empresa}}</label><br>
                        <label v-if="item.tipo_ven == 'pres'" ><strong>Fecha  de Presentación: </strong> {{item.fecha_presentacion}}<br></label>
                        <label v-if="item.tipo_ven == 'ven'" ><strong>Fecha  de Vencimiento: </strong> {{item.fecha_vencimiento}}<br></label>
                        <label>{{item.desc_not}}</label><br>
                    </div>
                </div>
            </div>
            <div style="width: 100%; height: 80vh; overflow-y: auto" v-if="tipo_notificacion == 2 && notificaciones != null">
                <div :class="'notificacion '+item.clase" v-for="(item, index) in notificaciones.pagos_vencidos" :key="index">
                    <div @click="openModalCambiarEstadopago(item)">
                        <label><strong>Concepto: </strong> {{item.nombre_concepto}}</label><br>
                        <label><strong>Empresa: </strong> {{item.nombre}}</label><br>
                        <label><strong>Fecha  de Pago: </strong> {{item.fecha_pago}}</label><br>
                        <label>{{item.desc_not}}</label><br>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="cambiarEstadoObligaciones" tabindex="-1" role="dialog" aria-labelledby="infoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h3  id="infoModalLabel">Cambiar estado de compromiso</h3>
                    </div>
                    <div class="modal-body" v-if="compromiso_editar != null">
                        <h5><strong>Compromiso: </strong> {{ compromiso_editar.compromiso_descripcion }}</h5>
                        <h5><strong>Empresa: </strong> {{ compromiso_editar.nombre_empresa }}</h5>
                        <div v-if="compromiso_editar.tipo_ven == 'pres'">
                            <h5><strong>Fecha de Presentación: </strong> {{ compromiso_editar.fecha_presentacion }} </h5>
                            <hr>
                            <label style="font-weight: bold;" for="">Seleccione un estado</label>
                            <select class="form-control" v-model="compromiso_editar.estado_pres" required>
                                <option value="pendiente" selected>Pendiente</option>
                                <option value="presentado">Presentado</option>
                                <option value="pagado">Pagado</option>
                                <option value="vencido">Vencido</option>
                            </select>
                        </div>
                        <div v-else>
                            <h5><strong>Fecha de pago: </strong> {{ compromiso_editar.fecha_vencimiento }} </h5>
                            <hr>
                            <label style="font-weight: bold;" for="">Seleccione un estado</label>
                            <select class="form-control" v-model="compromiso_editar.estado_venc" required>
                                <option value="pendiente" selected>Pendiente</option>
                                <option value="presentado">Presentado</option>
                                <option value="pagado">Pagado</option>
                                <option value="vencido">Vencido</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" @click="cambiarEstadoCompromiso()">Guardar</button>
                        <button type="button" class="btn btn-danger" @click="closeModalCambiarEstadoCompromiso()">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modalNotas" tabindex="-1" role="dialog" aria-labelledby="infoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h3  id="infoModalLabel">Nueva Nota</h3>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="descripcion" class="form-label">Descripción</label>
                            <textarea v-model="datos_nota.descripcion" class="form-control" id="descripcion" name="descripcion" rows="4" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="fecha" class="form-label">Fecha</label>
                            <input  v-model="datos_nota.fecha" type="date" class="form-control" id="fecha" name="fecha" required>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="mb-3">
                                    <label for="color" class="form-label">Color fondo</label>
                                    <input v-model="datos_nota.color" type="color" class="form-control" id="color" name="color" required>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="mb-3">
                                    <label for="color" class="form-label">Color texto</label>
                                    <input v-model="datos_nota.color_texto" type="color" class="form-control" id="color" name="color" required>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" @click="guardarNota()">Guardar</button>
                        <button type="button" class="btn btn-danger" @click="closeModalNotas()">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="modaleditarNotas" tabindex="-1" role="dialog" aria-labelledby="infoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h3  id="infoModalLabel">Editar Nota</h3>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="descripcion" class="form-label">Descripción</label>
                            <textarea v-model="datos_nota_editar.descripcion" class="form-control" id="descripcion" name="descripcion" rows="4" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="fecha" class="form-label">Fecha</label>
                            <input  v-model="datos_nota_editar.fecha" type="date" class="form-control" id="fecha" name="fecha" required>
                        </div>
                        <div class="mb-3">
                            <label for="fecha" class="form-label">Mostrar / Quitar</label>
                            <select v-model="datos_nota_editar.estado" class="form-control">
                                <option value="1">Mostrar</option>
                                <option value="0">Quitar</option>
                            </select>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="mb-3">
                                    <label for="color" class="form-label">Color fondo</label>
                                    <input v-model="datos_nota_editar.color" type="color" class="form-control" id="color" name="color" required>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="mb-3">
                                    <label for="color" class="form-label">Color texto</label>
                                    <input v-model="datos_nota_editar.color_texto" type="color" class="form-control" id="color" name="color" required>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" @click="editarNota()">Guardar</button>
                        <button type="button" class="btn btn-danger" @click="closeModalEditarNotas()">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as oblicacionesService from "../services/obligaciones";
import * as notasService from "../services/notas";
import { Modal } from 'bootstrap';
import Swal from "sweetalert2";
import Loading from 'vue3-loading-overlay';


export default {
    components: {
        Loading
    },
    data() {
        return {
            datos: null,
            tipo_obligacion_mostrada: 1,
            modalInstance: null,
            years: [],
            anio: 0,
            notificaciones: null,
            tipo_notificacion: 1,
            compromiso_editar: null,
            modalCambiarEstadoObligaciones: null,
            mesesUno: [
                "enero", "febrero", "marzo", "abril", "mayo", "junio",
                "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
            ],
            pago_editar: null,
            loading: false,
            modalNotas: null,
            datos_nota: {
                descripcion: '',
                color: '#b5f1fd',
                color_texto: '#000000',
                fecha: ''
            },
            datos_nota_editar: {
                descripcion: '',
                color: '',
                color_texto: '',
                fecha: '',
                estado: '0'
            },
            notas: [],
            modalEditarNotas: null
        }
    },
    mounted() {
        this.loading = true;
        this.anio = new Date().getFullYear();
        this.datosDashboard();
        this.generateYears();
        this.initModal();
        this.listarNotificaciones();
        this.listarNotas();
    },
    methods: {
        generateYears() {
            const currentYear = new Date().getFullYear();
            for (let year = 2024; year <= currentYear; year++) {
                this.years.push(year);
            }
        },
        cambiarAnio(){
            this.closeModal();
            setTimeout(() => {
                this.datosDashboard();
            }, 500);
        },
        initModal() {
            const modalElement = document.getElementById('configModal');
            this.modalInstance = new Modal(modalElement);

            const cambiarEstadoObligaciones = document.getElementById('cambiarEstadoObligaciones');
            this.modalCambiarEstadoObligaciones = new Modal(cambiarEstadoObligaciones);

            const modalNotasI = document.getElementById('modalNotas');
            this.modalNotas = new Modal(modalNotasI);

            const modalEditarNotasI = document.getElementById('modaleditarNotas');
            this.modalEditarNotas = new Modal(modalEditarNotasI);
        },
        openModal() {
            this.modalInstance.show(); 
        },
        openModalCambiarEstadoObligaciones(item) {
            this.compromiso_editar = item;
            this.modalCambiarEstadoObligaciones.show(); 
        },
        openModalNotas() {
            this.modalNotas.show(); 
        },
        openModalEditarNotas(item) {
            console.log(item);
            this.datos_nota_editar = item;
            this.modalEditarNotas.show(); 
        },
        closeModalCambiarEstadoCompromiso(){
            this.modalCambiarEstadoObligaciones.hide(); 
        },
        closeModal() {
            this.modalInstance.hide();
        },
        closeModalNotas(){
            this.modalNotas.hide(); 
        },
        closeModalEditarNotas(){
            this.modalEditarNotas.hide(); 
        },
        async guardarNota(){
            await notasService.guardarNota(this.datos_nota).then(respuesta => {
                var respuesta_ok = respuesta.data;
                if(respuesta_ok.success == 1){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: respuesta_ok.message,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    setTimeout(() => {
                        this.datos_nota = {
                            descripcion: '',
                            color: '#b5f1fd',
                            color_texto: '#000000',
                            fecha: ''
                        };
                        this.closeModalNotas();
                        this.listarNotas();
                    }, 1500);
                
                }else{
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: respuesta_ok.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        },
        async editarNota(){
            await notasService.editarNota(this.datos_nota_editar).then(respuesta => {
                var respuesta_ok = respuesta.data;
                if(respuesta_ok.success == 1){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: respuesta_ok.message,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    setTimeout(() => {
                        this.datos_nota_editar = {
                            descripcion: '',
                            color: '#b5f1fd',
                            color_texto: '#000000',
                            fecha: '',
                            estado: '0'
                        };
                        this.closeModalEditarNotas();
                        this.listarNotas();
                    }, 1500);
                
                }else{
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: respuesta_ok.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        },
        async listarNotas(){
            this.notas = await notasService.listarNotas();
            this.notas = this.notas.data;
        },
        async datosDashboard(){
            this.datos = await oblicacionesService.datosDashboard(this.anio);
            this.datos = this.datos.data;
        },
        async listarNotificaciones() {
            this.notificaciones = await oblicacionesService.listarNotificaciones();
            this.notificaciones = this.notificaciones.data;
            this.loading = false;
        },
        cambiarTipoNot(valor){
            this.tipo_notificacion = valor;
        },
        mostrarNotificaciones(){
            var contenedor = document.getElementById("div_notificaciones_contenedor");
            console.log(contenedor)
            if (contenedor.style.right === "-30%") {
                contenedor.style.right = "0px";
            } else if (contenedor.style.right === "0px") {
                contenedor.style.right = "-30%";
            }
        },
        async cambiarEstadoCompromiso(){
            var datos = {
                tipo: this.compromiso_editar.tipo_ven,
                data: this.compromiso_editar
            };
            
            await oblicacionesService.cambiarEstadoCompromiso(datos).then(respuesta => {
                var respuesta_ok = respuesta.data;
                if(respuesta_ok.success == 1){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: respuesta_ok.message,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    setTimeout(() => {
                        this.datosDashboard();
                        this.closeModalCambiarEstadoCompromiso();
                        this.listarNotificaciones();
                    }, 1500);
                
                }else{
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: respuesta_ok.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        },
        openModalCambiarEstadopago(item) {
            this.pago_editar = item;
            console.log(this.pago_editar);
            const selectHTML = `
                <h4 style="text-align: left; font-weight: bold;">`+this.pago_editar.nombre+`</h4>
                <h4 style="text-align: left; font-weight: bold;"><span style="color: blue">Concepto: </span>`+this.pago_editar.nombre_concepto+`</h4>
                <h4 style="text-transform: capitalize; text-align: left; font-weight: bold;"><span style="color: blue">Mes: </span>`+this.mesesUno[this.pago_editar.mes_pago]+`</h4>
                <br>
                <select style="font-weight: bold;" id="estado_concepto" name="frecuencia" class="form-control" aria-invalid="false">
                    <option value="">Seleccione una opción</option>
                    <option value="N/A">N/A</option>
                    <option value="pagado">PAG</option>
                    <option value="pendiente">PEN</option>
                </select>
            `;

            Swal.fire({
                title: 'Cambiar estado de concepto',
                html: selectHTML,
                confirmButtonText: 'Aceptar',
                showCancelButton: true,
                cancelButtonText: "Cerrar",
                cancelButtonColor: "red",
                confirmButtonColor: 'green',
                focusConfirm: false,
                preConfirm: () => {
                    const estado_concepto = document.getElementById('estado_concepto').value;
                    if (estado_concepto) {
                        this.cambiarEstadoPago(this.pago_editar.id, estado_concepto);
                    } else {
                        Swal.showValidationMessage('Debe seleccionar una opción');
                    }
                }
            });
        },
        async cambiarEstadoPago(id_pago, estado_concepto){
            this.loading = true;
            var respuesta = await oblicacionesService.cambiarEstadoPago(id_pago, estado_concepto);

            if(respuesta.data.success == 1){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: respuesta.data.message,
                    showConfirmButton: false,
                    timer: 1900
                });
                setTimeout(() => {
                    this.datosDashboard();
                    this.listarNotificaciones();
                }, 2000);
            }else{
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: respuesta.data.message,
                    showConfirmButton: false,
                    timer: 1900
                });
            }  
        },
    },
}
</script>
<style scoped>
    .card {
        border: none;
        min-height: 139px;
        box-shadow: 0px 0px 14px 4px rgba(121, 121, 121, 0.2);
        cursor: pointer;
    }

    .cadop {
        transition: transform .3s ease-in;
    }

    .cadop:hover {
        transform: scale(1.04);
        background-color: aliceblue;
    }

    a {
        text-decoration: none;
    }

    td, th {
        text-align: center;
        padding: 10px !important;
    }

    .select-mio {
        padding: 5px !important;
        height: 43px !important;
        text-align: center !important;
        width: 185px !important;
        font-size: 23px !important;
        background-color: aliceblue !important;
        cursor: pointer !important;
        font-weight: bold !important;
    }

    .table-container {
        height: 52vh;
        width: 100%;
        overflow-y: auto; /* Scroll vertical */
        border: 1px solid #ccc; /* Bordes para visualización */
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        padding: 8px;
        text-align: left;
        border: 1px solid #ccc;
    }
    thead th {
        position: sticky;
        top: 0; /* Mantener la cabecera fija */
        background-color: #f8f8f8;
        z-index: 1;
    }

    .div_notification {
        position: absolute;
        right: 35%;
        top: 18%;
        font-size: 16px;
        background-color: #ff0000;
        padding: 5px;
        height: 34px;
        text-align: center;
        color: wheat;
        font-weight: bolder;
        border-radius: 50%;
    }


    .div_notificaciones_contenedor{
        width: 30%;
        height: 100vh;
        position: absolute;
        top: 0px;
        background-color: #ffff;
        z-index: 93939393939;
        box-shadow: 0px 0px 14px 4px rgba(121, 121, 121, 0.2);
        transition: all .3s ease-in-out;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
    }

    .notificacion {
        background-color: #ccc;
        padding: 10px;
        border-radius: 20px;
        width: 100%;
        margin-top: 10px;
    }

    .noti_obligaciones {
       background-color: #c2dbff;
       color: #183663;
       transition: all .2s ease-in;
    }

    .noti_avance {
       background-color: #dec2ff;
       color: #4b1863;
       transition: all .2s ease-in;
    }

    .noti_obligaciones:hover, .noti_avance:hover {
        transform: scale(0.95);
        cursor: pointer;
    }

    .tablero  {
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
        height: 65vh;
        overflow: hidden;
    }

    .nota {
        position: relative; 
        padding: 10px;
        border-radius: 8px;
        transition: all .3s ease-in-out;
    }

    .nota::after {
        content: '';
        position: absolute;
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-bottom: 17px solid #fff;
    }

    .clip {
        position: absolute;
        width: 40px;
        top: -39px;
        left: 42%;
        z-index: 999;
    }

    .nota:hover {
        transform: scale(1.2) rotate(10deg);
        z-index: 99999999999999;
    }
</style>