import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-gmaps',
  styleUrls: ['./gmaps.component.scss'],
  template: `
    <nb-card status="success">
    <nb-card-header >Partner Outlets
    <nb-badge text="207 active outlets" status="danger" position="top left"></nb-badge>
      </nb-card-header>
      <nb-card-body>
        <agm-map #gm [latitude]="lat" [longitude]="lng" >
          <agm-marker class="marker" [iconUrl]="cord.live?greenMarker:redMarker"  (mouseOut)="onMouseOut(infoWindow, gm)"  (mouseOver)="onMouseOver(infoWindow,gm)" (markerClick)="gotoOutletDetailsPage(cord.id)" [label]="{'text':cord.name,'color':'black','fontFamily':'roboto','fontSize': '14px','fontWeight': 'bold'}"  [label]="labelOptions"  *ngFor="let cord of cordinates;let i = index" [latitude]="cord.lat" [longitude]="cord.lng">
          <agm-info-window #infoWindow >
         <div>
         <img class="outletImg" src="../../../../assets/images/alan.png" alt="Flowers in Chania">
        <div class="outlet-info">
        <span>outlet name : {{cord.name}}</span><br>
        <span>screens : {{cord.screens}}</span><br>
        <span class="badge" >rating : {{cord.rating}}/5</span>
        </div>
         </div>
        </agm-info-window>
        </agm-marker>
          </agm-map>
      </nb-card-body>
    </nb-card>
  `,
})
export class GmapsComponent {


  lat = 51.678418;
  lng = 7.809007;
  greenMarker = {url: '../../../../assets/images/green-marker.svg', scaledSize: {width: 40,height: 60}} 
  redMarker = {url: '../../../../assets/images/red-marker.svg', scaledSize: {width: 40,height: 60}} 
  cordinates = [
    { id:1  , lat:51.67,lng:7.809007 ,live:true , name:"hyderabad house",screens:"2" , rating:3.5 },
    { id: 2  , lat:52.67,lng:7.309007 ,live:false , name:"banglore house",screens:"3" , rating:4 },
    { id:  3 , lat:52.07,lng:7.709007 , live:true, name:"russia house",screens:"1" , rating:4.5 },
    { id:  4 , lat:51.87,lng:7.609007 , live:false, name:"india house",screens:"4" , rating:3 },
    { id: 5  , lat:51.17,lng:7.009007 , live:true, name:"autrallia house",screens:"2" , rating:3.5 },
    { id: 6  , lat:51.77,lng:7.409007 , live:true, name:"uganda house",screens:"3" , rating:2.5 }
  ]

  labelOptions = {
    color: 'white',
    fontFamily: 'roboto',
    fontSize: '14px',
    fontWeight: 'bold',
    // text: 'some other text'
}

constructor(private router:Router){

}

gotoOutletDetailsPage(outletId){
  this.router.navigate(['/outlet-details/outletId'])
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

}
