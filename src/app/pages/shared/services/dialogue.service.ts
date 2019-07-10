import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DialogueService {

  constructor() { }

  dialogues = {
    historyCard:{
      "viewsCard":"views are counted on the basis of impressions and general number of footprints at the venue",
      "watchTime":"watch time is calculated on the basis of impressions and the length of particular ad campaign. It shows the total duration of for which your ad was live on screen",
      "campaigns":"campaigns is the number of ad campaigns ",
      "impressions":"impressions is the number of times an ad was shown the venue screens",
    },
    gmap : {
      "gmap":"These are our outlets where your Ad have run atleast once. The Red pointer are venues that do not have any active campaign running currently, the blue pointers are the venues where active campaigns are running. Click on the pointer to view venue info"
    }
  }


  generateDialogue(component,diaIndex){
    Swal.fire({
      type: 'info',
      text:this.dialogues[component][diaIndex],
      showCloseButton:false,
    })
  }
}
