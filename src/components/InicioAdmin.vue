<template lang="">
    <div>
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
                            <div class="col-6 col-lg-5 col-md-6">
                                <router-link to="/obligaciones-impuestos">
                                    <div class="card cadop">
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
                            <div class="col-6 col-lg-5 col-md-6">
                                <router-link to="/avance-contable">
                                    <div class="card cadop">
                                        <div class="card-body px-3 py-4-5">
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <div class="stats-icon red">
                                                        <i class="bi bi-bar-chart-line-fill red_i"></i>
                                                    </div>
                                                </div>
                                                <div class="col-md-10" style="display: flex;flex-direction: column;justify-content: center;">
                                                    <h3 class="text-muted font-semibold">Avance Contable</h3>
                                                    <h4 class="font-extrabold mb-0">112</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                            <div class="col-6 col-lg-2 col-md-6">
                                <router-link to="/obligaciones-impuestos">
                                    <div class="card cadop">
                                        <div class="card-body px-3 py-4-5">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="stats-icon green">
                                                        <i class="bi bi-bell-fill orange_i"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card" style="margin: 0px; height: 67vh;overflow-y: auto;">
                                    <div class="card-header">
                                        <br>
                                        <h2>Obligaciones vencidas</h2>
                                    </div>
                                    <div class="card-body">
                                        <div style="display: flex;  align-items: center">
                                            <label style="width: 100px; font-weight: bold">Filtrar: </label>
                                            <select style="width: 300px;" v-model="tipo_obligacion_mostrada" class="form-control">
                                                <option value="1">Fecha de presentación vencida</option>
                                                <option value="2">Fecha de vencimiento vencida</option>
                                            </select>
                                        </div>
                                        <br>
                                        <div class="table-responsive">
                                            <template v-if="datos != null">
                                                <template v-if="tipo_obligacion_mostrada == 1">
                                                    <table class="table table-hover table-lg">
                                                        <thead>
                                                            <tr>
                                                                <th style="background-color: #b5f1fd">Empresa</th>
                                                                <th style="background-color: #b5f1fd">Declaración</th>
                                                                <th style="background-color: #b5f1fd">Fecha <br> presentación</th>
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
                                                </template>
                                                <template v-else>
                                                    <table class="table table-hover table-lg">
                                                        <thead>
                                                            <tr>
                                                                <th style="background-color: #b5f1fd">Empresa</th>
                                                                <th style="background-color: #b5f1fd">Declaración</th>
                                                                <th style="background-color: #b5f1fd">Fecha <br> vencimiento</th>
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
                                                </template>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
import * as oblicacionesService from "../services/obligaciones";
//import { Modal } from 'bootstrap';
//import Swal from "sweetalert2";

export default {
    data() {
        return {
            datos: null,
            tipo_obligacion_mostrada: 1
        }
    },
    mounted() {
        this.datosDashboard();
    },
    methods: {
        async datosDashboard(){
            this.datos = await oblicacionesService.datosDashboard();
            this.datos = this.datos.data;
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
</style>