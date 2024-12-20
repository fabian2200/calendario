<template>
  <div style="height: 100vh; padding: 40px;">
    <div style="width: 100%; display: flex; justify-content: space-between;">
      <h2>Obligaciones e impuestos</h2>
      <router-link to="/"><button style="border-radius: 50%; width: 60px; height: 60px;" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i></button></router-link>
    </div>
    <br>
    <Qalendar
      :key="calendarKey"
      :selected-date="new Date()"
      :events="events"
      :config="config"
      @edit-event="eventClicked"
    />

    <div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="infoModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
              <div class="modal-header">
              <h3  id="infoModalLabel">Cambiar estado de compromiso</h3>
              </div>
              <div class="modal-body">
                <h5><strong>Compromiso: </strong> {{ compromiso_editar.desc_compromiso  }}</h5>
                <h5><strong>Empresa: </strong> {{ compromiso_editar.nombre }}</h5>
                <div v-if="tipo_cambio_estado == 'pres'">
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
                <button type="button" class="btn btn-danger" @click="closeModal()">Cerrar</button>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Qalendar } from "qalendar";
import * as oblicacionesService from "../services/obligaciones";
import { Modal } from 'bootstrap';
import Swal from "sweetalert2";

export default {
  components: {
    Qalendar,
  },

  data() {
    return {
      calendarKey: 1,
      todayDate: null,
      obligaciones: [],
      events: [
       
      ],
      config: {
        week: {
          startsOn: 'monday',
          nDays: 7,
          scrollToHour: 5,
        },
        month: {
          showTrailingAndLeadingDates: false,
        },
        locale: 'es-ES',
        defaultMode: 'month',
        isSilent: true,
        showCurrentTime: false,
      },
      modalInstance: null,
      compromiso_editar: {
        id: 7,
        empresa: 1,
        compromiso: 5,
        fecha_presentacion: "2024-12-18",
        dias_anticipacion_pre: 5,
        fecha_vencimiento: "2024-12-24",
        dias_anticipacion_ven: 4,
        observacion: "",
        estado_pres: "pendiente",
        estado_venc: "pendiente",
        remember_token: null,
        created_at: "2024-12-06 09:14:38",
        update_a: "2024-12-06 09:14:38",
        nombre: "CSI DESARROLLOS E INGENIERIA SAS",
        desc_compromiso: "Informe A",
        periodicidad : "mensual"
      },
      tipo_cambio_estado: 'pres'
    }
  },
  mounted() {
    this.listarObligaciones();
    this.initModal();
  },
  methods: {
    initModal() {
      const modalElement = document.getElementById('infoModal');
      this.modalInstance = new Modal(modalElement);
    },
    openModal() {
      this.modalInstance.show(); 
    },
    closeModal() {
      this.modalInstance.hide();
    },
    eventClicked(event){      
      var [tipo, id_com] = event.split("_");
      this.tipo_cambio_estado = tipo;
      this.compromiso_editar = this.obligaciones.data.find(e => e.id == id_com);
      console.log(tipo);
      this.openModal();
    },
    async listarObligaciones(){
      this.obligaciones = await oblicacionesService.listarObligaciones();
      this.mapearObligaciones();
    },
    mapearObligaciones(){
      var color1 = "";
      var color2 = "";

      this.obligaciones.data.forEach(element => {
        
        color1 = "";
        if (element.estado_pres == "pagado" || element.estado_pres == "presentado") {
          color1 = "green";
        }else{
          if(element.estado_pres == "vencido"){
            color1 = "red";
          }else{
            if(element.estado_pres == "pendiente" && element.fecha_presentacion < new Date().toISOString().split('T')[0]){
              color1 = "red";
            }else{
              color1 = "purple";
            }
          }
        }

        var newEventI = {
          title: "Fecha Presentación "+element.desc_compromiso,
          time: { start: element.fecha_presentacion, end: element.fecha_presentacion },
          color: color1,
          isEditable: true,
          id: "pres_"+element.id,
          with: element.nombre,
          location: element.estado_pres,
        };
        this.events.push(newEventI);


        color2 = "";
        if (element.estado_venc == "pagado" || element.estado_venc == "presentado") {
          color2 = "green";
          console.log(element.estado_venc);
        }else{
          if(element.estado_venc == "vencido"){
            color2 = "red";
          }else{
            if(element.estado_venc == "pendiente" && element.fecha_vencimiento < new Date().toISOString().split('T')[0]){
              color2 = "red";
            }else{
              color2 = "yellow";
            }
          }
        }

        var newEventF = {
          title: "Fecha Pago " + element.desc_compromiso,
          time: { start: element.fecha_vencimiento, end: element.fecha_vencimiento },
          color: color2,
          isEditable: true,
          id: "ven_"+element.id,
          with: element.nombre,
          location: element.estado_venc,
        };
        this.events.push(newEventF);
      });      

      console.log(this.events);

      this.calendarKey += 1;
    },
    async cambiarEstadoCompromiso(){
      var datos = {
        tipo: this.tipo_cambio_estado,
        data: this.compromiso_editar
      };
      
      await oblicacionesService.cambiarEstadoCompromiso(datos).then(respuesta => {
        var respuesta_ok = respuesta.data;
        if(respuesta_ok.success == 1){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: respuesta_ok.message,
            showConfirmButton: false,
            timer: 1500
          });

          setTimeout(() => {
            this.events = [];
            this.obligaciones = [];
            this.listarObligaciones();
          }, 1500);
          
        }else{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: respuesta_ok.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  }
};
</script>
<style>
  .calendar-week {
    display: none !important;
  }

  .week-timeline {
    min-height: 65vh;
    border-bottom: none !important;
  }

  .week-timeline__event  {
    position: relative;
    --event-padding: 3px;
    display: flex;
    align-items: center;
    min-height: 3.9rem !important;
    max-height: 3.9rem !important;
    width: calc(100% - var(--event-padding));
    font-size: var(--qalendar-font-2xs);
    border-radius: 4px;
    padding: var(--event-padding);
    margin-bottom: .25em;
    text-align: left;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    overflow: hidden;
    font-size: 2vh !important;
    padding: 7px !important;
    width: 95% !important;
    transition: all .2s ease-in;
    margin: 5px;
  }

  .week-timeline__event:hover {
    transform: scale(1.1);
  }

  .week-timeline__events {
    border-right: 1px dashed rgb(127 123 123) !important; 
  }

  .calendar-root {
    padding: 3vh !important;
    box-shadow: 0px 0px 14px 4px rgba(121, 121, 121, 0.2);
    border: none !important;
  }

  .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: #2684ff !important;
    font-weight: bold !important;
  }

  .nav-link {
    color: #343a40 !important;
  }

  .week-timeline__day:first-child .week-timeline__events {
    border-right: 1px dashed rgb(127 123 123) !important; 
  }


</style>