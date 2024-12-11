<template>
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
        <div style="height: 100vh; padding: 40px;">
            <router-link to="/"><button style="position: absolute;  right: 45px; top: 23px;border-radius: 50%; width: 60px; height: 60px;" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i></button></router-link>
            <div style="padding: 0px; display: flex; width: 50%;">
                <h2 style="padding-right: 30px;">Seleccione un periodo</h2>
                <select @change="actualizarGrafica()" class="form-control select-mio" name="anio" v-model="anio" id="">
                    <option v-for="year in years" :key="year" :value="year">
                        {{ year }}
                    </option>
                </select>
            </div>
            <hr>
            <div class="card">
                <div class="hello" ref="chartdiv" style="padding: 3vh; overflow: hidden;"></div>
                <!-- Modal -->
                <div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="infoModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="infoModalLabel" v-if="item_mostrar != null">
                                    {{ item_mostrar.nombre }}
                                    <br>
                                    <span style="color: #25396f; font-weight: bold;">Porcentaje Avance: {{ item_mostrar.porcentaje }}%</span> 
                                </h5>
                            </div>
                            <div class="modal-body">
                                <div style="width: 100%; padding: 10px;" v-if="item_mostrar != null">
                                    <table id="tabla_avance">
                                        <thead>
                                            <tr style="background-color: #2f74b5;">
                                                <td style="color: white;" colspan="13">AVANCE DE LA CONTABILIDAD</td>
                                            </tr>
                                            <tr style="background-color: #a9d08f;">
                                                <td>CONCEPTO</td>
                                                <td>ENE</td>
                                                <td>FEB</td>
                                                <td>MAR</td>
                                                <td>ABR</td>
                                                <td>MAY</td>
                                                <td>JUN</td>
                                                <td>JUL</td>
                                                <td>AGO</td>
                                                <td>SEP</td>
                                                <td>OCT</td>
                                                <td>NOV</td>
                                                <td>DIC</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in item_mostrar.conceptos" :key="index">
                                                <td style="background-color: #2f74b5; color: white;">{{ item.nombre_concepto  }}</td>
                                                <template v-if="item.frecuencia_pago == 'Mensual'">
                                                    <td v-for="index2 in Array(item.primer_mes).fill().map((_, i) => i + 1)" :key="index2" colspan="1">
                                                        
                                                    </td>
                                                    <td v-for="(item2, index2) in item.pagos" :key="index2" :class="item2.clase" @click="openSelectModal(item.nombre_concepto, item2.id, mesesUno[item2.mes_pago])" colspan="1">
                                                        {{ item2.abrev }}
                                                    </td>
                                                </template>
                                                <template v-if="item.frecuencia_pago == 'Bimestral'">
                                                    <td v-for="index2 in Array(item.primer_mes).fill().map((_, i) => i + 1)" :key="index2" colspan="1">
                                                        
                                                    </td>
                                                    <td v-for="(item2, index2) in item.pagos" :key="index2" :class="item2.clase" @click="openSelectModal(item.nombre_concepto, item2.id, mesesUno[item2.mes_pago]+' - '+mesesUno[item2.mes_pago + 1])" colspan="2">
                                                        {{ item2.abrev }}
                                                    </td>
                                                </template>
                                                <template v-if="item.frecuencia_pago == 'Trimestral'">
                                                    <td v-for="index2 in Array(item.primer_mes).fill().map((_, i) => i + 1)" :key="index2" colspan="1">
                                                        
                                                    </td>
                                                    <td v-for="(item2, index2) in item.pagos" :key="index2" :class="item2.clase" @click="openSelectModal(item.nombre_concepto, item2.id, mesesUno[item2.mes_pago]+' - '+mesesUno[item2.mes_pago + 2])" colspan="3">
                                                        {{ item2.abrev }}
                                                    </td>
                                                </template>
                                                <template v-if="item.frecuencia_pago == 'Cuatrimestral'">
                                                    <td v-for="index2 in Array(item.primer_mes).fill().map((_, i) => i + 1)" :key="index2" colspan="1">
                                                        
                                                    </td>
                                                    <td v-for="(item2, index2) in item.pagos" :key="index2" :class="item2.clase" @click="openSelectModal(item.nombre_concepto, item2.id, mesesUno[item2.mes_pago]+' - '+mesesUno[item2.mes_pago + 3])" colspan="4">
                                                        {{ item2.abrev }}
                                                    </td>
                                                </template>
                                                <template v-if="item.frecuencia_pago == 'Semestral'">
                                                    <td v-for="index2 in Array(item.primer_mes).fill().map((_, i) => i + 1)" :key="index2" colspan="1">
                                                        
                                                    </td>
                                                    <td v-for="(item2, index2) in item.pagos" :key="index2" :class="item2.clase" @click="openSelectModal(item.nombre_concepto, item2.id, mesesUno[item2.mes_pago]+' - '+mesesUno[item2.mes_pago + 5])" colspan="6">
                                                        {{ item2.abrev }}
                                                    </td>
                                                </template>
                                                <template v-if="item.frecuencia_pago == 'Anual'">
                                                    <td v-for="index2 in Array(item.primer_mes).fill().map((_, i) => i + 1)" :key="index2" colspan="1">
                                                        
                                                    </td>
                                                    <td v-for="(item2, index2) in item.pagos" :key="index2" :class="item2.clase" @click="openSelectModal(item.nombre_concepto, item2.id, mesesUno[item2.mes_pago]+' - '+mesesUno[11])" :colspan="12 - item2.mes_pago">
                                                        {{ item2.abrev }}
                                                    </td>
                                                </template>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" @click="closeModal()">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
  import * as am5 from '@amcharts/amcharts5';
  import * as am5xy from '@amcharts/amcharts5/xy';
  import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
  import { Modal } from 'bootstrap';
  import * as oblicacionesService from "../services/obligaciones";
  import Loading from 'vue3-loading-overlay';
  import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
  import Swal from "sweetalert2";


  export default {
    components: {
        Loading
    },
    data() {
        return {
            modalInstance: null,
            avance_contable: [],
            anio: 2024,
            chart: null,
            root: null,
            years: [],
            loading: false,
            item_mostrar: null,
            id_item_mostrar: null,
            mesesUno: [
                "enero", "febrero", "marzo", "abril", "mayo", "junio",
                "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
            ],
        };
    },
    mounted() {
        this.initModal();
        this.avanceContable();
        this.generateYears();
    },
    beforeUnmount() {
        if (this.root) {
            this.root.dispose();
        }
    },
    methods: {
        generateYears() {
            const currentYear = new Date().getFullYear();
            for (let year = 2024; year <= currentYear; year++) {
                this.years.push(year);
            }
        },
        initModal() {
            const modalElement = document.getElementById('infoModal');
            this.modalInstance = new Modal(modalElement);
        },
        openModal(id_empresa) {
            this.id_item_mostrar = id_empresa;
            this.item_mostrar = this.avance_contable.filter(item => item.id === id_empresa)[0];
            if (this.modalInstance) {
                this.modalInstance.show(); 
            }
        },
        openSelectModal(concepto, id_pago, mes) {
            const selectHTML = `
                <h4 style="text-align: left; font-weight: bold;"><span style="color: blue">Concepto: </span>`+concepto+`</h4>
                <h4 style="text-transform: capitalize; text-align: left; font-weight: bold;"><span style="color: blue">Mes: </span>`+mes+`</h4>
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
                        this.cambiarEstadoPago(id_pago, estado_concepto);
                    } else {
                        Swal.showValidationMessage('Debe seleccionar una opción');
                    }
                }
            });
        },
        async cambiarEstadoPago(id_pago, estado_concepto){
            this.loading = true;
            var respuesta = await oblicacionesService.cambiarEstadoPago(id_pago, estado_concepto);
            console.log(respuesta);

            if(respuesta.data.success == 1){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: respuesta.data.message,
                    showConfirmButton: false,
                    timer: 1900
                });
                setTimeout(() => {
                    this.actualizarGrafica();
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
        closeModal() {
            if (this.modalInstance) {
                this.modalInstance.hide();
            }
        },
        crearGrafica(){
            let root = am5.Root.new(this.$refs.chartdiv);
    
            root.setThemes([
                am5themes_Animated.new(root)
            ]);

            let data = [];

            this.avance_contable.forEach(element => {
                data.push({
                    id_empresa: element.id,
                    empresa: element.nombre,
                    porcentaje_avance: element.porcentaje,
                    logo: {
                        src: element.logo
                    }
                });
            });

            let chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    panX: false,
                    panY: false,
                    wheelX: "none",
                    wheelY: "none",
                    paddingBottom: 50,
                    paddingTop: 40,
                    paddingLeft:0,
                    paddingRight:0
                })
            );

            let xRenderer = am5xy.AxisRendererX.new(root, {
                minorGridEnabled:true,
                minGridDistance:60
            });

            xRenderer.grid.template.set("visible", false);

            let xAxis = chart.xAxes.push(
                am5xy.CategoryAxis.new(root, {
                    paddingTop:40,
                    categoryField: "empresa",
                    renderer: xRenderer
                })
            );

            let yRenderer = am5xy.AxisRendererY.new(root, {});
            yRenderer.grid.template.set("strokeDasharray", [3]);

            let yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    min: 0,
                    max: 100,
                    strictMinMax: true,
                    renderer: yRenderer
                })
            );

            let series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                        empresa: "Income",
                        xAxis: xAxis,
                        yAxis: yAxis,
                        valueYField: "porcentaje_avance",
                        categoryXField: "empresa",
                        sequencedInterpolation: true,
                        calculateAggregates: true,
                        maskBullets: false,
                        tooltip: am5.Tooltip.new(root, {
                        dy: -30,
                        pointerOrientation: "vertical",
                        labelText: "{valueY}"
                    })
                })
            );

            series.columns.template.setAll({
                strokeOpacity: 0,
                cornerRadiusTR: 10,
                cornerRadiusTL: 10,
                maxWidth: 50,
                fillOpacity: 0.8
            });

           
            
            let circleTemplate = am5.Template.new({});
            var yo = this;

            series.bullets.push(function (root) {
                let bulletContainer = am5.Container.new(root, {});
                bulletContainer.children.push(
                    am5.Circle.new(
                    root,
                    {
                        radius: 30
                    },
                    circleTemplate
                    )
                );

                let maskCircle = bulletContainer.children.push(
                    am5.Circle.new(root, { radius: 27 })
                );

                let imageContainer = bulletContainer.children.push(
                    am5.Container.new(root, {
                    mask: maskCircle
                    })
                );

                imageContainer.children.push(
                    am5.Picture.new(root, {
                        templateField: "logo",
                        centerX: am5.p50,
                        centerY: am5.p50,
                        width: 40,
                        height: 40
                    })
                );

                bulletContainer.events.on("click", function (ev) {
                    let dataContext = ev.target.dataItem?.dataContext;
                    if (dataContext) {
                        handleColumnClick(dataContext);
                    }
                });

                return am5.Bullet.new(root, 
                    {
                        locationY: 0,
                        sprite: bulletContainer
                    }
                );
            });

            series.set("heatRules", [
                {
                    target: series.columns.template,
                    dataField: "valueY",
                    customFunction: function(sprite, min, max, value) {
                        if (value < 30) {
                            sprite.set("fill", am5.color(0xcc0000));
                        }
                        else {
                            if (value >= 30 && value < 80) {
                                sprite.set("fill", am5.color(0xf1c232));
                            }else{
                                sprite.set("fill", am5.color(0x6aa84f));
                            }
                        }
                    }
                },
                {
                    target: circleTemplate,
                    dataField: "valueY",
                    customFunction: function(sprite, min, max, value) {
                        if (value < 30) {
                            sprite.set("fill", am5.color(0xd63333));
                        }
                        else {
                            if (value >= 30 && value < 80) {
                                sprite.set("fill", am5.color(0xf4ce5b));
                            }else{
                                sprite.set("fill", am5.color(0x88b972));
                            }
                        }
                    }
                }
            ]);

            function handleColumnClick(data) {
                yo.openModal(data.id_empresa);
            }

            series.data.setAll(data);
            xAxis.data.setAll(data);

            let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
            cursor.lineX.set("visible", true);
            cursor.lineY.set("visible", true);

        
            series.appear();
            chart.appear(1000, 100);

            this.chart = chart;
            this.loading = false;
        },
        async avanceContable(){
            this.loading = true;
            this.avance_contable = await oblicacionesService.avanceContable(this.anio);
            this.avance_contable = this.avance_contable.data;
            this.crearGrafica();
        },
        async actualizarGrafica() {
            this.avance_contable = await oblicacionesService.avanceContable(this.anio);
            this.avance_contable = this.avance_contable.data;
            this.item_mostrar = this.avance_contable.filter(item => item.id === this.id_item_mostrar)[0];
            
            if (this.chart) {
                let data = [];
                this.avance_contable.forEach(element => {
                    data.push({
                        id_empresa: element.id,
                        empresa: element.nombre,
                        porcentaje_avance: element.porcentaje,
                        logo: {
                        src: element.logo
                        }
                    });
                });

                let series = this.chart.series.values[0];
                let xAxis = this.chart.xAxes.values[0];
                series.data.setAll(data);
                xAxis.data.setAll(data);
                this.loading = false;
            }
        }
    },
  }
</script>
<style scoped>
    .hello {
        width: 95%;
        height: 80vh;
    }

    .card {
        box-shadow: 0px 0px 14px 4px rgba(121, 121, 121, 0.2);
        border: none;
        border-radius: 20px;
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

    #tabla_avance {
        width: 100%;
    }

    #tabla_avance tr, td {
        border: 1px solid rgb(87, 87, 87);
        text-align: center;
        padding: 5px;
        font-weight: bold;
    }

    .pagado:hover, .na:hover, .pendiente:hover {
        background-color: rgb(205, 214, 255);
        color: black;
        cursor: pointer;
    }

    .pagado {
        background-color: green;
        color: white;
        font-weight: bold;
    }

    .na {
        background-color: rgb(202, 101, 34);
        color: white;
        font-weight: bold;
    }

    .pendiente {
        background-color: yellow;
        color: black;
        font-weight: bold;
    }
</style>