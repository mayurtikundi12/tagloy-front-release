import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogueService } from '../shared/services/dialogue.service';

@Component({
  selector: 'ngx-gmaps',
  styleUrls: ['./gmaps.component.scss'],
  template: `
    <nb-card>
    <nb-card-header >Partner Outlets   <span class="right">Total Screens <span class="green">{{totalScreenCount}}</span><i (click)="findInfo('gmap','gmap')" class="fa fa-info-circle infoCircle" aria-hidden="true"></i></span>
    <nb-badge text="207 active outlets" status="danger" position="top left"></nb-badge>
      </nb-card-header>
      <nb-card-body>
        <agm-map #gm [latitude]="coordinates?coordinates[0]['latitude']:0" [longitude]="coordinates?coordinates[0]['longitude']:0" >
          <agm-marker class="marker" [iconUrl]="cord.live?greenMarker:redMarker"  (mouseOut)="onMouseOut(infoWindow, gm)"  (mouseOver)="onMouseOver(infoWindow,gm)" (markerClick)="gotoOutletDetailsPage(cord.venue_id)" [label]="{'text':cord.name,'color':'black','fontFamily':'roboto','fontSize': '14px','fontWeight': 'bold'}"  [label]="labelOptions"  *ngFor="let cord of coordinates;let i = index" [latitude]="cord.latitude" [longitude]="cord.longitude">

          <agm-info-window #infoWindow >
         <div>
         <img class="outletImg" [src]="'//' + cord.logo" alt="Flowers in Chania">
        <div class="outlet-info">
        <span>Outlet Name : {{cord.name}}</span><br>
        <span>Screens : {{cord.tvCount}}</span><br>
        <span>Campaigns : {{cord.activeCampaignsCount}} active, {{cord.completedCampaignsCount}} completed</span><br>
        <span class="badge" >click on pin for more info</span>
        </div>
         </div>
        </agm-info-window>
        </agm-marker>
          </agm-map>
      </nb-card-body>
    </nb-card>
  `,
})
export class GmapsComponent implements OnInit {

  @Input() coordinates ;

  totalScreenCount:number ;

  greenMarker = {url: '../../../../assets/images/green-marker.svg', scaledSize: {width: 40,height: 60}}
  redMarker = {url: '../../../../assets/images/red-marker.svg', scaledSize: {width: 40,height: 60}}

  labelOptions = {
    color: 'white',
    fontFamily: 'roboto',
    fontSize: '14px',
    fontWeight: 'bold',
    // text: 'some other text'
}

constructor(private router:Router,private dialogSrv:DialogueService){
    this.totalScreenCount = Number(sessionStorage.getItem("totalScreenCount"));
}

ngOnInit(){

}


gotoOutletDetailsPage(outletId){
  this.router.navigate(['/outlet-details/',outletId,0]);
}

onMouseOver(infoWindow,gm){

  if (gm.lastOpen != null) {
    gm.lastOpen.close();
}

gm.lastOpen = infoWindow;

infoWindow.open();
}

onMouseOut(infoWindow, gm) {
  if (gm.lastOpen != null) {
    gm.lastOpen.close();
}
}

findInfo(component,index){
  this.dialogSrv.generateDialogue(component,index);
}



}
